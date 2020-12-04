/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');


const fetchMyIP = function(callback) { 
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    const data = JSON.parse(body).ip;
    if (error) {
      callback(error, null);
    } else {
      callback(null, data);
    }
    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
    let newObj = {};
    if (error) {
      callback(error, null);
    } else {
      newObj['latitude'] = JSON.parse(body)['lat'];
      newObj['longitude'] = JSON.parse(body)['lon'];
      callback(null, newObj);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    const data = JSON.parse(body).response;
    if (error) {
      callback(error, null);
    } else {
      callback(null, data);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for ISS Passover Times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };