import React, { useMemo } from 'react'

const CategoriesDropdown = (categoryList) => {
    return (
        useMemo(() => {
            return (
                <>
                    {
                        categoryList.map((category) => {
                            return <option key={ category.id } value={ category.id }>{ category.title }</option>
                        })
                    }
                </>
            )
        }, [categoryList])
    )
}

export default CategoriesDropdown
