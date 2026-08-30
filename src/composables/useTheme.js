import { ref } from 'vue'

const isDark = ref(true)

export function useTheme() {
  const initTheme = () => {
    const savedTheme = localStorage.getItem('nadya-portfolio-theme')
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      // Default to Dark Mode as requested
      isDark.value = true
    }
    applyTheme()
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('nadya-portfolio-theme', isDark.value ? 'dark' : 'light')
    applyTheme()
  }

  const applyTheme = () => {
    const root = document.documentElement
    if (isDark.value) {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
    }
  }

  return {
    isDark,
    toggleTheme,
    initTheme
  }
}
