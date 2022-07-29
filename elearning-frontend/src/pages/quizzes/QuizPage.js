import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import getWords from '../../services/actions/getWords'
import ReactPaginate from 'react-paginate'
import QuizItem from './QuizItem'
import Divider from '../../core/Divider'

const QuizPage = () => {
    let { slug } = useParams()

    const [changeWordData, setChangeWordData] = useState(true)
    const [wordList, setWordList] = useState([])

    const [currentItem, setCurrentItem] = useState(null)
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)

    useEffect(() => {
        getWords(setWordList, slug)
        setChangeWordData(false)
    }, [])

    useEffect(() => {
        const endOffset = itemOffset + 1
        setCurrentItem(wordList.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(wordList.length / 1))
    }, [wordList, itemOffset])

    const nextQuestion = (e) => {
        const newOffset = (e.selected * 1) % wordList.length
        setItemOffset(newOffset)
    }

    return (
        <>
            <QuizItem currentItem={ currentItem } />
            <Divider />
            <div className='quiz-pagination'>
                <ReactPaginate
                    breakLabel='...'
                    nextLabel='next >'
                    onPageChange={ nextQuestion }
                    pageRangeDisplayed={5}
                    pageCount={ pageCount }
                    previousLabel='< previous'
                    renderOnZeroPageCount={ null }
                />
            </div>
        </>
    )
}

export default QuizPage
