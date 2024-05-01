
import Spinner from './Spinner'

export default function GlobalSpinner() {
    return (
        <div className='w-full h-full dark:bg-[#111827] bg-slate-400'>
            <div className='w-full h-screen flex items-center justify-center'>
                <Spinner />
            </div>
        </div>
    )
}
