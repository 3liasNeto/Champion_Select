import React from 'react'
import { IoIosSearch } from "react-icons/io";

interface championsSearchProps {
    onSearch : (value : string) => void
}

const ChampionSearch:React.FC<championsSearchProps> = ({onSearch}) => {

  return (
    <div className='flex flex-row items-center gap-1'>
        <label htmlFor="searchChampion" about='search' >
            <IoIosSearch aria-description='Search' height={24} width={24}/>
        </label>
        <input type="text" id='searchChampion' className='border-0  outline-none' onChange={(e) => onSearch(e.target.value)}/>
    </div>
  )
}

export default ChampionSearch