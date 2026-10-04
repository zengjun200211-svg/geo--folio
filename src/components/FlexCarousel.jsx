'use client';
import { useEffect, useRef, useState } from 'react';
import { Renderer, Program, Mesh, Triangle, Plane, Texture, RenderTarget } from 'ogl';
import './FlexCarousel.css';

const BEND_PRESETS = {
  liquid: { lensWidth: 0.74, lensHeight: 1.18, tilt: 62, roundness: 1, bend: 0.34, reach: 0.38, curl: 'twist', dispersion: 0.45, liquid: 0, followCursor: false },
  ribbon: { lensWidth: 0.8, lensHeight: 0.8, tilt: 0, roundness: 1, bend: 0.34, reach: 0.34, curl: 'twist', dispersion: 0.4, liquid: 0, followCursor: false },
  vortex: { lensWidth: 0.7, lensHeight: 0.95, tilt: 30, roundness: 1, bend: 0.46, reach: 0.3, curl: 'twist', dispersion: 0.5, liquid: 0, followCursor: false },
  arch: { lensWidth: 0.8, lensHeight: 0.8, tilt: 0, roundness: 1, bend: 0.3, reach: 0.36, curl: 'rise', dispersion: 0.4, liquid: 0, followCursor: false },
};
const FIT_ASPECT = { portrait: 0.75, square: 1, landscape: 4/3 };
const TAPS = 12;
const PIXEL_BUDGET = 4.5e6;
const INTRO_DURATION = { rise: 2.1, bloom: 1.6, spin: 2.2, deal: 1.5, fade: 0.35 };
const wrap = (v, s) => ((((v + s/2) % s) + s) % s) - s/2;
const clamp01 = v => Math.min(Math.max(v, 0), 1);
const easeOut = v => 1 - Math.pow(1 - clamp01(v), 3);
const easeOutQuint = v => 1 - Math.pow(1 - clamp01(v), 5);
const easeInOut = v => { const t = clamp01(v); return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2; };

