import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import Button from '../Button'
import closepng from '../../assets/close.png'
import Logo from '../Logo'

function Header() {
  const [navOpen, setNavOpen] = useState(false)
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]


  return (
    <>
      <nav className="bg-gray-300 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center  rtl:space-x-reverse">
            <Logo
              width="45px" height="45px"
            />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

            {
              authStatus ? <LogoutBtn /> : (
                <>
                  <Button
                    type='button'
                  >
                    <Link to={'/login'}>
                      login
                    </Link>
                  </Button>
                </>
              )
            }

            {/* Humberger menu btn  */}
            <button
              onClick={() => { setNavOpen(!navOpen) }}
              data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden z-40" aria-controls="navbar-sticky">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>



          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border  rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
              {navItems.map((item) =>
                item.active ? (
                  <NavLink
                    key={item.name}
                    to={item.slug}
                    className={({ isActive }) => ` py-1 px-2 ${isActive ? "text-blue-500 rounded-sm bg-gray-600 duration-300" : " hover:text-gray-400 hover:duration-150 dark:text-stone-100"}`}
                  >
                    <button
                      onClick={() => navigate(item.slug)}
                      className='px-4'
                    >{item.name}</button>
                  </NavLink>
                ) : null
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="p-8 bg-black "></div>





      {/* Humberger menu start here  */}
      {
        navOpen && (
          <div className="h-full w-full md:hidden right-0 top-0 dark:bg-slate-800 opacity-100 fixed z-30 flex justify-center bg-slate-300">
            <div className=" absolute top-0 right-0 w-7 h-7 m-6  cursor-pointer"
              onClick={() => { setNavOpen(!navOpen) }}
            >
              <img src={closepng} alt="humbergercut" className='w-full h-full' />
            </div>
            <ul className=" flex flex-col mt-10 text-center font-serif">
              {navItems.map((item) =>
                item.active ? (
                  <NavLink
                    key={item.name}
                    to={item.slug}
                    className={({ isActive }) => `text-5xl font-semibold  py-8 px-2 ${isActive ? "text-blue-500 rounded-sm  duration-300" : " hover:text-gray-400 hover:duration-150 dark:text-stone-100"}`}
                  >
                    <button
                      onClick={() => {
                        navigate(item.slug)
                        setNavOpen(!navOpen)
                      }}
                      className='px-4'
                    >{item.name}</button>
                  </NavLink>
                ) : null
              )}

            </ul>

            <div className="absolute bottom-0 mb-8 w-full px-8">
              {
                authStatus ?
                  <LogoutBtn
                    className='dark:bg-blue-900 bg-blue-600  text-white opacity-100'
                  /> : (
                    <>
                      <Button
                        type='button'
                      >
                        <Link to={'/login'}>
                          login
                        </Link>
                      </Button>
                    </>
                  )
              }
            </div>
          </div>
        )
      }

    </>
  )
}




export default Header;