import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { DriverLocation } from '../../../core/models/fleet.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MapInfoWindow, MapAdvancedMarker } from '@angular/google-maps';

@Component({
  selector: 'app-fleet-tracking',
  standalone: false,
  templateUrl: './fleet-tracking.html',
  styleUrl: './fleet-tracking.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FleetTracking implements OnInit, AfterViewInit, OnDestroy {
  @Input() locations: DriverLocation[] | null = [];
  // Google Maps InfoWindow 元件
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  // Google Maps AdvancedMarker 元件列表
  @ViewChildren(MapAdvancedMarker) markerComponents!: QueryList<MapAdvancedMarker>;

  selectedDriver: DriverLocation | null = null;
  private markerSubscriptions: Subscription[] = [];

  private apiLoadedSubject = new BehaviorSubject<boolean>(false);
  apiLoaded$ = this.apiLoadedSubject.asObservable();

  center: google.maps.LatLngLiteral = { lat: 25.033, lng: 121.565 };
  zoom = 13;
  mapOptions: google.maps.MapOptions = {
    mapId: '3a772d2e6bfbe585fb86c17d', // 💡 AdvancedMarker 必須有 MapId
    disableDefaultUI: true,
  };

  // Google Maps API 載入
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (typeof google !== 'undefined' && google.maps) {
      this.apiLoadedSubject.next(true);
      return;
    }

    (window as any).initMap = () => {
      this.apiLoadedSubject.next(true);
      this.cdr.detectChanges();
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleApiKey}&libraries=marker&callback=initMap&loading=async`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  // Google Maps Marker 點擊事件綁定
  ngAfterViewInit() {
    // 監聽 Marker List 的變化，當資料更新重新渲染 Marker 時，重新綁定點擊事件
    this.markerComponents.changes.subscribe(() => {
      this.bindMarkerEvents();
    });
  }

  // Google Maps Marker 點擊事件綁定
  private bindMarkerEvents() {
    // 清除舊的監聽（避免記憶體洩漏）
    this.markerSubscriptions.forEach((s) => s.unsubscribe());

    this.markerComponents.forEach((markerComp, index) => {
      const driver = this.locations?.[index];
      if (!driver) return;

      // 取得原生 AdvancedMarkerElement 實例並註冊監聽
      const advancedMarker = markerComp.advancedMarker as google.maps.marker.AdvancedMarkerElement;

      if (advancedMarker) {
        // 使用 Google Maps 官方推薦的 addListener
        advancedMarker.addListener('click', () => {
          this.openInfoWindow(markerComp, driver);
        });
      }
    });
  }
  // Google Maps InfoWindow 開啟
  openInfoWindow(marker: MapAdvancedMarker, driver: DriverLocation) {
    this.selectedDriver = driver;
    this.infoWindow.open(marker);

    this.cdr.markForCheck();
  }

  // 根據司機狀態回傳不同的 Marker 樣式
  getAdvancedMarkerOptions(status: string): google.maps.marker.AdvancedMarkerElementOptions {
    let color = '#38bdf8';

    if (status === 'warning') color = '#f87171';
    if (status === 'idle') color = '#fbbf24';

    const glyph = document.createElement('div');
    glyph.className = 'custom-marker';
    glyph.style.pointerEvents = 'none'; // 讓點擊穿透到底層 Marker 實例
    glyph.innerHTML = `
      <div style="
        width: 16px; height: 16px; background-color: ${color}; 
        border: 2px solid #fff; border-radius: 50%; box-shadow: 0 0 15px ${color};
      "></div>
    `;

    return { content: glyph, title: 'Click for details' };
  }

  // 清理訂閱
  ngOnDestroy() {
    this.markerSubscriptions.forEach((s) => s.unsubscribe());
  }
}
