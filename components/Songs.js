import { useRecoilValue } from "recoil"
import { playlistState } from "../atoms/playlistAtom"
import isSmallDevice from "../lib/isSmallDevice";
import Song from "./Song";

function Songs() {
    const playlist = useRecoilValue(playlistState);
    let SongClass = isSmallDevice() ? "flex flex-col space-y-1 pb-28 text-white" : "px-8 flex flex-col space-y-1 pb-28 text-white"
    return (
        <div className={SongClass}>
            {playlist?.tracks?.items?.map((track, i)=>(
                // <div>{track?.track?.name}</div>
                <Song key={track?.track?.id} track={track} order={i}/>
            ))}
        </div>
    )
}

export default Songs
