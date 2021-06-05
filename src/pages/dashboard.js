import {useEffect} from 'react';
import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar/index';
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
                <div className="grid grid-cols-1 gap-4 mx-auto max-w-screen-lg md:grid-cols-3">
                    <Timeline/>
                    <div>
                        <Sidebar/>
                    </div>
                </div>
            </div>
        </LoggedInUserContext.Provider>
    );
}