import React, {FC, FunctionComponent} from 'react'
import {useQuery} from 'react-apollo';
import GetReviews from './graphql/getReviews.gql';
import "@fontsource/roboto";
import styles from "./styles.css";
import ReviewsContainer from "./components/ReviewsContainer";
// import useProduct from "vtex.product-context/useProduct";

const Reviews: FunctionComponent = () => {
    const {data, loading, error} = useQuery(GetReviews, {
        ssr: false,
        variables: {
            offset: 0,
            limit: 3
        }
    });

    if (loading) {
        return <div className={`${styles.loader}`}/>;
    }

    console.log(data);

    const reviews = !loading && !error && data ? data.reviews[0].reviews : null;
    console.log(reviews);

    return (
        <div className={`${styles.netreviews_review_rate_and_stars}`}>
            <div className={`${styles.reviews_list}`}>
                <ReviewsContainer reviews={reviews}/>
            </div>
        </div>
    );
}
export default Reviews;
