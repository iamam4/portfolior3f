import type { SVGProps } from 'react';

export function Arrow({ down = false, ...props }: SVGProps<SVGSVGElement> & { down?: boolean }) {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{down ? <path d="M12 4v16m-6-6 6 6 6-6" /> : <path d="M5 19 19 5M5 5h14v14" />}</svg>;
}

export function MotionIcon({ paused }: { paused: boolean }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{paused ? <path d="m8 5 11 7-11 7Z" /> : <><path d="M8 5v14M16 5v14" /></>}</svg>;
}
