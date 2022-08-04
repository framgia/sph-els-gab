import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import getWords from '../../services/actions/getWords'
import Divider from '../../core/Divider'
import QuizItem from './QuizItem'
import Results from './Results'

const QuizPage = () => {
    let { slug } = useParams()

    const [wordList, setWordList] = useState([])

    const [showResults, setShowResults] = useState(false)
    const [score, setScore] = useState(0)
    const [currentWord, setcurrentWord] = useState(0)   

    const data = useMemo(() => {
        getWords(setWordList, slug)
    }, [])

    const updateCurrentWord = (answer) => {
        wordList[currentWord].is_correct = wordList[currentWord].correct_answer === answer ? true : false
        wordList[currentWord].selected_answer = answer

        if (wordList[currentWord].correct_answer === answer ? true : false) {
            setScore(score + 1)
        }
    
        if (currentWord + 1 < wordList.length) {
            setcurrentWord(currentWord + 1)
        }
        else {
            setShowResults(true)
        }
    }

    return (
        <>
            {
                showResults ?
                    <>
                        { Results(wordList, score) }
                    </>
                :
                    <>
                        <QuizItem
                            wordList={ wordList }
                            updateCurrentWord={ updateCurrentWord }
                            currentWord={ currentWord } />
                    </>
            }
        </>
    )
}

export default QuizPage
