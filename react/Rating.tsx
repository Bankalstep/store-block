import React, {FC} from 'react'
import {useQuery} from 'react-apollo';
import GetAverage from './graphql/getAverage.gql';
// import useProduct from "vtex.product-context/useProduct";

const Rating : FC = () => {

    const {data, loading, error} = useQuery(GetAverage, {
        ssr: false
    });

    console.log(data);

    return (<div>AVERAGE SOON</div>);

}
export default Rating;
