import apiClient from "../../services/api"
import Cookies from 'js-cookie'

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
                headers: {
                  'X-CSRFToken': Cookies.get('csrftoken'),
                  accept: 'application/json',
                  Authorization: 'Bearer ' + user
                }
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
                console.log(error)
            })
            
        default:
            return state.items;
    }
}
