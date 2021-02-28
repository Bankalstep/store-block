import React, {FunctionComponent, memo, useEffect, useMemo, useState} from "react";
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
import {getTotal} from "./utils/RecommandationPercentage";

// import useProduct from "vtex.product-context/useProduct";

const Reviews: FunctionComponent = () => {
    const [filter, setFilter] = useState([]);
    const [order, setOrder] = useState('date_desc');
    const [reviews, setReviews] = useState([]);
    const initialLimit = 5;
    const [limit, setLimit] = useState(initialLimit);
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

    const memoizedStats: number[] = !loadingReviews && !errorReviews && dataReviews ? dataReviews.reviews[0].stats : [];
    // useMemo(() => dataReviews.reviews[0].stats, [dataReviews.reviews[0].stats]) : [];

    console.log(memoizedStats);


    useEffect(() => {
        console.log("useeffect going on");
        if (!loadingReviews && !errorReviews && dataReviews) {
            setReviews(dataReviews.reviews[0].reviews);
        }
    }, [dataReviews]);

    function moreReviews(limit: number) {
        setLimit(limit);
    }

    function filterByRating(rating: [number] | any) {
        setLimit(initialLimit);
        setFilter(rating);
    }

    // const MemoisedSideInfo = memo(ReviewsSideInfo);

    return (
        <div>
            <div className={`${styles.netreviews_review_rate_and_stars}`}>
                <ReviewsSideInfo getReviewsByRating={filterByRating}/>
                <ReviewsContainer reviews={reviews}
                                  loadMoreReviews={moreReviews}
                                  limit={{limit, initialLimit}}
                                  filter={filter}
                                  stats={memoizedStats}
                                  loading={loadingReviews}
                />
            </div>
        </div>
    )
};
export default Reviews;
