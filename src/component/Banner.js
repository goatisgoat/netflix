import React from "react";

const Banner = ({ bannerInfo }) => {
  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${bannerInfo.backdrop_path})`,
      }}
    >
      <div className="bannerString">
        <h1>{bannerInfo.original_title}</h1>
        <br/>
        <p>{bannerInfo.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
