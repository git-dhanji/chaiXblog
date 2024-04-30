
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { Navigate } from 'react-router-dom'
import { Button } from '../index'



function LogoutBtn({
  bgColor = 'bg-blue-400',
  className = '',
  ...props
}) {

  const dispatch = useDispatch()

  const logoutHandler = () => {
    const permission = confirm('Are you sure you want to logout :-)')

    if (permission === true) {
      authService.logout().then(() => {
        dispatch(logout())
        Navigate('/')
      })
    }
  }
  return (
    <Button
      className={`w-full ${className} ${bgColor} hover:bg-red-800 hover:text-white hover:rounded-none transition-all duration-200 `}
      {...props}
      onClick={logoutHandler}
    >Logout</Button>
  )
}

export default LogoutBtn