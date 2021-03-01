import {ExternalClient, InstanceOptions, IOContext} from '@vtex/api';
import {Rating} from "../typings/rating";
import {Reviews} from "../typings/review";
import {netreviewsAccount} from "../resolvers/netreviewsAccount";
import {Account} from "../typings/account";


interface reviewArgs {
    product: string,
    offset: number,
    limit: number,
    filter: [number],
    order: string
}

declare var process: {
    env: {
        VTEX_APP_ID: string
    }
}

class Netreviews extends ExternalClient {
    idWebsite: string = '';
    plateforme: string = '';

    constructor(context: IOContext, options?: InstanceOptions) {
        super('https://awsapis3.netreviews.eu', context, options);
        console.log(context);

    }

    public async getAccountInfo(ctx: Context) {
        const { clients }  = ctx;
        // console.log(ctx);
        // console.log(apps);
        console.log(clients);

        const appId = process.env.VTEX_APP_ID;
        await clients.apps.getAppSettings(appId);

        if (this.idWebsite === '') {
            const data: any = await netreviewsAccount(ctx);
            const {idWebsite, plateforme}: Account = data[0];

            this.idWebsite = idWebsite;
            this.plateforme = plateforme;
        }
    }

    public async getRating(ctx: Context): Promise<Rating> {
        await this.getAccountInfo(ctx);

        return this.http.post('/product', {
                query: 'average',
                idWebsite: this.idWebsite,
                plateforme: "fr",
                product: '30'
            }
        )
    }

    public async getReviews(ctx: Context, {product, offset, limit, filter, order}: reviewArgs): Promise<Reviews> {
        await this.getAccountInfo(ctx);
        console.log(ctx);

        return this.http.post('/product', {
                query: 'reviews',
                idWebsite: this.idWebsite,
                plateforme: 'fr',
                product: product,
                offset: offset,
                limit: limit,
                filter: filter,
                order: order
            }
        )
    }
}

export default Netreviews;
