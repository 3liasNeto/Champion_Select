import React, { useCallback } from 'react'
import { Sides, Team, teamSides } from '../types/type';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


interface BanProps {
    champions : Team | undefined;
    sideBan :  keyof Sides;
}

const Bans : React.FC<BanProps> = ({ champions, sideBan }) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      params.set("side", sideBan)
 
      return params.toString()
    },
    [searchParams]
  )

  return (
    <div>
<div>
    {champions !== undefined && (
      <div   className='flex flex-row gap-2'> 
      {Object.entries(champions).map(([position, player]) => (
          player !== undefined ? (
              <div key={`${position}`}>
                  <img src={player.image} alt="" onClick={() => {router.push(pathname + '?' + createQueryString('lane', position))}}/>
                  <h1>{player.name}</h1>
              </div>
          ) : (
            <div key={position} className='bg-gray-500 w-6 h-7 mb-2' onClick={() => {router.push(pathname + '?' + createQueryString('lane', position))}}>
            
            </div>
          )
      ))}
        </div>
    )}
    </div>
    </div>
  )
}

export default Bans