import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  ChangeDetectorRef,
  ViewChild,
  ViewChildren,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { MapInfoWindow, MapAdvancedMarker } from '@angular/google-maps';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DriverLocation } from '../../../core/models/fleet.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-fleet-tracking',
  standalone: false,
  templateUrl: './fleet-tracking.html',
  styleUrl: './fleet-tracking.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FleetTracking implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() locations: DriverLocation[] | null = [];
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChildren(MapAdvancedMarker) markerComponents!: QueryList<MapAdvancedMarker>;

  selectedDriver: DriverLocation | null = null;
  center: google.maps.LatLngLiteral = { lat: 25.033, lng: 121.565 };
  zoom = 13;
  mapOptions: google.maps.MapOptions = {
    mapId: '3a772d2e6bfbe585fb86c17d',
    disableDefaultUI: true,
  };

  private apiLoadedSubject = new BehaviorSubject<boolean>(false);
  apiLoaded$ = this.apiLoadedSubject.asObservable();
  private markerSubscriptions: Subscription[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initGoogleMapsApi();
  }

  ngOnChanges(changes: SimpleChanges) {
    // 當數據變動且 API 已載入，同步更新標記
    if (changes['locations'] && this.markerComponents && this.apiLoadedSubject.value) {
      Promise.resolve().then(() => this.updateMarkerContent());
    }
  }

  ngAfterViewInit() {
    // 監聽 Marker 列表變化
    this.markerComponents.changes.subscribe(() => {
      this.bindMarkerEvents();
      this.ensureMarkerContent();
      this.updateMarkerContent();
    });
  }

  ngOnDestroy() {
    this.markerSubscriptions.forEach((s) => s.unsubscribe());
  }

  private ensureMarkerContent() {
    this.markerComponents.forEach((markerComp, index) => {
      const driver = this.locations?.[index];
      const am = markerComp.advancedMarker as google.maps.marker.AdvancedMarkerElement;
      if (am && !am.content && driver) {
        am.content = this.createMarkerDOM(driver.status);
      }
    });
  }

  /** 更新現有標記的顏色與位置 */
  private updateMarkerContent() {
    if (!this.locations || !this.markerComponents) return;

    this.markerComponents.forEach((markerComp, index) => {
      const driver = this.locations![index];
      const am = markerComp.advancedMarker as google.maps.marker.AdvancedMarkerElement;

      if (am && am.content instanceof HTMLElement && driver) {
        const dot = am.content.querySelector('.dot-inner') as HTMLElement;
        if (dot) {
          const newColor = this.getStatusColor(driver.status);
          dot.style.backgroundColor = newColor;
          dot.style.boxShadow = `0 0 15px ${newColor}`;
        }
        // 同步位置
        am.position = { lat: driver.lat, lng: driver.lng };
      }
    });
    this.cdr.markForCheck();
  }

  private bindMarkerEvents() {
    this.markerSubscriptions.forEach((s) => s.unsubscribe());
    this.markerComponents.forEach((markerComp, index) => {
      const driver = this.locations?.[index];
      const am = markerComp.advancedMarker as google.maps.marker.AdvancedMarkerElement;
      if (am && driver) {
        am.addListener('click', () => {
          this.selectedDriver = driver;
          this.infoWindow.open(markerComp);
          this.cdr.markForCheck();
        });
      }
    });
  }

  private getStatusColor(status: string): string {
    const palette: Record<string, string> = {
      warning: '#f87171',
      idle: '#fbbf24',
      active: '#38bdf8',
    };
    return palette[status] || palette['active'];
  }

  private createMarkerDOM(status: string): HTMLElement {
    const color = this.getStatusColor(status);
    const div = document.createElement('div');
    div.className = 'custom-marker-wrapper';
    div.innerHTML = `
      <div class="dot-inner" style="
        width: 16px; height: 16px; background-color: ${color}; 
        border: 2px solid #fff; border-radius: 50%; box-shadow: 0 0 15px ${color};
        transition: background-color 0.3s ease;">
      </div>`;
    return div;
  }

  private initGoogleMapsApi() {
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
    document.head.appendChild(script);
  }
}
