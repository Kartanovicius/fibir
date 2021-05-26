import Linkify from 'react-linkify';

export default function Header({caption}) {

    return (
        <Linkify >
            <div className="p-6 pb-0 detectLinks">
                <p className="">{caption}</p>
            </div>
        </Linkify>
    );
}