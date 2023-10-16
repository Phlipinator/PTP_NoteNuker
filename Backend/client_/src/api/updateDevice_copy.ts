import { API_URL } from "./config";

export async function updateDevice(DeviceName: string, DeviceType: string, OwnerName: string, BatteryStatus: number, deviceId: string) {
    //try{
        const response = await fetch(`${API_URL}/devices` + deviceId, {
            method: 'PUT',
            body: JSON.stringify({
                DeviceName,
                DeviceType,
                OwnerName,
                BatteryStatus,
                deviceId 
                }),
            headers: {
            "Content-Type": "application/json",
            },
        });

        const updatedDevice = await response.json;
        return updatedDevice;

    /*} catch (err) {
        console.error('Error updating devices:', err);
        return null;
    }*/
}
