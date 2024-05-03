import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header, useDynamicTitle, GlobalSpinner } from './components'
import { Outlet, useNavigation } from 'react-router-dom'

function App() {
  useDynamicTitle();
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigation = useNavigation();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))

    return () => { }
  }, [dispatch])

  if (navigation.state === "loading") {
    return <GlobalSpinner />;
  }


  return !loading ? (
    <div className='min-h-full bg-[#a0a0a0] dark:bg-[#27374D]'>
      <div className='w-full h-full'>
        <header><Header /></header>
        <main className='h-full pb-64'>
          <Outlet />
        </main>
        <footer><Footer /></footer>

      </div>
    </div>
  ) : null
}

export default App
