import { Injectable } from '@angular/core';
import { Observable, interval, map, startWith } from 'rxjs';
import { DriverLocation } from '../models/fleet.model';
import { DRIVER_DATA } from '../../data/driver';

@Injectable({ providedIn: 'root' })
export class FleetService {
  private drivers: DriverLocation[] = DRIVER_DATA;

  getLiveDriverLocations(): Observable<DriverLocation[]> {
    return interval(10000).pipe(
      map(() => {
        this.drivers = this.drivers.map((d) => {
          if (d.status === 'active') {
            return {
              ...d,

              lat: d.lat + 0.0002,
              lng: d.lng + 0.0001,
              lastUpdated: new Date(),
              speed: 40 + Math.floor(Math.random() * 10),
            };
          }
          return d;
        });
        return [...this.drivers];
      })
    );
  }
}
