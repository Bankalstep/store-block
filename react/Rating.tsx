import React, {FC, Fragment} from 'react'
import {useQuery} from 'react-apollo';
import GetAverage from './graphql/getAverage.gql';
import styles from "./styles.css";
import "@fontsource/roboto";
import StarsContainer from "./components/StarsContainer";
import RatingInfo from "./components/RatingInfo";

const Rating: FC = () => {
    const {data, loading, error} = useQuery(GetAverage, {
        ssr: false
    });

    if (loading) {
        return <div className={`${styles.loader}`}/>;
    }

    const rate = !loading && !error && data ? data.average[0].rate : null;
    const count = !loading && !error && data ? data.average[0].count : null;

    return (
        <div className={`${styles.netreviews_review_rate_and_stars}`}>
            <StarsContainer rating={rate}/><RatingInfo count={count}/>
        </div>
    )
}
export default Rating;
