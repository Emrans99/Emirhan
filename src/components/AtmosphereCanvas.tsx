import { useEffect, useEffectEvent, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const PARTICLE_COUNT = 72
const LINK_DISTANCE = 128

export function AtmosphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const pointerRef = useRef({ x: 0, y: 0 })

  const handlePointerMove = useEffectEvent((event: PointerEvent) => {
    pointerRef.current = { x: event.clientX, y: event.clientY }
  })

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')

    if (!context) {
      return
    }

    let animationFrame = 0
    let width = 0
    let height = 0

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00045,
      vy: (Math.random() - 0.5) * 0.00045,
      radius: Math.random() * 1.4 + 0.8,
    }))

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      context.fillStyle = 'rgba(7, 15, 28, 0.08)'
      context.fillRect(0, 0, width, height)

      const pointer = pointerRef.current

      for (const particle of particles) {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x <= 0 || particle.x >= 1) {
          particle.vx *= -1
        }

        if (particle.y <= 0 || particle.y >= 1) {
          particle.vy *= -1
        }
      }

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index]
        const px = particle.x * width
        const py = particle.y * height
        const pointerDistance = Math.hypot(pointer.x - px, pointer.y - py)
        const pointerStrength = Math.max(0, 1 - pointerDistance / 240)

        context.beginPath()
        context.fillStyle = `rgba(146, 220, 255, ${0.2 + pointerStrength * 0.3})`
        context.arc(px, py, particle.radius + pointerStrength * 1.6, 0, Math.PI * 2)
        context.fill()

        for (let inner = index + 1; inner < particles.length; inner += 1) {
          const other = particles[inner]
          const ox = other.x * width
          const oy = other.y * height
          const distance = Math.hypot(px - ox, py - oy)

          if (distance < LINK_DISTANCE) {
            const opacity = 0.12 * (1 - distance / LINK_DISTANCE)
            context.strokeStyle = `rgba(129, 193, 255, ${opacity})`
            context.lineWidth = 1
            context.beginPath()
            context.moveTo(px, py)
            context.lineTo(ox, oy)
            context.stroke()
          }
        }
      }

      animationFrame = window.requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="atmosphere-canvas" aria-hidden="true" />
}
