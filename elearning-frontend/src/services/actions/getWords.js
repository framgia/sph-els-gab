import Toastify from '../../core/Toastify'
import apiClient from '../api'

const getWords = (setWordList, categoryId = null) => {
    apiClient({
        method: 'get',
        url: (categoryId === null ? '/api/admin/words' : `/api/admin/category/${categoryId}/words`),
    }).then(response => {
      setWordList(response.data)
    }).catch(error => {
      Toastify("error", error)
      console.log(error)
    })
}

export default getWords
