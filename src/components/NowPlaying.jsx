import React from "react";

function NowPlaying(props) {
  return (
    <div className="container text-center nowplayingcont">
      <div className="row align-items-start">
        <div class="col-6">
          <img src={props.img} className="NowplayingImg"></img>
        </div>
        <div class="col-6">
          <p className="NowplayingArtist">{props.artist}</p>
          <p className="NowplayingSong">{props.song}</p>
        </div>
      </div>
    </div>
  );
}
export default NowPlaying;
