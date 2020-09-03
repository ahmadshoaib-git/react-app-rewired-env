import { server } from './server';
import { getPackageInfoFromURL, packageActionStatus } from '../utils/utils.functions';
import axios from 'axios';

export const getPackageDetails = () => {
    const params = getPackageInfoFromURL();
    const urlParams = {
        uuid: params[0],
        building_uuid: params[1],
    }
    return new Promise((resolve, reject) => {
        axios
            .get(`${server}package/actionitem`, {
                params: urlParams,
            })
            .then(response => resolve(response.data))
            .catch(error => reject(error));
    });
}

export const setPackageStatus = (type, forwardData) => {
    const params = getPackageInfoFromURL();
    let urlParams = {
        uuid: params[0],
        building_uuid: params[1],
        status: packageActionStatus[type]
    }
    if (type === 'forward') {
        urlParams.address = forwardData
    }
    console.log(urlParams);
    return new Promise((resolve, reject) => {
        axios
            .post(`${server}package/actionitem`, urlParams)
            .then(response => resolve(response.data))
            .catch(error => {
                const text = JSON.stringify(error.toString());
                console.log(text);
                console.log(JSON.parse(text));
                reject(error)
            });
    });
}

export const getPackageImage = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${server}package/${id}/image`)
            .then(response => resolve(response.data))
            .catch(error => reject(error));
    });
}