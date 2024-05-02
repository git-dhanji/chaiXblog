
import { Link } from 'react-router-dom'

function Footer() {
   

    return (
        <footer className='w-full bg-[#cdc7c7]  shadow dark:bg-[#111827] '>
            <section className=" rounded-lg shadow ">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link to="/" className="hover:underline">chaiXblog</Link>. All Rights Reserved.
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <Link to="#" className="hover:underline me-4 md:me-6">About</Link>
                        </li>
                        <li>
                            <Link to="/privacy-policy" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:underline me-4 md:me-6">Licensing</Link>
                        </li>
                        <li>
                            <Link to="#" className="hover:underline">Portfolio</Link>
                        </li>
                    </ul>
                </div>
            </section>
        </footer>
    )
}

export default Footer