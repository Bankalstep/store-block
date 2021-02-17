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
            const data = await netreviews.getRating(ctx);
            return data[Object.keys(data)[0]];
        } catch (error) {
            console.log(error);
            throw new TypeError(error);
        }
    },
    reviews: async (_: any, args: any, ctx: Context, _infos: any) => {
        const {clients: {netreviews}} = ctx;
        const {offset, limit} = args;

        try {
            return await netreviews.getReviews(ctx, {offset, limit});
        } catch (error) {
            throw new TypeError(error);
        }
    }
}
