import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import './styles.css';
import {
    ACTION_ITEM_SNAP_SEND_LOGO,
    ACTION_ITEM_HOLD_LOGO,
    ACTION_ITEM_DESTROY_LOGO,
} from '../../assets/images';
import { getBorderClassName } from '../../utils/utils.functions';
getBorderClassName
function ActionPerformedModal(props) {
    const { open, packageType } = props;

    return (
        <Dialog open={open}>
            <div className="generic-modal">
                <div className="content-container">
                    <img src={getDefaultLogo(packageType.toLowerCase())} />
                    <p className="action-message"> You have already performed this action! </p>
                </div>
            </div>
        </Dialog>
    )
}



function getDefaultLogo(type) {
    const containerLogo = type.includes('hold')
        ? ACTION_ITEM_HOLD_LOGO
        : type.includes('destroy')
            ? ACTION_ITEM_DESTROY_LOGO
            : ACTION_ITEM_SNAP_SEND_LOGO
    return containerLogo;
}

export default ActionPerformedModal;