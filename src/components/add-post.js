import React, {useState, useContext, useEffect} from 'react';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import Skeleton from "react-loading-skeleton";
import {getFilters} from "../services/firebase";

export default function AddPost({captionInput}) {
    const [caption, setCaption] = useState('');
    const [allData, setAllData] = useState(null);
    const [filter, setFilter] = useState(null);

    useEffect(() => {
        async function receivedFilters() {
            const response = await getFilters();
            setAllData(response);
        }

        receivedFilters()
    }, [])

    const {firebase} = useContext(FirebaseContext);
    const {
        user: {uid: userId}
    } = useContext(UserContext);

    const handleSubmitCaption = (event) => {
        event.preventDefault();
        setCaption('')
        setTimeout(
            function () {
                window.location.reload(true);
            }, 200);

        return firebase
            .firestore()
            .collection('posts')
            .add({
                caption: caption,
                comments: [],
                likes: [],
                userId: userId,
                dateCreated: Date.now(),
                filter: filter
            })
    };

    function handleChange(e) {return setFilter(e.target.value)}

    return (
        <div className="bg-white mb-8">
            <form
                className="flex justify-between pl-0 pr-5"
                method="POST"
                onSubmit={(event) =>
                    caption.length >= 1 ? handleSubmitCaption(event) : event.preventDefault()
                }
            >
                <input
                    aria-label="Add a post"
                    autoComplete="off"
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4"
                    type="text"
                    name="add-post"
                    placeholder="Send new post..."
                    value={caption}
                    onChange={({target}) => setCaption(target.value)}
                    ref={captionInput}
                />
                    {!allData ? (
                        <Skeleton count={1} height={150} className="mt-5"/>
                    ) : allData.length > 0 ? (
                        <select className="mr-2" onChange={handleChange}>
                        {allData.map((filter) => (
                                    <option>
                                        {filter.name}
                                    </option>
                            ))}
                        </select>
                    ) : null}
                <button
                    className={`text-sm font-bold text-blue-medium`}
                    type="button"
                    disabled={caption.length < 1}
                    onClick={handleSubmitCaption}
                >
                    Post
                </button>
            </form>
        </div>
    );
}

