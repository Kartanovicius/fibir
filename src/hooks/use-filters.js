import {useState, useEffect} from 'react';
import {getFilters} from '../services/firebase';

export default function useFilter() {
    const [allData, setAllData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        async function receivedFilters() {
            const response = await getFilters();
            setAllData(response);
            setFilteredData(response);
            console.log(filteredData)
        }

        receivedFilters()
    }, [])

    return {allData, filteredData};
}
