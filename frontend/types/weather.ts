export interface Weather {
  cityCode: string;
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  cloudiness: number;
  visibility: number;
  description: string;
  icon: string;
  comfortIndex: number;
  rank: number;
}

export interface WeatherResponse {
  success: boolean;
  count: number;
  data: Weather[];
}