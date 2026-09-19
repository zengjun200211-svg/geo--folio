import { SITE } from '../data/content.js'

export default function Footer() {
  return (
    <footer id="site-footer" className="border-t border-line bg-darkzone2">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-10 md:pr-24 md:flex-row md:items-center md:justify-between lg:px-10 lg:pr-24">
        <p className="font-heading text-sm font-bold uppercase tracking-[0.08em] text-text">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-brand align-middle" />
          {SITE.stanceEn}
        </p>
        <p className="mono order-last text-[11px] tracking-[0.22em] text-mute md:order-none">
          KEEP TESTING <span className="text-brand">/</span> KEEP PUBLISHING
        </p>
        <p className="mono text-[11px] tracking-[0.14em] text-sub">
          © {SITE.year} {SITE.authorEn.toUpperCase()} · CONTENT × GEO
        </p>
      </div>
    </footer>
  )
}
