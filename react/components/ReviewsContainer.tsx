import React, {Fragment, FunctionComponent} from "react";
import styles from '../styles.css';
import {ReviewsContainerProps} from '../typings/global';
import Review from "./Review";
import {FormattedMessage} from "react-intl";
import {getTotal} from "../utils/RecommandationPercentage";
import {FaAngleDown} from "react-icons/fa";
import NoReview from "./NoReviews";
import DropdownList from "./DropdownList";


const ReviewsContainer: FunctionComponent<ReviewsContainerProps> = ({
                                                                        reviews,
                                                                        limit,
                                                                        filter,
                                                                        filterByOrder,
                                                                        order,
                                                                        getMoreReviews,
                                                                        stats,
                                                                        loading
                                                                    }) => {
    const total: number = getTotal(stats, filter);

    return (
        <div className={`${styles.right_block}`}>
            {reviews.length ?
                <div>
                    <DropdownList filterByOrder={filterByOrder} selectedOrder={order} />
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
                            {loading ? <div className={`${styles.loader}`}/> : ''}

                        </Fragment>
                    </div>
                </div>

                : <NoReview/>
            }
            {limit.limit + limit.initialLimit <= total ?
                <button className={`${styles.load_more_button}`}
                        onClick={() => getMoreReviews(limit.limit + limit.initialLimit)}>
                    <FormattedMessage id="load-more"/><FaAngleDown className={`${styles.arrow_down_button}`}/>
                </button> : ''}
        </div>
    )
}

export default ReviewsContainer;
