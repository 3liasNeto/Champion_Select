import React from 'react'
import { sideKeys } from '../types/type'
import Image from 'next/image'

interface championsLanesProps { 
    findChampion : (value : string) => void;
}
const ChampionLane: React.FC<championsLanesProps> = ({ findChampion }) => {
    const lanes = Object.keys(sideKeys).filter(e => isNaN(Number(e)))
  return (
    <div>
    {lanes.map((lane) => (
        <div key={lane} onClick={() => findChampion(lane)}>
            <Image 
                src={`./position-${lane}.svg`}
                height={24}
                width={24}
                alt={lane}
            />
        </div>
    ))}
    </div>
  )
}

export default ChampionLane