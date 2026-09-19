/** 红色取景框四角（选中 / hover 态），用法：<ViewFrame className="auto" /> */
export default function ViewFrame({ on = false, className = '' }) {
  return (
    <span className={`viewfinder ${on ? 'is-on' : ''} ${className}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  )
}
