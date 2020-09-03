import React from 'react';

function PackageHistory(props) {
    const { packageDetails } = props;
    
    const currentContainer = [
        {
            name: 'Name',
            value: packageDetails.to_address.name || '----'
        },
        {
            name: 'Carrier',
            value: packageDetails.courier_name || '----'
        },
        {
            name: 'Tracking #',
            value: packageDetails.tracking_number || '----'
        },
    ];
    const previousContainer = [
        {
            name: 'Name',
            value: packageDetails.member_name || '----'
        },
        {
            name: 'Carrier',
            value: packageDetails.courier_name || '----'
        },
        {
            name: 'Tracking #',
            value: packageDetails.tracking_number || '----'
        },
    ];
    return (
        <div className="package-history-container">
            <p className="bold"> Package History </p>
            <div className="history-icon-data">
                <div className="history-icon">
                    <div className="history-icon-div1">
                        <div className="inner-div">
                        </div>
                    </div>
                    <div className="history-icon-div2">
                    </div>
                    <div className="history-icon-div3">
                    </div>
                    <div className="history-icon-div4">
                    </div>
                </div>
                <div className="history-containers">
                    <div className="each-history-container">
                        <div className="current-label">
                            <div className="left-arrow" />
                            <div className="current-label-text background-color-forward">
                                Current
                            </div>
                        </div>
                        <div className="history-container-content">
                            {
                                currentContainer.map(item => {
                                    return (
                                        <div className="each-row">
                                            <p className='name'> {item.name} </p>
                                            <p> : </p>
                                            <p className='value'> {item.value} </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="each-history-container">
                        <div className="history-container-content">
                            {
                                previousContainer.map(item => {
                                    return (
                                        <div className="each-row">
                                            <p className='name'> {item.name} </p>
                                            <p> : </p>
                                            <p className='value'> {item.value} </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PackageHistory;