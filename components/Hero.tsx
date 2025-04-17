import React from "react";
import bgImg from "../public/heroBG.png";
import Container from "./Container";
// Component type definition
export interface HeroProps {
  magazineTitle?: string;
  title: string;
  highlightedText: string;
  content: string;
  backgroundImage?: string;
}

const Hero: React.FC<HeroProps> = ({
  magazineTitle = "LUX VENTUS MAGAZINE",
  title = "We Are the",
  highlightedText = "Ventus Fashion",
  content = "We like to gossip about everything, but we will never forget the daily fashion dose.",
  backgroundImage = "",
}) => {
  return (
    <Container>
      <div
        className="relative h-[600px] w-full overflow-hidden rounded-4xl bg-cover bg-center mt-[80px]"
        style={{
          backgroundImage: `url(${backgroundImage || bgImg.src})`,
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-end p-12 pb-16">
          <span className="font-Poppins font- text-xs text-white tracking-[0.3em] uppercase mb-3">
            {magazineTitle}
          </span>
          <h1 className="font-cinzel font-bold text-5xl text-white mb-4">
            {title} <span className="text-cyan-300">{highlightedText}</span>
          </h1>
          <p className="font-Poppins font-normal text-lg text-white max-w-md opacity-90">
            {content}
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
