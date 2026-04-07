import { useEffect, useEffectEvent, useState } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  const updateProgress = useEffectEvent(() => {
    const total = document.documentElement.scrollHeight - window.innerHeight

    if (total <= 0) {
      setProgress(0)
      return
    }

    setProgress(Math.min(100, Math.max(0, Math.round((window.scrollY / total) * 100))))
  })

  useEffect(() => {
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return progress
}
