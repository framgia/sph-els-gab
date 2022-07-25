import React, { useMemo } from 'react'

const WordsTable = (wordList, fillWord = null) => {
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
                                fillWord !== null ?
                                    <td className='flex'>
                                        <button onClick={e => fillWord(e, word.id) }>Edit</button>
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
