function getTotal(stats: number[]) {
    let total = 0;
    stats.forEach(
        (element: any) => {
            total += element;
        })
    return total;
}

export default function getRecommandation(stats: number[]) {
    let rateAbove3 = 0;
    let percentageRecommandation = 0;
    let total = getTotal(stats);
    stats.forEach(
        (element: any, index: number) => {
            if (element > 0 && index >= 2) {
                rateAbove3 += element;
            }
        })
    percentageRecommandation = Math.round((rateAbove3 / getTotal(stats)) * 100);
    return {
        percentageRecommandation,
        total
    };
}
