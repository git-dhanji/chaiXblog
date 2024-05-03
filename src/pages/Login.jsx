import { Login as LoginComponent, useDynamicTitle } from '../components'
function Login() {
  useDynamicTitle()
  return (
    <LoginComponent />
  )
}

export default Login