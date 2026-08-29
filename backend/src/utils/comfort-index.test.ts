import { describe, expect, it } from "vitest";

import { calculateComfortIndex } from "./comfort-index";

describe("calculateComfortIndex", () => {
  it("returns 100 for ideal weather conditions", () => {
    const score = calculateComfortIndex({
      temperature: 22,
      humidity: 50,
      windSpeed: 3,
      cloudiness: 30,
    });

    expect(score).toBe(100);
  });

  it("calculates the expected score for normal weather conditions", () => {
    const score = calculateComfortIndex({
      temperature: 25,
      humidity: 60,
      windSpeed: 4,
      cloudiness: 40,
    });

    expect(score).toBe(84);
  });

  it("returns a low score for uncomfortable weather conditions", () => {
    const score = calculateComfortIndex({
      temperature: 40,
      humidity: 90,
      windSpeed: 10,
      cloudiness: 100,
    });

    expect(score).toBe(13);
  });

  it("never returns a value greater than 100", () => {
    const score = calculateComfortIndex({
      temperature: 22,
      humidity: 50,
      windSpeed: 3,
      cloudiness: 30,
    });

    expect(score).toBeLessThanOrEqual(100);
  });

  it("never returns a value below 0", () => {
    const score = calculateComfortIndex({
      temperature: 100,
      humidity: 100,
      windSpeed: 100,
      cloudiness: 100,
    });

    expect(score).toBeGreaterThanOrEqual(0);
  });

  it("penalizes temperature differences from the ideal value", () => {
    const idealScore = calculateComfortIndex({
      temperature: 22,
      humidity: 50,
      windSpeed: 3,
      cloudiness: 30,
    });

    const hotScore = calculateComfortIndex({
      temperature: 35,
      humidity: 50,
      windSpeed: 3,
      cloudiness: 30,
    });

    expect(hotScore).toBeLessThan(idealScore);
  });

  it("penalizes high humidity", () => {
    const comfortableHumidity = calculateComfortIndex({
      temperature: 22,
      humidity: 50,
      windSpeed: 3,
      cloudiness: 30,
    });

    const highHumidity = calculateComfortIndex({
      temperature: 22,
      humidity: 90,
      windSpeed: 3,
      cloudiness: 30,
    });

    expect(highHumidity).toBeLessThan(comfortableHumidity);
  });

  it("penalizes excessive wind speed", () => {
    const comfortableWind = calculateComfortIndex({
      temperature: 22,
      humidity: 50,
      windSpeed: 3,
      cloudiness: 30,
    });

    const strongWind = calculateComfortIndex({
      temperature: 22,
      humidity: 50,
      windSpeed: 15,
      cloudiness: 30,
    });

    expect(strongWind).toBeLessThan(comfortableWind);
  });
});