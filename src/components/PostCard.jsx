
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ featuredImage, $id, title, Author }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='md:max-w-[350px] md:min-w-[350px] md:min-h-[260px] max-h-[260px] dark:border-stone-300 border-stone-900 relative flex justify-between flex-col'>
        <div className="bg-emerald-600 dark:bg-cyan-950 text-zinc-100  dark:text-gray-50 absolute z-10 rounded-br-xl p-1">{Author ? Author : 'No author'}</div>
        <div className='w-full  md:h-[200px] relative '>
          <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
            className=' h-full w-full' />
        </div>
        <h2
          className='text-lg  py-4 w-full dark:text-stone-200 text-start  pl-1 dark:bg-[#111827] bg-emerald-100 text-pink-950 border-t-[1px] whitespace-nowrap overflow-ellipsis'
        >{title}</h2>
      </div>

    </Link>
  )
}


export default PostCard