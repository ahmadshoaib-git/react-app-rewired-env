import React from 'react';
import { MAILROOM_COLORED_LOGO } from '../../assets/images';

function ActionItemsFooter(props) {
    const { actions } = props;
    return (
        <div className="package-action-items-footer">
            <img src={MAILROOM_COLORED_LOGO} className="packagex-colored-logo" alt="PackageX" />
            <div className="footer-address">
                <p> 500 7th Ave, </p>
                <p> New York, NY 10018 </p>
                <a href="https://packagex.io/"> support@packagex.io </a>
                {/* <p> support@packagex.app </p> */}
            </div>
        </div>
    )
}

export default ActionItemsFooter;
