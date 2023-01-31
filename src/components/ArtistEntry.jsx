import React from "react";

function ArtistEntry(props) {
  return (
    <div className="container text-center entrycontainer">
      <div className="row align-items-center">
        <div class="col-2">
          <h1 className="rank align-items-center">{props.pos}</h1>
        </div>
        <div class="col-2">
          <img src={props.img} className="EntryImg"></img>
        </div>
        <div class="col-8">
          <p className="Artist">{props.artist}</p>
        </div>
      </div>

      <div className="entryText"></div>
    </div>
  );
}
export default ArtistEntry;
