import { API_URL } from "./config";

export type TScore = {
    Rank: int
    Name: string;
    Point: int;
    _id: string;
  }

export async function getScores(sort?: 'N-asc' | 'N-desc'): Promise<TScore[]> {
  let url = `${API_URL}/scores`;

  if (sort) {
    url += `?sort=${sort}`;
  }  
  
  const response = await fetch(url);
  return response.json();
}