const cardVertex = `#version 300 es
in vec3 position; in vec2 uv;
uniform vec4 uRect; uniform vec2 uResolution;
out vec2 vUv; out vec2 vLocal;
void main() {
  vUv = uv; vLocal = vec2(position.x, -position.y) * uRect.zw;
  vec2 px = uRect.xy + vLocal;
  gl_Position = vec4(px.x/uResolution.x*2.0-1.0, 1.0-px.y/uResolution.y*2.0, 0.0, 1.0);
}`;
const cardFragment = `#version 300 es
precision highp float;
uniform sampler2D tMap; uniform vec2 uSize; uniform vec2 uImage;
uniform float uRadius; uniform float uAlpha; uniform float uReady; uniform float uShift; uniform float uDpr;
uniform vec3 uPlaceholder;
in vec2 vUv; in vec2 vLocal; out vec4 fragColor;
float roundedBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}
void main() {
  float sd = roundedBox(vLocal, uSize*0.5, min(uRadius, min(uSize.x, uSize.y)*0.5));
  float mask = clamp(0.5 - sd*uDpr, 0.0, 1.0);
  vec2 local = vLocal/uSize + 0.5;
  float cardAspect = uSize.x/uSize.y;
  float imageAspect = uImage.x/max(uImage.y, 1.0);
  vec2 scale = imageAspect > cardAspect ? vec2(cardAspect/imageAspect, 1.0) : vec2(1.0, imageAspect/cardAspect);
  scale /= 1.08;
  vec2 uv = vec2(local.x, 1.0-local.y);
  uv = (uv-0.5)*scale+0.5;
  uv.x += uShift*(1.0-scale.x)*0.5;
  vec3 image = texture(tMap, uv).rgb;
  vec3 color = mix(uPlaceholder, image, uReady);
  float alpha = mask*uAlpha;
  fragColor = vec4(color*alpha, alpha);
}`;
const lensVertex = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;
const lensFragment = `#version 300 es
precision highp float;
uniform sampler2D tScene; uniform vec2 uResolution; uniform float uDpr;
uniform vec2 uCenter; uniform vec2 uHalf; uniform float uAngle; uniform float uExponent;
uniform float uInner; uniform float uOuter; uniform float uFlow; uniform float uCurl;
uniform float uDispersion; uniform float uStrength; uniform float uSceneAlpha;
out vec4 fragColor;
void main() {
  vec2 frag = gl_FragCoord.xy/uDpr;
  vec2 uv = frag/uResolution;
  vec2 rel = frag - vec2(uCenter.x, uResolution.y-uCenter.y);
  float ca = cos(uAngle), sa = sin(uAngle);
  vec2 local = vec2(ca*rel.x+sa*rel.y, -sa*rel.x+ca*rel.y);
  vec2 k = max(abs(local)/uHalf, vec2(1e-5));
  float nd = pow(pow(k.x, uExponent)+pow(k.y, uExponent), 1.0/uExponent);
  vec2 grad = pow(k, vec2(uExponent-1.0))*sign(local)/uHalf*pow(nd, 1.0-uExponent);
  float glen = max(length(grad), 1e-6);
  float edge = (nd-1.0)/glen;
  vec2 outward = grad/glen;
  vec2 normal = vec2(ca*outward.x-sa*outward.y, sa*outward.x+ca*outward.y);
  vec2 along = vec2(-normal.y, normal.x);
  float t = clamp((edge+uInner)/(uInner+uOuter), 0.0, 1.0);
  float ramp = t*t*t*(t*(t*6.0-15.0)+10.0);
  float slope = 16.0*t*t*(1.0-t)*(1.0-t);
  float reachX = rel.x/(uResolution.x*0.5);
  float side = smoothstep(0.02, 0.3, abs(reachX))*(uCurl==0.0 ? sign(reachX) : uCurl);
  float lift = ramp*side*uFlow*uStrength;
  vec2 swirl = along*along.y*side*slope*uFlow*uStrength*0.35;
  vec2 drift = vec2(0.0, -lift)-swirl;
  vec2 shifted = uv+drift/uResolution;
  vec2 texels = uResolution*uDpr;
  vec2 gx = dFdx(shifted); vec2 gy = dFdy(shifted);
  gx *= min(1.0, 3.0/max(length(gx*texels), 1e-4));
  gy *= min(1.0, 3.0/max(length(gy*texels), 1e-4));
  vec4 color = textureGrad(tScene, shifted, gx, gy);
  vec2 spread = vec2(0.0, side*slope*uFlow*uStrength)/uResolution*uDispersion;
  float spreadPx = length(spread*texels);
  if (color.a > 0.002 && spreadPx > 0.25) {
    vec3 base = color.rgb/color.a;
    vec3 sumColor = vec3(0.0); vec3 sumWeight = vec3(0.0);
    for (int i = 0; i < ${TAPS}; i++) {
      float s = (float(i)+0.5)/float(${TAPS});
      vec4 c = textureGrad(tScene, shifted+spread*(s-0.5), gx, gy);
      vec3 w = max(1.0-abs(vec3(s)-vec3(0.15,0.5,0.85))*2.6, 0.0)*c.a;
      sumColor += c.rgb*(w/max(c.a, 0.002));
      sumWeight += w;
    }
    vec3 split = mix(base, sumColor/max(sumWeight, vec3(1e-4)), clamp(sumWeight*2.0, 0.0, 1.0));
    color.rgb = mix(color.rgb, clamp(split, 0.0, 1.0)*color.a, smoothstep(0.25, 1.5, spreadPx));
  }
  fragColor = color*uSceneAlpha;
}`;

const Digits = ({ value }) => (
  <span className="flex-carousel__digits">
    {String(value).padStart(2,'0').split('').map((d,i) => (
      <span key={i} className="flex-carousel__digit">
        <span className="flex-carousel__reel" style={{ transform: `translateY(${-Number(d)*10}%)` }}>
          {'0123456789'.split('').map(n => <span key={n}>{n}</span>)}
        </span>
      </span>
    ))}
  </span>
);

