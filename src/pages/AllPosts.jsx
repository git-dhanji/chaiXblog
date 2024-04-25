import { useState, useEffect } from 'react'
import { Container, Landing, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])


    if (posts.length === 0) {
        return (
            <Landing
            input='No posts found'
            link='/add-post'
             />
        )
    }
    return (
        <Container>
            <div className='flex justify-center flex-wrap pt-16 pb-4 gap-8 relative w-full  overflow-hidden '>
                {posts.map((post) => (
                    <div key={post.$id} className='max-w-lg min-w-sm  flex justify-center'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default AllPosts