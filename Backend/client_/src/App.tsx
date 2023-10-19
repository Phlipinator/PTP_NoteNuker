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

      <div className='App-container'>
      <div className='App'>
        <h1>Passwords</h1>
        {/*<form id="sort-selection" onClick={handleGetDevice}>  */}
        {/*  <label htmlFor = "sort-type">Sort Type:</label>*/}
        {/*    <select id="sort-type" value={sortType}  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {*/}
        {/*      setSortType(e.target.value as "N-asc" | "N-desc" | undefined);*/}
        {/*    }}>*/}
        {/*      <option value="N-asc">Service Name (A-Z)</option>*/}
        {/*      <option value="N-desc">Service Name (Z-A)</option>*/}
        {/*    </select>*/}
        {/*</form>*/}

        <table className='devices'>
          <thead>
            <tr>
              <th>Service Name</th>
              <th>User Name</th>
              <th>Password</th> 
              <th></th>
            </tr>
          </thead>
          <tbody>
            {devices.map((Device) => (
              <tr key={Device._id} onClick={() => {
                setUpdateDeviceID(Device._id);
                setDeviceName(Device.DeviceName);
                setOwnerName(Device.OwnerName);
                setPassword(Device.Password);
              } }>
                <td>{Device.DeviceName}</td>
                <td>{Device.OwnerName}</td>
                <td>{Device.Password}</td>
                <td className="actions">
                  <svg className={"delete_icon"} width="12" preserveAspectRatio="True" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => handleDeleteDevice(Device._id)}>
                    <path d="M2.15429 21.9463V21.9458V4.11483V3.61483H1.65429H0.868408V1.87161H6.79783H7.29783V1.37161V0.5H14.0131V1.37161V1.87161H14.5131H20.4426V3.61483H19.6567H19.1567V4.11483V21.9458C19.1567 22.5765 18.9508 23.0993 18.5358 23.5419C18.1218 23.9835 17.6469 24.1897 17.0856 24.189H17.0849H4.22606C3.66345 24.189 3.1879 23.9821 2.77388 23.5405C2.35896 23.0979 2.15358 22.5757 2.15429 21.9463ZM17.5849 4.11483V3.61483H17.0849H4.22606H3.72606V4.11483V21.9458V22.4458H4.22606H17.0849H17.5849V21.9458V4.11483ZM8.86961 7.35805V18.7026H7.29783V7.35805H8.86961ZM14.0131 7.35805V18.7026H12.4414V7.35805H14.0131Z" fill="#930C0C" stroke="#930C0C"/>
                  </svg>
                  {/*<button onClick={() => handleDeleteDevice(Device._id)}>X</button>*/}
                  {/*<button id="edit-button" onClick={() => {*/}
                  {/*  setUpdateDeviceID(Device._id);*/}
                  {/*  setDeviceName(Device.DeviceName);*/}
                  {/*  setOwnerName(Device.OwnerName);   */}
                  {/*  setPassword(Device.Password); */}
                  {/*} }>✓</button>*/}
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
        <button onClick={() => createImageText("lol")}>Create Snapshot</button>
      </div>
      </div>
  )
}

export default App  //for main.tsx .
