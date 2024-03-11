'use client'
import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import DoctorDetail from '../_components/DoctorDetail'
import DoctorSuggestionList from '../_components/DoctorSuggestionList'
import { Skeleton } from '@/components/ui/skeleton'

const Details = ({ params }: { params: { recordId: string } }) => {
  const [doctor, setDoctor] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    getDoctorById()
  }, [])

  const getDoctorById = () => {
    setLoading(true)
    GlobalApi.getDoctorById(params.recordId).then((resp: any) => {
      setDoctor(resp.data.data)
      setLoading(false)
    })
  }

  if (loading) {
    return (
      <div className='p-5 md:px-20'>
        <section className="grid grid-cols-1 md:grid-cols-4">
          <div className='col-span-3'>
            <div className="grid grid-cols-1 md:grid-cols-3 border-[1px] p-3 mt-3 rounded-lg">
              <Skeleton className="w-full md:w-[200px] h-[200px]" />
              <div className="col-span-2 mt-5 flex flex-col space-y-4 items-baseline">
                <Skeleton className='w-[200px] h-[32px]' />
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-2">
                    <Skeleton className='w-[30px] h-[30px] rounded-full' />
                    <Skeleton className='w-[200px] h-[30px] rounded-lg' />
                  </div>
                ))}
                <div className='h-[20px] w-[80px] rounded-full px-2 bg-slate-200 animate-pulse' />
                <div className="flex gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className='w-[30px] h-[30px] rounded-full' />
                  ))}
                </div>
                <Skeleton className='w-[300px] h-[35px] rounded-full' />
              </div>
            </div>
            <div className="p-3 border-[1px] rounded-lg mt-5">
              <Skeleton className="w-[200px] h-[30px] mb-5" />
              <Skeleton className='w-full h-[200px]' />
            </div>
          </div>

          <div>
            <div className=' p-4 border-[1px] mt-5 md:ml-5 rounded-lg w-full'>
              <h2 className='mb-3 font-bold'>Suggestions</h2>
              <div className=' mb-4 p-3 shadow-sm w-full cursor-pointer hover:bg-slate-100 rounded-lg md:flex md:flex-col lg:flex lg:flex-row items-center gap-3'>
                <div className='h-[80px] w-[80px] m-2 rounded-full bg-slate-200 animate-pulse' />
                <div className='mt-3 flex-col flex gap-1 items-baseline'>
                  <div className='h-[20px] w-[80px] rounded-full px-2 bg-slate-200 animate-pulse' />
                  <div className='h-[20px] w-[120px] rounded-full px-2 bg-slate-200 animate-pulse' />
                  <div className='h-[20px] w-[80px] rounded-full px-2 bg-slate-200 animate-pulse' />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className='p-5 md:px-20'>
      <h2 className='font-bold text-[22px]'>Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className='col-span-3'>
          {doctor && <DoctorDetail doctor={doctor} />}
        </div>
        <div>
          <DoctorSuggestionList />
        </div>
      </div>
    </div>
  )
}

export default Details
