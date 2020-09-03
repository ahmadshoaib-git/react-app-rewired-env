import React, { Component, Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';
import { CircularProgress } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class ImagesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadingImage: true,
            imagesData: props.images,
            currentImage: 0,
            imgSrc: props.images[0]
            // imagesData: [],
            // imagesData: [
            //     'https://s3.amazonaws.com/packagex-imgdata-dev/AF/516/C8EFCB2B-C228-41D1-BCEE-B1E0A8C40F88_thumb.png',
            //     'https://s3.amazonaws.com/packagex-imgdata-dev/AF/516/C8EFCB2B-C228-41D1-BCEE-B1E0A8C40F88_thumb.png',
            //     'https://s3.amazonaws.com/packagex-imgdata-dev/AF/516/C8EFCB2B-C228-41D1-BCEE-B1E0A8C40F88_thumb.png',
            //     'https://s3.amazonaws.com/packagex-imgdata-dev/AF/516/C8EFCB2B-C228-41D1-BCEE-B1E0A8C40F88_thumb.png',
            //     'https://s3.amazonaws.com/packagex-imgdata-dev/AF/516/C8EFCB2B-C228-41D1-BCEE-B1E0A8C40F88_thumb.png',
            // ]
        }
    }

    componentDidMount() {
        this.loadImage();
    }

    handleNextPrev = (action) => {
        const { currentImage } = this.state;
        let current = currentImage;
        current = action === 'next' ? (current + 1) : (current - 1);
        this.setState({
            loadingImage: true,
            currentImage: current
        }, () => {
            this.loadImage();
        })
    }

    loadImage = () => {
        const { currentImage, imagesData } = this.state;
        const img = new Image();
        img.onload = (data) => {
            this.setState({
                imgSrc: imagesData[currentImage],
                loadingImage: false
            })
        }
        img.onerror = () => {
            this.setState({
                imgSrc: null,
                loadingImage: false
            })
          };
        img.src = imagesData[currentImage];
    }

    render() {
        const {
            imgSrc,
            loading,
            imagesData,
            loadingImage,
            currentImage,
        } = this.state;
        const { mainHeading } = this.props;

        return (
            <Fragment>
                {
                    imagesData.length > 0 &&
                    <div className="images-container">
                        <p className="images-title bold"> {mainHeading} </p>
                        {
                            loading &&
                            <div className="img-div">
                                <Skeleton />
                            </div>
                        }
                        {
                            !loading &&
                            <div className="img-div">
                                {
                                    loadingImage
                                        ? (
                                            <div className="loading-image">
                                                <CircularProgress style={{ color: 'blue' }} size={30} />
                                            </div>
                                        )
                                        : <img src={imgSrc} alt={`Image ${currentImage + 1}`} />
                                }
                                {
                                    currentImage > 0 &&
                                    <div className="prev-arrow" onClick={() => this.handleNextPrev('prev')}>
                                        <ArrowBackIosIcon style={{ paddingLeft: 8 }} />
                                    </div>
                                }
                                {
                                    (imagesData.length > 1 && currentImage !== (imagesData.length - 1)) &&
                                    <div className="next-arrow" onClick={() => this.handleNextPrev('next')}>
                                        <ArrowForwardIosIcon style={{ paddingLeft: 5 }} />
                                    </div>
                                }
                            </div>
                        }
                        {
                            imagesData.length > 1 &&
                            <p className="count-tag"> {currentImage + 1}/{imagesData.length} </p>
                        }
                    </div>
                }
            </Fragment>
        )
    }
}

export default ImagesComponent;
