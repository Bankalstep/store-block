import React, {FunctionComponent, useState} from 'react'
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
import set = Reflect.set;
// import useProduct from "vtex.product-context/useProduct";

const Reviews: FunctionComponent = () => {
    const [{offset, limit}, loadMoreReviews] = useState({offset: 0, limit: 3});
    const [filter, setFilter] = useState([1, 2, 3, 4, 5]);
    const [order, setOrder] = useState('date_desc');

    const variables = {
        offset: offset,
        limit: limit,
        filter: filter,
        order: order
    }

    const {data: dataReviews, loading: loadingReviews, error: errorReviews} = useQuery(GetReviews, {
        ssr: false,
        variables: variables
    });

    console.log(variables);
    console.log(dataReviews);

    const {data: dataRating, loading: loadingRating, error: errorRating} = useQuery(GetAverage, {
        ssr: false
    });

    if (loadingRating && loadingReviews) {
        return <div className={`${styles.loader}`}/>;
    }

    if (!loadingReviews && !errorReviews && dataReviews && !loadingRating && !errorRating && dataRating) {
        let reviews = !loadingReviews && !errorReviews && dataReviews ? dataReviews.reviews[0] : null;
        const stats = reviews.stats;
        const rating = !loadingRating && !errorRating && dataRating ? dataRating.rating[0] : null;

        reviews = reviews.reviews;

        function getTotal() {
            let total = 0;
            stats.forEach(
                (element: any) => {
                    total += element;
                })
            return total;
        }

        function getRecommandation() {
            let rateAbove3 = 0;
            let percentageRecommandation = 0;
            let total = getTotal();
            stats.forEach(
                (element: any, index: number) => {
                    if (element > 0 && index >= 2) {
                        rateAbove3 += element;
                    }
                })
            percentageRecommandation = Math.round((rateAbove3 / getTotal()) * 100);
            return {
                percentageRecommandation,
                total
            };
        }

        return (
            <div className={`${styles.netreviews_review_rate_and_stars}`}>
                <div className={`${styles.left_block}`}>
                    <div className={`${styles.netreviews_logo}`}>
                        <img src="https://cl.avis-verifies.com/fr/widget4/tagjs/netreviews-logo-fr.png"
                             alt="Logo Avis-Vérifies"/>
                    </div>

                    <div className={`${styles.stats_block}`}>
                        <ReviewsSideInfo rating={rating}
                                         stats={stats}
                                         total={getRecommandation().total}
                                         recommandation={getRecommandation().percentageRecommandation}
                        />
                    </div>
                </div>

                <div className={`${styles.right_block}`}>
                    <div className={`${styles.reviews_list}`}>
                        <ReviewsContainer reviews={reviews}/>
                        <button onClick={() => loadMoreReviews({offset: 0, limit: limit + 3})}>
                            <FormattedMessage id="load-more"/></button>
                    </div>
                </div>
            </div>
        );
    }
    return (<div></div>);
}
export default Reviews;
