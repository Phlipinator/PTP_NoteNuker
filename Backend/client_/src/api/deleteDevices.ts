import { API_URL } from "./config";

export async function deleteDevices(deviceId: string) {
    await fetch(`${API_URL}/devices/${deviceId}`, {
        method: 'DELETE',
      });
}