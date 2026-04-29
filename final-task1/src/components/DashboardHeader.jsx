import PropTypes from 'prop-types'

function DashboardHeader({ title, tagline, navigationItems }) {
  return (
    <header className="dashboard-header">
      <div>
        <h1>{title}</h1>
        <p>{tagline}</p>
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
