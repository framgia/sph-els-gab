import axios from 'axios';
import Cookies from 'js-cookie'

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,
    headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
    }
});

export default apiClient;