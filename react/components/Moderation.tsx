import React, {FunctionComponent} from "react";
import styles from "../styles.css";
import {FormattedMessage} from "react-intl";
import nrDateFormat from "../utils/DateConverter"

interface Moderation {
    commentDate: string
    commentOrigin: number
    comment: string
    commentUsername: string
    isVisible: boolean
}

const ModerationBlock: FunctionComponent<Moderation> = ({commentDate, commentOrigin, comment, commentUsername, isVisible}) => {
    function getOrigin(param: number) {
        let origin = "Modérateur";
        if (param == 2) {
            origin = document.domain;
        } else {
            origin = commentUsername;
        }
        return origin;
    }

    return (
        <div style={isVisible ? {opacity: 1, height: 'auto'} : {opacity: 0, height: 0}} className={`${styles.netreviews_discussion}`}>
            <div className={`${styles.netreviews_website_answer}`}>
                <span className={`${styles.netreviews_answer_title}`}>
                    <FormattedMessage id="moderation.answer-from"/>
                    {getOrigin(commentOrigin)}
                    le {nrDateFormat(commentDate.substr(0, 10))}
                </span>
                <span className={`${styles.netreviews_answer}`}>{comment}</span>
            </div>
        </div>
    )
}

export default ModerationBlock
