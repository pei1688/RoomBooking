"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MoveUp } from "lucide-react";

function ElevatorButton() {
  const [showElevator, setShowElevator] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 200) {
        setShowElevator(true);
      } else {
        setShowElevator(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    showElevator && (
      <Button className="fixed bottom-7 right-7 z-50 shadow-lg bg-boshe-300 hover:bg-boshe-200 transition-all duration-300"
      onClick={scrollToTop}
      >
       <MoveUp size={30}/>
      </Button>
    )
  );
}

export default ElevatorButton;
