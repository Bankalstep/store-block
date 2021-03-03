import React, {FunctionComponent} from "react";
import {FormattedMessage} from "react-intl";
import styles from "../styles.css";

interface NoReviewProps {
}

const NoReview: FunctionComponent<NoReviewProps> = ({}) => {

    return (
        <div className={`${styles.no_review}`}>
            <FormattedMessage id="noreviews"/>
        </div>
    )
}

export default NoReview;
