import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useDynamicTitle = () => {
  const { pathname } = useLocation(); // find current path like(/add-post , /user )
  /*  */

  useEffect(() => {
    if (pathname === "/") {
      // Set a special title for the homepage
      document.title =
        "ChaiXblog:- Unveiling Tech's Frontier with Insightful Perspectives 🔥";
    } else {
      // Set a general title for other pages
      const nexTitle = pathname.replace(/^\/+/, "").replace(/\//g, "-");
      document.title = `Welcome to ${nexTitle} ❤️`;
    }
  }, [pathname]);
};

export default useDynamicTitle;
