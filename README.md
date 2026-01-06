# 資料夾結構

```text
🟣 App Infrastructure
🔵 Model / Interface
🟡 services
🟢 component
🟠 Helper

src/
├── app/
│ ├── 🟢 contact/
│ │ ├── .css
│ │ ├── .html
│ │ ├── .spec.ts
│ │ └── .ts                         app-contact
│ ├── core/
│ │ ├── 🔵 models/
│ │ │ ├── dashboard.model.ts
│ │ │ └── fleet.model.ts
│ │ └── 🟡 services/
│ │   ├── dashboard.service.spec.ts
│ │   ├── dashboard.service.ts
│ │   ├── fleet.service.spec.ts
│ │   └── fleet.service.ts
│ ├── 🟢 dashboard/
│ │ ├── 🟢 data-overview/
│ │ │ ├── .css
│ │ │ ├── .html
│ │ │ ├── .spec.ts
│ │ │ └── .ts                       add-data-overview
│ │ ├── 🟢 activity-stream/
│ │ │ ├── .css
│ │ │ ├── .html
│ │ │ ├── .spec.ts
│ │ │ └── .ts                       app-activity-stream
│ │ ├── 🟢 fleet-tracking/
│ │ │ ├── .css
│ │ │ ├── .html
│ │ │ ├── .spec.ts
│ │ │ └── .ts                       app-fleet-tracking
│ │ ├── 🟢 analytics-insights/
│ │ │ ├── .css
│ │ │ ├── .html
│ │ │ ├── .spec.ts
│ │ │ └── .ts                       app-analytics-insights
│ │ ├── 🟢 resource-scheduler/
│ │ │ ├── .css
│ │ │ ├── .html
│ │ │ ├── .spec.ts
│ │ │ └── .ts                       app-resource-scheduler
│ │ ├── .css
│ │ ├── .html
│ │ ├── .spec.ts
│ │ └── .ts                         app-dashboard
│ ├── 🟠 data/
│ │ ├── activity.ts
│ │ └── driver.ts
│ ├── 🟣 environment
│ │ └── environment.ts
│ ├── 🟢 home/
│ │ ├── css
│ │ ├── html
│ │ ├── spec.ts
│ │ └── ts                          app-home
│ ├── 🟢 navbar/
│ │ ├── .css
│ │ ├── .html
│ │ ├── .spec.ts
│ │ └── .ts                         app-navbar
│ ├── 🟣 app-module.ts
│ ├── 🟣 app-routing-module.ts
│ ├── app.css
│ ├── app.html
│ ├── app.spec.ts
│ └── app.ts                        app-root
├── index.html
├── main.ts
└── style.css
```

## 頁面架構

```text

app-root -----------------> app-home
    \                          \
     \--> router-outlet         \ --------------> app-navbar
                                 \                   \ ------------------------> app-dashboard
                                  \                   \                             \
                                   \                   \ --> app-contact             \ -----> add-data-overview
                                    \ --> router-outlet                               \
                                                                                       \ -----> app-activity-stream
                                                                                        \
                                                                                         \ -----> app-fleet-tracking
                                                                                          \
                                                                                           \ -----> app-analytics-insights
                                                                                            \
                                                                                             \ -----> app-resource-scheduler


models
    \
     \ ---> dashcoard
      \ ---> fleet
       \ ---> activity

services
    \
     \ ---> dashcoard
      \ ---> fleet
       \ ---> activity


```
