import React from "react";
import analyze from "rgbaster";
import { useState } from "react";

function NowPlaying(props) {
  const [colorarray, setcolors] = useState([]);

  const result = analyze(`${props.img}`);
  result.then(function (r) {
    const array = [r[0].color, r[1].color, r[2].color];
    setcolors(array);
  });

  return (
    <div
      className="nowplayingcont"
      style={{ backgroundImage: `url(${props.img})` }}
    >
      <button onClick={props.goBack} className="btn btn-light">
        Back
      </button>
      <div className="row nowplayingrow">
        <div className="col-4">
          <img src={props.img} className="NowplayingImg"></img>
        </div>

        <div class="col-8 nowplayingtextcont">
          <p className="NowplayingSong" style={{ color: colorarray[0] }}>
            {props.song}
          </p>
          <p className="NowplayingArtist" style={{ color: colorarray[1] }}>
            {props.artist}
          </p>
          <p className="NowplayingArtist" style={{ color: colorarray[2] }}>
            {props.album}
          </p>
        </div>
      </div>
    </div>
  );
}
export default NowPlaying;
