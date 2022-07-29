import React, { useEffect, useMemo, useState } from 'react'
import CategoriesDropdown from '../../components/admin/CategoriesDropdown'
import getCategories from '../../services/actions/getCategories'
import Divider from '../../core/Divider'

const SelectQuiz = () => {
    const [categoryList, setCategoryList] = useState([])

    const fetchCateories = useMemo(() => {
        getCategories(setCategoryList)
    }, [])

    return (
      <div className='w-full py-10 px-20'>
          <h2 className='font-bold text-2xl text-center'>CHOOSE A CATEGORY</h2>
          <Divider />
          <div className='flex flex-col items-center gap-4 category-selection'>
              { CategoriesDropdown(categoryList, 'buttons') }
          </div>
      </div>
    )
}

export default SelectQuiz
