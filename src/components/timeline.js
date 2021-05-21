import React, {useEffect, useState} from 'react';
import Skeleton from 'react-loading-skeleton';
import AddPost from "./add-post";
import {getFilters} from "../services/firebase";
import TimelinePosts from "./timeline-posts";

export default function Timeline() {
    const [allData, setAllData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        async function receivedFilters() {
            const response = await getFilters();
            setAllData(response);
            setFilteredData(null)
        }

        receivedFilters()
    }, [])

    function handleClick(e) {
        e.preventDefault();
        if(e.target.value === 'null') {
            return setFilteredData(null);
        }
        return setFilteredData(e.target.value);
    }

    return (
        <div className="container col-span-2 border-r-0">
            <AddPost/>
            {!allData ? (
                <Skeleton count={1} height={150} className="mt-5"/>
            ) : allData.length > 0 ? (
                <div className="flex flex-row bg-black-light shadow-lg` p-2 pl-5 mb-8 text-white">
                    <button className="p-2 hover:bg-black-faded text-blue-medium mr-3"
                            type="button"
                            onClick={handleClick}
                            value={'null'}>
                        all
                    </button>
                    {allData.map((filter) => (
                        <div className="mr-3">
                            <button className="p-2 hover:bg-blue-medium"
                                    type="button"
                                    onClick={handleClick}
                                    value={filter.name}>
                                {filter.name}
                            </button>
                        </div>
                    ))}
                </div>
            ) : null}
            <TimelinePosts filter={filteredData}/>
        </div>
    );
}
