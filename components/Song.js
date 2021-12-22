import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/spotify";

function Song({ order, track }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track?.track?.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };
  return (
    <div
      className="grid gridCols hover:bg-gray-800 p-2 pr-6 pl-6 rounded-md cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p className="">{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track?.track?.album?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p className="font-semibold">{track?.track?.name}</p>
          <p className="text-slate-400">{track?.track?.artists?.[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline truncate">{track?.track?.album?.name}</p>
        <p className="hidden sm:inline ">{millisToMinutesAndSeconds(track?.track?.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
