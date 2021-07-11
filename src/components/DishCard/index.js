import cx from 'classnames';

import styles from './index.module.css';

function DishCard({ description, dishName, image, handleUserSelection, selectedDishes, id, removeRating }) {
        const isDisabled = Object.keys(selectedDishes).length > 2 && !selectedDishes[id]
    return (
        <div data-testid={`dishCard-${id}`} className={cx(styles.container, {
            [styles.disabled]: isDisabled
        })}>
            <h1 className={styles.header}>{dishName}</h1>
            <figure className={styles.imgContainer}>
                <img src={image} alt={dishName} />
            </figure>
            <div className="ui info message">
                <div className="header">
                    {description}
                </div>
            </div>
            <div className={styles.btnContainer}>
                <div className="ui buttons">
                    <button
                        className="ui button"
                        onClick={handleUserSelection.bind(null, { id, rating: 1 })}
                        disabled={isDisabled}
                    >
                        Rank 1
                </button>
                    <button
                        className="ui button"
                        onClick={handleUserSelection.bind(null, { id, rating: 2 })}
                        disabled={isDisabled}
                    >
                        Rank 2
                </button>
                    <button
                        className="ui button"
                        onClick={handleUserSelection.bind(null, { id, rating: 3 })}
                        disabled={isDisabled}
                    >
                        Rank 3</button>
                </div>
            </div>
            {
                selectedDishes[id] ? (
                    <div className={styles.ratingContainer}>
                        <div className="ui green message">
                            <div className="header">
                                {`You ranked ${selectedDishes[id]}`}
                            </div>
                        </div>
                        <button className="ui negative button" onClick={removeRating.bind(null, id)}>Remove Rating</button>
                    </div>
                ) : null
            }
        </div>
    )
}

export default DishCard;
