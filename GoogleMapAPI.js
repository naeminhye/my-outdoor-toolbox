let rootURL = 'https://maps.googleapis.com/maps/api',
  key = 'AIzaSyCKuaY_WP-TZRLarY__psDaVxCFO5ZyQvc'; // API Key
  
exports.nearbysearch = (lat, lon, radius, type, keyword) => {
  let url = `${rootURL}/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}&types=${type}&keyword=${keyword}&key=${key}`;
  console.log(url);
  return fetch(url).then(res => res.json()).then(json => {
    return {
      status: json.status,
      results: json.results,
    };
  });
};