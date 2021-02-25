import {MouseEventHandler} from "react";

export interface StarsProps {
    rating: number
}

export interface RatingProps {
    count: number
}

export interface ReviewsContainerProps {
    reviews: ReviewProps[]
    parentCallback: updateVariables
}

interface updateVariables {
    (offset: number, limit: number): void;
}

export interface SideInfoProps {
    total: number
    recommandation: number
    stats: number[]
}

export interface ReviewProps {
    rate: number
    firstname: string
    lastname: string
    review: string
    review_id: string
    brand_name: string
    count_helpful_no: number
    count_helpful_yes: number
    description: string
    moderation: ModerationContainer
    email: string
    id_product: number
    id_review: string
    id_review_product: string
    info1?: string
    info2?: string
    info3?: string
    info4?: string
    info5?: string
    info6?: string
    info7?: string
    info8?: string
    info9?: string
    info10?: string
    medias: string
    order_date: string
    order_ref: string
    publish_date: string
    review_date: string
    sign_helpful: string
    url_image_product: string
}


