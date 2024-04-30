import { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, Landing, PostCard } from '../components'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {


    const user = useSelector(state => state.auth.status)
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])


    if (!user  && posts.length === 0) {
        return (
            <Landing
            input='Go to login'
            link='/login'
            />
        );
    }
    return (
        <div className='w-full py-8'>
            <Container>
                {
                    posts.length <= 4  && user ? <Landing
                    link='/all-posts'
                    input='read-blog'
                    /> :''
                }
                <div className='flex justify-center flex-wrap  py-4 gap-8 relative w-full  overflow-hidden '>
                    {posts.map((post) => (
                        <div key={post.$id} className='max-w-lg min-w-sm  flex justify-center'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home