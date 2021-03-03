import React, {FunctionComponent, useEffect, useState} from "react";
import {useQuery} from "react-apollo";
import GetReviews from "./graphql/getReviews.gql";
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
    const [stats, setStats] = useState([]);
    const initialLimit = 2;
    const [limit, setLimit] = useState(initialLimit);
    const [filterClicked, setFilterClicked] = useState(!!filter.length);

    const product = useProduct().product.productId;

    let variables = {
        product: product,
        offset: 0,
        limit: limit,
        filter: filter,
        order: selectedOrder
    }

    const {data, loading, error} = useQuery(GetReviews, {
        ssr: false,
        variables: variables
    });

    useEffect(() => {
        if (!loading && !error && data.reviews.length) {
            setReviews(data.reviews[0].reviews);
            setStats(data.reviews[0].stats)
        }
    }, [data]);

    function moreReviews(increment: number) {
        setLimit((limit) => {
            console.log(limit);
            console.log(increment);
            return limit + increment
        });
    }

    function filterByRating(rating: [number] | any) {
        setLimit(initialLimit);
        setFilter(rating);
    }

    function filterByOrder(event: React.ChangeEvent<HTMLInputElement>) {
        setFilterClicked(!filterClicked)
        setLimit(initialLimit);
        setFilter([]);
        setOrder(event.target.value);
    }

    return (
        <div>
            <div id="netreviews_block" className={`${styles.netreviews_review_rate_and_stars}`}>
                <ReviewsSideInfo stats={stats} filterByRating={filterByRating} filter={filter} setFilterClicked={setFilterClicked}/>
                <ReviewsContainer reviews={reviews}
                                  limit={{limit, initialLimit}}
                                  filter={filter}
                                  filterByOrder={filterByOrder}
                                  order={selectedOrder}
                                  getMoreReviews={moreReviews}
                                  stats={stats}
                                  loading={loading}
                />
            </div>
        </div>
    )
};
export default Reviews;
