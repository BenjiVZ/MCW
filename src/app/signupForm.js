import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js"
import { auth } from './firebase.js'
import { showMessage } from './showMessage.js'

const signupForm = document.querySelector('#signup-form')

    signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = signupForm['signup-email'].value
    const password = signupForm['signup-password'].value

    console.log(email, password)
    try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredentials)

    //close the signup modal
    const salirModal = document.querySelector('#salirModal')
    const modal = bootstrap.Modal.getInstance(salirModal)
    modal.hide()

    showMessage("Bienvenido!" + userCredentials.user.email)

    } catch (error) {
        if (error.code === 'auth/internal-error'){
            showMessage("Email invalido o ya se encuentra en uso", "error")
        } else if (error.code === 'auth/weak-password'){
            showMessage("La contraseña es muy debil", "error")
        } else if (error.code){
            showMessage("Algo fue mal", "error")
        }

    }
})