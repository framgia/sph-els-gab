import React from 'react'
import { Link } from 'react-router-dom'

const Results = (wordList, score) => (
    <>
        <div className='flex flex-row justify-center items-center py-20'>
            <div className='bg-green-200 rounded-full p-20'>
                <span className='font-semibold text-xl'>{ score } / { wordList.length }</span>
            </div>
        </div>
        <table className='table-fixed'>
            <tbody>
                <tr>
                    <th>Word</th>
                    <th>Correct Answer</th>
                    <th>Your Answer</th>
                </tr>
                {
                    wordList.map((item, index) => {
                        return (
                            <tr key={ index }>
                                <td className='text-center py-2 px-4'>{ item.word }</td>
                                <td className='text-center py-2 px-4'>{ item.correct_answer }</td>
                                <td className={ `text-center py-2 px-4 text-white ${item.is_correct ? 'bg-green-500' : 'bg-red-500' }`}>{ item.selected_answer }</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table> 
        <div className='flex flex-row justify-center items-center'>
            <Link to='/quiz' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Take another quiz</Link>
        </div>
    </>
)

export default Results
