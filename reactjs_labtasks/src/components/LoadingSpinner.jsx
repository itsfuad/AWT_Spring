import PropTypes from 'prop-types'

function LoadingSpinner({ message = 'Loading dashboard...' }) {
  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>{message}</p>
      </div>
    </div>
  )
}

LoadingSpinner.propTypes = {
  message: PropTypes.string,
}

export default LoadingSpinner
