import React from "react";

function Entry(props) {
  return (
    <div className="cont">
      <h1 className="rank">{props.pos}</h1>
      <img src={props.img} className="EntryImg"></img>
      <div className="entryText">
        <h1 className="SongName">{props.name}</h1>
        <p className="Artist">{props.artist}</p>
      </div>
    </div>
  );
}

export default Entry;
