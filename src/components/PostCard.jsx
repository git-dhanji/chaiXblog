import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ featuredImage, $id, title }) {
  return (
      <Link to={`/post/${$id}`}>
        <div className='w-full h-full dark:bg-gray-700 bg-gray-200 rounded-xl dark:text-white border border-yellow-300'>
          <div className='w-full justify-center mb-4'>
            <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
              className='rounded-xl' />
          </div>
          <h2
            className='text-xl font-bold'
          >{title}</h2>
        </div>

      </Link>
  )
}


export default PostCard