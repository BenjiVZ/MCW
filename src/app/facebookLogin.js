import { FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js"
import { auth } from './firebase.js'
import { showMessage } from './showMessage.js'

const facebookButton = document.querySelector('#facebookLogin')

facebookButton.addEventListener('click', async () => {


    const provider = new FacebookAuthProvider()

    try {
    const credentials = await signInWithPopup(auth, provider)  
    console.log(credentials)

    const modal = bootstrap.Modal.getInstance(document.querySelector('#registrarModal'))
    modal.hide()

    showMessage('Bienvenido! ' + credentials.user.displayName, 'success')
    } catch (error) {
        console.log(error)
        if (error.code === 'auth/cancelled-popup-request'){
            showMessage("Ha cerrado la ventana emergente!", "error")
        } else if (error.code === 'auth/user-cancelled'){
            showMessage("Ha denegado el acceso!", "error")
        } else if (error.code){
            showMessage("Algo fue mal", "error")
    }
}


})