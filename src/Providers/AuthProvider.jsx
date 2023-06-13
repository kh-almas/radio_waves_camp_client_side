import React, {createContext, useEffect, useState} from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import auth from "../Firebase/firebase.config.js";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [isProfileUpdated, setIsProfileUpdated] = useState(true);

    const userLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const userRegistration = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const authWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    }

    const updateProfileInformation= (user, name, photo, phone) => {
        return updateProfile(user, {
            displayName: name,
            photoURL:photo,
            phoneNumber: phone,
        })
    }

    const logout = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user);
            if (user)
            {
                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {email: user.email})
                    .then(data => {
                        localStorage.setItem('token', data.data.token);
                    })
            }
            setLoading(false);
        })

        return () => {
            return unsubscribe();
        }
    }, [isProfileUpdated]);

    const userManagement = {
        user,
        userLogin,
        userRegistration,
        updateProfileInformation,
        logout,
        authWithGoogle,
        loading,
        setLoading
    };

    return (
        <AuthContext.Provider value={userManagement}>
            { children }
        </AuthContext.Provider>
    );
};
export default AuthProvider;