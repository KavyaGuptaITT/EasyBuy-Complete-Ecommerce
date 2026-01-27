export function renderWeather(temp) {
  const badge = document.getElementById("weatherNav");
  if (badge) badge.textContent = `${temp}°C`;
}
