import { API_URL } from "./config";


//just for testing purposes > triggering server side
export async function createImageText(ImageUrl: string) {
    const response = await fetch(`${API_URL}/mqtt`, {
        method: 'POST',
        body: JSON.stringify({
          ImageUrl
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
}