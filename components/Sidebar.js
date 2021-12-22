import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon,
} from "@heroicons/react/solid";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data?.body?.items);
      });
    }
  }, [session, spotifyApi]);

  console.log("playlists >>", playlists);
  console.log("you clicked playlist >>", playlistId);

  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll 
                      h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[17rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
        <div className="flex items-center ml-[-10px] mb-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8f_u1QvZ-8IeUoLK-lDY4AukDg_yBZ4t2fA&usqp=CAU"
            className="w-12 mr-1"
          />
          <span className="font-bold text-2xl text-white">Spotify</span>
        </div>

        {/* <button
          className="flex items-center space-x-2 font-bold hover:text-white"
          
        >
          <HomeIcon className="h-5 w-5" />
          <p>Logout</p>
        </button> */}
        <button className="flex items-center space-x-2 font-bold hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 font-bold hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 font-bold hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 font-bold hover:text-white">
          <PlusCircleIcon className="h-5 w-5 create-playlist" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 font-bold hover:text-white">
          <HeartIcon className="h-5 w-5 text-blue-600" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 font-bold hover:text-white">
          <RssIcon className="h-5 w-5 spotify-green" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlist... */}
        {playlists.map((playlist) => (
          <p
            key={playlist?.id}
            className="cursor-pointer hover:text-white font-bold"
            onClick={() => {
              setPlaylistId(playlist?.id);
            }}
          >
            {playlist?.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
