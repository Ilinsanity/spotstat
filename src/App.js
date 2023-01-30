import { useEffect, useState } from "react";
import "./App.css";
import ArtistEntry from "./components/ArtistEntry";
import axios from "axios";
import { Buffer } from "buffer";
import Entry from "./components/Entry";
import queryString from "query-string";
import NowPlaying from "./components/NowPlaying";

function App() {
  const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  const refreshtoken = process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN;
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [shorttracks, setshort] = useState([]);
  const [medtracks, setmedium] = useState([]);
  const [longtracks, setlong] = useState([]);
  const [shortartists, setshortart] = useState([]);
  const [medartists, setmediumart] = useState([]);
  const [longartists, setlongart] = useState([]);
  const [nowplaying, setnowplaying] = useState({});
  // const [timerange, setTimeRange] = useState("short_term");

  const [short, setshortbool] = useState(true);
  const [medium, setmediumbool] = useState(false);
  const [long, setlongbool] = useState(false);
  const [trackbool, setTrackBool] = useState(true);
  const [artistbool, setArtistBool] = useState(false);
  const [nowplayingbool, setplayingbool] = useState(false);

  const [visible, setvisibility] = useState("visible");

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
  const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
  const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?`;
  const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists?`;

  const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: queryString.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshtoken,
      }),
    });
    return response.json();
  };

  const getNowPlaying = async () => {
    const { access_token } = await getAccessToken();

    return fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  };

  const getTopTracks = async (timerange) => {
    const { access_token } = await getAccessToken();

    return fetch(
      TOP_TRACKS_ENDPOINT + `time_range=${timerange}` + "&limit=10",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  };

  const getTopArtists = async (timerange) => {
    const { access_token } = await getAccessToken();

    return fetch(
      TOP_ARTISTS_ENDPOINT + `time_range=${timerange}` + "&limit=10",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  };
  useEffect(() => {
    getTracks();
    getArtists();
  }, []);

  function shortterm() {
    setshortbool(true);
    setmediumbool(false);
    setlongbool(false);
    setplayingbool(false);
  }

  function mediumterm() {
    setshortbool(false);
    setmediumbool(true);
    setlongbool(false);
    setplayingbool(false);
  }

  function longterm() {
    setshortbool(false);
    setmediumbool(false);
    setlongbool(true);
    setplayingbool(false);
  }

  function trackchange() {
    setArtistBool(false);
    setTrackBool(true);
    setplayingbool(false);
    setvisibility("visible");
  }

  function artistchange() {
    setArtistBool(true);
    setTrackBool(false);
    setplayingbool(false);
    setvisibility("visible");
  }

  function nowplayingchange() {
    getPlaying();
    setArtistBool(false);
    setTrackBool(false);
    setplayingbool(true);
    setvisibility("hidden");
  }
  const getPlaying = async () => {
    const response = await getNowPlaying();
    const ke = response.json();
    ke.then(function (result) {
      const nowplayingobject = {
        img: result.item.album.images[0].url,
        artist: result.item.album.artists[0].name,
        song: result.item.name,
      };

      setnowplaying(nowplayingobject);
    });
  };

  const getTracks = async () => {
    const response1 = await getTopTracks("short_term");
    const ke1 = response1.json();
    console.log(ke1);

    ke1.then(function (result) {
      const data = result;
      console.log(data);
      let artist = data.items[0].artists[0].type;
      let img = data.items[0].album.images[1].url;
      let song = data.items[0].name;
      const array = [];
      const Entry1 = {
        rank: 1,
        artist: data.items[0].artists[0].name,
        img: data.items[0].album.images[1].url,
        song: data.items[0].name,
      };
      array.push(Entry1);
      const Entry2 = {
        rank: 2,
        artist: data.items[1].album.artists[0].name,
        img: data.items[1].album.images[1].url,
        song: data.items[1].name,
      };
      array.push(Entry2);
      const Entry3 = {
        rank: 3,
        artist: data.items[2].artists[0].name,
        img: data.items[2].album.images[1].url,
        song: data.items[2].name,
      };
      array.push(Entry3);
      const Entry4 = {
        rank: 4,
        artist: data.items[3].artists[0].name,
        img: data.items[3].album.images[1].url,
        song: data.items[3].name,
      };
      array.push(Entry4);
      const Entry5 = {
        rank: 5,
        artist: data.items[4].artists[0].name,
        img: data.items[4].album.images[1].url,
        song: data.items[4].name,
      };
      array.push(Entry5);
      const Entry6 = {
        rank: 6,
        artist: data.items[5].artists[0].name,
        img: data.items[5].album.images[1].url,
        song: data.items[5].name,
      };
      array.push(Entry6);
      const Entry7 = {
        rank: 7,
        artist: data.items[6].artists[0].name,
        img: data.items[6].album.images[1].url,
        song: data.items[6].name,
      };
      array.push(Entry7);
      const Entry8 = {
        rank: 8,
        artist: data.items[7].artists[0].name,
        img: data.items[7].album.images[1].url,
        song: data.items[7].name,
      };
      array.push(Entry8);
      const Entry9 = {
        rank: 9,
        artist: data.items[8].artists[0].name,
        img: data.items[8].album.images[1].url,
        song: data.items[8].name,
      };
      array.push(Entry9);
      const Entry10 = {
        rank: 10,
        artist: data.items[9].artists[0].name,
        img: data.items[9].album.images[1].url,
        song: data.items[9].name,
      };
      array.push(Entry10);
      console.log(array);
      setshort(array);
    });
    // setTimeRange("medium_term");

    const response2 = await getTopTracks("medium_term");
    const ke2 = response2.json();
    console.log(ke2);

    ke2.then(function (result) {
      const data = result;
      console.log(data);
      let artist = data.items[0].artists[0].type;
      let img = data.items[0].album.images[1].url;
      let song = data.items[0].name;
      const array = [];
      const Entry1 = {
        rank: 1,
        artist: data.items[0].artists[0].name,
        img: data.items[0].album.images[1].url,
        song: data.items[0].name,
      };
      array.push(Entry1);
      const Entry2 = {
        rank: 2,
        artist: data.items[1].album.artists[0].name,
        img: data.items[1].album.images[1].url,
        song: data.items[1].name,
      };
      array.push(Entry2);
      const Entry3 = {
        rank: 3,
        artist: data.items[2].artists[0].name,
        img: data.items[2].album.images[1].url,
        song: data.items[2].name,
      };
      array.push(Entry3);
      const Entry4 = {
        rank: 4,
        artist: data.items[3].artists[0].name,
        img: data.items[3].album.images[1].url,
        song: data.items[3].name,
      };
      array.push(Entry4);
      const Entry5 = {
        rank: 5,
        artist: data.items[4].artists[0].name,
        img: data.items[4].album.images[1].url,
        song: data.items[4].name,
      };
      array.push(Entry5);
      const Entry6 = {
        rank: 6,
        artist: data.items[5].artists[0].name,
        img: data.items[5].album.images[1].url,
        song: data.items[5].name,
      };
      array.push(Entry6);
      const Entry7 = {
        rank: 7,
        artist: data.items[6].artists[0].name,
        img: data.items[6].album.images[1].url,
        song: data.items[6].name,
      };
      array.push(Entry7);
      const Entry8 = {
        rank: 8,
        artist: data.items[7].artists[0].name,
        img: data.items[7].album.images[1].url,
        song: data.items[7].name,
      };
      array.push(Entry8);
      const Entry9 = {
        rank: 9,
        artist: data.items[8].artists[0].name,
        img: data.items[8].album.images[1].url,
        song: data.items[8].name,
      };
      array.push(Entry9);
      const Entry10 = {
        rank: 10,
        artist: data.items[9].artists[0].name,
        img: data.items[9].album.images[1].url,
        song: data.items[9].name,
      };
      array.push(Entry10);
      console.log(array);
      setmedium(array);
    });

    // setTimeRange("long_term");
    const response3 = await getTopTracks("long_term");
    const ke3 = response3.json();
    console.log(ke3);

    ke3.then(function (result) {
      const data = result;
      console.log(data);
      let artist = data.items[0].artists[0].type;
      let img = data.items[0].album.images[1].url;
      let song = data.items[0].name;
      const array = [];
      const Entry1 = {
        rank: 1,
        artist: data.items[0].artists[0].name,
        img: data.items[0].album.images[1].url,
        song: data.items[0].name,
      };
      array.push(Entry1);
      const Entry2 = {
        rank: 2,
        artist: data.items[1].album.artists[0].name,
        img: data.items[1].album.images[1].url,
        song: data.items[1].name,
      };
      array.push(Entry2);
      const Entry3 = {
        rank: 3,
        artist: data.items[2].artists[0].name,
        img: data.items[2].album.images[1].url,
        song: data.items[2].name,
      };
      array.push(Entry3);
      const Entry4 = {
        rank: 4,
        artist: data.items[3].artists[0].name,
        img: data.items[3].album.images[1].url,
        song: data.items[3].name,
      };
      array.push(Entry4);
      const Entry5 = {
        rank: 5,
        artist: data.items[4].artists[0].name,
        img: data.items[4].album.images[1].url,
        song: data.items[4].name,
      };
      array.push(Entry5);
      const Entry6 = {
        rank: 6,
        artist: data.items[5].artists[0].name,
        img: data.items[5].album.images[1].url,
        song: data.items[5].name,
      };
      array.push(Entry6);
      const Entry7 = {
        rank: 7,
        artist: data.items[6].artists[0].name,
        img: data.items[6].album.images[1].url,
        song: data.items[6].name,
      };
      array.push(Entry7);
      const Entry8 = {
        rank: 8,
        artist: data.items[7].artists[0].name,
        img: data.items[7].album.images[1].url,
        song: data.items[7].name,
      };
      array.push(Entry8);
      const Entry9 = {
        rank: 9,
        artist: data.items[8].artists[0].name,
        img: data.items[8].album.images[1].url,
        song: data.items[8].name,
      };
      array.push(Entry9);
      const Entry10 = {
        rank: 10,
        artist: data.items[9].artists[0].name,
        img: data.items[9].album.images[1].url,
        song: data.items[9].name,
      };
      array.push(Entry10);
      console.log(array);
      setlong(array);
    });
  };

  const getArtists = async () => {
    const response1 = await getTopArtists("short_term");
    const ke1 = response1.json();
    console.log(ke1);
    ke1.then(function (result) {
      const data = result;
      console.log(data);

      const array = [];
      const Entry1 = {
        rank: 1,
        artist: data.items[0].name,
        img: data.items[0].images[1].url,
      };
      array.push(Entry1);
      const Entry2 = {
        rank: 2,
        artist: data.items[1].name,
        img: data.items[1].images[1].url,
      };
      array.push(Entry2);
      const Entry3 = {
        rank: 3,
        artist: data.items[2].name,
        img: data.items[2].images[1].url,
      };
      array.push(Entry3);
      const Entry4 = {
        rank: 4,
        artist: data.items[3].name,
        img: data.items[3].images[1].url,
      };
      array.push(Entry4);
      const Entry5 = {
        rank: 5,
        artist: data.items[4].name,
        img: data.items[4].images[1].url,
      };
      array.push(Entry5);
      const Entry6 = {
        rank: 6,
        artist: data.items[5].name,
        img: data.items[5].images[1].url,
      };
      array.push(Entry6);
      const Entry7 = {
        rank: 7,
        artist: data.items[6].name,
        img: data.items[6].images[1].url,
      };
      array.push(Entry7);
      const Entry8 = {
        rank: 8,
        artist: data.items[7].name,
        img: data.items[7].images[1].url,
      };
      array.push(Entry8);
      const Entry9 = {
        rank: 9,
        artist: data.items[8].name,
        img: data.items[8].images[1].url,
      };
      array.push(Entry9);
      const Entry10 = {
        rank: 10,
        artist: data.items[9].name,
        img: data.items[9].images[1].url,
      };
      array.push(Entry10);
      console.log(array);
      setshortart(array);
    });
    // setTimeRange("medium_term");

    const response2 = await getTopArtists("medium_term");
    const ke2 = response2.json();
    console.log(ke2);

    ke2.then(function (result) {
      const data = result;
      console.log(data);

      const array = [];
      const Entry1 = {
        rank: 1,
        artist: data.items[0].name,
        img: data.items[0].images[1].url,
      };
      array.push(Entry1);
      const Entry2 = {
        rank: 2,
        artist: data.items[1].name,
        img: data.items[1].images[1].url,
      };
      array.push(Entry2);
      const Entry3 = {
        rank: 3,
        artist: data.items[2].name,
        img: data.items[2].images[1].url,
      };
      array.push(Entry3);
      const Entry4 = {
        rank: 4,
        artist: data.items[3].name,
        img: data.items[3].images[1].url,
      };
      array.push(Entry4);
      const Entry5 = {
        rank: 5,
        artist: data.items[4].name,
        img: data.items[4].images[1].url,
      };
      array.push(Entry5);
      const Entry6 = {
        rank: 6,
        artist: data.items[5].name,
        img: data.items[5].images[1].url,
      };
      array.push(Entry6);
      const Entry7 = {
        rank: 7,
        artist: data.items[6].name,
        img: data.items[6].images[1].url,
      };
      array.push(Entry7);
      const Entry8 = {
        rank: 8,
        artist: data.items[7].name,
        img: data.items[7].images[1].url,
      };
      array.push(Entry8);
      const Entry9 = {
        rank: 9,
        artist: data.items[8].name,
        img: data.items[8].images[1].url,
      };
      array.push(Entry9);
      const Entry10 = {
        rank: 10,
        artist: data.items[9].name,
        img: data.items[9].images[1].url,
      };
      array.push(Entry10);
      console.log(array);
      setmediumart(array);
    });

    // setTimeRange("long_term");
    const response3 = await getTopArtists("long_term");
    const ke3 = response3.json();
    console.log(ke3);

    ke3.then(function (result) {
      const data = result;
      console.log(data);
      const array = [];
      const Entry1 = {
        rank: 1,
        artist: data.items[0].name,
        img: data.items[0].images[1].url,
      };
      array.push(Entry1);
      const Entry2 = {
        rank: 2,
        artist: data.items[1].name,
        img: data.items[1].images[1].url,
      };
      array.push(Entry2);
      const Entry3 = {
        rank: 3,
        artist: data.items[2].name,
        img: data.items[2].images[1].url,
      };
      array.push(Entry3);
      const Entry4 = {
        rank: 4,
        artist: data.items[3].name,
        img: data.items[3].images[1].url,
      };
      array.push(Entry4);
      const Entry5 = {
        rank: 5,
        artist: data.items[4].name,
        img: data.items[4].images[1].url,
      };
      array.push(Entry5);
      const Entry6 = {
        rank: 6,
        artist: data.items[5].name,
        img: data.items[5].images[1].url,
      };
      array.push(Entry6);
      const Entry7 = {
        rank: 7,
        artist: data.items[6].name,
        img: data.items[6].images[1].url,
      };
      array.push(Entry7);
      const Entry8 = {
        rank: 8,
        artist: data.items[7].name,
        img: data.items[7].images[1].url,
      };
      array.push(Entry8);
      const Entry9 = {
        rank: 9,
        artist: data.items[8].name,
        img: data.items[8].images[1].url,
      };
      array.push(Entry9);
      const Entry10 = {
        rank: 10,
        artist: data.items[9].name,
        img: data.items[9].images[1].url,
      };
      array.push(Entry10);
      console.log(array);
      setlongart(array);
    });
  };

  return (
    <div className="BCont">
      <div className="buttoncont1">
        <button className="TimeButton" onClick={trackchange}>
          Tracks
        </button>
        <button className="TimeButton" onClick={artistchange}>
          Artists
        </button>
        <button className="TimeButton" onClick={nowplayingchange}>
          Now Playing
        </button>
      </div>
      <div className="buttoncont2">
        <button
          className="TimeButton"
          onClick={shortterm}
          style={{ visibility: visible }}
        >
          This Month
        </button>
        <button
          style={{ visibility: visible }}
          className="TimeButton"
          onClick={mediumterm}
        >
          Last 6 Months
        </button>
        <button
          style={{ visibility: visible }}
          className="TimeButton"
          onClick={longterm}
        >
          All Time
        </button>
      </div>
      {trackbool && short && (
        <div>
          {shorttracks.map((hanni, index) => {
            return (
              <Entry
                key={index}
                pos={hanni.rank}
                name={hanni.song}
                artist={hanni.artist}
                img={hanni.img}
              />
            );
          })}
        </div>
      )}
      {trackbool && medium && (
        <div>
          {medtracks.map((hanni, index) => {
            return (
              <Entry
                key={index}
                pos={hanni.rank}
                name={hanni.song}
                artist={hanni.artist}
                img={hanni.img}
              />
            );
          })}
        </div>
      )}
      {trackbool && long && (
        <div>
          {longtracks.map((hanni, index) => {
            return (
              <Entry
                key={index}
                pos={hanni.rank}
                name={hanni.song}
                artist={hanni.artist}
                img={hanni.img}
              />
            );
          })}
        </div>
      )}
      {artistbool && short && (
        <div>
          {shortartists.map((hanni, index) => {
            return (
              <ArtistEntry
                key={index}
                pos={hanni.rank}
                artist={hanni.artist}
                img={hanni.img}
              />
            );
          })}
        </div>
      )}
      {artistbool && medium && (
        <div>
          {medartists.map((hanni, index) => {
            return (
              <ArtistEntry
                key={index}
                pos={hanni.rank}
                artist={hanni.artist}
                img={hanni.img}
              />
            );
          })}
        </div>
      )}
      {artistbool && long && (
        <div>
          {longartists.map((hanni, index) => {
            return (
              <ArtistEntry
                key={index}
                pos={hanni.rank}
                artist={hanni.artist}
                img={hanni.img}
              />
            );
          })}
        </div>
      )}

      {nowplayingbool && (
        <div>
          <NowPlaying
            img={nowplaying.img}
            artist={nowplaying.artist}
            song={nowplaying.song}
          />
        </div>
      )}
    </div>
  );
}

export default App;
