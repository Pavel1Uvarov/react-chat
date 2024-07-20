import { useEffect, useRef, useState } from "react";

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

    if (section) {
      sectionRef.current.scrollTo({
        top: sectionRef.current.scrollHeight,
      });
      section.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (section) {
        section.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToBottom = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollTo({
        top: sectionRef.current.scrollHeight,
      });
    }
  };

  return {
    sectionRef,
    showButton,
    scrollToBottom,
  };
};
