import React from 'react';
import {
    HOLD_LOGO,
    FORWARD_LOGO,
    DESTROY_LOGO,
    DEFAULT_LOGO,
    REMINDER_LOGO,
    SNAP_SEND_LOGO,
    MAILROOM_TRANSPARENT_LOGO
} from '../../assets/images';
import { stringToTitleCase, getBackgroundClassName, getPackageDescription } from '../../utils/utils.functions';

function PackageInfoComponent(props) {
    const { status, memberName, buildingAddress, packageDetailsStatus } = props;

    const currentStatus = status.toLowerCase();
    const classStyle = getBackgroundClassName(currentStatus);
    const getInfo = getDefaultLogo(currentStatus);
    const getDescription = getPackageDescription(currentStatus);
    const getStartingText = packageDetailsStatus === "NOTIFIED"
        ? "Item waiting for you at "
        : packageDetailsStatus === "REMINDER"
        ? "Reminder - Item waiting for you at "
        : packageDetailsStatus === "FORWARD"
            ? "Item forwarded from "
            : packageDetailsStatus === "SNAPSEND"
                ? "Item scanned at "
                : packageDetailsStatus === "HOLD"
                    ? "Item on hold at "
                    : packageDetailsStatus === "DESTROY"
                        ? "Item destroy at " 
                        : undefined;



    return (
        <div className={`package-info-container ${classStyle}`}>
            <img src={MAILROOM_TRANSPARENT_LOGO} className="packagex-logo" alt="Mailroom" />
            <img src={getInfo.logo} className="package-info-logo" />
            <p className="package-info-heading"> {getStartingText && `${getStartingText} ${buildingAddress}`} </p>
            <p className="package-info-body"> Hi <span className="name-style">{stringToTitleCase(memberName)}</span>, {getDescription} </p>

        </div>
    )
}

function getDefaultLogo(type) {
    const containerLogo = type === 'forward'
        ? {
            logo: FORWARD_LOGO,
            title: 'Forward'
        }
        : type === 'hold'
            ? {
                logo: HOLD_LOGO,
                title: 'Hold'
            }
            : type === 'destroy'
                ? {
                    logo: DESTROY_LOGO,
                    title: 'Destroy'
                }
                : type === 'snapsend'
                    ? {
                        logo: SNAP_SEND_LOGO,
                        title: 'Snap & Send'
                        // title: 'Scan & Send'
                    }
                    : type === 'reminder'
                        ? {
                            logo: REMINDER_LOGO,
                            title: 'Reminder'
                        }
                        : {
                            logo: DEFAULT_LOGO,
                            title: 'You have a new package!'
                        };
    return containerLogo;
}

export default PackageInfoComponent;
