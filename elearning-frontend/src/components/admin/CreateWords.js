import React, { useCallback, useEffect, useMemo, useState } from 'react'

import InputField from '../../core/InputField'
import Button from '../../core/Button'
import Divider from '../../core/Divider'

import saveWord from '../../services/actions/saveWord'
import labelArray from '../../constants/labelArray'
import getWords from '../../services/actions/getWords'
import getCategories from '../../services/actions/getCategories'
import CategoriesDropdown from './CategoriesDropdown'
import WordsTable from './WordsTable'

const CreateWords = () => {
    // Cateogry List
    const [categoryList, setCategoryList] = useState([])

    // Word List
    const [changeWordData, setChangeWordData] = useState(true)
    const [wordList, setWordList] = useState([])
    const choices = [
        'choice1', 'choice2', 'choice3', 'choice4'
    ]

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
    const getCategoryList = useMemo(() => {
        getCategories(setCategoryList)
    }, [])

    // Fetch all words
    const getWordList = useCallback(async () => {
        getWords(setWordList)
        setChangeWordData(false)
    }, [changeWordData])

    useEffect(() => {
        getWordList()
    }, [getWordList])

    // Save word
    const SaveWord = (e) => {
        e.preventDefault()
        saveWord(word, clearFields)
        setChangeWordData(true)
    }

    // Clear States
    const clearFields = () => {
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

    // Set field choices
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

  return (
    <>
        <div className='dashboard py-5 px-10'>
            <div className="mb-5">
                <h4 className='title text-left'>QUIZZES MANAGEMENT - ADD WORD(S)</h4>
            </div>
            <div style={{ height: '250px', maxHeight: '250px', overflowY: 'scroll' }} className='border-2 border-slate-500'>
                <table className='w-full border-collapse table-fixed'>
                    <thead className='bg-black border-b sticky top-0'>
                        <tr>
                            <td className='text-center text-white py-4'>Category</td>
                            <td className='text-center text-white py-4'>Word</td>
                            <td className='text-center text-white py-4'>Choices</td>
                            <td className='text-center text-white py-4'>Correct Answer</td>
                        </tr>
                    </thead>
                    <tbody>
                        { WordsTable(wordList) }
                    </tbody>
                </table>
            </div>
            <Divider />
            <div>
                <div className='mb-5'>
                    <p>Add a new word by using the form below.</p>
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
                                { CategoriesDropdown(categoryList) }
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
                            value={ word.word }
                            require={ true } />
                    </div>
                    <table className='w-full'>
                        <tbody>
                            <tr>
                                <th>Choices</th>
                                <th>Mark as correct answer</th>
                            </tr>
                            {
                                Object.entries(word.choices).map(([key, value], index) => {
                                    var currentIndex = index + 1
                                    return (
                                        <tr key={ index }>
                                            <td>
                                                <InputField
                                                        type="text"
                                                        name={ choices[index] }
                                                        classes={`border-2`}
                                                        onChange={(e) => {
                                                            setChoiceValue(currentIndex, e.target.value)
                                                        }}
                                                        value={ value.choice }
                                                        require={ true } />
                                            </td>
                                            <td className='text-center'>
                                                <input
                                                    type='checkbox'
                                                    name={ `${choices[index]}c` }
                                                    onChange={() => {
                                                        setCorrectAnswer(currentIndex)
                                                    }}
                                                    checked={ value.is_correct } />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <Divider />
                    <div className="mt-4 flex justify-end gap-5">
                        <Button
                            text='Clear'
                            type='button'
                            classes='bg-red-500 hover:bg-red-700'
                            style={{width:'200px', minWidth:'200px'}}
                            onClick={(e) => {
                                e.preventDefault()
                                clearFields()
                            }} />
                        <Button
                            text='Save Information'
                            classes='bg-blue-500 hover:bg-blue-700'
                            style={{width:'200px', minWidth:'200px'}} />
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default CreateWords
