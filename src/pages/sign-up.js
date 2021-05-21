import {
    useState,
    useContext,
    useEffect
} from 'react';
import {
    Link,
    useHistory
} from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import {
    doesUsernameExist
} from '../services/firebase';
import '../styles/background.css';
import * as PATHS from "../constants/paths";

export default function SignUp() {
    var humanNames = require('human-names');

    const history = useHistory();
    const {
        firebase
    } = useContext(FirebaseContext);

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleSignUp = async (event) => {
        event.preventDefault();

        const usernameExists = await doesUsernameExist(username);
        if (!usernameExists) {
            try {
                const createdUserResult = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(emailAddress, password);

                await createdUserResult.user.updateProfile({
                    displayName: username
                });

                await firebase
                    .firestore()
                    .collection('users')
                    .add({
                        userId: createdUserResult.user.uid,
                        username: username.toLowerCase(),
                        fullName,
                        emailAddress: emailAddress.toLowerCase(),
                        following: ['gCvMFC3xKcOhWf9AqqzLL7dqmSz2', createdUserResult.user.uid],
                        followers: [],
                        dateCreated: Date.now(),
                        gender: gender.toLowerCase()
                    });

                /*await firebase
                    .firestore()
                    .collection('users')
                    .doc('gCvMFC3xKcOhWf9AqqzLL7dqmSz2')
                    .set({
                        followers: createdUserResult.user.uid,
                    });*/

                history.push(ROUTES.DASHBOARD);
            } catch (error) {
                setFullName('');
                setEmailAddress('');
                setPassword('');
                if (humanNames.allEn.indexOf(setFullName) > -1) {
                    console.log(humanNames.allEn[192]);
                }
                setError(error.message);
            }
        } else {
            setUsername('');
            setError('That username is already taken, please try another.');
        }
    };

    useEffect(() => {
        document.title = 'Signup - Fibir'
    })

    return (
        <div className='flex items-center text-center h-screen w-full justify-end'>
            <div className='flex hidden lg:block w-full bg-black-faded pb-16'>
                <div className='flex flex-col items-start mx-28'>
                    <img src={PATHS.FIBIR_LOGO_IMAGE} alt="Fibir logo"/>
                    <h2 className='text-white text-left text-lg text-opacity-90 mx-4 mr-80'>
                        We don't collect personal data and we don't use cookies to collect
                        personally identifiable information about you.</h2>
                </div>
            </div>
            <div className='flex flex-col w-full lg:w-2/6 lg:mx-0 mx-4 bg-black-primary h-screen justify-center px-6'>
                <div className='flex block lg:hidden my-10 mx-auto '>
                    <img src={PATHS.FIBIR_LOGO_IMAGE} alt="Fibir logo"/>
                </div>

                {error && <p className='flex text-center text-red-primary my-3'>{error}</p>}

                <form onSubmit={handleSignUp} method="POST">
                    <input aria-label="Enter your username"
                           maxLength="12"
                           type="text"
                           placeholder="Username"
                           className="text-sm text-gray-base px-2 py-2 w-full mb-5"
                           onChange={({target}) => setUsername(target.value)}
                           value={username}
                    />
                    <input aria-label="Enter your Fake name & surname"
                           type="text"
                           placeholder="Fake Name & Surname"
                           className="text-sm text-gray-base px-2 py-2 w-full mb-5"
                           onChange={({target}) => setFullName(target.value)}
                           value={fullName}
                    />
                    <input aria-label="Enter your email address"
                           type="text"
                           placeholder="Email address"
                           className="text-sm text-gray-base px-2 py-2 w-full mb-5"
                           onChange={({target}) => setEmailAddress(target.value)}
                           value={emailAddress}
                    />
                    <input
                        aria-label="Enter your password"
                        type="password"
                        placeholder="Password"
                        className="text-sm text-gray-base px-2 py-2 w-full mb-3"
                        onChange={({target}) => setPassword(target.value)}
                        value={password}
                    />
                    <div className="text-white mb-3">
                        <div className="grid grid-cols-3 mt-2">
                            <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio text-blue-medium"
                                        value={"male"}
                                        checked={gender === "male"}
                                        onChange={({target}) => setGender(target.value)}
                                    />
                                    <span className="ml-2">Male</span>
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input
                                        type="radio"
                                        className="form-radio text-red-500"
                                        value="female"
                                        checked={gender === "female"}
                                        onChange={({target}) => setGender(target.value)}
                                    />
                                    <span className="ml-2">Female</span>
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input
                                        class="form-radio text-green-500"
                                        type="radio"
                                        value="other"
                                        checked={gender === "other"}
                                        onChange={({target}) => setGender(target.value)}
                                    />
                                    <span className="ml-2">Other</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <button
                        disabled={isInvalid}
                        type="submit"
                        className={`bg-blue-medium hover:bg-blue-light text-white w-full h-8 font-bold ${isInvalid && 'opacity-50'}`}>
                        Sign up
                    </button>
                    <p className={`text-white my-4 w-full text-center`}>
                        Already have account?{` `}
                        <Link to={ROUTES.LOGIN} className='font-bold'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}