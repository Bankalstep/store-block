import React, {FC} from 'react'
import ConfigForm from "./components/ConfigForm";
import {FormattedMessage, useIntl} from 'react-intl';

const Admin: FC = () => {
    const intl = (useIntl().locale.split('-'))[1].toLowerCase();
    console.log(intl);

    return (
        <div>
            <h1><FormattedMessage id="netreviews.module.conf"/></h1>
            <ConfigForm locale={intl}/>
        </div>
    )
}

export default Admin
