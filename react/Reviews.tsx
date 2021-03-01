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
import useProduct from "vtex.product-context/useProduct";

const Reviews: FunctionComponent = () => {
    const [filter, setFilter] = useState([]);
    const [selectedOrder, setOrder] = useState('date_desc');
    const [reviews, setReviews] = useState([]);
    const initialLimit = 2;
    const [limit, setLimit] = useState(2);
    const [stats, setStats] = useState([])
    const product = useProduct().product.productId;
    let variables = {
        product: "30",
        offset: 0,
        limit: limit,
        filter: filter,
        order: selectedOrder
    }
    const {data: dataReviews, loading: loadingReviews, error: errorReviews} = useQuery(GetReviews, {
        ssr: false,
        variables: variables,
        fetchPolicy: "no-cache"
    });

    // const memoizedStats: number[] = !loadingReviews && !errorReviews && dataReviews.reviews.length ? dataReviews.reviews[0].stats : [];

    useEffect(() => {
        console.log("useeffect going on");
        if (!loadingReviews && !errorReviews && dataReviews.reviews.length) {
            setReviews(dataReviews.reviews[0].reviews);
            setStats(dataReviews.reviews[0].stats)
        }
    }, [dataReviews]);

    function moreReviews(limit: number) {
        setLimit(limit);
    }

    function filterByRating(rating: [number] | any) {
        setLimit(initialLimit);
        setFilter(rating);
    }

    function filterByOrder(order: string) {
        setLimit(initialLimit);
        setFilter([]);
        setOrder(order);
    }

    const MemoisedReviewsSideInfo = memo(ReviewsSideInfo);

    return (
        <div>
            <div className={`${styles.netreviews_review_rate_and_stars}`}>
                <MemoisedReviewsSideInfo stats={stats} filterByRating={filterByRating}/>
                <ReviewsContainer reviews={reviews}
                                  limit={{limit, initialLimit}}
                                  filter={filter}
                                  filterByOrder={filterByOrder}
                                  order={selectedOrder}
                                  getMoreReviews={moreReviews}
                                  stats={stats}
                                  loading={loadingReviews}
                />
            </div>
        </div>
    )
};
export default Reviews;
