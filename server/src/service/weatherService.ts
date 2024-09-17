import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  Temp: Number;
  Wind: Number;
  Humidity: Number;

  constructor(Temp: Number, Wind: Number, Humidity: Number) {
    this.Temp = Temp;
    this.Wind = Wind;
    this.Humidity = Humidity;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string = 'https://api.openweathermap.org/data/2.5/';
  private APIkey: string = "6f007170ad9b182176c868f866489d28";
 private cityName: string = '';


  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates> {
    const search = this.buildGeocodeQuery(query);
    const response = await fetch(search);
    const data = await response.json();
    return { lat: data.coord.lat, lon: data.coord.lon };
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(coordinates: Coordinates): Coordinates {
    return { lat: coordinates.lat, lon: coordinates.lon };
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(city: string): string {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${this.APIkey}`
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.APIkey}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(this.cityName);
    return this.destructureLocationData(locationData);
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const query = this.buildWeatherQuery(coordinates);
    const response = await fetch(query);
    return await response.json();
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    return new Weather(
      response.list[0].main.temp,
      response.list[0].main.humidity,
      response.list[0].wind.speed
  );
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(weatherData: any[]): Weather[] {
    
    
    return weatherData.map(data => new Weather(
      data.main.temp,
      data.main.humidity,
      data.wind.speed
    ));
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather[]> {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(weatherData.list);
    return [currentWeather, ...forecastArray];
  }
}

export default new WeatherService();
