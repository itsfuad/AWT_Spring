import PropTypes from 'prop-types'
import { useEffect } from 'react'

function Notification({ message, type = 'success', onDismiss, autoClose = true }) {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onDismiss, 3000)
      return () => clearTimeout(timer)
    }
  }, [autoClose, onDismiss])

  return (
    <div className={`notification notification-${type}`} role="alert">
      <div className="notification-content">
        <span className="notification-icon">
          {type === 'success' ? '✓' : '!'}
        </span>
        <p className="notification-message">{message}</p>
      </div>
      <button
        type="button"
        className="notification-close"
        onClick={onDismiss}
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']),
  onDismiss: PropTypes.func.isRequired,
  autoClose: PropTypes.bool,
}

export default Notification
