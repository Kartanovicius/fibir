import React from 'react';
import {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';
import * as PATHS from '../constants/paths';
import useUser from '../hooks/use-user';

export default function Header() {
    const {user: loggedInUser} = useContext(UserContext);
    const {user} = useUser(loggedInUser?.uid);
    const {firebase} = useContext(FirebaseContext);
    const history = useHistory();

    const userGender = (gender) => {
        if (gender === "male") {
            return PATHS.DEFAULT_MALE_IMAGE_PATH;
        } else if (gender === "female") {
            return PATHS.DEFAULT_FEMALE_IMAGE_PATH;
        } else if (gender === "other") {
            return PATHS.DEFAULT_OTHER_IMAGE_PATH;
        } else {
            return PATHS.DEFAULT_IMAGE_PATH;
        }
    }

    return (
        <header className="bg-black-light shadow-md mb-8">
            <div className='container max-w-screen-lg mx-auto h-full px-3 lg:px-0'>
                <div className='flex justify-between h-full'>
                    <div className='text-center flex items-center align-items cursor-pointer'>
                        <h1 className='flex justify-center w-full'>
                            <Link to={ROUTES.DASHBOARD} aria-label="Fibir logo">
                                <img src={PATHS.FIBIR_LOGO_IMAGE} alt="Fibir" className='w-20 my-2'/>
                            </Link>
                        </h1>
                    </div>
                    <div className="text-gray-700 text-center flex items-center align-items">
                        {loggedInUser ? (
                            <>
                                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                    <img src={PATHS.DASHBOARD_IMAGE} alt="Dashboard" className='w-8 mr-10'/>
                                </Link>

                                <button
                                    type="button"
                                    title="Sign Out"
                                    onClick={() => {
                                        firebase.auth().signOut();
                                        history.push(ROUTES.LOGIN);
                                    }}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            firebase.auth().signOut();
                                            history.push(ROUTES.LOGIN);
                                        }
                                    }}
                                >
                                    <img src={PATHS.SIGN_OUT_IMAGE} alt="Dashboard" className='w-7'/>
                                </button>
                                {user && (
                                    <div className="flex items-center cursor-pointer">
                                        <div className="sm:block">
                                            <Link to={`/p/${user?.username}`}>
                                                <img
                                                    className="rounded-full h-8 w-8 flex ml-10"
                                                    src={userGender(user.gender)}
                                                    alt={`${user?.username} profile`}
                                                    onError={(e) => {
                                                        e.target.src = PATHS.DEFAULT_IMAGE_PATH;
                                                    }}
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <Link to={ROUTES.LOGIN}>
                                    <button
                                        type="button"
                                        className="bg-blue-medium font-bold text-sm text-white w-8 h-8"
                                    >
                                        Log In
                                    </button>
                                </Link>
                                <Link to={ROUTES.SIGN_UP}>
                                    <button
                                        type="button"
                                        className="font-bold text-sm text-blue-medium w-8 h-8"
                                    >
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
