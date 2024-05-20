import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/src/locomotive-scroll.scss"; // Import Locomotive Scroll styles

const useLocomotiveScroll = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      // Add any additional options here
    });

    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  return scrollRef;
};

export default useLocomotiveScroll;
