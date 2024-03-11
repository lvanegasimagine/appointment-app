import React from 'react'
import CategoryList from './_components/CategoryList'

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='grid grid-cols-4'>
      <div className='hidden md:block'>
        {/* Category  */}
        <CategoryList />
      </div>
      <div className='col-span-4 md:col-span-3'>
        {children}
      </div>
    </main>
  )
}

export default SearchLayout
