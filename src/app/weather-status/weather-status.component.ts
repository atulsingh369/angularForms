import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetWeatherDataService } from '../get-weather-data.service';

@Component({
  selector: 'app-weather-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-status.component.html',
  styleUrl: './weather-status.component.scss',
})
export class WeatherStatusComponent implements OnInit {
  weatherData: any;

  constructor(private appService: GetWeatherDataService) {}

  ngOnInit() {
    this.getWeather();
  }

  ngOnChange() {
    this.getWeather();
    console.log(this.weatherData.location?.name);
  }

  getWeather(): void {
    this.weatherData = this.appService.getWeather(null);
  }
}
