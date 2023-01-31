import React from "react";

function Entry(props) {
  return (
    <div className="container entrycontainer">
      <div className="row align-items-center">
        <div class="col-2 text-right">
          <h1 className="rank text-right">{props.pos}</h1>
        </div>
        <div class="col-3">
          <img src={props.img} className="EntryImg"></img>
        </div>
        <div class="col-7 align-items-center text-left">
          <h1 className="SongName">{props.name}</h1>
          <p className="Artist">{props.artist}</p>
        </div>
      </div>

      <div className="entryText"></div>
    </div>
  );
}

export default Entry;
