import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    MatButtonModule,
  ],
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.scss',
})
export class CitySearchComponent {
  city = new FormControl('');
  data: any;
  options: string[] = ['Prayagraj', 'Lucknow', 'Varanasi'];
  filteredOptions: Observable<string[]> | undefined;

  constructor(private fb: FormBuilder) {}

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
    try {
      fetch(
        `https://api.weatherapi.com/v1/current.json?key=0196414b3b9144f9a26200354230103&q=${this.city.value}`
      )
        .then((response) => response.json())
        .then(console.log)
        .then((quotesData) => (this.data = quotesData));
      console.log(this.data);
    } catch (error) {
      console.log(error);
    }
  };
}
