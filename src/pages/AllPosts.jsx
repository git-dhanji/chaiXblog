import { useState, useEffect } from 'react'
import { Container, Landing, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import BlogLoading from '../components/BlogLoading';

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        try {
            setLoading(true)
            appwriteService.getPosts([]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                    setLoading(false)
                }
            })
        } catch (error) {
            console.log(error)
        }


    }, [])

    return (
        !loading ? (
            <div className='min-h-screen max-w-screen-xl mx-auto '>
                <Container>
                    <div className={`flex-wrap gap-8 relative w-full flex justify-center items-start  overflow-hidden py-12`}>
                        {posts.map((post) => (
                            <div key={post.$id} className='flex justify-center'>
                                {
                                    post.length === 0 ? <Landing
                                        input='No posts found'
                                        link='/add-post'
                                    /> : <PostCard {...post} />
                                }

                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        ) : (
            <BlogLoading />
        )
    )
}

export default AllPosts