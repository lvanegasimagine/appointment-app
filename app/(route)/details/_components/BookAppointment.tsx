'use client'
import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { CalendarDays, Clock } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'

const BookAppointment = ({ doctor }: { doctor: any }) => {
  const [date, setDate] = useState<Date | undefined>()
  const [timeSlot, setTimeSlot] = useState([])
  const [selectedTimeSlot, setSelectedTimeSlot] = useState()
  const [note, setNote] = useState('')
  const { user } = useUser()
  console.log('🚀 ~ BookAppointment ~ user:', user)

  useEffect(() => {
    getTime()
  }, [])

  const getTime = () => {
    const timeList: any = []
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ':00 AM'
      })
      timeList.push({
        time: i + ':30 AM'
      })
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ':00 PM'
      })
      timeList.push({
        time: i + ':30 PM'
      })
    }

    setTimeSlot(timeList)
  }

  const saveBooking = () => {
    const data = {
      data: {
        UserName: user?.fullName,
        Email: user?.emailAddresses[0].emailAddress,
        Time: selectedTimeSlot,
        Date: date,
        doctor: doctor.id,
        Note: note
      }
    }

    GlobalApi.bookAppointment(data).then((resp) => {
      console.log(resp)
      if (resp) {
        toast.success('Booking Confirmation sent on Email')
      }
    })
  }

  const isPastDay = (day: Date) => {
    return day <= new Date()
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className='mt-3 rounded-full'>Book Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            <div>
              <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
                <div className='flex flex-col gap-3 items-baseline'>
                  <h2 className='flex gap-2 items-center'><CalendarDays className='text-primary h-5 w-5' /> Select Date</h2>
                  <Calendar mode='single' selected={date} onSelect={setDate} className='rounded-md border' disabled={isPastDay} />
                </div>
                <div className='mt-3 md:mt-0'>
                  <h2 className='flex gap-2 items-center mb-5'><Clock className='text-primary h-5 w-5' />Select Time Slot</h2>
                  <div className='grid grid-cols-3 gap-2 border rounded-lg p-5'>
                    {timeSlot?.map((item: any, index: number) => (
                      <h2 key={index} className={`p-2 border cursor-pointer text-center hover:bg-primary hover:text-white rounded-full ${item.time === selectedTimeSlot && 'bg-primary text-white'}`} onClick={() => { setSelectedTimeSlot(item.time) }}>{item.time}</h2>
                    ))}
                  </div>
                </div>
              </div>
              <Textarea className="mt-3" placeholder="Note" onChange={(e) => { setNote(e.target.value) }} />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild >
              <Button type="button"
                className="text-red-500 border-red-500"
                variant="outline"
              >
                Close
              </Button>

          </DialogClose>
          <Button type="button" disabled={!(date && selectedTimeSlot)}
            onClick={() => { saveBooking() }}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookAppointment
