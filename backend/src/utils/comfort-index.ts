export interface ComfortInput {
  temperature: number;
  humidity: number;
  windSpeed: number;
  cloudiness: number;
}

const clamp = (value: number): number => {
  return Math.max(0, Math.min(100, value));
};

const temperatureScore = (temperature: number): number => {
  const idealTemperature = 22;

  const difference = Math.abs(temperature - idealTemperature);

  return clamp(100 - difference * 6);
};

const humidityScore = (humidity: number): number => {
  const idealHumidity = 50;

  const difference = Math.abs(humidity - idealHumidity);

  return clamp(100 - difference * 2);
};

const windScore = (windSpeed: number): number => {
  const idealWindSpeed = 3;

  const difference = Math.abs(windSpeed - idealWindSpeed);

  return clamp(100 - difference * 12);
};

const cloudScore = (cloudiness: number): number => {
  const idealCloudiness = 30;

  const difference = Math.abs(cloudiness - idealCloudiness);

  return clamp(100 - difference);
};

export const calculateComfortIndex = ({
  temperature,
  humidity,
  windSpeed,
  cloudiness,
}: ComfortInput): number => {
  const temp = temperatureScore(temperature);
  const humidityValue = humidityScore(humidity);
  const wind = windScore(windSpeed);
  const cloud = cloudScore(cloudiness);

  const score =
    temp * 0.4 +
    humidityValue * 0.25 +
    wind * 0.2 +
    cloud * 0.15;

  return Math.round(clamp(score));
};