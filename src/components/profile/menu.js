import {Link} from "react-router-dom";

export default function Menu({profile: {username: profileUsername}}){
    return (
        <div className="flex flex-col max-w-screen-lg bg-black-light p-5 text-white space-y-5">
            <Link to={`/p/${profileUsername}/posts`}>
            <button className="p-2 w-full text-white hover:bg-blue-medium">
                Posts
            </button>
            </Link>
            <Link to={`/p/${profileUsername}/friendlist`}>
                <button className="p-2 w-full text-white hover:bg-blue-medium">
                    Friendlist
                </button>
            </Link>
        </div>
    );
};

