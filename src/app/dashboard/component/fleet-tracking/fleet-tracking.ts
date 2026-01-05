import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { DriverLocation } from '../../../core/models/fleet.model';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-fleet-tracking',
  standalone: false,
  templateUrl: './fleet-tracking.html',
  styleUrl: './fleet-tracking.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FleetTracking implements OnInit {
  @Input() locations: DriverLocation[] | null = [];

  // 使用 BehaviorSubject 來確保狀態可以被正確訂閱
  private apiLoadedSubject = new BehaviorSubject<boolean>(false);
  apiLoaded$ = this.apiLoadedSubject.asObservable();

  center: google.maps.LatLngLiteral = { lat: 25.033, lng: 121.565 };
  zoom = 13;
  mapOptions: google.maps.MapOptions = {
    mapId: 'DEMO_MAP_ID',
    disableDefaultUI: true,
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (typeof google !== 'undefined' && google.maps) {
      this.apiLoadedSubject.next(true);
      return;
    }

    // 定義全域 Callback (解決 is not a function 錯誤)必須在 script 載入前定義好
    (window as any).initMap = () => {
      console.log('Google Maps Script 載入完成');
      this.apiLoadedSubject.next(true);
      this.cdr.detectChanges();
    };

    console.log('開始載入 Google Maps Script');
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleApiKey}&libraries=marker&callback=initMap&loading=async`;
    script.async = true;
    script.defer = true;

    // 如果腳本載入失敗，讓頁面能動
    script.onerror = () => {
      console.error('Google Maps Script 載入失敗');
      this.cdr.markForCheck();
    };

    document.head.appendChild(script);
  }

  getAdvancedMarkerOptions(status: string): google.maps.marker.AdvancedMarkerElementOptions {
    let color = '#00f3ff';
    if (status === 'warning') color = '#ff4d4d';
    if (status === 'idle') color = '#ffcc00';

    const glyph = document.createElement('div');
    glyph.innerHTML = `
      <div style="
        width: 15px; height: 15px; background-color: ${color}; 
        border: 2px solid white; border-radius: 50%; box-shadow: 0 0 10px ${color};
      "></div>
    `;

    return { content: glyph };
  }
}
