import React, {FunctionComponent} from "react";
import styles from "../styles.css";
import {FormattedMessage} from "react-intl";
import nrDateFormat from "../utils/DateConverter"

interface Moderation {
    comment_date: string
    comment_origin: number
    comment: string
    commentUsername: string
}

const ModerationBlock: FunctionComponent<Moderation> = ({comment_date, comment_origin, comment, commentUsername}) => {
    function getOrigin(param: number) {
        let origin = "Modérateur";
        if (param == 2) {
            origin = document.domain;
        } else {
            origin = commentUsername;
        }
        return origin
    }

    return (
        <div className={`${styles.netreviews_discussion}`}>
            <div className={`${styles.netreviews_website_answer}`}>
                    <span className={`${styles.netreviews_answer_title}`}>
                        <FormattedMessage
                            id="moderation.answer-from"/>{getOrigin(comment_origin)} le {nrDateFormat(comment_date.substr(0, 10))}
                    </span>
                <br/>
                {comment}
            </div>
        </div>
    )
}

export default ModerationBlock
