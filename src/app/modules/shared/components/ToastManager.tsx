import { Bounce, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ToastManager = () => {
    console.log('i m in toast manager')

    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
    )
}

export { ToastManager }