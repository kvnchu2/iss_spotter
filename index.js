// index.js




// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });


// fetchCoordsByIP('75.155.168.216', (error, data) => {
//   if (error) {
//     console.log('It didn't work', error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:', data);
// });


// fetchISSFlyOverTimes ({ latitude: 45.2292, longitude: -122.9932 }, (error, data) => {
//   if (error) {
//     console.log('It didn't work', error);
//     return;
//   }

//   console.log('It worked! Returned flyover times:', data);
// });

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});