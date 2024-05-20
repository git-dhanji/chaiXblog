import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header, useDynamicTitle, GlobalSpinner } from "./components";
import { Outlet, useNavigation } from "react-router-dom";

// Locomotive custom Hook
import useLocomotiveScroll from "./hooks/useLocomotiveScroll";

function App() {
  useDynamicTitle();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const scrollRef = useLocomotiveScroll();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));

    return () => {};
  }, [dispatch]);

  if (navigation.state === "loading") {
    return <GlobalSpinner />;
  }

  return !loading ? (
    <div className="min-h-full bg-[#a0a0a0] dark:bg-[#27374D]">
      <div className="w-full h-full">
        <header>
          <Header />
        </header>
        
          <div data-scroll-container ref={scrollRef}>
            <div data-scroll-section>
              <Outlet />
            </div>
          </div>


      {/* TODO: Fix Footer Section  */}
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  ) : null;
}

export default App;
