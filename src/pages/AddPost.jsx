import { Container, useDynamicTitle, PostForm } from "../components";

function AddPost() {
  useDynamicTitle();
  return (
    <div className="py-12">
      <Container>
        <header className="mb-8">
          <span className="eyebrow">New story</span>
          <h1 className="mt-2 font-display text-4xl font-bold text-fg">
            Write a post
          </h1>
          <p className="mt-2 text-fg-muted">
            Share something worth reading with the world.
          </p>
        </header>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
