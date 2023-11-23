import { TestBed } from '@angular/core/testing';

import { GetWeatherDataService } from './get-weather-data.service';

describe('GetWeatherDataService', () => {
  let service: GetWeatherDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetWeatherDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
