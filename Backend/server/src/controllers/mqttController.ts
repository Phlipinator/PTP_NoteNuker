// @ts-nocheck

import { chromium } from "playwright";
const fetch = require('node-fetch'); //ES6 not working
import FormData from 'form-data';
const fs = require('fs');
const mqtt = require("mqtt");



//Wait for message by Raspberry
const client = mqtt.connect('mqtt://philippsbroker.duckdns.org', {port: 1883, username: "mqtt_user", password: "mqtt-docker"});

client.on('connect', () => {
  console.log('MQTT connected');
  client.subscribe('NoteNuker'); 
});

client.on('message', (topic, message) => {
  console.log(`Received message on topic: ${topic}`);
  console.log("Message: "+message);
  if (message == "green") {
    getImageFromStream();
  } else {
    console.log("code red");
  }
});


//Handling Image to Text in MongoDB pipeline
export async function getImageFromStream() {  
  console.log("get image from stream");
  let filePath
  let imageText
  try {
    filePath = await takeScreenshot();
    console.log(`Image saved at: ${filePath}`);
  } catch (error) {
    console.error('Error taking screenshot: ', error);
  }

  try {
    imageText = await createImageText(filePath);
    //console.log(`Text in Image: ${imageText.ParsedResults.ParsedText}`);
  } catch (error) {
    console.error('Error receiving text from ocr: ', error);
  }
  const text = JSON.stringify(imageText);
  //console.log("text-----"+text)
  parseString(text);
}


// Saving screenshot from livestream with playwright
async function takeScreenshot() {
  const randomNumber = Math.floor(Math.random() * 1000000);
  const filePath = `img/chromium-screenshot-${randomNumber}.png`;
  let browser = await chromium.launch();
  let page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 1080 });
  await page.goto("https://www.earthcam.com/usa/newyork/timessquare/?cam=tsrobo1");         //  -> Testing
  //await page.goto("http://172.20.10.3/webcam"); //   OR    http://172.20.10.3/snapshot        -> Actual NoteNuker Stream
  await page.screenshot({ path: filePath });
  //console.log("Image saved at path: "+filePath);
  await browser.close();
  return filePath; 
};


//Send Image to OCR API and get extracted Text
export async function createImageText(fileName: string) {
  const formData = new FormData();

  // Specify the local file path
  //const filePath = 'C:/Users/david/Documents/GitHub/PTP_NoteNuker/Backend/server/' + fileName;      //from Stream
  const filePath = 'C:/Users/david/Downloads/userData3.jpg';                                             //test Image
  //const filePath = "C:/Users/janma/Desktop/David/userData.jpg"
  //const filePath = "C:/Users/janma/Documents/GitHub/pm-main/server/"+ fileName;

  // Read the file from the local file system as a Buffer
  const imageBuffer = fs.readFileSync(filePath);

  // Append the Buffer to the FormData
  formData.append('file', imageBuffer, {
    filename: 'userData.jpg',
    contentType: 'image/jpeg',
  });

  const response = await fetch(`https://api.ocr.space/parse/image`, {
    method: 'POST',
    body: formData,
    headers: {
      'apikey': 'K84907859288957',
    },
  });

  const data = await response.json();
  //console.log('Data:', JSON.stringify(data));
  return data;
}


//Extract user data from the OCR result         //TODO: David
export async function parseString(input1: string) {
  const input = input1.replaceAll('\\', '');
  const result: Record<string, string> = {};
  console.log("Input at parseString: "+input);

  // Regular expressions for matching the patterns
  const passwordPattern = /(?<=Password=\s*")([^"\\]*(\\.[^"\\]*)*)"/g;
  const serviceNamePattern = /(?<=Service=\s*")([^"\\]*(\\.[^"\\]*)*)"/g;
  const userNamePattern = /(?<=Name=\s*")([^"\\]*(\\.[^"\\]*)*)"/g;


  // Try to match each pattern in the input string
  const passwordMatch = input.match(passwordPattern);
  const pw = JSON.stringify(passwordMatch[0]);
  const pw_ = pw.replace(/\\/g, ' ').replace(/\"/g, ' ');
  console.log("passwordMatch: "+pw_);

  const serviceNameMatch = input.match(serviceNamePattern);
  const sn = JSON.stringify(serviceNameMatch[0]);
  const sn_ = sn.replace(/\\/g, ' ').replace(/\"/g, ' ');
  console.log("serviceMatch: "+sn_);

  const userNameMatch = input.match(userNamePattern);
  const un = JSON.stringify(userNameMatch[0]);
  const un_ = un.replace(/\\/g, ' ').replace(/\"/g, ' ');
  console.log("userMatch: "+un_);

  const newDevice = await createDevices(sn_, un_, pw_);
  return result;

}


//save to MongoDB
export async function createDevices(DeviceName: string, OwnerName: string, Password: string) {
  //const fetch = (await import('node-fetch')).default; //dynamic import is necessary
  const response = await fetch(`http://localhost:3000/devices`, {
      method: 'POST',
      body: JSON.stringify({
        DeviceName,
        OwnerName,
        Password
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
}