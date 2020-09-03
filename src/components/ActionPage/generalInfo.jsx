import React, { Fragment } from 'react';
import {
    SENDER_NAME,
    SENDER_EMAIL,
    RECEIVER_NAME,
    RECEIVER_ADDRESS,
} from '../../assets/images';
import { getCourier } from '../../utils/utils.functions';
import { Divider } from '@material-ui/core';

function GeneralInfo(props) {
    const { type, name, email } = props;
    const data = {
        sender: {
            logo1: SENDER_NAME,
            logo2: SENDER_EMAIL,
        },
        receiver: {
            logo1: RECEIVER_NAME,
            logo2: RECEIVER_ADDRESS,
        },
    }

    if (name || email) {
        return (
            <Fragment>
                <div className="carrier-info-container">
                    <p className="bold"> {type === 'sender' ? 'Sender' : 'Receiver'} Information </p>
                    {
                        name &&
                        <div className="carrier-container">
                            <img src={data[type].logo1} />
                            <p> {name ? getCourier(name) : '----'} </p>
                        </div>
                    }
                    {
                        email &&
                        <div className="carrier-container">
                            <img src={data[type].logo2} />
                            <p style={{ textDecoration: !email && 'none' }}>
                                {email || '----'}
                            </p>
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

export default GeneralInfo;