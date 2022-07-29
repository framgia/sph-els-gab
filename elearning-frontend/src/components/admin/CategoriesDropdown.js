import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

const CategoriesDropdown = (categoryList, displayType = null) => {
    return (
        useMemo(() => {
            return (
                <>
                    {
                        categoryList.map((category) => {
                            return (
                                displayType !== null ?
                                    <Link key={ category.id } to={`/quiz/${category.slug}`}>{ category.title }</Link>
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
