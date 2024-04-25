
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { Navigate } from 'react-router-dom'



function LogoutBtn() {

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
    <button
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-red-400 dark:focus:ring-blue-800 duration-200"
      onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn