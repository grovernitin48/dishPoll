import { useState } from 'react';
import cx from 'classnames';

import { useGetDishes, usePollRatings } from './services';
import { useAuth } from '../../App';

import DishCard from '../../components/DishCard';
import PollRatings from '../../components/PollRatings';

import styles from './index.module.css';

const TABS = {
    HOME: 'HOME',
    POLL: 'POLL'
}

function Dishes() {
    const { isLoading, dishes } = useGetDishes();
    const [activeTab, setActiveTab] = useState(TABS.HOME)

    const { updateRating, getRatings } = usePollRatings();
    const { userName } = useAuth();

    const [userSection, setUserSelection] = useState(getDefaultSelection());

    if(isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className={styles.tabs}>
                <button
                    className={cx(styles.btn, {
                        [styles.isActive]: activeTab === TABS.HOME
                    })}
                    onClick={setActiveTab.bind(null, TABS.HOME)}
                >
                    Home
                </button>
                <button
                    className={cx(styles.btn, {
                        [styles.isActive]: activeTab === TABS.POLL
                    })}
                    onClick={setActiveTab.bind(null, TABS.POLL)}
                >
                    Poll
                </button>
            </div>
            {getPage()}
        </>
    )

    function getPage() {
        if(activeTab === TABS.HOME) {
            return (
                <div className={styles.container}>
                    {
                        dishes.map(dish => (
                            <DishCard
                                key={dish.id}
                                handleUserSelection={handleUserSelection}
                                selectedDishes={userSection}
                                removeRating={removeRating}
                                {...dish} />
                        ))
                    }
                </div>
            )
        }

        return (
            <PollRatings dishesList={dishes} getRatings={getRatings} goToHome={setActiveTab.bind(null, TABS.HOME)}/>
        )
    }

    function handleUserSelection({ id, rating }) {
        const temp = {...userSection }
        Object.entries(temp).forEach(([key, value]) => {
            if (value === rating) {
                delete temp[key]
            }
        })
        temp[id] = rating;
        setUserSelection(temp);
        updateRating(temp);
    }

    function removeRating(id) {
        const temp = { ...userSection };
        delete temp[id];
        setUserSelection(temp);
        updateRating(temp);
    }

    function getDefaultSelection() {
        const ratings = getRatings();
        return ratings[userName] ? ratings[userName] : {}
    }
}

export default Dishes;
