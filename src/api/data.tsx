export type MarvelMovie = {
  id: number;
  title: string;
  release_date: string;
  box_office: string;
  duration: string;
  overview: string;
  directed_by: string;
  cover_url: string;
  trailer_url: string;
  phase: number;
  saga: string;
};

const BASE_URL = "https://mcuapi.vercel.app/api/v1";

export async function getFilms(): Promise<MarvelMovie[]> {
  const res = await fetch(`${BASE_URL}/movies`);
  if (!res.ok) throw new Error("Failed to fetch Marvel movies");
  const json = await res.json();
  // API MCU format: { data: [ {...}, {...} ] }
  return json.data;
}

export async function getFilmById(id: string): Promise<MarvelMovie> {
  const res = await fetch(`${BASE_URL}/movies/${id}`);
  if (!res.ok) throw new Error("Failed to fetch movie detail");
  const json = await res.json();
  return json;
}
