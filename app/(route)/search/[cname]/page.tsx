'use client'
import DoctorList from '@/app/_components/DoctorList'
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'

const Search = ({ params }: { params: any }) => {
  const [doctorList, setDoctorList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getDoctors()
  }, [])

  const getDoctors = () => {
    setLoading(true)
    GlobalApi.getDoctorByCategory(params.cname).then((resp: any) => {
      setDoctorList(resp.data.data)
      setLoading(false)
    })
  }

  return (
    <div className='mt-5'>
      <DoctorList heading={params.cname} loading={loading} doctorList={doctorList}/>
    </div>
  )
}

export default Search
