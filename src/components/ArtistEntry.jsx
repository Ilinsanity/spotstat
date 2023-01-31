import React from "react";

function ArtistEntry(props) {
  return (
    <div
      className="container text-center entrycontainer"
      data-aos="fade-right"
      data-aos-duration="650"
    >
      <div className="row align-items-center">
        <div class="col-2 col-sm-3">
          <h1 className="rank align-items-center">{props.pos}</h1>
        </div>
        <div class="col-3 col-sm-4">
          <img src={props.img} className="EntryImg"></img>
        </div>
        <div class="col-7 col-sm-5">
          <p className="Artisttext">{props.artist}</p>
        </div>
      </div>

      <div className="entryText"></div>
    </div>
  );
}
export default ArtistEntry;
