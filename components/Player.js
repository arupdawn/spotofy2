import {
  ReplyIcon,
  SwitchHorizontalIcon,
  VolumeUpIcon,
} from "@heroicons/react/outline";
import {
  RewindIcon,
  PauseIcon,
  PlayIcon,
  FastForwardIcon,
  VolumeDownIcon,
} from "@heroicons/react/solid";
import { data } from "autoprefixer";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

function Player() {
  const spotifyApi = useSpotify();
  const { data: sesssion, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const [isVolumeVisibile, setisVolumeVisibile] = useState(true);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("now playin>>", data?.body?.item);
        setCurrentTrackId(data?.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data?.body?.is_playing);
        });
      });
    }
  };
  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data?.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };
  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume);
    }, 300),
    []
  );
  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      // fetch the song info
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackIdState, spotifyApi, sesssion]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // detect window screen width function
      if(window.screen.availWidth<=425){
        setisVolumeVisibile(false)
      }
      else{
        setisVolumeVisibile(true);
      }
    }
  }, [isVolumeVisibile])

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-800 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8 border-t-[0.5px] border-gray-800 bottomPlayer">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <img
          className="h-12 w-12"
          src={songInfo?.album?.images?.[0]?.url}
          alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button hideSmallScreen" />
        <RewindIcon
          onClick={() => spotifyApi.skipToPrevious()}
          className="button hideSmallScreen"
        />
        {isPlaying ? (
          <PauseIcon className="button w-10 h-10" onClick={handlePlayPause} />
        ) : (
          <PlayIcon className="button w-10 h-10" onClick={handlePlayPause} />
        )}

        <FastForwardIcon
          //   onClick={() => spotifyApi.skipToNext()}
          className="button hideSmallScreen"
        />
        <ReplyIcon className="button hideSmallScreen" />
      </div>
          
      {isVolumeVisibile &&<div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeUpIcon className="button hideSmallScreen" />
        <input
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
          className="w-14 md:w-28 hideSmallScreen"
        />
      </div>}
    </div>
  );
}

export default Player;
