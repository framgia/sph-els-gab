import React from 'react'
import Divider from '../../core/Divider'

const QuizItem = ({ wordList, currentWord, updateCurrentWord }) => (
    wordList &&
    wordList.map((item, index) => {
        if (index === currentWord) {
            return (
                <div key={ index } className='mb-10'>
                    <Divider />
                    <h3 className='text-2xl font-black text-center'>{ item.word }</h3>
                    <Divider />
                        <div className='flex flex-col gap-10 mx-auto items-center answer-form mb-10'>
                            <ul className='space-y-10'>
                                {
                                    Object.entries(item.choices).map(([keyName, value], index) => {
                                        var currentIndex = index + 1
                                        return (
                                            <div key={ currentIndex } className='flex items-center'>
                                                <li
                                                    className='cursor-pointer font-semibold bg-slate-500 hover:bg-slate-700 text-white py-3 px-6 rounded-sm'
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
