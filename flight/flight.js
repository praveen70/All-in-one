const axios = require('axios');


const getData = () => {
    console.log("llklk")
    var options = {
        method: 'GET',
        url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/referral/v1.0/india/10000/1000/1000/usa/2021-10-17/%7Binboundpartialdate%7D',
        params: {shortapikey: 'ra66933236979928', apiKey: '{shortapikey}'},
        headers: {
          'x-rapidapi-key': '98fa48985cmshb34e9f2fd67ef7cp10a20ejsn9b26f09af80c',
          'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data, "datta");
      }).catch(function (error) {
          console.error(error);
      })
}

module.exports = {
    getData
}