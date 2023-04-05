import { async } from '@firebase/util'
import { db } from "../firebase/config"
import {
    getAuth,
    createUserWithEmailAndPassword,
    siginInWithEmailAndPassword,
    updateProfile,
    signOut,
    signInWithEmailAndPassword
} from "firebase/auth"

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth();

    function checkIfIsCancelled() {
        if(cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
                await updateProfile(user, {displayName: data.displayName
                })

                setLoading(false);

                return user

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMEssage

            if(error.message.includes("Password")) {
                systemErrorMEssage = "A senha precisa conter pelo menos 6 caracteres!";
            }else if(error.message.includes("email-already")){
                systemErrorMEssage = "E-mail já cadastrado!";
            }else{
                systemErrorMEssage = "Ocorreu um erro, por favor tebte mais tarde.";
            }

            setLoading(false);
            setError(systemErrorMEssage);
        }

        setLoading(false)
    };

    //logout

    const logout = () => {
        
        checkIfIsCancelled();
        
        signOut(auth)
    }

    //login - sign in

    const login = async(data) => {
        checkIfIsCancelled();

        setLoading(true)
        setError(false)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false);
        } catch (error) {
            let systemErrorMEssage;
            if(error.message.includes("user-not-found")) {
                systemErrorMEssage = "Usuário não encontrado."
            } else if(error.message.includes("wrong-password")){
                systemErrorMEssage = "Senha incorreta."
            }else{
                systemErrorMEssage = "Ocorreu um erro, por favor tente mais tarde."
            }

            setError(systemErrorMEssage)
            setLoading(false);
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    }
}