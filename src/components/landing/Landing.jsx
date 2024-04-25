import { Link } from "react-router-dom";


export default function Landing({input='Explore blog',link='/login'}) {
    return (
        <div className="bg-[#DDE6ED] dark:bg-[#27374D] min-h-screen flex flex-col justify-center items-center">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold dark:text-[#d8d5d5] mb-6 text-stone-900">
                    Welcome to chaiXblog
                </h1>
                <p className="text-lg md:text-xl dark:text-[#bcbcbc] text-stone-700 mb-8">
                    Explore the latest articles, insights, and stories from our talented writers.
                </p>
                <Link to={link}
                    className="bg-[#526D82] hover:bg-[#243e63] text-[#c1d9eb] font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out border"
                >
                    {input}
                </Link>
            </div>
        </div>
    )
}
