import {Rating} from "../typings/rating";
import {Reviews} from "../typings/review";
// import {netreviewsAccount} from "./netreviewsAccount"
// import {Account} from "../typings/account";

declare var process: {
    env: {
        VTEX_APP_ID: string
    }
}

export const queries = {
    average: async (_: any, _args: any, ctx: Context, _infos: any) => {
        const {clients: {netreviews}} = ctx;
        // const appId = process.env.VTEX_APP_ID;
        try {
            return await netreviews.getRating()
                .then((data: Rating) => {
                    return data[Object.keys(data)[0]];
                });
        } catch (error) {
            console.log(error);
            throw new TypeError(error)
        }
    },
    reviews: async (_: any, args: any, ctx: Context, _infos: any) => {
        const {clients: {netreviews}} = ctx;
        const {offset, limit} = args;

        try {
            return await netreviews.getReviews({offset, limit})
                .then((data: Reviews) => {
                    return data;
                });
        } catch (error) {
            throw new TypeError(error)
        }
    }
}
