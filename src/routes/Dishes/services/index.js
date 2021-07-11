import { useEffect, useState } from 'react';

import { LocalStorage } from '../../../utils';
import {useAuth} from '../../../App';

function useGetDishes() {
    const [dishes, setDishes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json')
            .then( res => res.json().then(result => {
                setDishes(result);
                setIsLoading(false);
            })).catch(() => {
                setIsLoading(false);
        })
    }, [])
    return {
        isLoading,
        dishes,
    }
}

function usePollRatings() {
    const { userName } = useAuth()
    function updateRating(ratings) {
        let pollData = LocalStorage.get('pollRatings') || {};
        pollData[userName] = ratings;
        LocalStorage.set('pollRatings', pollData);
    }
    function getRatings() {
        return LocalStorage.get('pollRatings') || {}
    }
    return {
        updateRating,
        getRatings,
    }
}

export {
    useGetDishes,
    usePollRatings,
}
