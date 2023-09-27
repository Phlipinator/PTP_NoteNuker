import express, { Request, Response } from 'express';
import Device from '../models/Device';

export async function deleteDeviceController (req: Request, res: Response) {
    try {
    const deviceId = req.params.deviceId;
        const device = await Device.findByIdAndDelete(deviceId);
        res.json(device);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: true, message: 'Internal server error'})
    }
}