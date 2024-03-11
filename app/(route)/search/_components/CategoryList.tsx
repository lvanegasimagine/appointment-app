'use client'
import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const CategoryList = () => {
  const [categoryList, setCategoryList] = React.useState([])
  const params = usePathname()
  const category = params.split('/')[2]

  React.useEffect(() => {
    getCategoryList()
  }, [])

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp: any) => {
      setCategoryList(resp.data.data)
    })
  }

  return (
        <div className='h-screen mt-5 flex flex-col'>
            <Command >
                <CommandInput placeholder="Search..." />
                <CommandList className="overflow-visible">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions" >
                        {categoryList.map((item: any, index) => (
                            <CommandItem key={index}>
                                <Link href={`/search/${item?.attributes?.Name}`} className={`p-2 flex gap-2 text-[14px] text-blue-600 items-center rounded-md cursor-pointer w-full ${category === item.attributes.Name && 'bg-blue-100'}`}>
                                    <Image src={item.attributes?.Icon?.data.attributes?.url} alt='icon' width={25} height={25} />
                                    <label>{item.attributes.Name}</label>
                                </Link>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
  )
}

export default CategoryList
