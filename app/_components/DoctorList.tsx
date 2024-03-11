import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const DoctorList = ({ doctorList, loading, heading }: { doctorList: any, loading: boolean, heading?: 'Popular Doctors' }) => {
  if (loading) {
    return (
            <div className='grid grid-cols-1 p-2 sm:grid-cols-2 sm:p-4 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                    <div className="h-[220px] bg-slate-200 w-full rounded-lg animate-pulse" key={index} />
                ))}
            </div>
    )
  }
  return (
        <section className='mb-10'>
            <h1 className='font-bold text-2xl mb-6 px-4'>{heading}</h1>
            <div className='grid grid-cols-1 p-2 sm:grid-cols-2 sm:p-4 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {doctorList.length > 0
                  ? doctorList.map((item: any, index: number) => (
                        <article
                            key={index}
                            className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
                        >
                            <div className="rounded-[10px] bg-white p-4 !pt-10 sm:p-4">
                                <Image src={item.attributes?.image?.data?.attributes?.url} alt='doctor' width={500} height={200} className='h-[200px] w-full object-cover rounded-lg' />
                                <div className='mt-4 items-baseline flex flex-col space-y-2'>
                                    <div className='flex gap-2'>
                                        {item.attributes?.categories.data.map((category: any, index: number) => (
                                            <span key={index} className='text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary text-pretty'>
                                                {category.attributes?.Name}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className='font-bold'>Dr. {item.attributes.Name}</h3>
                                    <h4 className='text-primary text-sm'>{item.attributes?.Year_of_Experience} {item.attributes?.Year_of_Experience > 1 ? 'Years' : 'Year'}</h4>
                                    <p className='text-gray-500 text-sm'>{item.attributes?.Address}</p>
                                    <Link href={`/details/${item.id}`} className='p-2 px-3 border-[1px] border-primary text-primary rounded-full w-full text-center text-sm mt-2 cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out'>Book Now</Link>
                                </div>
                            </div>
                        </article>
                  ))
                  : <div className='m-10'>
                        <h1>Doctor Not Found</h1>
                    </div>
                }
            </div>
        </section>
  )
}

export default DoctorList
