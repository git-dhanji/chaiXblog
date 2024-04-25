import  { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? userData.status : false;
   

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 w-4/5 relative mx-auto">
            <Container>
                <div className="flex justify-center flex-col mb-4 relative  rounded-xl p-2 mx-auto ">
                    <div className="min-w-fit max-w-full h-full min-h-min overflow-hidden mx-auto object-cover relative">
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
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold uppercase text-white">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
