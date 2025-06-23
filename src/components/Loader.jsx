import React, { useState, useEffect } from "react";
import App from "../App";

const Loader = () => {
  const [count, setCount] = useState(1);
  const [loadingDone, setLoadingDone] = useState(false);
  const [started, setStarted] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [zooming, setZooming] = useState(false);

  useEffect(() => {
    if (count < 20) {
      const interval = setInterval(() => setCount((prev) => prev + 1), 60);
      return () => clearInterval(interval);
    } else if (count < 98) {
      const interval = setInterval(() => setCount((prev) => prev + 1), 30);
      return () => clearInterval(interval);
    } else if (count < 100) {
      const interval = setInterval(() => setCount((prev) => prev + 1), 600);
      return () => clearInterval(interval);
    } else {
      const timeout = setTimeout(() => setLoadingDone(true), 300);
      return () => clearTimeout(timeout);
    }
  }, [count]);

  if (started) return <App />;

  return (
    <div className="flex items-center justify-center h-screen bg-black overflow-hidden">
      {!loadingDone ? (
        <div className="text-center">
          <div className="text-[10rem] scale-y-190 font-extralight tracking-tighter text-white">
            {count}
          </div>
        </div>
      ) : (
        <div
          className="text-center relative"
          onMouseEnter={() => setShowButton(true)}
          onMouseLeave={() => setShowButton(false)}
        >
          <div
            className={`text-white text-[8rem] md:text-[10rem] tracking-tighter font-thin mb-6 cursor-pointer transition-transform duration-500
    ${showButton ? "scale-y-180 scale-x-80" : "scale-y-90 scale-x-50"}
  `}
            style={{ perspective: "1000px" }}
          >
            <span className="letter letter-h">H</span>
            <span className="letter letter-e">E</span>
            <span className="letter letter-l">L</span>
            <span className="letter letter-l2">L</span>
            <span className="letter letter-o">O</span>
          </div>

          {showButton && (
            <button
              onClick={() => {
                setZooming(true);
                setTimeout(() => setStarted(true), 700); // wait for zoom animation to finish
              }}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 backdrop-blur-md h-28 w-28 rounded-full bg-zinc-800 hover:bg-zinc-900 text-white cursor-pointer transition-all duration-700 ease-in-out ${
                zooming
                  ? "w-screen h-screen rounded-none scale-150"
                  : "w-28 h-28 rounded-full"
              }
            `}
            >
              {!zooming && "Start"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Loader;
