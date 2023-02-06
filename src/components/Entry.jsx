import React from "react";
import { useEffect, useState } from "react";
function Entry(props) {
  const [songsize, setsongsize] = useState(3);
  const [fadedir, setfadedir] = useState(false);
  const stringsize = props.name + "";
  const position = props.pos;
  useEffect(() => {
    if (stringsize.length > 9) {
      setsongsize(2);
    }

    if (position % 2 === 0) {
      setfadedir(true);
    }
  }, []);
  return (
    <div
      className="container text-center entrycontainer"
      // data-aos="zoom-in-up"
      // data-aos-duration="750"
    >
      <div className="row align-items-center">
        <div class="col-xl-4 rankcont">
          <h1 className="rank">{props.pos}</h1>
        </div>
        <div class="col-xl-3">
          <img src={props.img} className="EntryImg"></img>
        </div>
        <div class="col-xl-5 songartistcont">
          <h1 className="SongName" style={{ fontSize: `${songsize}rem` }}>
            {props.name}
          </h1>
          <p className="Artist">{props.artist}</p>
        </div>
      </div>
      <div className="entryText"></div>
    </div>
  );
}

export default Entry;
