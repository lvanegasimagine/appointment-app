'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'
import GlobalApi from '../_utils/GlobalApi'
import Image from 'next/image'
import Link from 'next/link'

function CategorySearch () {
  const [categoryList, setCategoryList] = React.useState([])

  React.useEffect(() => {
    getCategoryList()
  }, [])

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp: any) => {
      setCategoryList(resp.data.data)
    })
  }

  return (
    <section className='mb-10 items-center px-5 flex flex-col gap-2'>
      <h2 className='font-bold text-4xl tracking-wide'>Search <span className='text-primary'>Doctors</span></h2>
      <h2 className='capitalize text-gray-500 text-xl'>Search your doctor and book appointment in one click</h2>
      <div className="flex w-full max-w-sm items-center space-x-5 mt-3">
        <Input type="text" placeholder="Search..." />
        <Button type="submit"><Search className='h-4 w-4 mr-2' /> Search</Button>
      </div>
      <div className='grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6'>
        {categoryList.length > 0
          ? categoryList.map((item: any, index) => (
            <Link href={`/search/${item.attributes.Name}`} key={index} className='flex flex-col text-center items-center p-5 bg-blue-50 m-2 rounded-lg gap-2 hover:scale-110 transition-all ease-in-out cursor-pointer'>
              <Image src={item.attributes?.Icon?.data.attributes.url} alt='icon' width={40} height={40} />
              <label className='text-blue-600 text-sm hidden lg:block sm:block'>{item?.attributes?.Name}</label>
            </Link>
          ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div key={index} className='h-[120px] w-[130px] m-2 bg-slate-200 animate-pulse rounded-lg'/>
            ))
        }
      </div>
    </section>
  )
}

export default CategorySearch
