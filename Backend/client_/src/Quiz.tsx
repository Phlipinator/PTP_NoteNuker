import { useState, useEffect } from 'react';
import './Quiz.css';
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

      <div className='quiz-container flex_row'>
        <div className='quiz'>
          <div><h1 className={"text_stroke"}>Quiz of the Day</h1></div>
          <div className={"quiz_question"}>
            Pretending to be banks, the IRS or some other organization and sending you an email or a letter asking for personal information is called __________.
          </div>
          <div>
            <div className={"option"}>A. surfing</div>
            <div className={"option"}>B. fishing</div>
            <div className={"option"}>C. phishing</div>
            <div className={"option"}>D. sailing</div>
          </div>
          <div>
            <a href="/past-quizzes">Past Quizzes</a>
          </div>
        </div>
        <div className='leaderboard'>
          <div><h1>Leaderboard</h1></div>
          <div className={"ranking"}>
            <div className={"rank_tag first3 flex_row"}>
              <div className={"rank"}>1</div>
              <div className={"flex1 name"}>Worms Jenkins</div>
              <div className={"score"}>125P</div>
            </div>
            <div className={"rank_tag first3 flex_row"}>
              <div className={"rank"}>2</div>
              <div className={"flex1 name"}>Worms Jenkins</div>
              <div className={"score"}>125P</div>
            </div>
            <div className={"rank_tag first3 flex_row"}>
              <div className={"rank"}>3</div>
              <div className={"flex1 name"}>Worms Jenkins</div>
              <div className={"score"}>125P</div>
            </div>
            <div className={"rank_tag flex_row"}>
              <div className={"rank"}>4</div>
              <div className={"flex1 name"}>Worms Jenkins</div>
              <div className={"score"}>125P</div>
            </div>
            <div className={"rank_tag flex_row"}>
              <div className={"rank"}>4</div>
              <div className={"flex1 name"}>Worms Jenkins</div>
              <div className={"score"}>125P</div>
            </div>
            <div className={"rank_tag flex_row"}>
              <div className={"rank"}>4</div>
              <div className={"flex1 name"}>Worms Jenkins</div>
              <div className={"score"}>125P</div>
            </div>
            <div className={"rank_tag flex_row"}>
              <div className={"rank"}>4</div>
              <div className={"flex1 name"}>Worms Jenkins</div>
              <div className={"score"}>125P</div>
            </div>
          </div>
        </div>
      </div>

  )
}

export default App  //for main.tsx .
