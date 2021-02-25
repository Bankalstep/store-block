import React, {FunctionComponent, useState} from "react";
import {SideInfoProps} from "../typings/global";
import styles from "../styles.css";
import {FaInfoCircle, FaUserAlt} from "react-icons/fa";
import StarsStatsContainer from "./StarsStatsContainer";
import NetreviewsInfo from "./NetreviewsInfo";
import {useQuery} from "react-apollo";
import GetAverage from "../graphql/getAverage.gql";

const background = (percentage: any): any => {
    return {
        background: 'linear-gradient(to right, rgb(173, 173, 173) ' + percentage + '%, rgb(216, 216, 216) ' + percentage + '%)'
    };
};

const ReviewsSideInfo: FunctionComponent<SideInfoProps> = ({rating, stats, total, recommandation}) => {
    const [showInfo, setshowInfo] = useState(false)
    const toggleInfo = () => setshowInfo(!showInfo)
    const {data: dataRating, loading: loadingRating, error: errorRating} = useQuery(GetAverage, {
        ssr: false
    });

    if (loadingRating) {
        return <div className={`${styles.loader}`}/>;
    }

    return (
        <div>
            <div>
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
                        <span className={`${styles.bold}`}> {recommandation}%</span> des personnes recommandent ce
                        produit.
                    </div>

                </div>
            </div>

            <div className={`${styles.stats}`}>
                {stats.map((element, index, _array) => {
                        const percent = Math.round(element / total * 100);

                        return (
                            <div className={`${styles.individual_stats_stars}`} key={index}>
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
                <a className={`${styles.netreviews_certification}`} target="_blank" href="">Afficher le certificat de
                    confiance</a>
                <label id={`${styles.netreviews_informations_label}`}>
                    <span className={`${styles.extra_margin}`} onClick={toggleInfo}>Avis soumis à un contrôle </span>
                    <FaInfoCircle/>
                </label>
            </div>

            {showInfo ? <div><NetreviewsInfo onClick={toggleInfo} /></div> : null}

        </div>
    )
}

export default ReviewsSideInfo