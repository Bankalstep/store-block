import {ExternalClient, InstanceOptions, IOContext} from '@vtex/api';
import {Rating} from "../typings/rating";
import {Reviews} from "../typings/review";
import {netreviewsAccount} from "../resolvers/netreviewsAccount";
import {Account} from "../typings/account";

interface reviewArgs {
    offset: number,
    limit: number
}

class Netreviews extends ExternalClient {
    idWebsite: string = '';
    plateforme: string = '';

    constructor(context: IOContext, options?: InstanceOptions) {
        super('https://awsapis3.netreviews.eu', context, options);
    }

    public async getAccountInfo(ctx: Context) {
        const obj: any = await netreviewsAccount(ctx);
        const {idWebsite, plateforme}: Account = obj.data[0];

        this.idWebsite = idWebsite;
        this.plateforme = plateforme;
    }

    public async getRating(): Promise<Rating> {
        // await this.getAccountInfo(ctx);

        return this.http.post('/product', {
                query: 'average',
                idWebsite: "6a826e37-7cb5-4e6a-8523-78b0a57aa45f",
                plateforme: "fr",
                product: '30'
            }
        )
    }

    // public async getReviews(ctx: Context, {offset, limit}: reviewArgs): Promise<Reviews> {
    public async getReviews({offset, limit}: reviewArgs): Promise<Reviews> {
        // await this.getAccountInfo(ctx);

        return this.http.post('/product', {
                query: 'reviews',
                idWebsite: "6a826e37-7cb5-4e6a-8523-78b0a57aa45f",
                plateforme: 'fr',
                product: '30',
                offset: offset,
                limit: limit,
            }
        )
    }
}

export default Netreviews;
