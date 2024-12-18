import React from "react";
import Stats from "../components/Stats";

const Home: React.FC = () => {
  return (
    <div className="bg-[#7C9694] min-h-screen py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-center mb-12">
          <Stats />
        </div>
      </div>
    </div>
  );
};

export default Home;
