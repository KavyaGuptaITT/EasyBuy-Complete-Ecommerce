export const weatherService = {
  async getWeather() {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current_weather=true`;
      const res = await fetch(url);
      const data = await res.json();
      return {
        temp: data?.current_weather?.temperature || "--",
      };
    } catch {
      return { temp: "--", error: true };
    }
  },
};
