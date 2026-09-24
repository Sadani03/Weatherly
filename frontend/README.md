# Weather Analytics Dashboard

A full-stack weather analytics dashboard that retrieves live weather data from OpenWeatherMap and evaluates cities using a custom Comfort Index.

The application combines real-time weather data, backend processing, caching, authentication, responsive UI, sorting and automated testing into a single dashboard.

## Features

- Live weather data from OpenWeatherMap
- 10 monitored cities
- Custom Comfort Index from 0–100
- Temperature, humidity, wind, cloudiness and visibility analysis
- City comfort ranking
- Average Comfort Index
- Most comfortable city summary
- Weather condition and temperature display
- 5-minute server-side caching
- Cache status/debug endpoint
- Auth0 authentication
- Multi-factor authentication support
- Protected dashboard
- Dark and light mode
- Responsive desktop and mobile interface
- Sorting by rank, comfort score and temperature
- Automated Comfort Index tests
- About page explaining the scoring model

---

## Technology Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Lucide React
- next-themes
- Auth0

### Backend

- Node.js
- Express
- TypeScript
- Axios
- Node-Cache
- Vitest

### External Services

- OpenWeatherMap API
- Auth0

---

## Architecture

The application is divided into a frontend and backend.

```text
                    ┌─────────────────────┐
                    │     Next.js App     │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                               │ HTTP
                               ▼
                    ┌─────────────────────┐
                    │   Express Backend   │
                    │                     │
                    │ Weather Processing  │
                    │ Comfort Calculation │
                    │ Cache Management     │
                    └──────────┬──────────┘
                               │
                               │ API Request
                               ▼
                    ┌─────────────────────┐
                    │   OpenWeatherMap    │
                    │        API          │
                    └─────────────────────┘