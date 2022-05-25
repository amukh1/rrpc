module.exports = {
    search: function(idd){
        
    const rpc = require("discord-rpc");
    const client = new rpc.Client({ transport: 'ipc' });
    const config = require('./config.json');
    var express = require('express')
var app = express()
var cors = require('cors')

const https = require('https');


let acc = {
    details: config.Details,
    state: config.State,
    
assets: {
         large_image: config.LargeImage,
         large_text: config.LargeImageText,
         small_image: config.SmallImage,
         small_text: config.SmallImageText,
        
},
buttons : [
    {
        label : config.Button1,url : config.Url1
    },
    { 
        label : config.Button2,url : config.Url2
    },
  //labels are the buttons that you wanna provide to your rich presence and urls are the links that leads you when someone press that button
  //Note the button won't work for you but don't worry it work for others
    ]
    }


  
// client.login({ clientId : config.ClientID }).catch(console.error); 
let g = false
let uuid=idd
let a = setInterval(function() {

    console.log('checking')
    https.get(`https://api.amukh1.dev/rblx?id=${uuid}`, (resp) => {
  let data = '';
// console.log(resp)
  // A chunk of data has been received.
  resp.on('data', (chunk) => {
      chunk = JSON.parse(chunk)
   console.log(chunk.body)
   console.log(chunk.boo)
if(chunk.boo == true && acc.state != chunk.body.state && acc.details != chunk.body.details) {
    console.log('g is false')
    g = true
    console.log('d')
acc.state = chunk.body.state
acc.details = chunk.body.details

client.on('ready', () => {
    console.log('Your presence works now check your discord profile :D')
    client.request('SET_ACTIVITY', {
    pid: process.pid,
    activity: chunk.body,
    })
    })


        
    client.login({ clientId : config.ClientID }).catch(console.error); 
}
   
  });
// console.log(data)
    
});


}, 5000) 
    }
}