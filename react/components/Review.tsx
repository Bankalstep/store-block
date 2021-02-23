import React, {FC, FunctionComponent} from "react";
import {ReviewProps} from "../typings/global";
import styles from "../styles.css";
import StarsContainer from "./StarsContainer";

const Review: FunctionComponent<ReviewProps> = ({...reviewsProps}) => {
    return (
        <div className={`${styles.netreviews_review}`}>
            <div className={`${styles.netreviews_stars_rate}`}>
                <StarsContainer rating={reviewsProps.rate}/>
                <div className={`${styles.netreviews_review}`}>{reviewsProps.rate}/5</div>
            </div>
            <div>{reviewsProps.review}</div>
            <div className={`${styles.netreviews_customer_name}`}>{reviewsProps.firstname} {reviewsProps.lastname}.
                <span> publié le {reviewsProps.publish_date.substr(0, 10)}</span>
                <span> suite à une commande du {reviewsProps.order_date.substr(0, 10)}</span>
            </div>
            <div className={`${styles.helpful_block}`}>
                <span>Cet avis vous a-t-il été utile ?</span>
                <div className={`${styles.button_helpful}`}>
                    <span>{reviewsProps.count_helpful_yes}</span>
                    <span>Oui</span>
                </div>
                <div className={`${styles.button_helpful}`}>
                    <span>{reviewsProps.count_helpful_yes}</span>
                    <span>Non</span>
                </div>
            </div>
        </div>
    )
}

export default Review;
