import Toastify from '../../core/Toastify'
import apiClient from '../api'

const getCategories = (setCategoryList) => {
    apiClient({
        method: "get",
        url: "/api/admin/categories"
    }).then(response => {
        setCategoryList(response.data.categories)
    }).catch(error => {
        Toastify("error", error)
    })
}

export default getCategories