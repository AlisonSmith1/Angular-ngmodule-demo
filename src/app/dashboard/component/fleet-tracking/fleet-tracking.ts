import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DriverLocation } from '../../../core/models/fleet.model';

@Component({
  selector: 'app-fleet-tracking',
  standalone: false,
  templateUrl: './fleet-tracking.html',
  styleUrl: './fleet-tracking.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FleetTracking {
  @Input() locations: DriverLocation[] | null = [];

  // 地圖初始設定
  center: google.maps.LatLngLiteral = { lat: 25.033, lng: 121.565 };
  zoom = 13;
  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    styles: [],
  };

  getMarkerOptions(status: string): google.maps.MarkerOptions {
    let color = '#00f3ff';
    if (status === 'warning') color = '#ff4d4d';
    if (status === 'idle') color = '#ffcc00';

    return {
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: color,
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#ffffff',
        scale: 8,
      },
    };
  }
}
