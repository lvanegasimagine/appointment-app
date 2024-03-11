'use client'

import CategorySearch from './_components/CategorySearch'
import DoctorList from './_components/DoctorList'
import Hero from './_components/Hero'
import React from 'react'
import GlobalApi from './_utils/GlobalApi'
export default function Home () {
  const [doctorList, setDoctorList] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  console.log('🚀 ~ Home ~ doctorList:', doctorList)

  React.useEffect(() => {
    getDoctorList()
  }, [])

  const getDoctorList = () => {
    setLoading(true)

    GlobalApi.getDoctorList().then((resp: any) => {
      setDoctorList(resp.data.data)
      setLoading(false)
    })
  }
  return (
    <main>
      <Hero />
      <CategorySearch />
      <DoctorList doctorList={doctorList} loading={loading}/>
    </main>
  )
}
