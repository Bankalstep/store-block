import React, {FunctionComponent, Fragment} from "react";
import styles from '../styles.css';
import {ReviewsContainerProps, ReviewProps} from '../typings/global';
import Review from "./Review";

const ReviewsContainer: FunctionComponent<ReviewsContainerProps> = ({reviews}) => {
    return (
        <Fragment>
            {reviews.map((element, i) => {
                return (
                    <Review key={i}
                            rate={element.rate}
                            firstname={element.firstname}
                            lastname={element.lastname}
                            review={element.review}
                            brand_name={element.brand_name}
                            count_helpful_no={element.count_helpful_no}
                            count_helpful_yes={element.count_helpful_yes}
                            description={element.description}
                            email={element.email}
                            id_product={element.id_product}
                            id_review={element.id_review}
                            id_review_product={element.id_review_product}
                            info1={element.info1}
                            info2={element.info2}
                            info3={element.info3}
                            info4={element.info4}
                            info5={element.info5}
                            info6={element.info6}
                            info7={element.info7}
                            info8={element.info8}
                            info9={element.info9}
                            info10={element.info10}
                            medias={element.medias}
                            order_date={element.order_date}
                            order_ref={element.order_ref}
                            publish_date={element.publish_date}
                            review_date={element.review_date}
                            sign_helpful={element.sign_helpful}
                            url_image_product={element.url_image_product}
                    />
                )
            })}
        </Fragment>
    )
}

export default ReviewsContainer;
