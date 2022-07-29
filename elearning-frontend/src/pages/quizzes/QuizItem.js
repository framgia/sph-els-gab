import React from 'react'
import Divider from '../../core/Divider'

const QuizItem = ({ currentItem }) => (
    <>
        {   
            currentItem &&
            currentItem.map((item) => {
                return (
                    <div key={ item.id } className='mb-10'>
                        <Divider />
                        <h3 className='text-2xl font-black text-center'>{ item.word }</h3>
                        <Divider />
                        <div className='flex flex-col gap-10 mx-auto answer-form'>
                            {
                                Object.entries(item.choices).map(([keyName, value], index) => {
                                    var currentIndex = index + 1
                                    return (
                                        <div key={ currentIndex } className='flex items-center'>
                                            <input type='radio' name='selection' value={`${ value.choice }`} className='mr-2' />
                                            <label htmlFor={`${value.choice}`} className='font-semibold'>{ value.choice }</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            })
        }   
    </>
)

export default QuizItem
