import express, { Request, Response } from 'express';
import Device from '../models/Device';

export async function updateDeviceController (req: Request, res: Response) {
    try {
        const { deviceId } = req.params; // id taken from querystring
        const updatedData = req.body;

        //find device by id and update it
        const updatedDevice = await Device.findByIdAndUpdate(deviceId, updatedData, {new: true});
        res.json(updatedDevice);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: true, message: 'Internal server error'})
    }
}
