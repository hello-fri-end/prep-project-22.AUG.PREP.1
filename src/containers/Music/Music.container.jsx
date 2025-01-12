import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";

import Song from "./Song";

const Music = ({ country }) => {
  const [Songs, SetSongs] = useState([]);
  const [Erorr, SetErorr] = useState(null);

  useEffect(() => {
    getSongs();
  }, []);

  const getSongs = async () => {
    const BASE_URL = "https://ws.audioscrobbler.com/2.0/";
    const res = await axios.get(BASE_URL, {
      params: {
        method: "geo.gettoptracks",
        format: "json",
        limit: "3",
        api_key: process.env.REACT_APP_MUSIC_APIKEY,
        country: country,
      },
    });
    console.log(res.data);
    if (res.data.error) {
      SetErorr({ ...res.data });
    } else {
      SetSongs([...res.data.tracks.track]);
    }
  };

  return (
    <>
      <div className="songs flex flex-col justify-center items-center p-3 w-full mt-10 rounded-[10px]">
        {Erorr ? (
          <h1 className="text-l py-2 text-red-700">
            Country name is invalid, please enter the name as defined by the ISO
            3166-1 country names standard
          </h1>
        ) : Songs.length == 0 ? (
          <h1 className="text-xl py-2 font-semibold">Loading songs ... </h1>
        ) : (
          <>
            <h1 className="text-xl py-2 font-semibold">
              In {country} you can listen to ...
            </h1>
            <div className="songs-list flex flex-wrap justify-center items-center">
              {Songs.map((song) => {
                return <Song key={song.mbid} song={song} />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Music;