const FlexCarousel = ({
  items = [], preset = 'liquid', intro = 'rise', cardHeight = 0.5, gap = 12,
  radius = 0, fit = 'natural', lensWidth, lensHeight, tilt, roundness, bend, reach, curl,
  dispersion, liquid, followCursor, squeeze = 0.2, focusOnClick = true, autoplay = false,
  interval = 4, captions = true, captureWheel = true, onChange, onSelect, className = '', style
}) => {
  const containerRef = useRef(null);
  const settingsRef = useRef(null);
  const itemsRef = useRef(items);
  const engineRef = useRef(null);
  const callbacksRef = useRef({ onChange, onSelect });
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [focusOpen, setFocusOpen] = useState(false);
  const base = BEND_PRESETS[preset] || BEND_PRESETS.liquid;
  const pick = (v, k) => (v === undefined || v === null ? base[k] : v);
  const list = items && items.length ? items : [];
  const itemsKey = list.map(i => i.src).join('|');

  useEffect(() => {
    itemsRef.current = list;
    callbacksRef.current = { onChange, onSelect };
    settingsRef.current = { intro, cardHeight, gap, radius, fit,
      lensWidth: pick(lensWidth,'lensWidth'), lensHeight: pick(lensHeight,'lensHeight'),
      tilt: pick(tilt,'tilt'), roundness: pick(roundness,'roundness'), bend: pick(bend,'bend'),
      reach: pick(reach,'reach'), curl: pick(curl,'curl'), dispersion: pick(dispersion,'dispersion'),
      liquid: pick(liquid,'liquid'), followCursor: pick(followCursor,'followCursor'),
      squeeze, focusOnClick, autoplay, interval, captureWheel };
    engineRef.current?.wake();
  });
  useEffect(() => { engineRef.current?.setItems(itemsRef.current); }, [itemsKey]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || list.length < 3) return undefined;
    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio||1, 2), alpha: true, premultipliedAlpha: true, antialias: false, depth: false });
    const gl = renderer.gl;
    if (!renderer.isWebgl2) { gl.getExtension('WEBGL_lose_context')?.loseContext(); return undefined; }
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas;
    canvas.style.display = 'block'; canvas.style.width = '100%'; canvas.style.height = '100%';
    canvas.setAttribute('aria-hidden', 'true');
    container.prepend(canvas);

    const cardProgram = new Program(gl, { vertex: cardVertex, fragment: cardFragment, transparent: true, depthTest: false, depthWrite: false,
      uniforms: { tMap: { value: new Texture(gl) }, uRect: { value: [0,0,1,1] }, uResolution: { value: [1,1] }, uSize: { value: [1,1] }, uImage: { value: [1,1] }, uRadius: { value: 16 }, uAlpha: { value: 1 }, uReady: { value: 0 }, uShift: { value: 0 }, uDpr: { value: 1 }, uPlaceholder: { value: [0.5,0.5,0.5] } } });
    cardProgram.setBlendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const cardMesh = new Mesh(gl, { geometry: new Plane(gl), program: cardProgram });
    const target = new RenderTarget(gl, { width: 2, height: 2, depth: false, minFilter: gl.LINEAR_MIPMAP_LINEAR, magFilter: gl.LINEAR });
    const lensUniforms = { tScene: { value: target.texture }, uResolution: { value: [1,1] }, uDpr: { value: 1 }, uCenter: { value: [0,0] }, uHalf: { value: [1,1] }, uAngle: { value: 0 }, uExponent: { value: 2 }, uInner: { value: 60 }, uOuter: { value: 80 }, uFlow: { value: 0 }, uCurl: { value: 0 }, uDispersion: { value: 0 }, uStrength: { value: 0 }, uSceneAlpha: { value: 0 } };
    const lensMesh = new Mesh(gl, { geometry: new Triangle(gl), program: new Program(gl, { vertex: lensVertex, fragment: lensFragment, uniforms: lensUniforms, depthTest: false, depthWrite: false }) });

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const anisotropy = renderer.getExtension('EXT_texture_filter_anisotropic') ? 8 : 0;
    let slots = [], width = 1, height = 1, pos = 0, vel = 0, goal = 0, mode = 'spring';
    let wheelAt = 0, raf = 0, last = performance.now(), visible = true, alive = true, dirty = true;
    let activeIndex = -1, interactedAt = -Infinity, autoplayAt = performance.now();
    let hasFocus = false, deform = 0, deformVel = 0, layout = null, resnap = false;
    let hover = '', lift = 1, energy = 0, lastPos = 0;
    const lens = { x: 0, y: 0, vx: 0, vy: 0, ready: false };
    const pointer = { x: 0, y: 0, over: false, down: false, id: -1, startX: 0, startY: 0, startPos: 0, dragging: false, touch: false, samples: [] };
    const introState = { kind: 'none', t: 0, running: false, done: false, readyAt: 0 };
    const focus = { index: -1, pending: -1, t: 0, v: 0, target: 0 };
    let instances = [];

    const loadSlot = (item, index) => {
      const texture = new Texture(gl, { generateMipmaps: true, minFilter: gl.LINEAR_MIPMAP_LINEAR, magFilter: gl.LINEAR, anisotropy });
      const slot = { item, index, texture, aspect: 0.8, loaded: false, failed: false, ready: 0, color: [0.5,0.5,0.5], image: [1,1], dispose: () => {} };
      const image = new Image();
      image.decoding = 'async';
      image.onload = () => {
        if (!alive || !slots.includes(slot)) return;
        texture.image = image; texture.update();
        slot.image = [image.naturalWidth||1, image.naturalHeight||1];
        slot.aspect = slot.image[0]/slot.image[1];
        slot.loaded = true; dirty = true; start();
      };
      image.onerror = () => { if (!alive) return; slot.failed = true; dirty = true; start(); };
      image.src = item.src;
      slot.dispose = () => { image.onload = null; image.onerror = null; gl.deleteTexture(texture.texture); };
      return slot;
    };
    const setItems = next => {
      slots.forEach(s => s.dispose());
      slots = next.map(loadSlot);
      activeIndex = -1; layout = null; resnap = true;
      focus.target = 0; focus.t = 0; focus.v = 0; focus.pending = -1;
      setFocusOpen(false); introState.readyAt = performance.now();
      dirty = true; start();
    };
    const metrics = s => {
      const cardH = Math.max(24, s.cardHeight*height);
      const fixed = FIT_ASPECT[s.fit];
      const widths = slots.map(s => (fixed || s.aspect)*cardH);
      const centers = []; let cursor = 0;
      for (let i = 0; i < widths.length; i++) { centers.push(cursor+widths[i]/2); cursor += widths[i]+s.gap; }
      return { cardH, widths, centers, gap: s.gap, loop: Math.max(cursor, 1) };
    };
    const nearest = (m, at) => { let best = 0, bd = Infinity; for (let i = 0; i < m.centers.length; i++) { const d = Math.abs(wrap(m.centers[i]-at, m.loop)); if (d < bd) { bd = d; best = i; } } return best; };
    const snapPoint = (m, at) => at + wrap(m.centers[nearest(m,at)]-at, m.loop);

    const beginIntro = (s, m) => {
      const kind = reducedMotion && s.intro !== 'none' ? 'fade' : s.intro;
      introState.kind = INTRO_DURATION[kind] ? kind : 'none';
      introState.running = introState.kind !== 'none';
      introState.done = !introState.running; introState.t = 0;
      if (introState.done) setRevealed(true);
    };
    const resize = () => {
      width = Math.max(1, container.clientWidth); height = Math.max(1, container.clientHeight);
      renderer.dpr = Math.min(window.devicePixelRatio||1, 2, Math.sqrt(PIXEL_BUDGET/(width*height)));
      renderer.setSize(width, height);
      target.setSize(Math.max(2, Math.round(width*renderer.dpr)), Math.max(2, Math.round(height*renderer.dpr)));
      lensUniforms.tScene.value = target.texture; dirty = true; start();
    };
    const frame = now => {
      raf = 0; if (!alive) return;
      const s = settingsRef.current;
      const dt = Math.min(0.05, Math.max(0.001, (now-last)/1000));
      last = now;
      if (!s || !slots.length) { if (visible) raf = requestAnimationFrame(frame); return; }
      const m = metrics(s); const n = slots.length;
      let animating = false;
      if (resnap) { goal = snapPoint(m, goal); pos = goal; vel = 0; resnap = false; }
      layout = m;
      if (!introState.running && !introState.done) {
        const all = slots.every(sl => sl.loaded || sl.failed);
        if (all || now-introState.readyAt > 3500) { goal = snapPoint(m, goal); pos = goal; beginIntro(s, m); }
      }
      if (introState.running) { introState.t = Math.min(1, introState.t/dt/(INTRO_DURATION[introState.kind]||1)*dt); if (introState.t >= 1) { introState.running = false; introState.done = true; setRevealed(true); } animating = true; }
      if (!pointer.dragging) {
        const stiffness = mode === 'wheel' ? 80 : 55;
        const damping = 2*Math.sqrt(stiffness);
        const steps = Math.ceil(dt/(1/240)); const h = dt/steps;
        for (let i = 0; i < steps; i++) { const acc = stiffness*(goal-pos)-damping*vel; vel += acc*h; pos += vel*h; }
        if (Math.abs(goal-pos) < 0.05 && Math.abs(vel) < 0.5) { pos = goal; vel = 0; } else animating = true;
      } else animating = true;
      if (Math.abs(pos) > m.loop*8) { const sh = Math.round(pos/m.loop)*m.loop; pos -= sh; goal -= sh; }
      const current = nearest(m, pos);
      if (current !== activeIndex) { activeIndex = current; setActive(current); callbacksRef.current.onChange?.(current, itemsRef.current[current]); }
      if (s.autoplay && !reducedMotion && introState.done && focus.target === 0 && !pointer.over && !pointer.down && mode === 'spring' && now-interactedAt > 3000 && now-autoplayAt > s.interval*1000) { autoplayAt = now; goal = snapPoint(m, goal)+m.widths[current]/2+s.gap+m.widths[(current+1)%n]/2; }
      const dpr = renderer.dpr;
      if (dirty || animating || pointer.down) {
        dirty = false; instances = [];
        cardProgram.uniforms.uResolution.value = [width, height];
        cardProgram.uniforms.uDpr.value = dpr;
        cardProgram.uniforms.uRadius.value = s.radius;
        const draws = [];
        for (let i = 0; i < n; i++) {
          const w = m.widths[i];
          const baseRel = wrap(m.centers[i]-pos, m.loop);
          for (let k = -3; k <= 3; k++) {
            const rel = baseRel+k*m.loop;
            if (Math.abs(rel)-w/2 > width+40) continue;
            draws.push({ i, rel, x: width/2+rel, y: height/2, cw: w, ch: m.cardH, alpha: 1 });
          }
        }
        draws.sort((a,b) => Math.abs(b.rel)-Math.abs(a.rel));
        let first = true;
        for (const d of draws) {
          const slot = slots[d.i];
          cardProgram.uniforms.tMap.value = slot.texture;
          cardProgram.uniforms.uRect.value = [d.x, d.y, d.cw+2, d.ch+2];
          cardProgram.uniforms.uSize.value = [d.cw, d.ch];
          cardProgram.uniforms.uImage.value = slot.image;
          cardProgram.uniforms.uAlpha.value = d.alpha;
          cardProgram.uniforms.uReady.value = slot.ready;
          cardProgram.uniforms.uShift.value = reducedMotion ? 0 : Math.max(-1, Math.min(1, d.rel/(width*0.75)));
          cardProgram.uniforms.uPlaceholder.value = slot.color;
          renderer.render({ scene: cardMesh, target, clear: first });
          first = false;
          instances.push({ index: d.i, x0: d.x-d.cw/2, x1: d.x+d.cw/2, y0: d.y-d.ch/2, y1: d.y+d.ch/2 });
        }
        if (first) { renderer.bindFramebuffer(target); gl.viewport(0,0,target.width,target.height); gl.clear(gl.COLOR_BUFFER_BIT); }
        renderer.bindFramebuffer(); target.texture.bind(); gl.generateMipmap(gl.TEXTURE_2D);
        lensUniforms.uResolution.value = [width, height]; lensUniforms.uDpr.value = dpr;
        lensUniforms.uCenter.value = [width/2, height/2];
        lensUniforms.uHalf.value = [Math.max(s.lensWidth*width/2, 1), Math.max(s.lensHeight*width/2, 1)];
        lensUniforms.uAngle.value = s.tilt*Math.PI/180;
        lensUniforms.uExponent.value = 2+Math.pow(1-clamp01(s.roundness), 1.5)*10;
        const inner = Math.max(4, s.reach*(s.lensWidth*width/2+s.lensHeight*width/2)*0.5);
        lensUniforms.uInner.value = inner; lensUniforms.uOuter.value = inner*1.6;
        lensUniforms.uFlow.value = s.bend*(s.lensWidth*width/2+s.lensHeight*width/2)*0.45;
        lensUniforms.uCurl.value = s.curl === 'rise' ? 1 : s.curl === 'fall' ? -1 : 0;
        lensUniforms.uDispersion.value = s.dispersion*0.12;
        lensUniforms.uStrength.value = introState.done ? 1 : 0;
        lensUniforms.uSceneAlpha.value = introState.done ? 1 : 0;
        renderer.render({ scene: lensMesh });
      }
      if (visible && (animating || pointer.down)) raf = requestAnimationFrame(frame);
    };
    const start = () => { if (raf || !visible || !alive) return; last = performance.now(); raf = requestAnimationFrame(frame); };
    const localPoint = e => { const r = container.getBoundingClientRect(); return [e.clientX-r.left, e.clientY-r.top]; };
    const onPointerDown = e => { if (e.button > 0) return; const [x,y] = localPoint(e); pointer.down = true; pointer.id = e.pointerId; pointer.startX = x; pointer.startY = y; pointer.x = x; pointer.y = y; pointer.startPos = pos; pointer.dragging = false; dirty = true; start(); };
    const onPointerMove = e => { const [x,y] = localPoint(e); pointer.x = x; pointer.y = y; pointer.over = true; if (pointer.down && e.pointerId === pointer.id) { const dx = x-pointer.startX; if (!pointer.dragging && Math.abs(dx) > 5) { pointer.dragging = true; pointer.startX = x; pointer.startPos = pos; container.setAttribute('data-dragging',''); } if (pointer.dragging) { pos = pointer.startPos-(x-pointer.startX); goal = pos; vel = 0; } } dirty = true; start(); };
    const onPointerUp = e => { if (!pointer.down || e.pointerId !== pointer.id) return; pointer.down = false; container.removeAttribute('data-dragging'); if (pointer.dragging) { pointer.dragging = false; goal = snapPoint(metrics(settingsRef.current), pos); start(); return; } const [x,y] = localPoint(e); const hit = instances.find(i => x>=i.x0 && x<=i.x1 && y>=i.y0 && y<=i.y1); if (hit) { goal = snapPoint(metrics(settingsRef.current), pos+(hit.x0+hit.x1)/2-width/2); callbacksRef.current.onSelect?.(hit.index, itemsRef.current[hit.index]); } };
    const onPointerLeave = () => { pointer.over = false; dirty = true; start(); };
    const onWheel = e => { if (!settingsRef.current || e.ctrlKey) return; let dx = e.deltaX; const dy = e.deltaY; if (Math.abs(dx) < Math.abs(dy)) dx = dy; if (!dx) return; e.preventDefault(); goal += dx*1.25; mode = 'wheel'; wheelAt = performance.now(); start(); };
    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointerleave', onPointerLeave);
    container.addEventListener('wheel', onWheel, { passive: false });
    const ro = new ResizeObserver(resize); ro.observe(container);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; start(); }); io.observe(container);
    engineRef.current = { wake: () => { dirty = true; start(); }, setItems };
    resize(); setItems(itemsRef.current);
    return () => { alive = false; visible = false; engineRef.current = null; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); slots.forEach(s => s.dispose()); gl.getExtension('WEBGL_lose_context')?.loseContext(); if (canvas.parentNode) canvas.parentNode.removeChild(canvas); };
  }, []);

  if (list.length < 3) return null;
  const current = list[active] || list[0];
  return (
    <div ref={containerRef} className={`flex-carousel ${className}`.trim()} style={{ ...style }} role="region" aria-roledescription="carousel" aria-label="作品画廊" tabIndex={0}>
      {captions && current && revealed && (
        <div className="flex-carousel__caption" aria-hidden="true">
          <span key={active} className="flex-carousel__title">{current.title || current.alt}</span>
          <span className="flex-carousel__count"><Digits value={active+1}/><span className="flex-carousel__slash">/</span><span>{String(list.length).padStart(2,'0')}</span></span>
        </div>
      )}
    </div>
  );
};
export default FlexCarousel;
