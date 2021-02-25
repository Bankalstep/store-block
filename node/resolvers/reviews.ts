declare var process: {
    env: {
        VTEX_APP_ID: string
    }
}

export const queries = {
    rating: async (_: any, _args: any, ctx: Context, _infos: any) => {
        const {clients: {netreviews}} = ctx;
        // const appId = process.env.VTEX_APP_ID;
        try {
            const data = await netreviews.getRating(ctx);
            console.log(data);
            return data[Object.keys(data)[0]];
        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    reviews: async (_: any, args: any, ctx: Context, _infos: any) => {
        const {clients: {netreviews}} = ctx;
        const {offset, limit, filter, order} = args;

        console.log(args);
        try {
            const data = await netreviews.getReviews(ctx, {offset, limit, filter, order});
            // console.log(data);
            return data;
        } catch (error) {
            throw new TypeError(error);
        }
    }
}
