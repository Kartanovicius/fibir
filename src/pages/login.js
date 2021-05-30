import {useState, useContext, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import '../styles/background.css';

export default function Login() {
  const history = useHistory();
  const {firebase} = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
  };


  useEffect(() => {
    document.title = 'Login - Fibir'
  })

  return (
      <div className='flex items-center text-center h-screen w-full justify-end'>
        <div className='flex hidden lg:block w-full bg-black-faded pb-16'>
          <div className='flex flex-col items-start mx-28'>
            <img src="/images/fibir-logo.svg" alt="Fibir logo"/>
            <h2 className='text-white text-left text-lg mx-4 mr-80'>
              We don't collect personal data and we don't use cookies to collect
              personally identifiable information about you.</h2>
          </div>
        </div>
        <div
            className='flex flex-col w-full lg:w-2/6 lg:mx-0 mx-4 bg-black-primary h-screen justify-center px-6'>
          <div className='flex block lg:hidden my-10 mx-auto '>
            <img src="/images/fibir-logo.svg" alt="Fibir logo"/>
          </div>

          {error && <p className='flex text-center text-red-primary my-3'>{error}</p>}

          <form onSubmit={handleLogin} method="POST">
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
                className="text-sm text-gray-base px-2 py-2 w-full mb-5"
                onChange={({target}) => setPassword(target.value)}
                value={password}
            />
            <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-medium hover:bg-blue-light text-white w-full h-8 font-bold 
                        ${isInvalid && 'opacity-50'}`}>
              Login
            </button>
            <p className={`text-white my-4 w-full text-center`}>
              Don't have an account?{` `}
              <Link to={ROUTES.SIGN_UP} className='font-bold text-blue-light'>Sign up</Link>
            </p>
          </form>
        </div>
      </div>
  )
}