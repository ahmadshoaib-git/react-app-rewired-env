import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
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
    // shippingMethodsList,
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
            hasAddress: false,
            enableAddress: true
        }
    }

    componentDidMount() {
        this.setState({
            checkedItem: this.props.shippingMethodsList.length > 0 ? this.props.shippingMethodsList[0].value : "",
            hasAddress: this.props.packageDetails.has_address ? true : this.props.packageDetails.has_address,//swap
            enableAddress: this.props.packageDetails && this.props.packageDetails.has_address !== true ? false : true
        })
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
        const { name, address, checkedItem, hasAddress, enableAddress } = this.state;
        const { handleConfirmation, shippingMethodsList } = this.props;
        const labelId = shippingMethodsList.length > 0 && shippingMethodsList.find(item => item.value === checkedItem).label_id;
        if (name === '' || (hasAddress === false && address === '')) {
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
                    shipping_method: checkedItem,
                    label_id: labelId,
                    use_existing_address: enableAddress
                }
                handleConfirmation('forward', forwardObj);
            })
        }
    }

    setEnableAddress = (flag) => {
        this.setState({ enableAddress: flag })
    }

    render() {
        const {
            name,
            error,
            address,
            checkedItem,
            shippingAnchor,
            hasAddress,
            enableAddress
        } = this.state;
        const {
            modalState,
            closeModal,
            handleConfirmation,
            shippingMethodsList
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
                <div className={hasAddress ? "generic-modal-has-address" : "generic-modal"} style={{ height: 500 }}>
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
                                    disabled={enableAddress}
                                />
                                {
                                    hasAddress && (<div className="address-checkbox">
                                        <input type="checkbox" id="addressCheck" name="addressCheck" value={!enableAddress === true} onClick={() => this.setEnableAddress(!enableAddress)} />
                                        <label for="addressCheck" className="address-checkbox-label"> Use my pre-saved address information</label><br />
                                    </div>)
                                }
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
                                        shippingMethodsList.length > 0 && shippingMethodsList.map((item, index) => {
                                            const check = item.value === checkedItem;
                                            return (
                                                <MenuItem key={`menu-item-${item.value}-${index}`} onClick={() => this.handleDropdownSelection(item.value)}>
                                                    <div className="each-shipping-method">
                                                        <input type="radio" checked={check} onChange={() => this.handleDropdownSelection(item.value)} />
                                                        <p> {item.value} </p>
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
                                    modalState !== 'success' &&
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

const mapStateToProps = (state) => ({
    shippingMethodsList: state.actionItems.actionLabel,
    packageDetails: state.actionItems.packageDetails
})
export default connect(mapStateToProps)(ForwardModal)