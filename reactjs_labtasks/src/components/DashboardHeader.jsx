import { useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from '../contexts/ThemeContext'
import { StudentContext } from '../contexts/StudentContext'

function DashboardHeader({ title, tagline, navigationItems }) {
  const { isDark, toggleTheme } = useContext(ThemeContext)
  const { favorites } = useContext(StudentContext)

  return (
    <header className="dashboard-header">
      <div className="header-top">
        <div>
          <h1>{title}</h1>
          <p>{tagline}</p>
        </div>
        <div className="header-actions">
          <div className="favorites-indicator" aria-label={`${favorites.size} favorite students`}>
            <span className="favorites-badge">★ {favorites.size}</span>
          </div>
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light Mode' : 'Dark Mode'}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      <nav aria-label="Dashboard navigation">
        <ul className="nav-list">
          {navigationItems.map((item) => (
            <li key={item}>
              <button type="button" className="nav-button">
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  navigationItems: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default DashboardHeader
