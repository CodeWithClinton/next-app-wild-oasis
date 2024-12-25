import React from 'react'
import CabinCard from './CabinCard'
import { getCabins } from '../_lib/data-service'

const CabinList = async ({filter}) => {
    

    const cabins = await getCabins()
    let displayedcabins
    if(filter==="all") displayedcabins=cabins 
    if(filter==="small") displayedcabins = cabins.filter(cabin => cabin.maxCapacity <= 3)
    if(filter==="medium") displayedcabins = cabins.filter(cabin => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7)
    if(filter==="large") displayedcabins = cabins.filter(cabin => cabin.maxCapacity >= 8)

    if(!cabins.length)
        return null

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {displayedcabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
  )
}

export default CabinList
