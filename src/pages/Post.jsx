import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container, Spinner, useDynamicTitle } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import GlobalSpinner from "../components/GlobalSpinner";

export default function Post() {
    useDynamicTitle();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);

    const [delLoading, setDelLoading] = useState(false)

    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? userData.status : false;


    useEffect(() => {
        if (slug) {
            setLoading(true)
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    setLoading(false)
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        setDelLoading(true)
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                setDelLoading(false)
                navigate("/");
            }
        });
    };


    if (loading) {
        return (
            <GlobalSpinner />
        )
    }


    return post ? (
        <div className="py-8 w-full md:w-4/5 relative mx-auto px-1 h-screen ">
            <Container>
                <div className="flex justify-center flex-col mb-4 relative  rounded-xl  mx-auto">
                    <div className="min-w-md max-w-full h-full min-h-min overflow-hidden mx-auto object-cover relative">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-sm w-full h-full"
                        />

                    </div>
                    <div className="w-full h-[1px] bg-red-50 my-8 "></div>

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-400" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-teal-500 border-red-400 border hover:bg-red-500 duration-200" onClick={deletePost}>
                                {delLoading === true ? <Spinner /> : "Delete"}
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl md:px-32 text-center font-bold uppercase text-white">{post.title}</h1>
                </div>
                <div className="browser-css  text-start dark:text-stone-300 stroke-neutral-900 text-xl md:px-32">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
