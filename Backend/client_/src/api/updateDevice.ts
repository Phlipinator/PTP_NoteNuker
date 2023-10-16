import { API_URL } from "./config";
import { TDevice } from "./getDevices";

export async function updateDevice(DeviceName: string, OwnerName: string, Password: string, deviceId: string): Promise<TDevice> {
    //try { 
    const response = await fetch(`${API_URL}/devices/${deviceId}`, {
        method: 'PUT',
        body: JSON.stringify({
            DeviceName,
            OwnerName,
            Password,
            deviceId 
            }),
        headers: {
        "Content-Type": "application/json",
        },
    });
    //const updatedDevice = await response.json;
    //return updatedDevice;
    return response.json();
    
    /*} catch (err) {
        console.error('Error updating devices:', err);
        //return null;
    }*/
}