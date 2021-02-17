export const netreviewsAccount = (ctx: Context) => {
    const {clients: {masterdata}} = ctx;

    return masterdata.searchDocuments({
        dataEntity: "netreviews",
        fields: ['idWebsite', 'secretKey', 'plateforme'],
        pagination: {page: 1, pageSize: 1}
    })

// return await masterdata.scrollDocuments({
//     dataEntity: "netreviews",
//     fields: ['idWebsite', 'secretKey', 'plateforme']
// });
}
