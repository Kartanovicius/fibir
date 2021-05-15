import {useState, useContext} from 'react';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';

export default function AddPost({captionInput}) {
    const [caption, setCaption] = useState('');
    const {firebase} = useContext(FirebaseContext);
    const {
        user: {uid: userId}
    } = useContext(UserContext);

    const handleSubmitCaption = (event) => {
        event.preventDefault();
        setCaption('')
        return firebase
            .firestore()
            .collection('posts')
            .add({
                caption: caption,
                comments: [],
                likes: [],
                userId: userId,
                dateCreated: Date.now(),
            });
    };

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

