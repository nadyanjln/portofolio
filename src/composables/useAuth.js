import { ref, computed } from 'vue'

const AUTH_STORAGE_KEY = 'nadya_admin_auth_session'

// Hardcoded Admin Credentials as requested
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'cosmic_root'
}

// Reactive auth state
const authState = ref({
  isAuthenticated: false,
  user: null,
  token: null,
  loginTime: null
})

// Initialize from localStorage
const initAuth = () => {
  try {
    const session = localStorage.getItem(AUTH_STORAGE_KEY)
    if (session) {
      const parsed = JSON.parse(session)
      // Check if session is valid (e.g. 7 days)
      const now = new Date().getTime()
      const sessionAge = now - (parsed.loginTime || 0)
      const MAX_AGE = 7 * 24 * 60 * 60 * 1000 // 7 days
      
      if (sessionAge < MAX_AGE && parsed.isAuthenticated) {
        authState.value = parsed
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }
  } catch (e) {
    console.error('Error reading auth session:', e)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }
}

// Run init immediately
initAuth()

export function useAuth() {
  const isAuthenticated = computed(() => authState.value.isAuthenticated)
  const currentUser = computed(() => authState.value.user)

  const login = async (username, password) => {
    // Simulate network delay for authentic feel
    await new Promise((resolve) => setTimeout(resolve, 400))

    if (username.trim() === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const sessionData = {
        isAuthenticated: true,
        user: {
          username: ADMIN_CREDENTIALS.username,
          role: 'Administrator',
          name: 'Nadya Najelina Salsabillah'
        },
        token: 'token_' + Math.random().toString(36).substring(2) + Date.now(),
        loginTime: new Date().getTime()
      }

      authState.value = sessionData
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData))
      } catch (e) {
        console.error('Failed to save auth session:', e)
      }

      return { success: true }
    } else {
      return { 
        success: false, 
        message: 'Username atau password yang Anda masukkan salah. Silakan coba lagi.' 
      }
    }
  }

  const logout = () => {
    authState.value = {
      isAuthenticated: false,
      user: null,
      token: null,
      loginTime: null
    }
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    } catch (e) {
      console.error('Failed to remove auth session:', e)
    }
  }

  return {
    isAuthenticated,
    currentUser,
    login,
    logout
  }
}
