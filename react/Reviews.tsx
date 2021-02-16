import React, {FC} from 'react'
import {useQuery} from 'react-apollo';
import GetReviews from './graphql/getReviews.gql';
// import useProduct from "vtex.product-context/useProduct";

const Reviews: FC = () => {
    const {data, loading, error} = useQuery(GetReviews, {
        ssr: false,
        variables: {
            offset: 0,
            limit: 3
        }
    });

    console.log(data);
    // console.log(error);

    return (<div>REVIEWS SOON</div>);
}
export default Reviews;
