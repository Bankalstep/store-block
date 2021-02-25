import React, {FunctionComponent, useEffect, useState} from 'react'
import {useQuery} from 'react-apollo';
import GetReviews from './graphql/getReviews.gql';
import GetAverage from "./graphql/getAverage.gql";
import "@fontsource/nunito";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import styles from "./styles.css";
import ReviewsContainer from "./components/ReviewsContainer";
import ReviewsSideInfo from "./components/ReviewsSideInfo";
import {FormattedMessage} from "react-intl";
import getRecommandation from "./utils/RecommandationPercentage";
// import useProduct from "vtex.product-context/useProduct";

const Reviews: FunctionComponent = () => {
    const [filter, setFilter] = useState([1, 2, 3, 4, 5]);
    const [order, setOrder] = useState('date_desc');



    useEffect(() => {
        console.log("useEffect called");
    });



    function parentCallback(offset: number, limit: number) {
        variables.offset = offset;
        variables.limit = limit;

        console.log(variables.limit);
    }

    console.log(variables);
    console.log(dataReviews);

    if (loadingReviews) {
        return <div className={`${styles.loader}`}/>;
    }

    if (!loadingReviews && !errorReviews && dataReviews) {
        let reviews = !loadingReviews && !errorReviews && dataReviews ? dataReviews.reviews[0] : null;
        const stats = reviews.stats;

        reviews = reviews.reviews;

        return (
            <div className={`${styles.netreviews_review_rate_and_stars}`}>
                <ReviewsSideInfo stats={stats}
                                 total={getRecommandation(stats).total}
                                 recommandation={getRecommandation(stats).percentageRecommandation}
                />
                <ReviewsContainer parentCallback={parentCallback} reviews={reviews}/>
            </div>
        );
    }
    return (<div></div>);
}
export default Reviews;
