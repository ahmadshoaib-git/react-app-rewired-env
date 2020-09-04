import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress, Divider } from "@material-ui/core";
import PackageInfoComponent from './packageInfo';
import ActionItems from './packageActionItems';
import { packageActionRequestStatus, packageActionRequestStatusOthers } from '../../utils/utils.functions';
import { action_setActionItems, action_setActionLabel, action_setActionDetail } from '../../redux/actionItems/actionItems.actions'
import ActionItemsFooter from './footer';
import { getPackageDetails } from '../../server/actionItems';
import DefaultModal from '../Modals/defaultModal';
import ImagesComponent from './images';
import CarrierInfo from './carrierInfo';
import PackageHistory from './packageHistory';

import './styles.css';
import GeneralInfo from './generalInfo';

class ActionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: true,
            showActionItems: false,
            packageDetails: null,
            requestedPackage: '',
        };
    }

    componentDidMount() {
        this.getPackageDetails();
    }

    getPackageDetails = () => {
        getPackageDetails()
            .then(response => {
                let updatedResponse = response;
                if (response.package_details && updatedResponse.package_details[0].images) {
                    updatedResponse.package_details[0].images = updatedResponse.package_details[0].images.images;
                }
                const currentStatus = response.package_details ? response.package_details[0].action_status.toLowerCase() : response.action_status.toLowerCase();
                const packageStatuses = { ...packageActionRequestStatus, ...packageActionRequestStatusOthers };
                // const packageStatuses = {...packageActionRequestStatus};
                const requestedPackage = Object.values(packageStatuses).filter(item => item.toLowerCase() === currentStatus).length > 0;
                this.props.action_setActionItems(response.action_items);
                this.props.action_setActionLabel(response.action_label);
                this.props.action_setActionDetail(response.package_details[0]);
                if (requestedPackage) {
                    this.setState({
                        loading: false,
                        requestedPackage: currentStatus
                    })
                } else {
                    this.setState({
                        loading: false,
                        packageDetails: response,
                        showActionItems: (response.action_items && Object.keys(response.action_items).length !== 0) // Object.keys(response.action_items).length > 0
                    })
                }
                // getPackageImage(response.package_details[0].package_id)
                // .then(res => console.log(res))
                // .catch(err => console.log(err))
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    error: 'Something went wrong!'
                })
            })
    }

    render() {
        const {
            error,
            loading,
            packageDetails,
            showActionItems,
            requestedPackage,
        } = this.state;
        const mainImageURL = (packageDetails && packageDetails.package_details && packageDetails.package_details[0].package_thumbnail)
            ? packageDetails.package_details[0].package_thumbnail.replace('_thumb', '')
            : null;
        return (
            <div className="main-page-container">
                {
                    requestedPackage !== '' &&
                    <DefaultModal
                        title={requestedPackage}
                    />
                }
                {
                    error &&
                    <div className="error-message">
                        <p> {error} </p>
                    </div>

                }
                {
                    requestedPackage === '' && !error &&
                    <Fragment>
                        {
                            loading &&
                            <div className="loading-container">
                                <CircularProgress style={{ color: 'blue' }} size={40} />
                            </div>
                        }
                        {
                            !loading &&
                            <div className="action-item-page">
                                <PackageInfoComponent
                                    status={packageDetails.package_details[0].action_status}
                                    memberName={packageDetails.package_details[0].member_name}
                                    buildingAddress={packageDetails.package_details[0].building_address}
                                    packageDetailsStatus={packageDetails.package_details[0].action_status}
                                />
                                <div className="package-details-container">
                                    {
                                        showActionItems &&
                                        <ActionItems
                                            actions={packageDetails.action_items}
                                            getPackageDetails={this.getPackageDetails}
                                        />
                                    }
                                    {
                                        packageDetails.package_details[0].action_status === 'FORWARD' &&
                                        <Fragment>
                                            <PackageHistory
                                                packageDetails={packageDetails.package_details[0]}
                                            />
                                            <Divider className="divider-style" />
                                        </Fragment>
                                    }
                                    {
                                        packageDetails.package_details[0].images &&
                                        <ImagesComponent
                                            mainHeading="Scanned Image(s)"
                                            images={packageDetails.package_details[0].images}
                                        />
                                    }
                                    {
                                        packageDetails.package_details[0].images &&
                                        packageDetails.package_details[0].images.length > 0 &&
                                        <Divider className="divider-style" />
                                    }
                                    <CarrierInfo
                                        carrier={packageDetails.package_details[0].courier_name}
                                        trackingNumber={packageDetails.package_details[0].tracking_number}
                                    />
                                    <GeneralInfo
                                        type='receiver'
                                        name={packageDetails.package_details[0].member_name}
                                        email={packageDetails.package_details[0].member_email}
                                    />
                                    <GeneralInfo
                                        type='sender'
                                        name={packageDetails.package_details[0].to_address ? packageDetails.package_details[0].to_address.name : null}
                                        email={packageDetails.package_details[0].to_address ? packageDetails.package_details[0].to_address.address : null}
                                    />
                                    {
                                        mainImageURL &&
                                        <ImagesComponent
                                            mainHeading="Received Item"
                                            images={[mainImageURL]}
                                        />
                                    }
                                    <ActionItemsFooter />
                                </div>
                            </div>
                        }
                    </Fragment>
                }
            </div>
        )
    }
}
const mapDispatchToProps = ({ action_setActionItems, action_setActionLabel, action_setActionDetail })
const mapStateToProps = (state) => ({
    actionItems: state
})
export default connect(mapStateToProps, mapDispatchToProps)(ActionPage)
