import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { GetWeatherDataService } from '../get-weather-data.service';

@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDividerModule,
    ReactiveFormsModule,
    AsyncPipe,
    HttpClientModule,
    MatButtonModule,
  ],
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.scss',
})
export class CitySearchComponent {
  city = new FormControl('');
  data: any;
  load: boolean = false;
  options: string[] = ['Prayagraj', 'Lucknow', 'Varanasi'];
  filteredOptions: Observable<string[]> | undefined;

  constructor(
    private http: HttpClient,
    private appService: GetWeatherDataService
  ) {}

  ngOnInit() {
    this.filteredOptions = this.city.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    try {
      this.http
        .get(
          `https://api.weatherapi.com/v1/current.json?key=0196414b3b9144f9a26200354230103&q=Lucknow`
        )
        .subscribe((res: any) => {
          this.data = res;
          this.load = true;
        });
      console.log(this.data);
      // this.appService.weatherData = this.data;
      // this.appService.load = this.load;
    } catch (error) {
      console.log(error);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onSubmit = async () => {
    try {
      this.http
        .get(
          `https://api.weatherapi.com/v1/current.json?key=0196414b3b9144f9a26200354230103&q=${this.city.value}`
        )
        .subscribe((res: any) => {
          this.data = res;
          this.load = true;
        });
      // this.appService.weatherData = this.data;
      // this.appService.load = this.load;
      console.log(this.data);
    } catch (error) {
      console.log(error);
    }
  };
}
