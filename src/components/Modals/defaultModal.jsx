import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import './styles.css';
import {
    PICKUP_LOGO,
    DISCARD_LOGO,
    ACTION_ITEM_HOLD_LOGO,
    ACTION_ITEM_DESTROY_LOGO,
    ACTION_ITEM_FORWARD_LOGO,
    ACTION_ITEM_SNAP_SEND_LOGO,
} from '../../assets/images';
import { stringToTitleCase, getColorClassName } from '../../utils/utils.functions';

function DefaultModal(props) {
    const { title } = props;
    const colorStyle = getColorClassName(title);
    const message = title === 'forward'
        ? 'Forwarded'
        : title === 'discarded'
            ? 'Discarded'
            : title === 'picked'
                ? 'Picked up'
                : 'You have already performed this action!'
    const modalMessage = title.includes('request') ? message : `Your package has been ${message} successfully!`;
    const modalData = getDefaultLogo(title.toLowerCase());
    return (
        <Dialog open={true}>
            <div className="generic-modal">
                <div className="content-container">
                    <img src={modalData.logo} />
                    <p className={`action-title ${colorStyle}`}> {stringToTitleCase(modalData.title)} </p>
                    <p className="action-message"> {modalMessage} </p>
                    {/* <p className="action-message"> You have already performed this action! </p> */}
                </div>
            </div>
        </Dialog>
    )
}

function getDefaultLogo(type) {
    const containerLogo = type.includes('forward')
        ? {
            logo: ACTION_ITEM_FORWARD_LOGO,
            title: 'Forward'
        }
        : type.includes('hold')
            ? {
                logo: ACTION_ITEM_HOLD_LOGO,
                title: 'Hold'
            }
            : type.includes('destroy')
                ? {
                    logo: ACTION_ITEM_DESTROY_LOGO,
                    title: 'Destroy'
                }
                : type.includes('discarded')
                    ? {
                        logo: DISCARD_LOGO,
                        title: 'Discarded'
                    }
                    : type.includes('picked')
                        ? {
                            logo: PICKUP_LOGO,
                            title: 'Picked up'
                        }
                        : {
                            logo: ACTION_ITEM_SNAP_SEND_LOGO,
                            title: 'Snap & Send'
                            // title: 'Scan & Send'
                        }
    return containerLogo;
}

export default DefaultModal;