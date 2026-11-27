export default function GengarLoader() {
  return <div className="gengar-loader" role="status" aria-live="polite">
    <svg className="gengar-spinner" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".18" strokeWidth="2" />
      <path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
    <span>Chargement de la scène…</span>
  </div>;
}
