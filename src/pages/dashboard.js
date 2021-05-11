import {useEffect} from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar';
import useUser from '../hooks/use-user';
import LoggedInUserContext from '../context/logged-in-user';
import '../styles/background-to-gray.css';
import Sticky from 'react-sticky-el';

export default function Dashboard({user: loggedInUser}) {
    const {user, setActiveUser} = useUser(loggedInUser.uid);
    useEffect(() => {
        document.title = 'Fibir';
    }, []);

    return (
        <LoggedInUserContext.Provider value={{user, setActiveUser}}>
            <div className="bg-gray-background">
                <Sticky>
                    <Header/>
                </Sticky>
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 justify-between mx-auto max-w-screen-lg">
                    <Timeline/>
                    <div className="sm:visible invisible">
                        <Sidebar/>
                    </div>
                </div>
            </div>
        </LoggedInUserContext.Provider>
    );
}

Dashboard.propTypes = {
    user: PropTypes.object.isRequired
};
