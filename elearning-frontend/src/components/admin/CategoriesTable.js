import React, { useMemo } from 'react'
import Toastify from '../../core/Toastify'
import apiClient from '../../services/api'

const CategoriesTable = (categoryList, setCategory, setHasSelectedCategory, ClearFields) => {
    const fillCategory = (e, categoryId) => {
        e.preventDefault()

        apiClient({
            method: 'get',
            url: `/api/admin/category/${categoryId}`
        }).then(response => { 
            setCategory(response.data)
            setHasSelectedCategory(true)
        }).catch(error => {
            Toastify('error', error)
        })
    }

    const deleteCategory = (e, categoryId) => {
        e.preventDefault()
    
        if (window.confirm('Are you sure you want to delete this category?')) {
            apiClient({
                method: 'delete',
                url: `/api/admin/category/${categoryId}`
            }).then(response => {
                ClearFields()
                Toastify('success', 'Succesfully deleted the category')
            }).catch(error => {
                Toastify('error', error)
            })
        }
    }

    return (
        useMemo(() => {
            return (
                <>
                    {
                        categoryList.map((category) => {
                            return (
                                <tr key={category.id}>
                                    <td>{category.title}</td>
                                    <td>
                                        <div className='flex'>
                                            <button onClick={e => fillCategory(e, category.id)}>EDIT</button>
                                            <button onClick={e => deleteCategory(e, category.id)}>DELETE</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </>
            )
        }, [categoryList])
    )
}

export default CategoriesTable
