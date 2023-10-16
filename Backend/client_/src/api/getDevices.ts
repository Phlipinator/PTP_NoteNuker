import { API_URL } from "./config";

export type TDevice = {
    OwnerName: string;
    DeviceName: string;
    Password: string;
    _id:string;
  }

export async function getDevices(sort?: 'N-asc' | 'N-desc'): Promise<TDevice[]> {
  let url = `${API_URL}/devices`;

  if (sort) {
    url += `?sort=${sort}`;
  }  
  
  const response = await fetch(url);
  return response.json();
}