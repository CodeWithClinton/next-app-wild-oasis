"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const Filter = () => {

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const activeFilter = searchParams.get("capacity") ?? "all"

    const handleFilter = (filter) => {
        console.log(filter)
        const params = new URLSearchParams(searchParams)
        params.set("capacity", filter)
        router.replace(`${pathname}?${params.toString()}`, {scroll: false})
    }

  return (
    <div className='border border-primary-800 flex'>
      {/* <button className='px-5 py-2 hover:bg-primary-700' onClick={() => handleFilter("all")}>All cabins</button>
      <button className='px-5 py-2 hover:bg-primary-700' onClick={() => handleFilter("small")}>1&mdash; 3 guests</button>
      <button className='px-5 py-2 hover:bg-primary-700' onClick={() => handleFilter("medium")}>4&mdash; 7 guests</button>
      <button className='px-5 py-2 hover:bg-primary-700' onClick={() => handleFilter("large")}>8&mdash; 12 guests</button> */}
      <Button filter="all" activeFilter={activeFilter} handleFilter={handleFilter}>All cabins</Button>
      <Button filter="small" activeFilter={activeFilter} handleFilter={handleFilter}>1&mdash; 3 guests</Button>
      <Button filter="medium" activeFilter={activeFilter} handleFilter={handleFilter}>4&mdash; 7 guests</Button>
      <Button filter="large" activeFilter={activeFilter} handleFilter={handleFilter}>8&mdash; 12 guests</Button>
    </div>
  )
}

function Button({children, activeFilter, filter, handleFilter}){
    return (
        <button className={`px-5 py-2 hover:bg-primary-700 ${activeFilter===filter ? 'bg-primary-700 text-primary-50' : ""}`} onClick={() => handleFilter(filter)}>{children}</button>
    )
   
}


export default Filter
