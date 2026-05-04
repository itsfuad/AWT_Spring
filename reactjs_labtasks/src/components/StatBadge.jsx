import PropTypes from 'prop-types'

function StatBadge({ label, value }) {
  return (
    <article className="stat-badge">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
    </article>
  )
}

StatBadge.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default StatBadge
