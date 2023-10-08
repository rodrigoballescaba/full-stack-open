import PropTypes from 'prop-types'

const Notification = ({ message, notificationStyle }) => {
  if (message === null) {
    return null
  }

  return (
    <div id="notification" style={notificationStyle}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  notificationStyle: PropTypes.object.isRequired
}

export default Notification