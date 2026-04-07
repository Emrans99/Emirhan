import { useEffect, useEffectEvent, type RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function usePortfolioMotion(
  scope: RefObject<HTMLElement | null>,
  dependencies: unknown[] = [],
) {
  const handlePointerMove = useEffectEvent((event: PointerEvent) => {
    const root = document.documentElement

    root.style.setProperty('--pointer-x', `${(event.clientX / window.innerWidth) * 100}%`)
    root.style.setProperty('--pointer-y', `${(event.clientY / window.innerHeight) * 100}%`)
  })

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    })

    let frame = 0

    const handleScroll = () => {
      ScrollTrigger.update()
    }

    const onFrame = (time: number) => {
      lenis.raf(time)
      frame = window.requestAnimationFrame(onFrame)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    lenis.on('scroll', handleScroll)
    frame = window.requestAnimationFrame(onFrame)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.cancelAnimationFrame(frame)
      lenis.off('scroll', handleScroll)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const currentScope = scope.current

    if (!currentScope) {
      return
    }

    const tiltCards = Array.from(currentScope.querySelectorAll<HTMLElement>('.tilt-card'))
    const magneticItems = Array.from(currentScope.querySelectorAll<HTMLElement>('.magnetic'))
    const cleanups: Array<() => void> = []

    tiltCards.forEach((card) => {
      const onMove = (event: PointerEvent) => {
        const bounds = card.getBoundingClientRect()
        const x = event.clientX - bounds.left
        const y = event.clientY - bounds.top
        const rotateY = ((x / bounds.width) - 0.5) * 12
        const rotateX = (0.5 - (y / bounds.height)) * 12

        card.style.setProperty('--rotate-x', `${rotateX.toFixed(2)}deg`)
        card.style.setProperty('--rotate-y', `${rotateY.toFixed(2)}deg`)
        card.style.setProperty('--glow-x', `${((x / bounds.width) * 100).toFixed(2)}%`)
        card.style.setProperty('--glow-y', `${((y / bounds.height) * 100).toFixed(2)}%`)
      }

      const onLeave = () => {
        card.style.setProperty('--rotate-x', '0deg')
        card.style.setProperty('--rotate-y', '0deg')
        card.style.setProperty('--glow-x', '50%')
        card.style.setProperty('--glow-y', '50%')
      }

      card.addEventListener('pointermove', onMove)
      card.addEventListener('pointerleave', onLeave)
      cleanups.push(() => {
        card.removeEventListener('pointermove', onMove)
        card.removeEventListener('pointerleave', onLeave)
      })
    })

    magneticItems.forEach((item) => {
      const onMove = (event: PointerEvent) => {
        const bounds = item.getBoundingClientRect()
        const x = event.clientX - bounds.left - bounds.width / 2
        const y = event.clientY - bounds.top - bounds.height / 2

        item.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`
      }

      const onLeave = () => {
        item.style.transform = 'translate(0px, 0px)'
      }

      item.addEventListener('pointermove', onMove)
      item.addEventListener('pointerleave', onLeave)
      cleanups.push(() => {
        item.removeEventListener('pointermove', onMove)
        item.removeEventListener('pointerleave', onLeave)
      })
    })

    return () => {
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [scope])

  useGSAP(
    () => {
      const revealItems = gsap.utils.toArray<HTMLElement>('.reveal')
      const counters = gsap.utils.toArray<HTMLElement>('[data-counter]')
      const media = gsap.matchMedia()

      gsap.set('.headline-word', { yPercent: 120, rotate: 4, opacity: 0 })
      gsap.to('.headline-word', {
        yPercent: 0,
        rotate: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 1.1,
        ease: 'expo.out',
      })

      gsap.from('.dock', {
        y: -24,
        opacity: 0,
        duration: 0.82,
        delay: 0.08,
        ease: 'power3.out',
      })

      gsap.from('.hero-fade, .progress-hud', {
        y: 36,
        opacity: 0,
        stagger: 0.08,
        delay: 0.35,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.to('.hero-rings', {
        rotate: 360,
        duration: 32,
        repeat: -1,
        ease: 'none',
      })

      gsap.to('.orbit-chip', {
        yPercent: -10,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 1.2,
          from: 'random',
        },
      })

      gsap.to('.beam', {
        opacity: 0.9,
        scaleX: 1.08,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        stagger: 0.8,
        ease: 'sine.inOut',
      })

      revealItems.forEach((item) => {
        gsap.from(item, {
          y: 52,
          opacity: 0,
          scale: 0.98,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 84%',
            once: true,
          },
        })
      })

      counters.forEach((counter) => {
        const target = Number(counter.dataset.counter ?? 0)
        const suffix = counter.dataset.suffix ?? ''
        const state = { current: 0 }

        ScrollTrigger.create({
          trigger: counter,
          start: 'top 86%',
          once: true,
          onEnter: () => {
            gsap.to(state, {
              current: target,
              duration: 1.8,
              ease: 'power3.out',
              onUpdate: () => {
                counter.textContent = `${Math.round(state.current)}${suffix}`
              },
            })
          },
        })
      })

      media.add('(min-width: 960px)', () => {
        const panorama = document.querySelector<HTMLElement>('.projects-panorama')
        const stage = document.querySelector<HTMLElement>('.projects-stage')
        const track = document.querySelector<HTMLElement>('.projects-track')

        if (!panorama || !stage || !track) {
          return
        }

        const getDistance = () => Math.max(0, track.scrollWidth - stage.clientWidth)

        gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: panorama,
            start: 'top top',
            end: () => `+=${getDistance() + window.innerHeight * 0.72}`,
            scrub: 1,
            pin: stage,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      })

      ScrollTrigger.refresh()

      return () => {
        media.revert()
      }
    },
    {
      scope,
      dependencies,
      revertOnUpdate: true,
    },
  )
}
