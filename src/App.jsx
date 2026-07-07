import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import {
  Footer,
  Header,
  useDynamicTitle,
  GlobalSpinner,
  ScrollToTop,
} from "./components";
import { Outlet, useNavigation, useLocation } from "react-router-dom";

function App() {
  useDynamicTitle();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { pathname } = useLocation();

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
  }, [dispatch]);

  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  if (loading) return <GlobalSpinner />;

  return (
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      <Header />
      <main className="flex-1 pt-16">
        {navigation.state === "loading" ? <GlobalSpinner /> : <Outlet />}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
