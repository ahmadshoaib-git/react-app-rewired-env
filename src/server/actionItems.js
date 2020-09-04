import { server } from "./server";
import {
  getPackageInfoFromURL,
  packageActionStatus,
} from "../utils/utils.functions";
import axios from "axios";

export const getPackageDetails = () => {
  const params = getPackageInfoFromURL();
  const urlParams = {
    uuid: params[0],
    building_uuid: params[1],
  };
  return new Promise((resolve, reject) => {
    axios
      .get(`${server}package/actionitem`, {
        params: urlParams,
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const setPackageStatus = (type, forwardData) => {
  const params = getPackageInfoFromURL();
  let urlParams = {
    uuid: params[0],
    building_uuid: params[1],
    status: packageActionStatus[type],
  };
  if (type === "forward") {
    urlParams.address = {
      address: forwardData.address,
      name: forwardData.name,
      shipping_method: forwardData.shipping_method,
    };
    urlParams.label_id = forwardData.label_id;
    urlParams.use_existing_address = forwardData.use_existing_address;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${server}package/actionitem`, urlParams)
      .then((response) => resolve(response.data))
      .catch((error) => {
        const text = JSON.stringify(error.toString());
        console.log(text);
        console.log(JSON.parse(text));
        reject(error);
      });
  });
};

export const getPackageImage = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${server}package/${id}/image`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};
