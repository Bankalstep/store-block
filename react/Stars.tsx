import React, {FC} from 'react'
import {useQuery} from 'react-apollo';
import GetAverage from './graphql/getAverage.gql';
import NetreviewsStars from "./components/NetreviewsStars";
import styles from "./styles.css";

const Stars: FC = () => {
    const {data, loading, error} = useQuery(GetAverage, {
        ssr: false
    });

    if (loading) {
        return <div className={`${styles.loader}`}></div>;
    }

    const rate = !loading && !error && data ? data.average[0].rate : null;

    return <NetreviewsStars rating={rate}/>;
}
export default Stars;
