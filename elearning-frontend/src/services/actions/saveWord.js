import Toastify from '../../core/Toastify'
import apiClient from '../../services/api'

const saveWord = (data, clearFields, option, wordId) => {
    apiClient({
        method: option === 'update'? 'patch' : 'post',
        url: option === 'update'? `/api/admin/word/${wordId}` : '/api/admin/word',
        data
    }).then(response => {
        Toastify('success', 'Succesfully saved word!')
        clearFields()
    }).catch(error => {
        Toastify('error', error)
    })
}

export default saveWord
