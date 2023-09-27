import express, { Request, Response } from 'express';
import Device from '../models/Device';

export async function createDeviceController (req: Request, res: Response) {
    try {
        const newDevice = new Device({
            DeviceName: req.body.DeviceName,
            OwnerName: req.body.OwnerName,
            Password: req.body.Password,
        });
        const createdDevice = await newDevice.save(); //saves into DB.
        res.json(createdDevice);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: true, message: 'Internal server error'})
    }
}
