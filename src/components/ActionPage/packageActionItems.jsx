import React, { Component, Fragment } from 'react';
import {
    ACTION_ITEM_SNAP_SEND_LOGO,
    ACTION_ITEM_FORWARD_LOGO,
    ACTION_ITEM_HOLD_LOGO,
    ACTION_ITEM_DESTROY_LOGO
} from '../../assets/images';
import GenericModal from '../Modals/genericModal';
import { setPackageStatus } from '../../server/actionItems';
import ForwardModal from '../Modals/forwardModal';
import { Divider } from '@material-ui/core';

class ActionItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalState: '',
            snapsendModal: false,
            forwardModal: false,
            holdModal: false,
            destroyModal: false,
            actionType: null,
            actionPerformed: true,
            showActionItems: true,
        }
    }

    handleActionItemClick = (action) => {
        if (action === 'snapsend') {
            this.setState({
                snapsendModal: true
            })
        } else if (action === 'forward') {
            this.setState({
                forwardModal: true
            })
        } else if (action === 'hold') {
            this.setState({
                holdModal: true
            })
        } else {
            this.setState({
                destroyModal: true
            })
        }
    }

    handleOnCloseModal = () => {
        this.setState({
            snapsendModal: false,
            forwardModal: false,
            holdModal: false,
            destroyModal: false,
            actionType: null,
            modalState: ''
        })
    }

    handleConfirmation = (type, forwardData) => {
        this.setState({
            modalState: 'loading'
        })
        setPackageStatus(type, forwardData)
            .then(response => {
                this.setState({
                    modalState: 'success',
                    // showActionItems: false,
                })
                // , () => {
                //     setTimeout(() => {
                //         location.reload();
                //     }, 2000);
                // })
            }).catch(err => {
                console.log(err);
                console.log(err.message);
                if (err.message && err.message.includes('failed with status code 400')) {
                    const { getPackageDetails } = this.props;
                    getPackageDetails();
                } else {
                    this.setState({
                        modalState: 'error',
                    })
                }
            })
    }

    clearError = () => {
        this.setState({
            modalState: ''
        })
    }

    render() {
        const {
            holdModal,
            modalState,
            forwardModal,
            destroyModal,
            snapsendModal,
            showActionItems,
        } = this.state;
        const { actions } = this.props;
        const actionsCount = Object.keys(actions).length;

        return (
            <Fragment>
                <div className="package-action-items">
                    {
                        showActionItems && actions.snapsend &&
                        <div className="each-action-item" style={{ width: `calc(100% / ${actionsCount})` }}>
                            <img
                                src={ACTION_ITEM_SNAP_SEND_LOGO}
                                alt="Snap and Send"
                                // alt="Scan and Send" 
                                onClick={() => this.handleActionItemClick('snapsend')} />
                            <p> Snap & Send </p>
                            {/* <p> Scan & Send </p> */}
                        </div>
                    }
                    {
                        showActionItems && actions.forward &&
                        <div className="each-action-item" style={{ width: `calc(100% / ${actionsCount})` }}>
                            <img src={ACTION_ITEM_FORWARD_LOGO} alt="Forward" onClick={() => this.handleActionItemClick('forward')} />
                            <p> Forward </p>
                        </div>
                    }
                    {
                        showActionItems && actions.hold &&
                        <div className="each-action-item" style={{ width: `calc(100% / ${actionsCount})` }}>
                            <img src={ACTION_ITEM_HOLD_LOGO} alt="Hold" onClick={() => this.handleActionItemClick('hold')} />
                            <p> Hold </p>
                        </div>
                    }
                    {
                        showActionItems && actions.destroy &&
                        <div className="each-action-item" style={{ width: `calc(100% / ${actionsCount})` }}>
                            <img src={ACTION_ITEM_DESTROY_LOGO} alt="Destroy" onClick={() => this.handleActionItemClick('destroy')} />
                            <p> Destroy </p>
                        </div>
                    }
                    {
                        snapsendModal &&
                        <GenericModal
                            title='Snap & Send'
                            // title='Scan & Send'
                            modalState={modalState}
                            closeModal={this.handleOnCloseModal}
                            handleConfirmation={this.handleConfirmation}
                        />
                    }
                    {
                        forwardModal &&
                        <ForwardModal
                            title='Forward'
                            modalState={modalState}
                            clearError={this.clearError}
                            closeModal={this.handleOnCloseModal}
                            handleConfirmation={this.handleConfirmation}
                        />
                    }
                    {
                        holdModal &&
                        <GenericModal
                            title='Hold'
                            modalState={modalState}
                            closeModal={this.handleOnCloseModal}
                            handleConfirmation={this.handleConfirmation}
                        />
                    }
                    {
                        destroyModal &&
                        <GenericModal
                            title='Destroy'
                            modalState={modalState}
                            closeModal={this.handleOnCloseModal}
                            handleConfirmation={this.handleConfirmation}
                        />
                    }
                </div>
                <Divider className="divider-style" />
            </Fragment>
        )
    }
}

export default ActionItems;
