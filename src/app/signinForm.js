import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js"
import { auth } from './firebase.js'
import { showMessage } from "./showMessage.js";

const signInForm = document.querySelector('#login-form');

signInForm.addEventListener('submit', async e => {
    e.preventDefault()

    const email = signInForm['login-email'].value;
    const password = signInForm['login-password'].value;

    try {
    const credentials = await signInWithEmailAndPassword(auth, email, password)
    console.log(credentials)

    const modal = bootstrap.Modal.getInstance(document.querySelector('#registrarModal'))
    modal.hide()

    showMessage('Bienvenido! '+ credentials.user.email)

    } catch (error) {
     if (error.code === "auth/internal-error") {
         showMessage('Ha cometido un error con el email o la contraseña es incorrecta. El usuario podria no existir.', 'error')
       }   else {
         showMessage(error.message, 'error')
      }
 }

})