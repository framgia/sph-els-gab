import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Divider from '../../core/Divider'

const CategoriesDropdown = (categoryList, displayType = null) => {
    const navigate = useNavigate()

    return (
        useMemo(() => {
            return (
                <>
                    {
                        categoryList.map((category) => {
                            return (
                                displayType !== null ?
                                    <div className='bg-white shadow-md py-4 px-6 rounded-md card hover:text-white hover:bg-primary-hover' onClick={() => {
                                        navigate(`/quiz/${category.slug}`)
                                    }}>
                                        <h3 className='font-medium text-lg'>{ category.title }</h3>
                                        <Divider classes='my-2' />
                                        <p>{ category.description }</p>
                                    </div>
                                :
                                    <option key={ category.id } value={ category.id }>{ category.title }</option>
                            )
                        })
                    }
                </>
            )
        }, [categoryList])
    )
}

export default CategoriesDropdown
