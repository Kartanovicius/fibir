import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';
import {
  DEFAULT_FEMALE_IMAGE_PATH,
  DEFAULT_IMAGE_PATH,
  DEFAULT_MALE_IMAGE_PATH,
  DEFAULT_OTHER_IMAGE_PATH
} from '../constants/paths';
import useUser from '../hooks/use-user';

export default function Header() {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  const userGender = (gender) => {
    if(gender === "male"){
      return DEFAULT_MALE_IMAGE_PATH;
    }
    else if(gender === "female"){
      return DEFAULT_FEMALE_IMAGE_PATH;
    }
    else if(gender === "other"){
      return DEFAULT_OTHER_IMAGE_PATH;
    }
    else {
      return DEFAULT_IMAGE_PATH;
    }
  }

  return (
      <header className="bg-black-light shadow-md mb-8">
        <div className='container max-w-screen-lg mx-auto h-full'>
          <div className='flex justify-between h-full'>
            <div className='text-center flex items-center align-items cursor-pointer'>
              <h1 className='flex justify-center w-full'>
              <Link to={ROUTES.DASHBOARD} aria-label="Fibir logo">
                <img src="/images/fibir-logo.svg" alt="Fibir" className='w-20 my-2' />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items">
            {loggedInUser ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <img src="/images/icons/dashboard.svg" alt="Dashboard" className='w-8 mr-10'/>
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
                    <img src="/images/icons/sign-out.svg" alt="Dashboard" className='w-7 mr-10'/>
                </button>
                {user && (
                  <div className="flex items-center cursor-pointer">
                    <Link to={`/p/${user?.username}`}>
                      <img
                        className="rounded-full h-8 w-8 flex"
                        src={userGender(user.gender)}
                        alt={`${user?.username} profile`}
                        onError={(e) => {
                          e.target.src = DEFAULT_IMAGE_PATH;
                        }}
                      />
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="font-bold text-sm text-blue-medium w-20 h-8"
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
