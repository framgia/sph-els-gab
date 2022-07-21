import Toastify from "../../core/Toastify"
import apiClient from "../../services/api"

const saveWord = (data, clearFields) => {
    apiClient({
        method: 'post',
        url: "/api/admin/word",
        data
    }).then(response => {
        Toastify("Succesfully saved word!")
        clearFields()
    }).catch(error => {
        Toastify("error", error)
    })
}

export default saveWord
