import React, {FunctionComponent, useEffect, useMemo, useState} from "react";
import {useQuery} from "react-apollo";
import GetReviews from "./graphql/getReviews.gql";
import GetAverage from "./graphql/getAverage.gql";
import "@fontsource/nunito";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import styles from "./styles.css";
import ReviewsContainer from "./components/ReviewsContainer";
import ReviewsSideInfo from "./components/ReviewsSideInfo";
import getRecommandation from "./utils/RecommandationPercentage";
import {FormattedMessage} from "react-intl";
// import useProduct from "vtex.product-context/useProduct";

const Reviews: FunctionComponent = () => {
    const [filter, setFilter] = useState([1, 2, 3, 4, 5]);
    const [order, setOrder] = useState('date_desc');
    const [reviews, setReviews] = useState([]);
    const [limit, setLimit] = useState(1);

    let variables = {
        offset: 0,
        limit: limit,
        filter: filter,
        order: order
    }

    const {data: dataReviews, loading: loadingReviews, error: errorReviews} = useQuery(GetReviews, {
        ssr: false,
        variables: variables,
        fetchPolicy: "no-cache"
    });

    console.log(dataReviews);

    useEffect(() => {
        console.log('action going on deps change');

        if (!loadingReviews && !errorReviews && dataReviews) {
            setReviews(!loadingReviews && !errorReviews && dataReviews ? dataReviews.reviews[0].reviews : []);
        }
    }, [dataReviews]);

    function moreReviews(limit: number) {
        setLimit(limit);
    }
    // const MemoisedSideInfo = React.memo(ReviewsSideInfo);

    return reviews.length ? (
        <div>
            <div className={`${styles.netreviews_review_rate_and_stars}`}>
                <ReviewsSideInfo/>
                <ReviewsContainer reviews={reviews} parentCallback={moreReviews} limit={limit}/>
            </div>
        </div>
    ) : <div/>;
};
export default Reviews;
