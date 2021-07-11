

import styles from './index.module.css';

function PollCard({ ratings, dishName, image, id, ranking, userRatings, goToHome }) {
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>{dishName}</h1>
            <h2 className={styles.ratings}>{`Ranking ${ranking + 1}`}</h2>
            <figure className={styles.imgContainer}>
                <img src={image} alt={dishName} />
            </figure>
            <div>
                <div className="ui olive message">
                    <div className="header">{`Total Score: ${ratings}`}</div>
                </div>
                {userRatings[id] ? (
                    <div>
                        <p>
                            {`You rated this dish as ${userRatings[id]}`}
                        </p>
                        <button onClick={goToHome}>edit</button>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default PollCard;
