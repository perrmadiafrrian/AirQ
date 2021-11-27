// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  data: ResData;
};

type ReqData = {
  lat: number | null;
  lon: number | null;
};

const API_KEY = process.env.API_KEY;

type ResData = {
  coord: ReqData;
  weather: WeatherData[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sealevel: number;
    grnd_level: number;
  };
  visibility: number;
  wind: { speed: number; deg: number; gust: number };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: { country: string; sunrise: number; sunset: number };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

type WeatherData = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
const fetchData = async ({ lat, lon }: ReqData): Promise<ResData | Error> => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return e;
    });
};

export default async function handler(
  { query }: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const lat = typeof query.lat === "string" ? parseFloat(query.lat) : null;
  const lon = typeof query.lon === "string" ? parseFloat(query.lon) : null;

  if (lat === null || lon === null || isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({
      name: "Invalid parameter",
      message: "Need latitude(lat) and longitude(lon) as parameter",
    });
  }

  const req_data: ReqData = {
    lat,
    lon,
  };

  const api_result = await fetchData(req_data);

  if (api_result instanceof Error) {
    return res.status(400).json({
      name: "Error",
      message: "Failed to get temperature and location data",
    });
  }

  res.status(200).json({ data: api_result });
}
