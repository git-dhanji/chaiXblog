import { Link } from "react-router-dom";
import { Button, Container, useDynamicTitle } from "../components";

export default function NotFound() {
  useDynamicTitle();
  return (
    <div className="grid min-h-[70vh] place-items-center py-16">
      <Container className="text-center">
        <p className="font-display text-[6rem] font-bold leading-none text-accent sm:text-[9rem]">
          404
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-fg">
          This page has gone cold
        </h1>
        <p className="mx-auto mt-3 max-w-md text-fg-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back to something warm.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/">
            <Button size="lg">Back home</Button>
          </Link>
          <Link to="/all-posts">
            <Button size="lg" variant="outline">
              Browse articles
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
