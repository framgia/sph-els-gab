import axios from 'axios'
import Cookies from 'js-cookie'

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,
    headers: {
        common: {
            'X-CSRFToken': Cookies.get('csrftoken'),
            'Content-Type': 'application/json'
        }
    }
})

apiClient.interceptors.request.use(function(config) {
    const token = localStorage.getItem('user')
    config.headers.Authorization =  token ? `Bearer ${token}` : ''
    return config
})

export default apiClient
