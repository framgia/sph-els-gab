import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toastify = (message, type) => {
    return (
        type === "error" ?
            toast(!((typeof message.response.data.errors) === 'undefined') ? Object.values(message.response.data.errors)[0][0]  : message.message)
        : type === "success" ?
            toast(message)
        :
            <></>
    )
}

export default Toastify
