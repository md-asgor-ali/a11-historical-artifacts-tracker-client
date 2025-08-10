import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Fade, Slide } from "react-awesome-reveal";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const ExtraSection = () => {
  return (
    <div className="w-11/12 mx-auto mt-10 rounded-xl flex flex-col justify-center items-center text-center bg-indigo-100 p-8 shadow-lg">
      <Fade direction="down" cascade>
        <h1 className="text-5xl font-extrabold text-purple-500 mb-4">
          Welcome to <span className="text-amber-600">ArtifactVault</span>
        </h1>
      </Fade>

      <Slide direction="up">
        <h2 className="text-2xl font-semibold text-gray-700">
          Explore{" "}
          <span className="text-red-500">
            <Typewriter
              words={["Ancient Relics", "Forgotten Histories", "Rare Artifacts", "Cultural Treasures"]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </h2>
      </Slide>

      <Fade delay={300} direction="up" triggerOnce>
        <p
          className="text-gray-600 mt-6 text-lg max-w-xl"
          data-tooltip-id="artifact-tip"
          data-tooltip-content="Browse, add, and preserve pieces of history!"
        >
          A digital home for humanity's greatest artifacts — curated by you.
        </p>
        <Tooltip id="artifact-tip" place="top" />
      </Fade>

      <Slide direction="up" delay={500} triggerOnce>
        <button className="mt-10 px-6 py-3 bg-purple-500 text-white font-semibold rounded-full shadow-md hover:bg-emerald-700 transition duration-300">
          Explore Artifacts
        </button>
      </Slide>
    </div>
  );
};

export default ExtraSection;
