'use client'
import React, { useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BookingList from './_components/BookingList'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useUser } from '@clerk/nextjs'

const MyBooking = () => {
  const { user } = useUser()
  const [bookingList, setBookingList] = React.useState([])

  useEffect(() => {
    user && getUserBookingList()
  }, [])

  const getUserBookingList = () => {
    GlobalApi.getUserBookingList(user?.emailAddresses[0].emailAddress).then(resp => {
      setBookingList(resp.data.data)
    })
  }

  const filterUserBooking = (type: string) => {
    const result = bookingList.filter((item: any) =>
      type === 'upcoming'
        ? new Date(item.attributes.Date) >= new Date()
        : new Date(item.attributes.Date) <= new Date()
    )
    console.log(result)
    return result
  }
  return (
    <div className='px-4 sm:px-10 mt-10'>
      <h2 className='font-bold text-2xl'>My Booking</h2>
      <Tabs defaultValue="upcoming" className="w-full mt-5">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <BookingList
            bookingList={filterUserBooking('upcoming')}
            updateRecord={() => { getUserBookingList() }}
            expired={false}
          />
        </TabsContent>
        <TabsContent value="expired">
          <BookingList bookingList={filterUserBooking('expired')}
            updateRecord={() => { getUserBookingList() }}
            expired={true}
          />
        </TabsContent>
      </Tabs>

    </div>
  )
}

export default MyBooking
