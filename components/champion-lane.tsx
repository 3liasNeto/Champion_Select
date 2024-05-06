import React, { useCallback } from 'react'
import { sideKeys } from '../types/type'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface championsLanesProps { 
    findChampion : (value : string) => void;
}
const ChampionLane: React.FC<championsLanesProps> = ({ findChampion }) => {
    const lanes = Object.keys(sideKeys).filter(e => isNaN(Number(e)));

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const selectedLane = searchParams.get('selectedLane')

    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams.toString())
          params.set(name, value)
            
          if(selectedLane === value){
            params.delete(name)
          }
     
          return params.toString()
        },
        [searchParams]
      )


    const onSelectLane = (lane : string) => {
        router.push(pathname + `?${createQueryString('selectedLane', lane)}`)
        findChampion(lane === selectedLane ? '' : lane)
    }


  return (
    <div className='flex flex-row gap-2 items-center'>
    {lanes.map((lane) => (
        <div key={lane} className={`cursor-pointer ${selectedLane === lane ? 'fillColor' : ''} opacity-70 hover:opacity-100`} onClick={() => onSelectLane(lane)}>
            <Image 
                src={`./position-${lane}.svg`}
                height={28}
                width={28}
                alt={lane}
            />
        </div>
    ))}
    </div>
  )
}

export default ChampionLane