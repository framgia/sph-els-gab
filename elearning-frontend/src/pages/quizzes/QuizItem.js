import React from 'react'
import Divider from '../../core/Divider'

const QuizItem = ({ wordList, currentWord, updateCurrentWord }) => (
    wordList &&
    wordList.map((item, index) => {
        if (index === currentWord) {
            return (
                <div key={ index } className='mb-10'>
                    <Divider />
                    <h4 className='text-lg font-bold text-center'>{ item.word.toUpperCase() }</h4>
                    <Divider />
                        <div className='flex flex-col gap-10 mx-auto items-center answer-form mb-10'>
                            <ul className='space-y-5'>
                                {
                                    Object.entries(item.choices).map(([keyName, value], index) => {
                                        var currentIndex = index + 1
                                        return (
                                            <div key={ currentIndex } className='flex items-center'>
                                                <li
                                                    className='cursor-pointer font-medium text-md border-2 border-primary-hover text-primary-hover hover:bg-primary-hover hover:text-white py-2 px-4 rounded-full text-center btn'
                                                    style={{ minWidth: '250px' }}
                                                    onClick={e => updateCurrentWord(value.choice)} >
                                                    {value.choice}
                                                </li>
                                            </div>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                </div>
            )
        }
    })
)

export default QuizItem
