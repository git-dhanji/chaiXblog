import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, PostForm, GlobalSpinner, useDynamicTitle } from "../components";
import appwriteService from "../appwrite/config";

function EditPost() {
  useDynamicTitle();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((p) => {
        if (p) setPost(p);
        else navigate("/");
        setLoading(false);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  if (loading) return <GlobalSpinner />;
  if (!post) return null;

  return (
    <div className="py-12">
      <Container>
        <header className="mb-8">
          <span className="eyebrow">Editing</span>
          <h1 className="mt-2 font-display text-4xl font-bold text-fg">
            Edit post
          </h1>
        </header>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;
