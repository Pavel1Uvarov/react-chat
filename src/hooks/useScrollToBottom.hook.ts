import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollToBottom = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    const section = sectionRef.current;

    const handleScroll = () => {
      if (section) {
        const isNotAtBottom =
          section.scrollHeight - section.scrollTop - section.clientHeight > 50;
        setShowButton(isNotAtBottom);
      }
    };

    if (section) section.addEventListener("scroll", handleScroll);

    return () => {
      if (section) section.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToBottom = useCallback((smooth = false) => {
    if (sectionRef.current) {
      setShowButton(false);
      sectionRef.current.scrollTo({
        top: sectionRef.current.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  }, []);

  return {
    sectionRef,
    showButton,
    scrollToBottom,
  };
};
