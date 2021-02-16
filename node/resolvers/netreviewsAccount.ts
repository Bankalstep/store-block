export const netreviewsAccount = async (ctx: Context) => {
    const {clients: {masterdata}} = ctx;

    return await masterdata.scrollDocuments({
        dataEntity: "netreviews",
        fields: ['idWebsite', 'secretKey', 'plateforme']
    });
}
