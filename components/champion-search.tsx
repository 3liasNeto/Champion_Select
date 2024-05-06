import React from "react";
import { IoIosSearch } from "react-icons/io";

interface championsSearchProps {
  onSearch: (value: string) => void;
}

const ChampionSearch: React.FC<championsSearchProps> = ({ onSearch }) => {
  return (
    <div className="flex flex-row items-center gap-2  border teamBorder border-[#c8aa6e52] bg-[#000025]/15 px-3 py-1">
      <label htmlFor="searchChampion" about="search">
        <IoIosSearch
          aria-description="Search"
          className="text-[#c8aa6e]/70 text-[20px]"
        />
      </label>
      <input
        type="text"
        id="searchChampion"
        className="border-0  outline-none bg-transparent text-[#c8aa6e]/70"
        onChange={(e) => onSearch(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
};

export default ChampionSearch;
