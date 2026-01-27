"use client";

import { ClipLoader } from "react-spinners";

const GamesLoading = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <ClipLoader color="#FFFFFF" size={80} />
    </div>
  );
};

export default GamesLoading;
