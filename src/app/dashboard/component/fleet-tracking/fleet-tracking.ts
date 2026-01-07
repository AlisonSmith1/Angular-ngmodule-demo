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
  OnChanges,
  SimpleChanges,
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
export class FleetTracking implements OnInit, AfterViewInit, OnDestroy, OnChanges {
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
    mapId: '3a772d2e6bfbe585fb86c17d', //  AdvancedMarker 必須有 MapId
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

  // 監聽 Input 變化並手動更新標記內容
  ngOnChanges(changes: SimpleChanges) {
    // 加上 apiLoadedSubject 的狀態檢查
    if (changes['locations'] && this.markerComponents && this.apiLoadedSubject.value) {
      // 延遲一個微任務，確保 Google Maps 實例已掛載
      Promise.resolve().then(() => this.updateMarkerContent());
    }
  }

  private updateMarkerContent() {
    if (!this.locations || !this.markerComponents) return;

    this.markerComponents.forEach((markerComp, index) => {
      const driver = this.locations![index];
      const advancedMarker = markerComp.advancedMarker as google.maps.marker.AdvancedMarkerElement;

      // 💡 檢查 1: 確保 advancedMarker 已經初始化且有內容
      if (advancedMarker && advancedMarker.content instanceof HTMLElement && driver) {
        if (!advancedMarker.content.querySelector('.dot-inner')) {
          const options = this.getAdvancedMarkerOptions(driver.status);
          advancedMarker.content = options.content as HTMLElement;
        }

        const dot = (advancedMarker.content as Element).querySelector('.dot-inner') as HTMLElement;
        if (dot) {
          const newColor = this.getStatusColor(driver.status);
          dot.style.backgroundColor = newColor;
          dot.style.boxShadow = `0 0 15px ${newColor}`;
          const bbb = (advancedMarker.content as Element).querySelector('.dot-inner');
          console.log(
            '正在更新司機:',
            driver.driverName,
            '顏色:',
            newColor,
            '找到 DOM 了嗎:',
            !!bbb
          );
        }

        advancedMarker.position = { lat: driver.lat, lng: driver.lng };
      }
    });
    this.cdr.markForCheck();
  }

  // 抽離顏色邏輯
  private getStatusColor(status: string): string {
    if (status === 'warning') return '#f87171';
    if (status === 'idle') return '#fbbf24';
    return '#38bdf8';
  }

  ngAfterViewInit() {
    this.markerComponents.changes.subscribe(() => {
      this.bindMarkerEvents();

      this.markerComponents.forEach((markerComp, index) => {
        const driver = this.locations?.[index];
        const advancedMarker =
          markerComp.advancedMarker as google.maps.marker.AdvancedMarkerElement;

        if (advancedMarker && !advancedMarker.content && driver) {
          const options = this.getAdvancedMarkerOptions(driver.status);
          advancedMarker.content = options.content as HTMLElement;
        }
      });

      this.updateMarkerContent();
    });
  }

  // Google Maps Marker 點擊事件綁定
  private bindMarkerEvents() {
    // 清除舊的監聽
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
    const color = this.getStatusColor(status);
    const glyph = document.createElement('div');
    glyph.className = 'custom-marker-wrapper';

    glyph.innerHTML = `
  <div class="dot-inner" style="
    width: 16px; height: 16px; background-color: ${color}; 
    border: 2px solid #fff; border-radius: 50%; box-shadow: 0 0 15px ${color};
    transition: background-color 0.3s ease;
  "></div>
`;

    return { content: glyph };
  }

  ngOnDestroy() {
    this.markerSubscriptions.forEach((s) => s.unsubscribe());
  }
}
