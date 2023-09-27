import { API_URL } from "./config";

export async function createDevices(DeviceName: string, OwnerName: string, Password: string) {
    const response = await fetch(`${API_URL}/devices`, {
        method: 'POST',
        body: JSON.stringify({
          DeviceName,
          OwnerName,
          Password
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
}