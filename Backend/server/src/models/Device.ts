import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;


const DeviceSchema = new Schema({
  DeviceName: String,
  OwnerName: String,
  Password: String
});

const DeviceModel = mongoose.model('Device', DeviceSchema);



export default DeviceModel
