import React, { useEffect, useState } from "react";
import "../App.css";

const GoTop = () => {
  const [showGoTop, setShowGoTop] = useState(false);

  const handleVisibleButton = () => {
    setShowGoTop(window.scrollY > 50);
  };

  const handleScrollUp = () => {
    console.log("scrolling up");
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
  }, []);

  return (
    <div className={showGoTop ? "" : "goTopHidden"} onClick={handleScrollUp}>
      <button type={"button"} className="goTop">
        Top
      </button>
    </div>
  );
};
export default GoTop;
