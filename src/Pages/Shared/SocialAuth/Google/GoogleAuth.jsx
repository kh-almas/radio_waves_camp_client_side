import React, {useContext} from 'react';
import {AuthContext} from "../../../../Providers/AuthProvider.jsx";
import { FaGoogle } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const GoogleAuth = ({from}) => {
    const {authWithGoogle, updateProfileInformation} = useContext(AuthContext);
    const navigate = useNavigate();

    const googleAuthBtn = () => {
        authWithGoogle()
            .then((result) => {
                const user = result.user;
                updateProfileInformation(user , user.displayName, user.photoURL);
                navigate(from, { replace: true });
            }).catch((error) => {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Something is wrong',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
    }

    return (
        <div>
            <button  onClick={googleAuthBtn}
                className="text-center bg-teal-900 text-white hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
            >
                <span className="flex items-center justify-center">Access with <FaGoogle className="ms-2"></FaGoogle></span>
            </button>
        </div>
    );
};

export default GoogleAuth;