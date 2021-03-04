import React, {FC, Fragment, FunctionComponent, MouseEventHandler} from 'react'
import {useQuery} from 'react-apollo';
import GetAverage from './graphql/getAverage.gql';
import styles from "./styles.css";
import "@fontsource/nunito";
import StarsContainer from "./components/StarsContainer";
import RatingInfo from "./components/RatingInfo";
import useProduct from "vtex.product-context/useProduct";

const Rating: FunctionComponent = () => {
    const product = useProduct().product.productId;
    const {data, loading, error} = useQuery(GetAverage, {
        ssr: false,
        variables: {
            product: product
        }
    });

    const executeScroll = (element: HTMLElement | null): any => {
        console.log(element);
        if (element) {
            element.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    };

    if (loading) {
        return <div className={`${styles.loader}`}/>;
    }

    if (!loading && !error && data.rating !== null) {
        const count = data.rating[0].count;
        const rate = data.rating[0].rate;

        return (
            <div className={`${styles.netreviews_review_stars}`}
                 onClick={() => executeScroll(document.getElementById('netreviews_block'))}>
                <StarsContainer rating={rate}/><RatingInfo count={count}/>
            </div>
        )
    }
    return (
        <div/>
    );

}
export default Rating;
