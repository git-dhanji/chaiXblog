import { useEffect } from 'react'
import { Container, Landing, PostCard, useDynamicTitle } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { asyncActions } from '../store/documentList';
import BlogLoading from '../components/BlogLoading';

function AllPosts() {
    const { data, fetched, buffering } = useSelector(state => state.document);
    const dispatch = useDispatch();
    useDynamicTitle();

    useEffect(() => {
        if (!fetched) {
            dispatch(asyncActions.fetchDocuments());
        }
    }, [dispatch, fetched, buffering]);

    return (
        !buffering ? (
            <div className='min-h-screen max-w-screen-xl mx-auto '>
                <Container>
                    <div className={`flex-wrap gap-8 relative w-full flex justify-center items-start  overflow-hidden py-12`}>
                        {data.map((post) => (
                            <div key={post.$id} className='flex justify-center relative rounded-lg overflow-hidden'>
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

export default AllPosts;
