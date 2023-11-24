import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetWeatherDataService {
  weatherData: any;
  weatherCity: string = 'Lucknow';
  constructor(private http: HttpClient) {}

  getWeather(weatherCity: string | null): any {
    if (weatherCity) {
      this.weatherCity = weatherCity;
      console.log(this.weatherCity);
    }
    try {
      this.http
        .get(
          `https://api.weatherapi.com/v1/current.json?key=0196414b3b9144f9a26200354230103&q=${this.weatherCity}`
        )
        .subscribe((res: any) => (this.weatherData = res));
    } catch (error) {
      console.log(error);
    }
    console.log(this.weatherData.location?.name);
    return this.weatherData;
  }
}
