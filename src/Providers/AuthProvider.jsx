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

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoadData, setIsLoadData] = useState(true);

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

    const updateProfileInformation= (user, name, photoURl) => {
        return updateProfile(user, {
            displayName: name,
            photoURL: photoURl,
        })
    }

    const logout = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user);
            console.log(user);
        })
        setIsLoadData(false)

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
        isLoadData,
        setIsLoadData
    };

    return (
        <AuthContext.Provider value={userManagement}>
            { children }
        </AuthContext.Provider>
    );
};
export default AuthProvider;