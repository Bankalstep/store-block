import React, {FunctionComponent} from "react";
import styles from '../styles.css';
import {RatingProps} from '../typings/global';

const RatingInfo: FunctionComponent<RatingProps> = ({count}) => {
    return (
        <div className={`${styles.inline_rating}`}>
            {count} avis
        </div>
    )
}

export default RatingInfo;
