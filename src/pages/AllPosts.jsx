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
        <div className='min-h-screen max-w-7xl mx-auto '>
            <Container>
                <div className={`flex-wrap gap-8 relative w-full flex justify-center items-start  overflow-hidden py-12`}>
                    {posts.map((post) => (
                        <div key={post.$id} className='flex justify-center'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts