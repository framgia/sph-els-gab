import apiClient from "../../services/api"
import Toastify from "../../core/Toastify";

export default function SessionReducer(state, action) {
    switch (action.type) {
        case 'login':
            sessionStorage.setItem('loggedIn', true);

            return [
                {
                    loggedIn: true,
                }
            ]
            
        case 'logout':
              const user = localStorage.getItem('user');

              apiClient({
                method: 'post',
                url: '/api/logout',
              }).then(response => {
                if (response.data.status === undefined) {
                  sessionStorage.setItem('loggedIn', false);
                  sessionStorage.removeItem('user');
                  window.location.reload(false);

                    return [
                        {
                            loggedIn: false,
                        }
                    ]
                }
                else { return state }
            }).catch(error => {
                Toastify(!((typeof error.response.data.errors) === 'undefined') ? Object.values(error.response.data.errors)[0][0]  : error.message)
            })
            
        default:
            return state.items;
    }
}
