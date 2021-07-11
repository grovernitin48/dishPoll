import { useEffect, useState } from 'react';

import { useAuth } from '../../App';

import PollCard from '../PollCard';

import styles from './index.module.css';

function PollRatings({ dishesList, getRatings, goToHome }) {
    const { userName } = useAuth();
    const [sortedList, setSortedList] = useState([]);
    const [userRatings, setUserRatings] = useState({});
    useEffect(() => {
        const ratings = getRatings();
        const normaliseList = dishesList.reduce((acc, dish) => ({
            ...acc,
            [dish.id]: {
                ...dish,
                ratings: 0,
            }
        }), {});
        Object.entries(ratings).forEach(([key, value]) => {
            if (key === userName) {
                setUserRatings(value);
            }
            Object.entries(value).forEach(([dish, rating]) => {
                if (rating === 3)
                    normaliseList[dish].ratings = normaliseList[dish].ratings + 10;
                if (rating === 2)
                    normaliseList[dish].ratings = normaliseList[dish].ratings + 20;
                if (rating === 1)
                    normaliseList[dish].ratings = normaliseList[dish].ratings + 30;
            })
        })
        setSortedList(Object.values(normaliseList).sort((a, b) => b.ratings - a.ratings))
    }, [dishesList, getRatings, userName])

    return (
        <div data-testid="pollRatings" className={styles.container}>
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
