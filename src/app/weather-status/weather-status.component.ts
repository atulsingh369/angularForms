import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GetWeatherDataService } from '../get-weather-data.service';

@Component({
  selector: 'app-weather-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-status.component.html',
  styleUrl: './weather-status.component.scss',
})
export class WeatherStatusComponent {
  weatherData: any;

  constructor(
    private http: HttpClient,
    private appService: GetWeatherDataService
  ) {}

  ngOnInit() {
    try {
      this.http
        .get(
          `https://api.weatherapi.com/v1/current.json?key=0196414b3b9144f9a26200354230103&q=Lucknow`
        )
        .subscribe((res: any) => (this.weatherData = res));
      console.log(this.weatherData);
    } catch (error) {
      console.log(error);
    }
  }

  ngOnChange() {
    // if (this.appService.load) {
    //   this.weatherData = this.appService.weatherData;
    // } else this.weatherData = 'No Data';

    console.log(this.weatherData);
  }

  getHeroes(): void {
    this.weatherData = this.appService.getHeroes();
  }
}
