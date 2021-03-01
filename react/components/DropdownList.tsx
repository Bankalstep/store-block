import React, {FunctionComponent} from "react";
import {Dropdown} from 'vtex.styleguide'
import {FilterByOrder} from "../typings/global";
import {defineMessages, IntlProvider, useIntl} from 'react-intl';


interface DropdownProps {
    filterByOrder: FilterByOrder
    selectedOrder: string
}

const messages = defineMessages({
    oldest: {
        defaultMessage: '',
        id: 'filter.date-asc',
    },
    highest: {
        defaultMessage: '',
        id: 'filter.rate-desc',
    },
    lowest: {
        defaultMessage: '',
        id: 'filter.rate-asc',
    },
    most_useful: {
        defaultMessage: '',
        id: 'filter.most-helpful',
    },
    default: {
        defaultMessage: '',
        id: 'filter.date-desc',
    }
});

const DropdownList: FunctionComponent<DropdownProps> = ({filterByOrder, selectedOrder}) => {
    const intl = useIntl();

    const options = [
        {value: 'date_asc', label: 'oldest'},
        {value: 'rate_desc', label: 'highest'},
        {value: 'rate_asc', label: 'lowest'},
        {value: 'most_helpful', label: 'most_useful'},
        {value: 'date_desc', label: 'default'},
    ];

    return (
        <div>
            <Dropdown
                label=""
                options={options}
                value={selectedOrder}
                onChange={filterByOrder}
            />
        </div>

    )
}

export default DropdownList;

//
// <div className="netreviews_filtering_section"><label>Trier les avis :
//     <select id="netreviews_reviews_filter" name="netreviews_reviews_filter" onChange="refreshReviewsWithFilter('')">
//         <option value="newest" selected="selected">Les plus récents</option>
//         <option value="oldest">Les plus anciens</option>
//         <option value="highest">Notes les plus élevées</option>
//         <option value="lowest">Notes les plus basses</option>
//         <option value="most_useful">Les plus utiles</option>
//         <option style="display:none;" value="rate">Note</option>
//     </select></label>
// </div>
