import React, {FunctionComponent} from "react";
import {FormattedMessage} from "react-intl";

interface NoReviewProps {
}

const NoReview: FunctionComponent<NoReviewProps> = ({}) => {

    return (
        <div>
            <FormattedMessage id="noreviews"/>
        </div>
    )
}

export default NoReview;
