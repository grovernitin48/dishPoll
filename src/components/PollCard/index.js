import styles from './index.module.css';

function PollCard({ ratings, dishName, image, id, ranking, userRatings, goToHome }) {
    return (
        <div data-testid="pollCard" className={styles.container}>
            <h1 className={styles.header}>{dishName}</h1>
            <h2 className={styles.ratings}>{`Ranking ${ranking + 1}`}</h2>
            <figure className={styles.imgContainer}>
                <img src={image} alt={dishName} />
            </figure>
            <div className={styles.info}>
                <div className="ui olive message">
                    <div className="header">{`Total Score: ${ratings}`}</div>
                </div>
                {userRatings[id] ? (
                    <div>
                        <div className="ui orange message">
                        <div className="header">{`You rated this dish as ${userRatings[id]}`}</div>
                        </div>
                        <button className="ui secondary button" onClick={goToHome}>Edit</button>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default PollCard;
