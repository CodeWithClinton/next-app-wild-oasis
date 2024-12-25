"use client"
import React, { useOptimistic } from 'react'
import ReservationCard from './ReservationCard'
import { deleteReservation } from '../_lib/actions'

const ReservationList = ({bookings}) => {

    const [optimisticBookings, optimisticDelete] = useOptimistic(bookings, (currBookings, bookingId)=>{
        return currBookings.filter(booking => booking.id !== bookingId)
    })

    async function handleDelete(bookingId){
        optimisticDelete(bookingId)
        await deleteReservation(bookingId)
    }

  return (
    <ul className="space-y-6">
    {optimisticBookings.map((booking) => (
      <ReservationCard onDelete={handleDelete} booking={booking} key={booking.id} />
    ))}
  </ul>
  )
}

export default ReservationList
