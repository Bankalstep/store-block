export interface Rating {
    [productId: string]: {
        count: number,
        rate: number
    };
}
// export interface Rating {
//     average: Average[];
// }
//
// export interface Average {
//     count: string;
//     rate: string;
// }
