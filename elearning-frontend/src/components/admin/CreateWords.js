import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../services/api'
import Toastify from '../../core/Toastify'
import saveWord from '../actions/saveWord'
import InputField from '../../core/InputField'
import Divider from '../../core/Divider'
import { ToastContainer } from 'react-toastify'

const CreateWords = (props) => {
    const navigate = useNavigate()

    // Cateogry List
    const [categoryList, setCategoryList] = useState([])
    const [isCategoryLoading, setIsCategoryLoading] = useState(true)

    // Word
    const [word, setWord] = useState({
        category_id: '',
        word: '',
        choices: {
            firstChoice: {
                choice: '',
                is_correct: false,
                label: 'firstChoice'
            },
            secondChoice: {
                choice: '',
                is_correct: false,
                label: 'secondChoice'
            },
            thirdChoice: {
                choice: '',
                is_correct: false,
                label: 'thirdChoice'
            },
            fourthChoice: {
                choice: '',
                is_correct: false,
                label: 'fourthChoice'
            },
        }
    })

    // Fetch all categories
    const GetCategoryList = useCallback(async () => {
        apiClient({
            method: "get",
            url: "/api/admin/categories"
        }).then(response => {
            setCategoryList(response.data.categories)
            setIsCategoryLoading(false)
        }).catch(error => {
            Toastify("error", error)
        })
    }, [])

    useEffect(() => {
        if (!props.session) {
            navigate('/')
        }
        else {
            if(props.admin) {
                GetCategoryList()
            }
            else {
                navigate('/dashboard')
            }
        }
    }, [props.session])

    // Save word
    const SaveWord = (e) => {
        e.preventDefault()
        saveWord(word, ClearFields)
    }

    // Clear States
    const ClearFields = () => {
        setWord({
            category_id: '',
            word: '',
            choices: {
                firstChoice: {
                    choice: '',
                    is_correct: false
                },
                secondChoice: {
                    choice: '',
                    is_correct: false
                },
                thirdChoice: {
                    choice: '',
                    is_correct: false
                },
                fourthChoice: {
                    choice: '',
                    is_correct: false
                },
            },
            correct_answer: ''
        })
    }

    const labelArray = (acc, cv) => {
        return {
            ...acc,
            [cv.label]: cv
        }
    }

    // Set checkbox states
    const setChoiceValue = (selectedIndex, input) => {
        setWord({
            ...word,
            choices:
                Object.entries(word.choices).map(([key, value], index) => {
                    var currentIndex = index + 1
                    return {
                        choice: (currentIndex === selectedIndex) ? input : value.choice,
                        is_correct: value.is_correct,
                        label: value.label
                    }
                }).reduce(labelArray, {})
        })
    }

    // Set checkbox states
    const setCorrectAnswer = (selectedIndex, type, input) => {
        setWord({
            ...word,
            choices:
                Object.entries(word.choices).map(([key, value], index) => {
                    var currentIndex = index + 1
                    return {
                        choice: value.choice,
                        is_correct: (currentIndex === selectedIndex) ? !value.is_correct : false,
                        label: value.label
                    }
                }).reduce(labelArray, {})
        })
    }

    var view_element = ""
    var dropdown_options = ""

    if (isCategoryLoading) {
        dropdown_options = ""
    }
    else {
        dropdown_options = 
        <>
            {
                categoryList.map((category) => {
                    return <option key={ category.id } value={ category.id }>{ category.title }</option>
                })
            }
        </>
    }

  return (
    <>
        <div className='dashboard py-5 px-10'>
            <div className="mb-5">
                <h4 className='title text-left'>QUIZZES MANAGEMENT</h4>
            </div>
            <div>
                {/* Placeholder for retrieving words */}
                <table className='border-separate [border-spacing:1rem] w-full'>
                    <tbody>
                        <tr>
                            <td>Category</td>
                            <td>Word</td>
                            <td>Choices</td>
                            <td>Correct Answer</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Divider />
            <div>
                <div className='mb-5'>
                    <p>Add a new category by using the form below or select any cateogry to edit.</p>
                </div>
                <form onSubmit={ SaveWord } encType='application/json' className='border border-black py-5 px-10'>
                    {/* Category */}
                    <div className='form-group mb-8'>
                        <label>Category</label>
                        <select
                            name='category'
                            onChange={(e) => {
                                setWord({
                                    ...word,
                                    category_id: e.target.value
                                })
                            }}
                            value={ word.category_id }
                            className="appearance-none border-b-2 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none">
                                <option value='-'>SELECT CATEGORY</option>
                                { dropdown_options }
                        </select>
                    </div>
                    
                    {/* Word */}
                    <div className="form-group mb-8">
                        <label>Word</label>
                        <InputField
                            type="text"
                            name="word"
                            onChange={(e) => {
                                setWord({
                                    ...word,
                                    word: e.target.value,
                                })
                            }}
                            value={ word.word } />
                    </div>
                    <table className='w-full'>
                        <tbody>
                            <tr>
                                <th>Choices</th>
                                <th>Mark as correct answer</th>
                            </tr>
                            {/* First Choice */}
                            <tr>
                                <td>
                                    <InputField
                                            type="text"
                                            name="choice1"
                                            classes={`border-2`}
                                            onChange={(e) => {
                                                setChoiceValue(1, e.target.value)
                                            }}
                                            value={ word.choices.firstChoice.choice } />
                                </td>
                                <td className='text-center'>
                                    <input
                                        type='checkbox'
                                        name='choice1c'
                                        onChange={() => {
                                            setCorrectAnswer(1)
                                        }}
                                        checked={ word.choices.firstChoice.is_correct } />
                                </td>
                            </tr>
                            {/* Second Choice */}
                            <tr>
                                <td>
                                    <InputField
                                        type="text"
                                        name="choice2"
                                        classes={`border-2`}
                                        onChange={(e) => {
                                            setChoiceValue(2, e.target.value)
                                        }}
                                        value={ word.choices.secondChoice.choice } />
                                </td>
                                <td className='text-center'>
                                    <input
                                        type='checkbox'
                                        name='choice2c'
                                        onChange={() => {
                                            setCorrectAnswer(2)
                                        }}
                                        checked={ word.choices.secondChoice.is_correct } />
                                </td>
                            </tr>
                            {/* Third Choice */}
                            <tr>
                                <td>
                                    <InputField
                                        type="text"
                                        name="choice3"
                                        classes={`border-2`}
                                        onChange={(e) => {
                                            setChoiceValue(3, e.target.value)
                                        }}
                                        value={ word.choices.thirdChoice.choice } />
                                </td>
                                <td className='text-center'>
                                    <input
                                        type='checkbox'
                                        name='choice3c'
                                        onChange={() => {
                                            setCorrectAnswer(3)
                                        }}
                                        checked={ word.choices.thirdChoice.is_correct } />
                                </td>
                            </tr>
                            {/* Fourth Choice */}
                            <tr>
                                <td>
                                    <InputField
                                        type="text"
                                        name="choice4"
                                        classes={`border-2`}
                                        onChange={(e) => {
                                            setChoiceValue(4, e.target.value)
                                        }}
                                        value={ word.choices.fourthChoice.choice } />
                                </td>
                                <td className='text-center'>
                                    <input
                                        type='checkbox'
                                        name='choice4c'
                                        onChange={() => {
                                            setCorrectAnswer(4)
                                        }}
                                        checked={ word.choices.fourthChoice.is_correct } />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Divider />
                    <div className="mt-4 flex justify-end gap-5">
                        <a
                            role='button'
                            className="bg-red-500 hover:bg-red-700 text-white text-center font-bold py-2 px-4 rounded"
                            style={{width:'200px', minWidth:'200px'}}
                            onClick={(e) => {
                                e.preventDefault()
                                ClearFields()
                            }}
                            >Clear</a>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{minWidth:'200px'}}>Save Information</button>
                    </div>
                </form>
            </div>
        </div>
        <ToastContainer />
    </>
  )
}

export default CreateWords
