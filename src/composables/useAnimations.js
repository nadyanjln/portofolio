import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable for scroll-triggered reveal animations using IntersectionObserver.
 * Inspired by benjamincreative.me and spragadheeshraj.com animation patterns.
 *
 * Usage:
 *   const { observe } = useScrollReveal()
 *   onMounted(() => observe(elementRef.value))
 *
 * Or use the directive approach via v-scroll-reveal on elements.
 */
export function useScrollReveal(options = {}) {
  const {
    threshold = 0.08,
    rootMargin = '0px 0px -40px 0px',
    once = true
  } = options

  const observers = []

  const observe = (el) => {
    if (!el) return

    // Immediately reveal if already inside the initial viewport on page load
    if (typeof window !== 'undefined') {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight - 60 && rect.bottom > 0) {
        el.classList.add('revealed')
        if (once) return
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('revealed')
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    observers.push(observer)
  }

  const observeAll = (container) => {
    if (!container) return
    const els = container.querySelectorAll('[data-reveal]')
    els.forEach((el) => observe(el))
  }

  onUnmounted(() => {
    observers.forEach((obs) => obs.disconnect())
  })

  return { observe, observeAll }
}

/**
 * Composable for animating numbers counting up when they scroll into view.
 * Inspired by abhaysingh.in metric counter animations.
 */
export function useCountUp(targetValue, options = {}) {
  const { duration = 2000, startValue = 0 } = options
  const currentValue = ref(startValue)
  const hasAnimated = ref(false)

  const animate = () => {
    if (hasAnimated.value) return
    hasAnimated.value = true

    const startTime = performance.now()
    const numericTarget = parseFloat(String(targetValue).replace(/[^0-9.]/g, '')) || 0

    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      currentValue.value = Math.round(eased * numericTarget)

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        currentValue.value = numericTarget
      }
    }

    requestAnimationFrame(step)
  }

  return { currentValue, animate }
}

/**
 * Composable for smooth parallax scrolling effects.
 * Inspired by spragadheeshraj.com parallax hero.
 */
export function useParallax(speed = 0.3) {
  const offset = ref(0)

  const handleScroll = () => {
    offset.value = window.scrollY * speed
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { offset }
}

/**
 * Composable for magnetic hover effect on elements.
 * Inspired by benjamincreative.me magnetic buttons.
 */
export function useMagneticHover(elementRef, strength = 0.3) {
  const x = ref(0)
  const y = ref(0)

  const handleMouseMove = (e) => {
    if (!elementRef.value) return
    const rect = elementRef.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.value = (e.clientX - centerX) * strength
    y.value = (e.clientY - centerY) * strength
  }

  const handleMouseLeave = () => {
    x.value = 0
    y.value = 0
  }

  onMounted(() => {
    if (elementRef.value) {
      elementRef.value.addEventListener('mousemove', handleMouseMove, { passive: true })
      elementRef.value.addEventListener('mouseleave', handleMouseLeave)
    }
  })

  onUnmounted(() => {
    if (elementRef.value) {
      elementRef.value.removeEventListener('mousemove', handleMouseMove)
      elementRef.value.removeEventListener('mouseleave', handleMouseLeave)
    }
  })

  return { x, y }
}
