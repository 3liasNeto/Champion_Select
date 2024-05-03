import React, { useCallback } from 'react'
import { Team, teamSides } from '../types/type';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface TeamProps {
    data : Team | undefined;
    side : teamSides;

}

const Teams : React.FC<TeamProps> = ({ data, side }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sideString = teamSides[side];
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      params.set("side", sideString)
 
      return params.toString()
    },
    [searchParams]
  )
  return (
    <div>
    {data !== undefined ? (
      <div className='flex flex-col gap-2 items-center'>
      {Object.entries(data).map(([position, player]) => (
          player !== undefined ? (
            <div key={`${side}-${position}`} className='flex flex-col items-center'>
              <div className='bg-[#1D272A]/70 backdrop-blur teamBorder border border-[#c8aa6e52] rounded-sm  w-[90px] h-[90px]'
              onClick={() => {router.push(pathname + '?' + createQueryString('lane', position))}}>
                <Image 
                src={player.image}
                height={90}
                width={90}
                alt={`${side}|${position} - ${player.name}`}
                className=''
                />
              </div>
                  <h1 className='text-white font-medium '>{player.name}</h1>
              </div>
          ) : (
            <div key={position} className='bg-[#1D272A]/70 backdrop-blur teamBorder border border-[#c8aa6e52] rounded-sm mb-6 p-6  w-[90px] h-[90px]' onClick={() => {router.push(pathname + '?' + createQueryString('lane', position))}}>
              <Image 
              src={`./position-${position}.svg`}
              height={84}
              width={84}
              alt={position}
              className=''
              />
            </div>
          )
      ))}
          </div>
    ) : (
      <div className='bg-gray-500 w-6 h-7'>
            
      </div>
    )}
    </div>
  )
}

export default Teams