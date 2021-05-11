import {useEffect} from 'react';
import {Link} from "react-router-dom";
import * as ROUTES from '../constants/routes';
import '../styles/background-to-red.css'

export default function NotFound() {

    useEffect(() => {
        document.title = '404 - Fibir'
    })

    return (
        <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
            <div className="bg-black-primary overflow-hidden pb-8">
                <div className="text-white text-center pt-8">
                    <h1 className="text-9xl font-bold">404</h1>
                    <h1 className="text-6xl font-medium py-8">Oops! Page not found</h1>
                    <p className="text-2xl pb-8 px-12 font-medium">Oops! The page you are looking for does not
                        exist. It might have been moved or deleted.</p>
                    <button
                        className="bg-blue-medium hover:bg-blue-light text-white px-20 py-3 ">
                        <Link to={ROUTES.DASHBOARD}>
                            Home
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}