import React, {FunctionComponent} from 'react'
import {useQuery} from 'react-apollo';
import GetReviews from './graphql/getReviews.gql';
import GetAverage from "./graphql/getAverage.gql";
import "@fontsource/nunito";
import styles from "./styles.css";
import ReviewsContainer from "./components/ReviewsContainer";
import ReviewsSideInfo from "./components/ReviewsSideInfo";
// import useProduct from "vtex.product-context/useProduct";

const Reviews: FunctionComponent = () => {
    const {data: dataReviews, loading: loadingReviews, error: errorReviews} = useQuery(GetReviews, {
        ssr: false,
        variables: {
            offset: 0,
            limit: 3
        }
    });

    const {data: dataRating, loading: loadingRating, error: errorRating} = useQuery(GetAverage, {
        ssr: false
    });

    if (loadingRating && loadingReviews) {
        return <div className={`${styles.loader}`}/>;
    }

    if (!loadingReviews && !errorReviews && dataReviews && !loadingRating && !errorRating && dataRating) {
        const reviews = !loadingReviews && !errorReviews && dataReviews ? dataReviews.reviews[0] : null;
        const stats = reviews.stats.reverse();
        const rating = !loadingRating && !errorRating && dataRating ? dataRating.rating[0] : null;

        function getTotal() {
            let total = 0;
            stats.forEach(
                (element: any) => {
                    total += element;
                })
            return total;
        }

        function getRecommandation() {
            let ratesAbove3 = 0;
            let percentageRecommandation = 0;
            let total = getTotal();
            stats.forEach(
                (element: any, index: number) => {
                    if (element > 0 && index <= 2) {
                        ratesAbove3 += element;
                    }
                })
            percentageRecommandation = Math.round((ratesAbove3 / getTotal()) * 100)
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
                                         filter={reviews}
                                         recommandation={getRecommandation().percentageRecommandation}
                        />
                    </div>

                </div>

                <div className={`${styles.right_block}`}>

                    <div className={`${styles.reviews_list}`}>
                        <ReviewsContainer reviews={reviews.reviews}/>
                    </div>
                </div>

            </div>
        );
    }
    return (<div></div>);
}
export default Reviews;
