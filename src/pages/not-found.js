import {useEffect} from 'react';
import {Link} from "react-router-dom";
import * as ROUTES from '../constants/routes';
import '../styles/background-to-red.css'

export default function NotFound() {

    useEffect(() => {
        document.title = '404 - Fibir'
    })

    return (
        <div className="flex w-10/12 m-auto min-h-screen items-center justify-center">
            <div className="bg-black-primary pb-8">
                <div className="text-white text-center pt-8">
                    <h1 className="text-9xl font-bold">404</h1>
                    <h1 className="sm:text-6xl text-4xl font-medium py-8">Oops! Page not found</h1>
                    <p className="sm:text-2xl text-md pb-8 px-12 font-medium">Oops! The page you are looking for does
                        not
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