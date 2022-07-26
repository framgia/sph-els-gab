import React, { useMemo } from 'react'
import Button from '../../core/Button'

const WordsTable = (wordList, fillWord = null, deleteWord = null) => {
    return (
        useMemo(() => {
            return (
                wordList.map((word) => {
                    return (
                        <tr key={ word.id }>
                            <td className='text-center'>{ word.category.title }</td>
                            <td className='text-center'>{ word.word }</td>
                            <td className='text-center'>
                                {
                                    Object.entries(word.choices).map(([key, value], index) => {
                                        return <p key={ key }
                                                    className={`text-center ${index % 2 == 0 ? 'bg-slate-200' : ''}`}>
                                                    { value.choice }
                                                </p>
                                    })
                                }
                            </td>
                            <td className='text-center'>{ word.correct_answer }</td>
                            {
                                (fillWord !== null && deleteWord !== null) ?
                                    <td className='flex justify-center'>
                                        <Button
                                            text='EDIT'
                                            type='button'
                                            classes='bg-blue-500 hover:bg-blue-700'
                                            onClick={e => fillWord(e, word.id) } />

                                        <Button
                                            text='DELETE'
                                            type='button'
                                            classes='bg-red-500 hover:bg-red-700'
                                            onClick={e => deleteWord(e, word.id) } />
                                    </td>
                                :
                                <></>
                            }
                        </tr>
                    )
                })
            )
        }, [wordList])
    )
}

export default WordsTable
