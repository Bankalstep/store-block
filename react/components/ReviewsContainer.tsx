import React, {FunctionComponent, Fragment, MouseEventHandler, useState, useEffect} from "react";
import styles from '../styles.css';
import {ReviewsContainerProps, ReviewProps} from '../typings/global';
import Review from "./Review";
import {FormattedMessage} from "react-intl";


const ReviewsContainer: FunctionComponent<ReviewsContainerProps> = ({reviews, parentCallback, limit}) => {
    // const [{offset, limit}, loadMoreReviews] = useState({offset: 0, limit: 1});
    console.log(parentCallback);

    return (
        <div className={`${styles.right_block}`}>
            <div className={`${styles.reviews_list}`}>

                <Fragment>
                    {reviews!.map((element, i) => {
                        return (
                            <div key={i}>
                                <Review rate={element.rate}
                                        firstname={element.firstname}
                                        lastname={element.lastname}
                                        review={element.review}
                                        brand_name={element.brand_name}
                                        count_helpful_no={element.count_helpful_no}
                                        count_helpful_yes={element.count_helpful_yes}
                                        description={element.description}
                                        email={element.email}
                                        moderation={element.moderation}
                                        id_product={element.id_product}
                                        id_review={element.id_review}
                                        id_review_product={element.id_review_product}
                                        medias={element.medias}
                                        order_date={element.order_date}
                                        order_ref={element.order_ref}
                                        publish_date={element.publish_date}
                                        review_date={element.review_date}
                                        sign_helpful={element.sign_helpful}
                                        url_image_product={element.url_image_product}
                                        review_id={element.review_id}
                                />
                            </div>
                        )
                    })}
                </Fragment>
            </div>
            <button onClick={() => parentCallback(limit + 1)}>
                <FormattedMessage id="load-more"/></button>
        </div>
    )
}

export default ReviewsContainer;
