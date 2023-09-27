import { useState, useEffect } from 'react';
import './App.css';
import { deleteDevices } from './api/deleteDevices';
import { getDevices, TDevice } from './api/getDevices';
import { createDevices } from './api/createDevices';
import { updateDevice } from './api/updateDevice';
import { createImageText } from './api/createImageText';



function App() {
  const [devices, setDevices] = useState<TDevice[]> ([]); 
  const [DeviceName, setDeviceName] = useState(''); 
  const [OwnerName, setOwnerName] = useState(''); 
  const [Password, setPassword] = useState('');
  const [updateDeviceID, setUpdateDeviceID] = useState ('');
  const [sortType, setSortType] = useState<"N-asc" | "N-desc" | undefined>("N-asc");
  

  // sends user input to API
  async function handleCreateDevice(e: React.FormEvent) {
    e.preventDefault(); 
    const newDevice = await createDevices(DeviceName, OwnerName, Password);
    setDevices([...devices, newDevice]); //update displayed array with new device
    setDeviceName(""); 
  }

  async function handleDeleteDevice(deviceId: string) {
    deleteDevices(deviceId);
    setDevices(devices.filter((device) => device._id !== deviceId))
  }

  async function handleUpdateDevice(e: React.FormEvent) {
    e.preventDefault();
    console.log("handleUpdateDevice called");
    /*const updatedDevice =*/ await updateDevice(DeviceName, OwnerName, Password, updateDeviceID);
    //setDevices([...devices, updatedDevice]);
    fetchDevices();
  }

  async function handleGetDevice(e: React.FormEvent) {
    e.preventDefault();
    fetchDevices();
  }

  async function fetchDevices() {
    const newDevices = await getDevices(sortType);
    setDevices(newDevices);
  }


  useEffect(() => { 
    fetchDevices();
  },  []);


  return (
    
      <div className='App'>
        <h1>Note Nuker</h1>
        <form id="sort-selection" onClick={handleGetDevice}>  
          <label htmlFor = "sort-type">Sort Type:</label>
            <select id="sort-type" value={sortType}  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setSortType(e.target.value as "N-asc" | "N-desc" | undefined);
            }}>
              <option value="N-asc">Service Name (A-Z)</option>
              <option value="N-desc">Service Name (Z-A)</option>
            </select>
        </form>

        <table className='devices'>
          <thead>
            <tr>
              <th>Service Name</th>
              <th>User Name</th>
              <th>Password</th> 
              <th>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {devices.map((Device) => (
              <tr key={Device._id}>
                <td>{Device.DeviceName}</td>
                <td>{Device.OwnerName}</td>
                <td>{Device.Password}</td>
                <td>
                  <button onClick={() => handleDeleteDevice(Device._id)}>X</button>
                
                  <button id="edit-button" onClick={() => {
                    setUpdateDeviceID(Device._id);
                    setDeviceName(Device.DeviceName);
                    setOwnerName(Device.OwnerName);   
                    setPassword(Device.Password); 
                  } }>Select</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={handleCreateDevice}>  
          <label htmlFor = "device-name" >Service Name</label>
          <input
            id = "device-name"
            value = {DeviceName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDeviceName(e.target.value); //storing what a user types, as he types it
            }}
          />
          

          <label htmlFor = "owner-name" >User Name</label>
          <input
            id = "owner-name"
            value = {OwnerName}
            onChange={(e2: React.ChangeEvent<HTMLInputElement>) => {
              setOwnerName(e2.target.value); 
            }}
          />

          <label htmlFor = "pass-word" >Password</label>
          <input
            id = "pass-word"
            value = {Password}
            onChange={(e3: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e3.target.value); 
            }}
          />


          
          <button>Add access data</button>
        </form>
        <form onSubmit={handleUpdateDevice}>  
          <label htmlFor = "update-DeviceID" >ID of access data for update</label>
          <input
            id = "update-DeviceID"
            value = {updateDeviceID}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUpdateDeviceID(e.target.value); 
            }}
          />
        <button >Edit access data</button>
        </form>
        {/*<button onClick={() => takeScreenshot()}>Create Snapshot</button>*/}
        <button onClick={() => createImageText("lol")}>Create Snapshot</button>
        
      </div>
  )
}

export default App  //for main.tsx .
