import React, {FunctionComponent, useEffect, useMemo, useState} from 'react'
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
    const [{offset, limit}, loadMoreReviews] = useState({offset: 0, limit: 1});

    let variables = {
        offset: offset,
        limit: limit,
        filter: filter,
        order: order
    }

    // useEffect(() => {
    //     console.log("useEffect called");
    // });

    const {data: dataReviews, loading: loadingReviews, error: errorReviews} = useQuery(GetReviews, {
        ssr: false,
        variables: variables,
        fetchPolicy: "network-only"
    });

    function parentCallback(offset: number, limit: number) {
        variables.offset = offset;
        variables.limit = limit;
    }

    if (!loadingReviews && !errorReviews && dataReviews) {
        let reviews = !loadingReviews && !errorReviews && dataReviews ? dataReviews.reviews[0] : null;
        const MemoisedComponent = React.memo(ReviewsSideInfo);

        reviews = reviews.reviews;

        return (
            <div>
                <div className={`${styles.netreviews_review_rate_and_stars}`}>
                    <MemoisedComponent />
                    <ReviewsContainer parentCallback={parentCallback} reviews={reviews}/>

                </div>
                <button onClick={() => loadMoreReviews({offset: 0, limit: limit + 1})}>
                    <FormattedMessage id="load-more"/></button>
            </div>
        );
    }
    return (<div></div>);
}
export default Reviews;
