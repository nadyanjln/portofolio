import { onMounted, onUnmounted, nextTick } from 'vue'

export function useScrollReveal() {
  const initObserver = () => {
    // Ensure all elements are immediately visible
    nextTick(() => {
      document.querySelectorAll('.reveal-fade-up, .reveal-on-scroll').forEach(el => {
        el.classList.add('is-revealed')
      })
    })
  }

  onMounted(() => {
    initObserver()
  })

  return {
    initObserver
  }
}
