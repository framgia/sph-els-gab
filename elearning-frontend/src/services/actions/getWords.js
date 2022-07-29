import Toastify from '../../core/Toastify'
import apiClient from '../api'

const getWords = (setWordList, param = null) => {
    apiClient({
        method: 'get',
        url: (param === null ? '/api/admin/words' : `/api/admin/category/${param}/words`),
    }).then(response => {
      setWordList(response.data)
    }).catch(error => {
      Toastify("error", error)
    })
}

export default getWords
