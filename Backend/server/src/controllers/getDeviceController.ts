import express, { Request, Response } from 'express';
import Device from '../models/Device';

export async function getDeviceController (req: Request, res: Response) {
    const { sort } = req.query;

  let sortOptions = {};
  if (sort === 'N-asc') {
    sortOptions = { DeviceName: 1 };
  } else if (sort === 'N-desc') {
    sortOptions = { DeviceName: -1 };
  }

  try {
    const devices = await Device.find().sort(sortOptions);
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }

   
}