import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet, useNavigation } from 'react-router-dom'
import GlobalSpinner from './components/GlobalSpinner'

function App() {
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
  }, [dispatch])

  if (navigation.state === "loading") {
    return <GlobalSpinner />;
  }


  console.log(navigation.state)

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-[#DDE6ED] dark:bg-[#27374D]'>
      <div className='w-full block'>
        <Header />
        <main >
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
