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
    let variables = {
        product: product
    }
    const {data, loading, error} = useQuery(GetAverage, {
        ssr: false,
        variables: variables
    });

    const executeScroll = (element: HTMLElement | null): any => {
        console.log(element);
        if (element) {
            element.scrollIntoView();
        }
    };

    if (loading) {
        return <div className={`${styles.loader}`}/>;
    }

    if (!loading && !error && data.rating.length) {
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
