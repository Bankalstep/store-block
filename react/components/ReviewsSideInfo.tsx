import React, {FunctionComponent, MouseEventHandler, useState} from "react";
import {SideInfoProps} from "../typings/global";
import styles from "../styles.css";
import {FaInfoCircle, FaUserAlt} from "react-icons/fa";
import StarsStatsContainer from "./StarsStatsContainer";
import NetreviewsInfo from "./NetreviewsInfo";
import {useQuery} from "react-apollo";
import GetAverage from "../graphql/getAverage.gql";
import GetReviews from "../graphql/getReviews.gql";
import getRecommandation from "../utils/RecommandationPercentage";


const background = (percentage: any): any => {
    return {
        background: 'linear-gradient(to right, rgb(173, 173, 173) ' + percentage + '%, rgb(216, 216, 216) ' + percentage + '%)'
    };
};

const ReviewsSideInfo: FunctionComponent<SideInfoProps> = ({getReviewsByRating}) => {
    const [showInfo, setshowInfo] = useState(false);
    const toggleInfo = () => setshowInfo(!showInfo);
    const {data: dataRating, loading: loadingRating, error: errorRating} = useQuery(GetAverage, {
        ssr: false
    });
    const {data: dataReviews, loading: loadingReviews, error: errorReviews} = useQuery(GetReviews, {
        ssr: false
    });

    if (loadingRating && loadingReviews) {
        // if (loadingRating) {
        return <div className={`${styles.loader}`}/>;
    }

    if (!loadingRating && !errorRating && dataRating && !loadingReviews && dataReviews) {
        // if (!loadingRating && !errorRating && dataRating) {
        const rating = !loadingRating && !errorRating && dataRating ? dataRating.rating[0] : null;
        const reviews = !loadingReviews && !errorReviews && dataReviews ? dataReviews.reviews[0] : null;
        const stats: number[] = reviews.stats;
        const total = getRecommandation(stats).total;
        const recommandation = getRecommandation(stats).percentageRecommandation;

        return (
            <div className={`${styles.left_block}`}>

                <div className={`${styles.netreviews_logo}`}>
                    <img src="https://cl.avis-verifies.com/fr/widget4/tagjs/netreviews-logo-fr.png"
                         alt="Logo Avis-Vérifies"/>
                </div>

                <div className={`${styles.stats_block}`}>

                    <div className={`${styles.top_block}`}>
                        <div className={`${styles.rating_block}`}>
                            <div className={`${styles.rating}`}>{(rating.rate).toFixed(1)}</div>
                            <div className={`${styles.separator}`}>|</div>
                            <div>5</div>
                        </div>
                        <div className={`${styles.bottom_margin} ${styles.user_count}`}>{total}
                            <span className={`${styles.extra_margin}`}> avis </span> <FaUserAlt/>
                        </div>
                        <div className={`${styles.bottom_margin}`}>
                            <span className={`${styles.bold}`}> {recommandation}%</span> des personnes recommandent
                            ce
                            produit.
                        </div>
                    </div>

                    <div className={`${styles.stats}`}>
                        {stats.map((element, index, _array) => {
                                const percent = Math.round(element / total * 100);

                                return (
                                    <div className={`${styles.individual_stats_stars}`} key={index}
                                         onClick={() => getReviewsByRating([index + 1])}>
                                        <div className={`${styles.inline_percentage}`}>
                                            <StarsStatsContainer rating={index}/>
                                            {percent}%
                                        </div>
                                        <div style={background(percent)}
                                             className={`${styles.netreviews_percentage_bar}`}/>
                                    </div>
                                )
                            }
                        )}
                    </div>

                    <div className={`${styles.netreviews_afnor}`}>
                        <a className={`${styles.netreviews_certification}`} target="_blank" href="">
                            Afficher le certificat de confiance
                        </a>

                        <div id={`${styles.netreviews_informations_label}`}>
                        <span className={`${styles.extra_margin}`}
                              onClick={toggleInfo}>Avis soumis à un contrôle </span>
                            <FaInfoCircle/>
                            {showInfo ? <div><NetreviewsInfo onClick={toggleInfo}/></div> : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return <div></div>
}

export default ReviewsSideInfo;
