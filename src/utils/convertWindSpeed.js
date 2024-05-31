export function convertWindSpeed(speedInMetersPerSecond) {
  const speedInKilometersPerHour = speedInMetersPerSecond * 3.6;
  return `${speedInKilometersPerHour.toFixed(0)} km/h`;
}
