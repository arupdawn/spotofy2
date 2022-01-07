import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import isSmallDevice from "../lib/isSmallDevice";
import { millisToMinutesAndSeconds } from "../lib/spotify";

function Song({ order, track, isMobiledevice }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [trackName, settrackName] = useState(track?.track?.name);

  const playSong = () => {
    setCurrentTrackId(track?.track?.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };

  useEffect(() => {
    let updatedName = trackName;
    let newName = trackName;
    if(trackName.length > 35 && !isMobiledevice){
     updatedName = updatedName.split("").slice(0,34).join('');
     newName = updatedName + "...";
     settrackName(newName);
    }else{
      settrackName(track?.track?.name);
    }
  }, [])
  return (
    <div
      className="grid gridCols hover:bg-gray-800 p-2 pr-6 pl-6 rounded-md cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        {isSmallDevice() && <p className="">{order + 1}</p>}
        <img
          className="h-10 w-10"
          src={track?.track?.album?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p className="font-semibold">{trackName}</p>
          <p className="text-slate-400">{track?.track?.artists?.[0].name}</p>
        </div>
        {/* {!isSmallDevice() && <div className="">:</div>} */}
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline truncate">{track?.track?.album?.name}</p>
        <p className="hidden sm:inline">{millisToMinutesAndSeconds(track?.track?.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
