import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { Landing, useDynamicTitle } from "../components";
import { SAMPLE_POSTS } from "../data/samplePosts";

function Home() {
  useDynamicTitle();
  const authStatus = useSelector((state) => state.auth.status);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let active = true;
    appwriteService.getPosts().then((res) => {
      if (!active) return;
      const docs =
        res && Array.isArray(res.documents) ? res.documents : [];
      // Show built-in demo articles when the backend has none yet
      setPosts(docs.length ? docs : SAMPLE_POSTS);
    });
    return () => {
      active = false;
    };
  }, []);

  return <Landing posts={posts} authStatus={authStatus} />;
}
  
export default Home;
