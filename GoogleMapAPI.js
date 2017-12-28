let rootURL = 'https://maps.googleapis.com/maps/api',
  key = 'AIzaSyCKuaY_WP-TZRLarY__psDaVxCFO5ZyQvc'; // API Key
  
exports.nearbysearch = (lat, lon, radius, type, keyword) => {
  let url = `${rootURL}/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}&types=${type}&keyword=${keyword}&key=${key}`;
  console.log('nearbysearch: ' + url);
  return fetch(url).then(res => res.json()).then(json => {
    return {
      status: json.status,
      results: json.results,
    };
  });
};

exports.placedetails = (placeid) => {
  let url = `${rootURL}/place/details/json?placeid=${placeid}&key=${key}`;
  console.log('placedetails: ' + url);
  return fetch(url).then(res => res.json()).then(json => {
    return {
      status: json.status,
      result: json.result,
    };
  });
};

// exports.placephoto = (maxwidth, photo_reference) => {
//   let url = `${rootURL}/place/photo?maxwidth=${maxwidth}&photoreference=${photo_reference}&key=${key}`;
//   console.log(url);
//   // return fetch(url).then(res => res.json()).then(json => {
//   //   return {
//   //     photo_url: json
//   //   };
//   // });
//   return url;
// }
