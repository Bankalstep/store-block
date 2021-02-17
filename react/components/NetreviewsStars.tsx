import React, {FunctionComponent} from "react";
import Star from "./StarSvg";
import styles from '../styles.css';
import {StarsProps} from '../typings/starsprops';

const stars = [0, 1, 2, 3, 4];

const getPercentage = (rating: number, i: number) => {
    console.log(rating);

    if (rating >= i + 1) {
        return '100%'
    }

    if (i < rating && rating < i + 1) {
        return `${(rating - i) * 100}%`
    }
    return '0%'
}

const NetreviewsStars: FunctionComponent<StarsProps> = ({rating}) => {
    return (
        <div className={`${styles.netreviews_review_rate_and_stars}`}>
            <div className={`${styles.inactive_container}`}>
                {stars.map((j) => {
                    return (
                        <div key={j}>
                            <div className={''}>
                                <Star fill="#dddddd" className="nik" size={20}/>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={` ${styles.active_container}`}>
                {stars.map((i) => {
                    return (
                        <div key={i}>
                            <div className={`${styles.stars_overflow}`}
                                 style={{width: getPercentage(rating, i)}}>
                                <Star fill="#ffdb59" className={""} size={20}/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NetreviewsStars;
