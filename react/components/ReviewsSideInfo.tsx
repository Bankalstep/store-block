import React, {CSSProperties, Fragment, FunctionComponent, MouseEventHandler, useEffect, useState} from "react";
import {SideInfoProps} from "../typings/global";
import styles from "../styles.css";
import {FaAngleUp, FaInfoCircle, FaUserAlt} from "react-icons/fa";
import StarsStatsContainer from "./StarsStatsContainer";
import NetreviewsInfo from "./NetreviewsInfo";
import {useQuery} from "react-apollo";
import GetAverage from "../graphql/getAverage.gql";
import GetReviews from "../graphql/getReviews.gql";
import getRecommandation from "../utils/RecommandationPercentage";
import {load} from "@fingerprintjs/fingerprintjs";
import {FormattedMessage} from "react-intl";
import set = Reflect.set;
import {func} from "prop-types";

const ReviewsSideInfo: FunctionComponent<SideInfoProps> = ({stats, filterByRating, filter, setFilterClicked}) => {
    const [showInfo, setshowInfo] = useState(false);
    // const [filterClicked, setFilterClicked] = useState(false);
    const filterClicked = !!filter.length;

    console.log(filterClicked);
    const toggleInfo = () => setshowInfo(!showInfo);

    const {data, loading, error} = useQuery(GetAverage, {
        ssr: false
    });

    const background = (percentage: any): any => {
        return {
            background: 'linear-gradient(to right, rgb(173, 173, 173) ' + percentage + '%, rgb(216, 216, 216) ' + percentage + '%)'
        };
    };

    if (!loading && !error && data) {
        const rating = data.rating.length ? data.rating[0] : null;
        const total = getRecommandation(stats).total;
        const recommandation = getRecommandation(stats).percentageRecommandation;

        function compareIndex(index: number, selectedFilter: number[]) {
            return selectedFilter.length && index + 1 === selectedFilter[0] ? {opacity: 1} : {opacity: 0.2};
        }

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
                                    <div style={filterClicked ? compareIndex(index, filter) : {opacity: 1}}
                                         className={`${styles.individual_stats_stars}`} key={index}
                                         onClick={() => {
                                             setFilterClicked(true);
                                             filterByRating([index + 1]);
                                         }}>

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

                {loading ? <div className={`${styles.loader}`}/> : ''}

                {filter.length ?
                    <button className={`${styles.reset_filter}`}
                            onClick={() => {
                                filterByRating([]);
                                setFilterClicked(false);
                            }}>
                        <FormattedMessage id="reset-filter"/><FaAngleUp className={`${styles.custom_arrowup}`}/>
                    </button>
                    : ''}
            </div>
        )
    }
    return <div/>
}

export default ReviewsSideInfo;
