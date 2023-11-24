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
  options: string[] = [
    'Allahbad',
    'Lucknow',
    'Varanasi',
    'New Delhi',
		'Gorakhpur',
		'Jaipur'
  ];
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
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onSubmit = async () => {
    this.city.value && this.appService.getWeather(this.city.value);
  };
}
