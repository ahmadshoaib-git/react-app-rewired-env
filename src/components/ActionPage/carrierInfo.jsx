import React, { Fragment } from 'react';
import {
    CARRIER_LOGO,
    TRACKING_LOGO,
} from '../../assets/images';
import { getCourier, carriersLinks } from '../../utils/utils.functions';
import { Divider } from '@material-ui/core';

function CarrierInfo(props) {
    const { carrier, trackingNumber } = props;
    const trackingTo = carrier ? carriersLinks(carrier.toString().toLowerCase().trim(), trackingNumber) : carrier;
    if (carrier || trackingNumber) {
        return (
            <Fragment>
                <div className="carrier-info-container">
                    <p className="bold"> Carrier Information </p>
                    {
                        carrier &&
                        <div className="carrier-container">
                            <img src={CARRIER_LOGO} />
                            <p> {carrier ? getCourier(carrier) : '----'} </p>
                        </div>
                    }
                    {
                        trackingNumber &&
                        <div className="carrier-container">
                            <img src={TRACKING_LOGO} />
                            {
                                trackingTo ? <a href={trackingTo} target='_blank' className="tracking-number">
                                    <p style={{ textDecoration: !trackingNumber && 'none' }}>
                                        {trackingNumber || '----'}
                                    </p>
                                </a> : 
                                <p  style={{ textDecoration: !trackingNumber && 'none' }}>
                                {trackingNumber || '----'}
                            </p>
                            }
                            {/* <a href={trackingTo} target='_blank' className="tracking-number">
                                <p style={{ textDecoration: !trackingNumber && 'none' }}>
                                    {trackingNumber || '----'}
                                </p>
                            </a> */}
                        </div>
                    }
                </div>
                <Divider className="divider-style" />
            </Fragment>
        )
    } else {
        return <Fragment />
    }


}

export default CarrierInfo;