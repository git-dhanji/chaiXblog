import { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Landing, useDynamicTitle } from '../components'
import { useSelector } from 'react-redux';

function Home() {
    useDynamicTitle()
    const [loding, setLoading] = useState(false)
    const user = useSelector(state => state.auth.status)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        setLoading(true)
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                setLoading(false)
            }
        })
    }, [])


    if (!user) {
        return (
            <Landing
                input='create account'
                link='/signup'
            />
        );
    }


    if (loding) {
        return (
            <Landing
                input='loading...'
                link='#'
            />
        )
    }

    return (
        user === true ? (
            !loding && (
                <Landing
                    input={posts.length === 0 ? "add-posts" : "read-post"}
                    link={posts.length === 0 ? "/add-post" : "/all-posts"}
                />)
        ) : (
            <Landing
                input='create account'
                link='/signup'
            />
        )
    )
}

export default Home