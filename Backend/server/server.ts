import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import Device from './src/models/Device';
import cors from 'cors';
import { getDeviceController } from './src/controllers/getDeviceController';
import { createDeviceController } from './src/controllers/createDeviceController';
import { deleteDeviceController } from './src/controllers/deleteDeviceController';
import { updateDeviceController } from './src/controllers/updateDeviceController';
import { getImageFromStream } from './src/controllers/mqttController';

const app = express();
const PORT = 3000;

app.use(cors({ //allows requests from other PORTs  '*' for all, origin: URL for specific PORT
        origin: '*',
    })
); 
app.use(express.json());


app.delete('/devices/:deviceId', deleteDeviceController);
app.get("/devices", getDeviceController);
app.post("/mqtt", getImageFromStream);
app.post("/devices", createDeviceController);
app.put('/devices/:deviceId', updateDeviceController);


mongoose.connect(
    'mongodb+srv://davidneu:uniL768xmCTl8cDU@cluster0.htlw1dr.mongodb.net/?retryWrites=true&w=majority'
    //'mongodb+srv://DeviceManagerDavid:UNe3KHESIYED1s3v@cluster0.thyhbgd.mongodb.net/?retryWrites=true&w=majority'
    ).then(() => {
        console.log(`Listening on Port${PORT}`);
        app.listen(PORT);
    });




