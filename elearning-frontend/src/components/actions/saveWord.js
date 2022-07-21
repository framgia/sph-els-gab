import Toastify from "../../core/Toastify"
import apiClient from "../../services/api"

const saveWord = (data, clearFields) => {
    apiClient({
        method: 'post',
        url: "/api/admin/quizzes",
        data: {
            category_id: data.category_id,
            word: data.word,
            choices: data.choices,
        }
    }).then(response => {
        Toastify("Succesfully saved word!")
        clearFields()
    }).catch(error => {
        Toastify(!((typeof error.response.data.errors) === 'undefined') ? Object.values(error.response.data.errors)[0][0]  : error.message)
        console.log(error)
    })
}

export default saveWord
