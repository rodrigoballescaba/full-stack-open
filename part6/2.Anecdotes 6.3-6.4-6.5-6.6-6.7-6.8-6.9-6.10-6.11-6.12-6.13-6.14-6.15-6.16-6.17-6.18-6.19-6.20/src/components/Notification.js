import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const styleShow = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const styleUnShow = {
    display: 'none'
  }

  return (
    <div style={notification === '' ? styleUnShow : styleShow}>
      {notification}
    </div>
  )
}

export default Notification