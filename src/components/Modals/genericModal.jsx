import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import './styles.css';
import {
    MODAL_SNAP_DEFAULT,
    MODAL_SNAP_SUCCESS,
    MODAL_HOLD_DEFAULT,
    MODAL_HOLD_SUCCESS,
    MODAL_DESTROY_DEFAULT,
    MODAL_DESTROY_SUCCESS,
} from '../../assets/images';
import { CircularProgress } from "@material-ui/core";
import { stringToTitleCase, getBorderClassName, getColorClassName, getBackgroundClassName } from '../../utils/utils.functions';

function GenericModal(props) {
    const {
        modalState,
        closeModal,
        handleConfirmation,
    } = props;
    let { title } = props;
    title = title.toLowerCase();
    const borderStyle = getBorderClassName(title);
    const classStyle = getBackgroundClassName(title);
    const colorStyle = getColorClassName(title);
    const confirmButtonText = title.includes('snap')
    // const confirmButtonText = title.includes('scan')
        ? 'Send'
        : title.includes('hold')
            ? 'Hold'
            : 'Destroy'

    const modalMessage = modalState === 'success'
        ? 'Request has been placed successfully!'
        : modalState === 'alreadyPerformed'
            ? 'You have already performed this action!'
            : 'Are you sure you want to perform this action?'

    const imageSource = getDefaultLogo(title, modalMessage);
    const actionMessage = getPackageTitle(title);

    return (
        <Dialog onClose={(modalState === 'loading' || modalState === 'success' || modalState === 'alreadyPerformed') ? () => { } : closeModal} open={true}>
            <div className="generic-modal">
                <div className="content-container">
                    <img src={imageSource} />
                    <p className={`action-title ${colorStyle}`}> {stringToTitleCase(title)} </p>
                    <p className="action-message"> {modalMessage} </p>
                    {
                        modalState === 'loading' &&
                        <CircularProgress className={`loading-state ${colorStyle}`} size={25} />
                    }
                    {
                        modalState === 'error' &&
                        <p className="error-text"> Something went wrong, please try again! </p>
                    }
                    {
                        (modalState !== 'success' && modalState !== 'alreadyPerformed') &&
                        <div className="action-buttons">
                            <button
                                onClick={closeModal}
                                disabled={modalState === 'loading'}
                                className={`button-style ${borderStyle}`}
                                style={{ opacity: modalState === 'loading' ? 0.5 : 1 }}>
                                {'Cancel'}
                            </button>
                            <button
                                disabled={modalState === 'loading'}
                                onClick={() => handleConfirmation(actionMessage)}
                                style={{ opacity: modalState === 'loading' ? 0.5 : 1 }}
                                className={`button-style submit ${borderStyle} ${classStyle}`}>
                                {confirmButtonText}
                            </button>
                        </div>
                    }
                </div>
            </div>
        </Dialog>
    )
}

function getPackageTitle(type) {
    const title = type.includes('hold')
        ? 'hold'
        : type.includes('destroy')
            ? 'destroy'
            : 'snapsend'
    return title;
}

function getDefaultLogo(type, msg) {
    const containerLogo = type.includes('hold')
        ? msg.includes('success')
            ? MODAL_HOLD_SUCCESS
            : MODAL_HOLD_DEFAULT
        : type.includes('destroy')
            ? msg.includes('success')
                ? MODAL_DESTROY_SUCCESS
                : MODAL_DESTROY_DEFAULT
            : msg.includes('success')
                ? MODAL_SNAP_SUCCESS
                : MODAL_SNAP_DEFAULT
    return containerLogo;
}

export default GenericModal;