import React from "react";

function ArtistEntry(props) {
  return (
    <div className="Artistcont">
      <h1 className="ArtistRank">{props.pos}</h1>
      <img src={props.img} className="EntryArtistImg"></img>

      <p className="ArtistName">{props.artist}</p>
    </div>
  );
}

export default ArtistEntry;
