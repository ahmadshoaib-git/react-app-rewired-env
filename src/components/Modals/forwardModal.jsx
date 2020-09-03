import React, { Component, Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
    UP_ARROW_LOGO,
    DOWN_ARROW_LOGO,
    MODAL_FORWARD_DEFAULT,
    MODAL_FORWARD_SUCCESS,
} from '../../assets/images';
import { CircularProgress } from "@material-ui/core";
import {
    getBorderClassName,
    getColorClassName,
    shippingMethodsList,
    getBackgroundClassName
} from '../../utils/utils.functions';
import './styles.css';

class ForwardModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            error: false,
            shippingAnchor: null,
            checkedItem: 'Standard',
        }
    }

    handleShippingDropdown = (event) => {
        this.setState({
            shippingAnchor: event.currentTarget
        })
    }

    onClose = () => {
        this.setState({
            shippingAnchor: null
        })
    }

    handleDropdownSelection = (name) => {
        this.setState({
            error: false,
            checkedItem: name,
            shippingAnchor: null
        }, () => {
            const { modalState, clearError } = this.props;
            if (modalState !== '') {
                clearError();
            }
        })
    }

    handleValueChange = (event, name) => {
        const { modalState, clearError } = this.props;
        if (modalState !== '') {
            clearError();
        }
        const value = event.target.value.trimLeft();
        if (name === 'name') {
            if (value.length < 50) {
                this.setState({
                    error: false,
                    name: value
                })
            }
        } else {
            if (value.length < 100) {
                this.setState({
                    error: false,
                    address: value
                })
            }
        }
    }

    handleForwardAction = () => {
        const { name, address, checkedItem } = this.state;
        const { handleConfirmation } = this.props;
        if (name === '' || address === '') {
            this.setState({
                error: true
            })
        } else {
            this.setState({
                error: false
            }, () => {
                const forwardObj = {
                    name,
                    address,
                    shipping_method: checkedItem
                }
                handleConfirmation('forward', forwardObj);
            })
        }
    }

    render() {
        const {
            name,
            error,
            address,
            checkedItem,
            shippingAnchor
        } = this.state;
        const {
            modalState,
            closeModal,
            handleConfirmation,
        } = this.props;
        let { title } = this.props;
        title = title.toLowerCase();
        const borderStyle = getBorderClassName(title);
        const colorStyle = getColorClassName(title);
        const classStyle = getBackgroundClassName(title);

        const modalMessage = modalState === 'success'
            ? 'Request has been placed successfully!'
            : 'Enter Recipient Details'

        const shippingOpen = false;
        return (
            <Dialog onClose={(modalState === 'loading' || modalState === 'success') ? () => { } : closeModal} open={true}>
                <div className="generic-modal" style={{ height: 500 }}>
                    {/* {
                        modalState === 'success' &&
                        <div className="close-icon">
                            <p onClick={closeModal}> x </p>
                        </div>
                    } */}
                    <div className="content-container">
                        <img src={modalMessage.includes('success') ? MODAL_FORWARD_SUCCESS : MODAL_FORWARD_DEFAULT} />
                        {
                            modalState === 'success' &&
                            <p className={`action-title ${colorStyle}`}> Forward </p>
                        }
                        <p className="action-message"> {modalMessage} </p>
                        {
                            modalState !== 'success' &&
                            <Fragment>
                                <input
                                    placeholder="Name"
                                    className="name-field"
                                    value={name}
                                    onChange={(event) => this.handleValueChange(event, 'name')}
                                />
                                <textarea
                                    placeholder="Address"
                                    className="address-field"
                                    value={address}
                                    onChange={(event) => this.handleValueChange(event, 'address')}
                                />
                                <div
                                    className="shipping-method-closed"
                                    onClick={(event) => this.handleShippingDropdown(event)}
                                    style={{ border: shippingOpen ? '1px solid black' : '1px solid #E0E0E0' }}
                                >
                                    <p> Shipping Method - {checkedItem} </p>
                                    <img src={shippingAnchor ? UP_ARROW_LOGO : DOWN_ARROW_LOGO} alt="down arrow" />
                                </div>
                                <Menu
                                    anchorEl={shippingAnchor}
                                    open={Boolean(shippingAnchor)}
                                    classes={{ paper: 'menu-style' }}
                                    onClose={this.onClose}
                                    style={{ marginTop: 47 }}
                                >
                                    {
                                        shippingMethodsList.map((item, index) => {
                                            const check = item.name === checkedItem;
                                            return (
                                                <MenuItem key={`menu-item-${item.name}-${index}`} onClick={() => this.handleDropdownSelection(item.name)}>
                                                    <div className="each-shipping-method">
                                                        <input type="radio" checked={check} onChange={() => this.handleDropdownSelection(item.name)} />
                                                        <p> {item.name} </p>
                                                    </div>
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Menu>
                                {
                                    modalState === 'loading' &&
                                    <CircularProgress className={`loading-state ${colorStyle}`} size={25} />
                                }
                                {
                                    (error || modalState === 'error') &&
                                    <p className="error-text"> {error ? "Name and Address cannot be empty" : "Something went wrong, please try again!"} </p>
                                }
                                {
                                    modalState !== 'succes' &&
                                    <div className="action-buttons">
                                        <button
                                            onClick={closeModal}
                                            disabled={modalState === 'loading'}
                                            className={`button-style ${borderStyle}`}
                                            style={{ opacity: modalState === 'loading' ? 0.5 : 1 }}>
                                            Cancel
                                        </button>
                                        <button
                                            disabled={modalState === 'loading'}
                                            onClick={() => this.handleForwardAction()}
                                            style={{ opacity: modalState === 'loading' ? 0.5 : 1 }}
                                            className={`button-style submit ${borderStyle} ${classStyle}`}>
                                            Forward
                                        </button>
                                    </div>
                                }
                            </Fragment>
                        }
                    </div>
                </div>
            </Dialog>
        )
    }
}

export default ForwardModal;