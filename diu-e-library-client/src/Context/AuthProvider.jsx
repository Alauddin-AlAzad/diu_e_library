import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import auth from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import axios from 'axios';


const AuthProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    // create user
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // set observer

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            console.log('state Captured :', currentUser)
            if (currentUser?.email) {
                setUser(currentUser)

                // generate token
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`,
                    { email: currentUser?.email },
                    { withCredentials: true })

            }
            else {
                setUser(currentUser)
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/logout`,
                    { withCredentials: true })
            }
            setLoading(false)
        })
        return () => {
            unsubscribe();

        }


    }, [])

    // signin user
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // SIGN OUT
    const signOutUser = () => {
        setLoading(true)
        setUser(null)
        return signOut(auth)
    }
    // signin with google
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
        signInWithGoogle,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;