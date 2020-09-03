const getPackageInfoFromURL = () => {
    let currentURL = window.location.search;
    currentURL = currentURL.substr(1, currentURL.length);
    const urlParams = currentURL.split('&');
    if (urlParams.length < 3) {
        window.location.replace("http://packagex.app");
    } else if (urlParams.length > 3) {
        if (!(currentURL.includes('uuid=') && currentURL.includes('building_uuid=') && currentURL.includes('env='))) {
            window.location.replace("http://packagex.app");
        }
    }
    const tempParams = urlParams.map(item => {
        const start = item.indexOf('=');
        const key = item.substr(0, start)
        if (key === 'uuid' || key === 'building_uuid' || key === 'env') {
            return item.substr(start + 1, item.length);
        } else {
            return null
        }
    })
    return tempParams.filter(item => item !== null);
}

const stringToTitleCase = (text) => {
    let str = text.toLowerCase().split(' ');
    for (let i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}

const getBackgroundClassName = (text) => {
    console.log(text);
    const classNames = {
        package: 'background-color-package',
        forward: 'background-color-forward',
        hold: 'background-color-hold',
        snapsend: 'background-color-snapsend',
        destroy: 'background-color-destroy',
        remind: 'background-color-forward',
    }

    return getColorData(text, classNames);
}

const getBorderClassName = (text) => {
    const classNames = {
        package: 'border-color-package',
        forward: 'border-color-forward',
        hold: 'border-color-hold',
        snapsend: 'border-color-snapsend',
        destroy: 'border-color-destroy',
        reminf: 'border-color-forward',
    }

    return getColorData(text, classNames);
}

const getColorClassName = (text) => {
    const classNames = {
        package: 'color-package',
        forward: 'color-forward',
        hold: 'color-hold',
        snapsend: 'color-snapsend',
        destroy: 'color-destroy',
        remind: 'color-forward',
    }

    return getColorData(text, classNames);
}

const getColorData = (text, classNames) => {
    const name = text.includes('forward')
        ? classNames['forward']
        : text.includes('hold')
            ? classNames['hold']
            : text.includes('snap')
                ? classNames['snapsend']
                : text.includes('destroy')
                    ? classNames['destroy']
                    : text.includes('reminder')
                        ? classNames['remind']
                        : classNames['package'];
    return name;
}

const samplePackageDetails = JSON.parse('{"package_id":50437,"activity_type":"SCAN-IN","uuid":"e8cbd0e2-65e9-43cf-9ad5-9869e78658c6","member_id":7476,"member_name":"Rachel Clements","is_designated":null,"business_id":null,"business_name":null,"type":"MEMBER","mailroom_id":44,"mailroom_name":"Courtesy Desk","checkout_by_name":"Rachel Clements","checkout_by_member_id":7476,"scanned_by_name":"THE HOUSTONIAN ESTATES","scanned_by":"da3e6d94-9cb8-4271-962a-79ae04bb7cee","delivered_by_name":"THE HOUSTONIAN ESTATES","delivered_by_user_id":"da3e6d94-9cb8-4271-962a-79ae04bb7cee","json_qasid":{"output":{"scan_output":{"data":{"businesses_found":[],"suggestions":[],"members_found":[{"member_id":7476,"name":"Rachel Clements","email":"montaignemuse@gmail.com","phone":"+17133854162","office_number":"1905","suggestion_type":0,"score":100,"match_with":"primary_name"}],"non_members_found":[],"sender_found":[]},"address":{"sender_address":{"city":"TRACY","state":"CA","zipcode":"95304","zip_code_line":"TRACY, CA 95304","address_line_1":"305 N CHRI.MAN ROAD"},"receiver_address":{"city":"HOUSTON","state":"TX","zipcode":"77024","zip_code_line":"HOUSTON TX 77024","address_line_1":"121 N POST OAK LN","name":"RACHEL CLEMENTS"}},"courier_info":{"courier_name":"fedex","tracking_no":"900523647688","miscellaneous":{"food_delivey_flag":false,"legal_document_flag":false,"pay_stubs_flag":false,"confidential_flag":false,"fragile_flag":false,"oversize_flag":false,"time_sensitive_flag":false,"return_to_sender_flag":false},"dynamic_labels":[],"tracking_from_barcode":true,"courier_from_barcode":true,"tracking_from_ocr":true,"courier_from_ocr":true,"barcode_present":true},"success":"11"},"duplicate_package_flag":false,"duplicate_packages":[],"time_logs":{"qasid_start_time":"2020-07-14 22:36:54.254466","scan_time":"2020-07-14 22:36:52.4280","image_upload_time":"0:00:01.826466","qasid_run_time_1":"0:00:00.820811"}},"uuid":"E8CBD0E2-65E9-43CF-9AD5-9869E78658C6","call_type":"scan","mailroom_id":"44","status":200,"message":"Complete Scans: Member package.","duplicate_uuid_validation":{"duplicate_uuid_flag":false,"old_uuid":"E8CBD0E2-65E9-43CF-9AD5-9869E78658C6","new_uuid":"E8CBD0E2-65E9-43CF-9AD5-9869E78658C6"}},"json_final":{"output":{"scan_output":{"data":{"businesses_found":[],"suggestions":[],"members_found":[{"member_id":7476,"name":"Rachel Clements","email":"montaignemuse@gmail.com","phone":"+17133854162","office_number":"1905","suggestion_type":0,"score":100,"match_with":"primary_name"}],"non_members_found":[],"sender_found":[]},"address":{"sender_address":{"city":"TRACY","state":"CA","zipcode":"95304","zip_code_line":"TRACY, CA 95304","address_line_1":"305 N CHRI.MAN ROAD"},"receiver_address":{"city":"HOUSTON","state":"TX","zipcode":"77024","zip_code_line":"HOUSTON TX 77024","address_line_1":"121 N POST OAK LN","name":"RACHEL CLEMENTS"}},"courier_info":{"courier_name":"fedex","tracking_no":"900523647688","miscellaneous":{"food_delivey_flag":false,"legal_document_flag":false,"pay_stubs_flag":false,"confidential_flag":false,"fragile_flag":false,"oversize_flag":false,"time_sensitive_flag":false,"return_to_sender_flag":false},"dynamic_labels":[],"tracking_from_barcode":true,"courier_from_barcode":true,"tracking_from_ocr":true,"courier_from_ocr":true,"barcode_present":true},"success":"11"},"duplicate_package_flag":false,"duplicate_packages":[],"time_logs":{"qasid_start_time":"2020-07-14 22:36:54.254466","scan_time":"2020-07-14 22:36:52.4280","image_upload_time":"0:00:01.826466","qasid_run_time_1":"0:00:00.820811"}},"uuid":"E8CBD0E2-65E9-43CF-9AD5-9869E78658C6","call_type":"scan","mailroom_id":"44","status":200,"message":"Complete Scans: Member package.","duplicate_uuid_validation":{"duplicate_uuid_flag":false,"old_uuid":"E8CBD0E2-65E9-43CF-9AD5-9869E78658C6","new_uuid":"E8CBD0E2-65E9-43CF-9AD5-9869E78658C6"}},"reminders":0,"status":"PICKED","created_by":"da3e6d94-9cb8-4271-962a-79ae04bb7cee","updated_by":"da3e6d94-9cb8-4271-962a-79ae04bb7cee","created_at":"2020-07-14T22:36:54.000Z","updated_at":"2020-07-14T23:36:48.000Z","category":null,"delivery_note":null,"package_note":null,"package_discard_reason":null,"package_picked_reason":null,"pickup_info":{"member_id":7476,"name":"Rachel Clements"}}');

const tempActionItems = {
    "SNAPSEND": true,
    "FORWARD": true,
    "DESTROY": true,
    "HOLD": true
}

const packageActionStatus = {
    snapsend: 'SNAPSEND',
    notmypackage: 'NOTMYPKG',
    forward: 'FORWARD',
    destroy: 'DESTROY',
    hold: 'HOLD',
}

const packageActionRequestStatus = {
    request_snapsend: 'REQUEST_SNAPSEND',
    request_notmypackage: 'REQUEST_NOTMYPKG',
    request_forward: 'REQUEST_FORWARD',
    request_destroy: 'REQUEST_DESTROY',
    request_hold: 'REQUEST_HOLD'
}

const packageActionRequestStatusOthers = {
    forward: 'FORWARD',
    discard: 'DISCARDED',
    pickup: 'PICKED',
}

const packageDescriptions = {
    default: 'If you have any questions, just reply to the email.',
    // default: 'you have a package waiting for you in the mailroom. Please come and pick it up. If you have any questions, just reply to this email.',
    forward: 'If you have any questions, just reply to the email.',
    // forward: 'your package is ready to be forwarded. For more information regarding your package, please refer to the delivery notes in the email. If you have any questions, just reply to this email and we will be in touch.',
    // snapsend: 'the snap of your package is ready to be sent. For more information regarding your package, please refer to the delivery notes in the email. If you have any questions, just reply to this email and we will be in touch.',
    snapsend: 'If you have any questions, just reply to the email.',
    // snapsend: 'the scan of your package is ready to be sent. For more information regarding your package, please refer to the delivery notes in the email. If you have any questions, just reply to this email and we will be in touch.',
    hold: 'If you have any questions, just reply to the email.',
    // hold: 'your package has been held. For more information regarding your package, please refer to the delivery notes in the email. If you have any questions, just reply to this email and we will be in touch.',
    destroy: 'If you have any questions, just reply to the email.',
    // destroy: 'your package is being destroyed. For more information regarding your package, please refer to the delivery notes in the email. If you have any questions, just reply to this email and we will be in touch.',
    reminder: 'If you have any questions, just reply to the email.'
    // reminder: 'just a reminder that you have a package waiting for you in the mailroom. Please come and pick it up.'
}

const carriersLinks = (carrier, tracking_number) => {
    let carrierTo = '';
    if (carrier === 'amazon-fba-us') {
        carrierTo = 'https://www.amazon.com/gp/css/order-history';
      } else if (carrier === 'ups') {
        carrierTo = `https://wwwapps.ups.com/WebTracking/processInputRequest?AgreeToTermsAndConditions=yes&Requester=trkinppg&WT.trk_id=XXXX&WT.sys_id=XXXX&tracknum=${tracking_number}&loc=en_US`;
      } else if (carrier === 'fedex') {
        carrierTo = `https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber=${tracking_number}&cntry_code=us`;
      } else if (carrier === 'dhl') {
        carrierTo = `http://www.dhl.com/en/express/tracking.html?AWB=${tracking_number}&brand=DHL`;
      } else if (carrier === 'lasership') {
        carrierTo = `https://www.lasership.com/track.php?track_number_input=${tracking_number}`;
      } else if (carrier === 'usps') {
        carrierTo = `https://tools.usps.com/go/TrackConfirmAction?tLabels=${tracking_number}`;
      } else {
        carrierTo = `https://track.aftership.com/${tracking_number}`;
      }

      return carrierTo;
}

const getPackageDescription = (type) => {
    let desc = packageDescriptions[type];
    if (!desc) {
        desc = packageDescriptions['default'];
    }
    return desc;
}

const shippingMethodsList = [
    {
        name: 'Standard',
    },
    {
        name: 'Premium',
    },
    {
        name: 'Express',
    }
]

const allCouriers = {
    "ups": "UPS",
    "usps": "USPS",
    "fedex": "FedEx",
    "amazon-fba-us": "Amazon",
    "an-post": "An Post",
    "aramex": "Aramex",
    "australia-post": "Australia Post",
    "canada-post": "Canada Post",
    "canpar": "Canpar",
    "cdl": "CDL",
    "china-ems": "China EMS",
    "china-post": "China Post",
    "couriersplease": "Couriers Please",
    "couriers-please": "Couriers Please",
    "dfe": "Direct Freight Express",
    "dhl": "DHL",
    "dpd": "DPD",
    "dynamex": "Dynamex",
    "fastway": "Fastway",
    "hong-kong-post": "Hong Kong Post",
    "india-post": "India Post",
    "japan-post": "Japan Post",
    "laserShip": "LaserShip",
    "mark3": "Mark3",
    "maxx": "Maxx",
    "ontrac": "OnTrac",
    "purolator": "Purolator",
    "qantas": "Qantas Freight",
    "royal-mail": "Royal Mail",
    "sagawa-express": "Sagwa Express",
    "singapore-post": "Singapore Post",
    "smart-freight": "Smart Freight",
    "star-track": "StarTrack",
    "tnt": "TNT",
    "toll": "Toll Holdings",
    "yamato": "Yamato",
    "other": "Other",
}

const getCourier = (name) => {
    let carrier = allCouriers[name];
    if (!carrier) {
        const temp = name.toLowerCase().split('-');
        carrier = stringToTitleCase(temp.join(' '));
    }
    return carrier;
}

export {
    getCourier,
    carriersLinks,
    tempActionItems,
    stringToTitleCase,
    getColorClassName,
    getBorderClassName,
    shippingMethodsList,
    packageActionStatus,
    samplePackageDetails,
    getPackageInfoFromURL,
    getPackageDescription,
    getBackgroundClassName,
    packageActionRequestStatus,
    packageActionRequestStatusOthers,
}