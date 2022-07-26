import React, { useCallback, useEffect, useState } from 'react'
import apiClient from '../../services/api'

import Toastify from '../../core/Toastify'
import InputField from '../../core/InputField'
import Button from '../../core/Button'
import Divider from '../../core/Divider'


const Categories = () => {
    // Cateogry List
    const [categoryList, setCategoryList] = useState([])

    const [changeData, setChangeData] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    // Category
    const [hasSelectedCategory, setHasSelectedCategory] = useState(false)
    const [category, setCategory] = useState({
        id: '',
        title: '',
        description: '',
        slug: '',
    })

    // Fetch all categories
    const FetchCategories = useCallback(async () => {
        const data = await apiClient({
            method: "get",
            url: "/api/admin/categories"
        }).then(response => {
            setCategoryList(response.data.categories)
            setChangeData(false)
        }).catch(error => {
            Toastify("error", error)
        })
    }, [changeData])

    // Component Mount
    useEffect(() => {
        FetchCategories()
        setIsLoading(false)
    }, [FetchCategories, changeData])

    // Save selected category
    const SaveCategory = (e) => {
        e.preventDefault()

        if (!hasSelectedCategory && (category.title === '' || category.description === '' || category.slug === '')) {
            window.alert('No data to save!')
            return
        }

        apiClient({
            method: (hasSelectedCategory ? "put" : "post"),
            url: (hasSelectedCategory ? "/api/admin/category/" + category.id : "/api/admin/category"),
            data: {
                title: category.title,
                description: category.description,
                slug: category.slug,
            }
        }).then(response => {
            ClearFields()
            Toastify("success", "Succesfully saved the category")
        }).catch(error => {
            Toastify("error", error)
        })
    }

    // Clear input fields
    const ClearFields = () => {
        setCategory({
            ...category,
            id: '',
            title: '',
            description: '',
            slug: ''
        })

        setHasSelectedCategory(false)
        setChangeData(true)
    }

    var view_element = ""

    if (isLoading) {
        view_element = <tr><td colSpan={2}>LOADING DATA</td></tr>
    }
    else {
        view_element =
            <>
                {
                    categoryList.map((category) => {
                        return (
                            <tr key={category.id}>
                                <td>{category.title}</td>
                                <td>
                                    <div className='flex'>
                                        <button onClick={(e) => {
                                            e.preventDefault()

                                            apiClient({
                                                method: "get",
                                                url: "/api/admin/category/" + category.id
                                            }).then(response => { 
                                                setCategory({
                                                    ...category,
                                                    ...response.data.category
                                                })
                                                setHasSelectedCategory(true)
                                            }).catch(error => {
                                                Toastify("error", error)
                                            })
                                        }}>EDIT</button>
                                        <button onClick={(e) => {
                                            e.preventDefault()

                                            if (window.confirm('Are you sure you want to delete this category?')) {
                                                apiClient({
                                                    method: "delete",
                                                    url: "/api/admin/category/" + category.id
                                                }).then(response => {
                                                    ClearFields()
                                                    Toastify("success", "Succesfully deleted the category")
                                                }).catch(error => {
                                                    Toastify("error", error)
                                                })
                                            }
                                        }}>DELETE</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
            </>
    }

    return (
        <>
            <div className='dashboard py-20 px-10'>
                <div className="mb-5">
                    <h4 className='title text-left'>CATEGORY MANAGEMENT</h4>
                </div>
                <div className='grid grid-cols-5 gap-5'>
                    <div className='col-span-1'>
                        <table className='border-separate [border-spacing:1rem]'>
                            <tbody>
                                <tr>
                                    <td>Title</td>
                                    <td>Actions</td>
                                </tr>
                                { view_element }
                            </tbody>
                        </table>
                    </div>
                    <div className='col-span-4'>
                        <div className='mb-5'>
                            <p>Add a new category by using the form below or select any cateogry to edit.</p>
                        </div>
                        <form onSubmit={ SaveCategory } encType="application/json">
                            <div className='grid grid-cols-1 gap-5'>
                                <div className="col-span-3">
                                    {/* Title */}
                                    <div className="form-group mb-8">
                                        <label>Title</label>
                                        <InputField
                                            type="text"
                                            name="title"
                                            onChange={(e) => {
                                                if (!hasSelectedCategory) {
                                                    setCategory({
                                                        ...category,
                                                        title: e.target.value,
                                                        slug: (e.target.value).replace(' ', '-').toLowerCase()
                                                    })
                                                }
                                                else {
                                                    setCategory({
                                                        ...category,
                                                        title: e.target.value,
                                                    })
                                                }
                                            }}
                                            value={ category.title }
                                            require={ true } />
                                    </div>
                                    {/* Description */}
                                    <div className="form-group mb-8">
                                        <label>Description</label>
                                        <InputField
                                            type="text"
                                            name="descripion"
                                            onChange={e => {
                                                setCategory({
                                                    ...category,
                                                    description: e.target.value,
                                                })
                                            }}
                                            value={ category.description } />
                                    </div>
                                    {/* Slug */}
                                    <div className="form-group mb-8">
                                        <label>Slug</label>
                                        <InputField
                                            type="text"
                                            name="slug"
                                            onChange={e => setCategory({
                                                ...category,
                                                slug: e.target.value
                                            })}
                                            value={ category.slug }
                                            require={ true } />
                                    </div>
                                    <div className="mt-4 flex justify-end gap-5">
                                        <Button
                                            text='Clear'
                                            type='button'
                                            classes='bg-red-500 hover:bg-red-700'
                                            style={{width:'200px', minWidth:'200px'}}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                ClearFields()
                                            }} />
                                        <Button
                                            text={ hasSelectedCategory ? "Save Category" : "Add Category" }
                                            classes='bg-blue-500 hover:bg-blue-700'
                                            style={{width:'200px', minWidth:'200px'}} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories
