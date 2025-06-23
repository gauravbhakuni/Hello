import React from "react";
import Loader from "./components/Loader";
import Hero from "./components/Hero";
import Demo from "./components/Demo";

const App = () => {
  return (
    <>
      <div className="hidden md:block">
        <Hero />
        <Demo />
      </div>

      <div className="md:hidden h-screen flex items-center justify-center bg-black text-white text-center px-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            📱 Oh no... not the tiny screen!
          </h1>
          <p className="text-xl">This site is allergic to mobile phones. 😵</p>
          <p className="mt-4">
            Try again on a **real** device — like a majestic laptop or desktop.
            🖥️🚀
          </p>
          <p className="mt-8 animate-bounce text-pink-400 text-2xl">
            We're not mad... just disappointed. 😢
          </p>
        </div>
      </div>
    </>
  );
};

export default App;
