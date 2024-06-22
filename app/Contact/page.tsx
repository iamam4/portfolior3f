'use client'

import { useEffect, useRef } from 'react'
import { createRoot, Root } from 'react-dom/client'
import App from '../components/App'

export default function Home() {
  const rootRef = useRef<Root | null>(null)

  useEffect(() => {
    const rootElement = document.getElementById('three-root')
    if (rootElement && !rootRef.current) {
      rootRef.current = createRoot(rootElement)
      rootRef.current.render(<App />)
    } else if (rootRef.current) {
      rootRef.current.render(<App />)
    }
  }, [])

  return (
    <div className="flex w-full h-screen bg-gray-950">
      <div id="three-root" className="flex w-full h-full justify-center items-center " />
      <div className="flex flex-col w-full h-full items-center justify-center text-white">
        <h1 className="">Contact,</h1><br></br>
        <p>WEWEWE</p>
      </div>
    </div>
  )
}
