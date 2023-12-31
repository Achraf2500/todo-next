"use client"
import { useContext, useState, useEffect, createContext, } from 'react'
import { auth } from '../../../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    // firebase register new user using (firebase authentication) add catch possible errors
    const signup = async (email, password) => {
        try {
            return await createUserWithEmailAndPassword(auth, email, password)
        } catch (e) {
            let errorMessage = "An error occurred during registration.";
            switch (e.code) {
                case 'auth/invalid-email': errorMessage = "Invalid email address."; break;
                case 'auth/email-already-in-use': errorMessage = "Email address is already in use."; break;
                case 'auth/weak-password': errorMessage = "Password should be at least 6 characters"; break;
            }

            return JSON.stringify({ message: errorMessage });
        }
    }
    // login user using (firebase authentication) add catch (email exists error)
    const login = async (email, password) => {
        try {
            return await signInWithEmailAndPassword(auth, email, password)
        } catch (e) {
            return JSON.stringify({ message: 'user not found' })
        }

    }

    // logout user
    const logout = async () => {
        return await signOut(auth)
    }

    // add useEffect hook and listener for any Auth State Changed
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    // export data and functions
    const value = {
        currentUser,
        login,
        signup,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}