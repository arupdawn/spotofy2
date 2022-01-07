import { HomeIcon, LibraryIcon, SearchIcon } from "@heroicons/react/outline"

function BottomSectionMobile() {
    return (
        <div className="fixed bottom-0 p-2 widthPlayer bottomSectionStyle text-white font-light flex justify-between pl-8 pr-8">
          <bottom className="items-center">
            <HomeIcon className="h-8 w-8" />
            <p className="text-xs">Home</p>
          </bottom>
          <bottom>
            <SearchIcon className=" items-center h-8 w-8" />
            <p className="text-xs">Search</p>
          </bottom>
          <bottom>
            <LibraryIcon className=" items-center h-8 w-8" />
            <p className="text-xs">Library</p>
          </bottom>
        </div>
    )
}

export default BottomSectionMobile
