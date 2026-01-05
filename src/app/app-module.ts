import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './navbar/navbar';
import { Home } from './home/home';
import { DashboardComponent } from './dashboard/dashboard';
import { DataOverview } from './dashboard/component/data-overview/data-overview';
import { ActivityStream } from './dashboard/component/activity-stream/activity-stream';
import { FleetTracking } from './dashboard/component/fleet-tracking/fleet-tracking';
import { AnalyticsInsights } from './dashboard/component/analytics-insights/analytics-insights';
import { Contact } from './contact/contact';
import { ResourceScheduler } from './dashboard/component/resource-scheduler/resource-scheduler';
import { environment } from './environments/environment';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';

@NgModule({
  declarations: [
    App,
    Navbar,
    Home,
    DashboardComponent,
    DataOverview,
    ActivityStream,
    FleetTracking,
    AnalyticsInsights,
    Contact,
    ResourceScheduler,
  ],
  imports: [BrowserModule, AppRoutingModule, GoogleMapsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withJsonpSupport()),
    { provide: 'GOOGLE_MAPS_API_KEY', useValue: environment.googleApiKey },
  ],
  bootstrap: [App],
})
export class AppModule {}
