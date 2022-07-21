import Toastify from "../../core/Toastify"
import apiClient from "../../services/api"

const checkAdmin = async() => {
    const data = await apiClient({
        method: "get",
        url: "/api/user",
    }).then(response => {
        return !!response.data.is_admin
    }).catch(error => {
        Toastify(!((typeof error.response.data.errors) === 'undefined') ? Object.values(error.response.data.errors)[0][0]  : error.message)
    })
}

export default checkAdmin
