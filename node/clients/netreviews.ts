import {ExternalClient, InstanceOptions, IOContext} from '@vtex/api';
import {Rating} from "../typings/rating";
import {Reviews} from "../typings/review";
import {netreviewsAccount} from "../resolvers/netreviewsAccount";
import {Account} from "../typings/account";

interface reviewArgs {
    offset: number,
    limit: number,
    filter: [number],
    order: string
}

class Netreviews extends ExternalClient {
    idWebsite: string = '';
    plateforme: string = '';

    constructor(context: IOContext, options?: InstanceOptions) {
        super('https://awsapis3.netreviews.eu', context, options);
    }

    public async getAccountInfo(ctx: Context) {
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

    public async getReviews(ctx: Context, {offset, limit, filter, order}: reviewArgs): Promise<Reviews> {
        await this.getAccountInfo(ctx);

        return this.http.post('/product', {
                query: 'reviews',
                idWebsite: this.idWebsite,
                plateforme: 'fr',
                product: '30',
                offset: offset,
                limit: limit,
                filter: filter,
                order: order
            }
        )
    }
}

export default Netreviews;
