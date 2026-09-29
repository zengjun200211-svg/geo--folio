'use client';
import { useRef, useEffect, useState } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';
import './SideRays.css';

const hexToRgb = hex => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
};
const originToFlip = origin => {
  switch (origin) {
    case 'top-left': return [1, 0];
    case 'bottom-right': return [0, 1];
    case 'bottom-left': return [1, 1];
    default: return [0, 0];
  }
};

const SideRays = ({
  speed = 1.5,
  rayColor1 = '#EE211E',
  rayColor2 = '#FF6A64',
  intensity = 0.8,
  spread = 1.5,
  origin = 'top-right',
  tilt = 0,
  saturation = 1.2,
  blend = 0.6,
  falloff = 2.2,
  opacity = 0.5,
  className = ''
}) => {
  const containerRef = useRef(null);
  const uniformsRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);
  const meshRef = useRef(null);
  const cleanupFunctionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    observerRef.current = new IntersectionObserver(
      entries => setIsVisible(entries[0].isIntersecting),
      { threshold: 0.1 }
    );
    observerRef.current.observe(containerRef.current);
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;
    if (cleanupFunctionRef.current) { cleanupFunctionRef.current(); cleanupFunctionRef.current = null; }

    const initializeWebGL = async () => {
      if (!containerRef.current) return;
      await new Promise(r => setTimeout(r, 10));
      if (!containerRef.current) return;

      const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
      rendererRef.current = renderer;
      const gl = renderer.gl;
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';
      while (containerRef.current.firstChild) containerRef.current.removeChild(containerRef.current.firstChild);
      containerRef.current.appendChild(gl.canvas);

      const vert = `attribute vec2 position; void main() { gl_Position = vec4(position, 0.0, 1.0); }`;
      const frag = `precision highp float;
uniform float iTime; uniform vec2 iResolution; uniform float iSpeed;
uniform vec3 iRayColor1; uniform vec3 iRayColor2;
uniform float iIntensity; uniform float iSpread;
uniform float iFlipX; uniform float iFlipY; uniform float iTilt;
uniform float iSaturation; uniform float iBlend; uniform float iFalloff; uniform float iOpacity;
float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 s2c = coord - raySource;
  float cosA = dot(normalize(s2c), rayRefDirection);
  return clamp((0.45 + 0.15 * sin(cosA * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-cosA * seedB + iTime * speed)), 0.0, 1.0) *
    clamp((iResolution.x - length(s2c)) / iResolution.x, 0.5, 1.0);
}
void main() {
  vec2 fc = gl_FragCoord.xy;
  if (iFlipX > 0.5) fc.x = iResolution.x - fc.x;
  if (iFlipY > 0.5) fc.y = iResolution.y - fc.y;
  vec2 coord = vec2(fc.x, iResolution.y - fc.y);
  vec2 rayPos = vec2(iResolution.x * 1.1, -0.5 * iResolution.y);
  float tiltRad = iTilt * 3.14159265 / 180.0;
  float cs = cos(tiltRad), sn = sin(tiltRad);
  vec2 rel = coord - rayPos;
  vec2 tc = vec2(rel.x * cs - rel.y * sn, rel.x * sn + rel.y * cs) + rayPos;
  float hs = iSpread * 0.275;
  vec2 ref1 = normalize(vec2(cos(0.785398 + hs), sin(0.785398 + hs)));
  vec2 ref2 = normalize(vec2(cos(0.785398 - hs), sin(0.785398 - hs)));
  vec4 r1 = vec4(iRayColor1, 1.0) * rayStrength(rayPos, ref1, tc, 36.2214, 21.11349, iSpeed);
  vec4 r2 = vec4(iRayColor2, 1.0) * rayStrength(rayPos, ref2, tc, 22.3991, 18.0234, iSpeed * 0.2);
  vec4 color = r1 * (1.0 - iBlend) * 0.9 + r2 * iBlend * 0.9;
  float dist = length(fc.xy - vec2(rayPos.x, iResolution.y - rayPos.y)) / iResolution.y;
  float bright = iIntensity * 0.4 / pow(max(dist, 0.001), iFalloff);
  color.rgb *= bright;
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  color.rgb = mix(vec3(gray), color.rgb, iSaturation);
  color.a = max(color.r, max(color.g, color.b)) * iOpacity;
  gl_FragColor = color;
}`;

      const [flipX, flipY] = originToFlip(origin);
      const uniforms = {
        iTime: { value: 0 }, iResolution: { value: [1, 1] }, iSpeed: { value: speed },
        iRayColor1: { value: hexToRgb(rayColor1) }, iRayColor2: { value: hexToRgb(rayColor2) },
        iIntensity: { value: intensity }, iSpread: { value: spread },
        iFlipX: { value: flipX }, iFlipY: { value: flipY }, iTilt: { value: tilt },
        iSaturation: { value: saturation }, iBlend: { value: blend },
        iFalloff: { value: falloff }, iOpacity: { value: opacity }
      };
      uniformsRef.current = uniforms;
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program: new Program(gl, { vertex: vert, fragment: frag, uniforms }) });
      meshRef.current = mesh;

      const updateSize = () => {
        if (!containerRef.current || !renderer) return;
        renderer.dpr = Math.min(window.devicePixelRatio, 2);
        const { clientWidth: w, clientHeight: h } = containerRef.current;
        renderer.setSize(w, h);
        uniforms.iResolution.value = [w * renderer.dpr, h * renderer.dpr];
      };
      const loop = t => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) return;
        uniforms.iTime.value = t * 0.001;
        try { renderer.render({ scene: mesh }); animationIdRef.current = requestAnimationFrame(loop); } catch {}
      };
      window.addEventListener('resize', updateSize);
      updateSize();
      animationIdRef.current = requestAnimationFrame(loop);

      cleanupFunctionRef.current = () => {
        if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
        window.removeEventListener('resize', updateSize);
        try { renderer.gl.getExtension('WEBGL_lose_context')?.loseContext(); } catch {}
        rendererRef.current = uniformsRef.current = meshRef.current = null;
      };
    };
    initializeWebGL();
    return () => cleanupFunctionRef.current?.();
  }, [isVisible, speed, rayColor1, rayColor2, intensity, spread, origin, tilt, saturation, blend, falloff, opacity]);

  return <div ref={containerRef} className={`side-rays-container ${className}`.trim()} />;
};

export default SideRays;
