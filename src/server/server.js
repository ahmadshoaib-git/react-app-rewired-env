export const getBaseURL = () => {
  const base = "https://api.packagex.app/";
  const location = window.location.href.toString().toLowerCase();
  const env = process.env.REACT_APP_ENV;
  // const domain = location.includes('env=dev')
  //     ? 'dev/'
  //     : location.includes('env=qa')
  //         ? 'qa/'
  //         : location.includes('env=demo_v1')
  //             ? 'demo/'
  //             : location.includes('env=prod_v3')
  //                 ? 'px/'
  //                 : location.includes('env=uat')
  //                     ? 'uat/'
  //                     : location.includes('env=qa')
  //                         ? 'qa/'
  //                         : location.includes('env=v3_wework')
  //                             ? 'wework_v3/'
  //                             : location.includes('env=px_biz')
  //                                 ? 'v1/'
  //                                 : 'dev/'
  let domain = null;
  switch (env) {
    case "dev":
      domain = "dev/";
      break;
    case "qa":
      domain = "qa/";
      break;
    case "uat":
      domain = "uat/";
      break;
    case "demo":
      domain = "demo/";
      break;
    default:
      domain = "dev/";
      break;
  }
  return `${base}${domain}`;
};

export const server = getBaseURL();
