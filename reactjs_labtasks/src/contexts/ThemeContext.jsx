import { createContext, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme-preference')
    if (savedTheme) {
      return savedTheme === 'dark'
    }
    // Default to light theme
    return false
  })

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const newTheme = !prev
      localStorage.setItem('theme-preference', newTheme ? 'dark' : 'light')
      return newTheme
    })
  }, [])

  const value = {
    isDark,
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
