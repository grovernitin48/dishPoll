import { useEffect, useState } from 'react';

import { useLogin } from '../../routes/Login/services';

import PollCard from '../PollCard';

import styles from './index.module.css';

function PollRatings({ dishesList, getRatings, goToHome }) {
    const { userName } = useLogin();
    const [sortedList, setSortedList] = useState([]);
    const [userRatings, setUserRatings] = useState({});
    useEffect(() => {
        const ratings = getRatings();
        const normaliseList = dishesList.reduce((acc, dish) => ({
            ...acc,
            [dish.id] : {
                ...dish,
                ratings: 0,
            }
        }), {});

        Object.entries(ratings).forEach(([key, value]) => {
            if(key === userName) {
                setUserRatings(value);
            }
            Object.entries(value).forEach(([dish, rating]) => {
                normaliseList[dish].ratings = normaliseList[dish].ratings + (rating * 10)
            })
        })
        setSortedList(Object.values(normaliseList).sort((a, b) => b.ratings - a.ratings))
    }, [dishesList, getRatings, userName])

    return (
        <div className={styles.container}>
            {sortedList.map((dish, index) => (
                <PollCard
                    key={dish.id}
                    ranking={index}
                    userRatings={userRatings}
                    goToHome={goToHome}
                    {...dish}
                />
            ))}
        </div>
    )

}
export default PollRatings;
