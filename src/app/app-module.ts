import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './navbar/navbar';
import { Home } from './home/home';
import { Dashboard } from './dashboard/dashboard';
import { DataOverview } from './dashboard/component/data-overview/data-overview';
import { ActivityStream } from './dashboard/component/activity-stream/activity-stream';
import { FleetTracking } from './dashboard/component/fleet-tracking/fleet-tracking';
import { AnalyticsInsights } from './dashboard/component/analytics-insights/analytics-insights';
import { Contact } from './contact/contact';
import { ResourceScheduler } from './dashboard/component/resource-scheduler/resource-scheduler';

@NgModule({
  declarations: [
    App,
    Navbar,
    Home,
    Dashboard,
    DataOverview,
    ActivityStream,
    FleetTracking,
    AnalyticsInsights,
    Contact,
    ResourceScheduler,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
