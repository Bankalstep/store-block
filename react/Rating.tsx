import React, {FC, Fragment, FunctionComponent} from 'react'
import {useQuery} from 'react-apollo';
import GetAverage from './graphql/getAverage.gql';
import styles from "./styles.css";
import "@fontsource/nunito";
import StarsContainer from "./components/StarsContainer";
import RatingInfo from "./components/RatingInfo";

const Rating: FunctionComponent = () => {
    const {data, loading, error} = useQuery(GetAverage, {
        ssr: false
    });

    if (loading) {
        return <div className={`${styles.loader}`}/>;
    }

    if (!loading && !error && data) {
        const count = data.rating[0].count;
        const rate = data.rating[0].rate;

        return (
            <div className={`${styles.netreviews_review_stars}`}>
                <StarsContainer rating={rate}/><RatingInfo count={count}/>
            </div>
        )
    }
    return (
        <div></div>
    );

}
export default Rating;
