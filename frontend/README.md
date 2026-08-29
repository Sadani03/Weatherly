# Fidenz Weather Analytics

A full-stack weather analytics application developed for the Fidenz Technologies Full Stack Software Engineering Internship assignment.

The application retrieves live weather data from OpenWeatherMap, calculates a custom **Comfort Index (0–100)** for each city, and ranks cities from most comfortable to least comfortable.

The dashboard is protected using **Auth0 authentication and Multi-Factor Authentication (MFA)** and includes five-minute weather-data caching to reduce unnecessary external API requests.

---

## Features

- Live weather data using OpenWeatherMap
- Weather analytics for 10 cities
- Custom Comfort Index from 0–100
- Automatic city ranking based on comfort
- Temperature, humidity, wind speed and cloudiness analysis
- Five-minute raw weather API caching
- Processed weather-data caching
- Cache HIT/MISS debug endpoint
- Auth0 authentication
- Restricted public signup
- Multi-Factor Authentication (MFA)
- Responsive desktop and mobile interface
- Dark and light modes
- Sort by rank, comfort score and temperature
- Manual weather refresh
- About page explaining the Comfort Index
- Unit tests for Comfort Index calculations

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Auth0
- next-themes
- Lucide React
- DotLottie

### Backend

- Node.js
- Express.js
- TypeScript
- Axios
- NodeCache
- Vitest

### External Services

- OpenWeatherMap API
- Auth0

---

## Project Structure

```text
fidenz-weather-analytics/
│
├── frontend/
│   ├── app/
│   │   ├── about/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StatCard.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── WeatherLogo.tsx
│   │   └── WeatherTable.tsx
│   │
│   ├── lib/
│   │   ├── auth0.ts
│   │   └── weather-api.ts
│   │
│   ├── public/
│   │   └── animations/
│   │
│   ├── types/
│   │   └── weather.ts
│   │
│   └── proxy.ts
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── data/
│   │   │   └── cities.json
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   │   ├── comfort-index.ts
│   │   │   └── comfort-index.test.ts
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   └── package.json
│
└── README.md
```

---

# Comfort Index

The application calculates a custom **Comfort Index between 0 and 100**.

A higher score represents weather conditions closer to the selected ideal comfort conditions.

The index currently uses four weather parameters:

| Parameter | Weight | Ideal Value |
|---|---:|---:|
| Temperature | 40% | 22°C |
| Humidity | 25% | 50% |
| Wind Speed | 20% | 3 m/s |
| Cloudiness | 15% | 30% |

The weights total **100%**.

---

## Parameter Scores

Each parameter is first converted into an individual score between 0 and 100.

### Temperature

Ideal temperature:

```text
22°C
```

Formula:

```text
Temperature Score =
clamp(100 - |temperature - 22| × 6)
```

Temperature receives the highest weight because it has a strong direct impact on perceived outdoor comfort.

---

### Humidity

Ideal humidity:

```text
50%
```

Formula:

```text
Humidity Score =
clamp(100 - |humidity - 50| × 2)
```

Humidity receives the second-highest weighting because high or very low humidity can significantly affect how comfortable a temperature feels.

---

### Wind Speed

Ideal wind speed:

```text
3 m/s
```

Formula:

```text
Wind Score =
clamp(100 - |windSpeed - 3| × 12)
```

A moderate amount of wind can improve comfort, while strong wind can make conditions less comfortable.

---

### Cloudiness

Ideal cloudiness:

```text
30%
```

Formula:

```text
Cloud Score =
clamp(100 - |cloudiness - 30|)
```

Cloudiness has the lowest weighting because it influences comfort but generally has less direct impact than temperature, humidity and wind.

---

## Final Comfort Index Formula

The final score is calculated using:

```text
Comfort Index =
(Temperature Score × 0.40)
+ (Humidity Score × 0.25)
+ (Wind Score × 0.20)
+ (Cloud Score × 0.15)
```

The result is rounded and constrained between:

```text
0 ≤ Comfort Index ≤ 100
```

Cities are then sorted from highest Comfort Index to lowest Comfort Index.

The city with the highest score receives rank **1**.

---

# Weather Data

Weather information is retrieved using the OpenWeatherMap Current Weather API.

The backend requests weather data using each city's CityCode.

Conceptually:

```text
GET /data/2.5/weather?id={CITY_CODE}&appid={API_KEY}
```

Metric units are requested so temperatures are returned in Celsius.

The application processes:

- City name
- Country
- Temperature
- Feels-like temperature
- Humidity
- Pressure
- Wind speed
- Cloudiness
- Visibility
- Weather description
- Weather icon

---

# Cities

The application monitors 10 cities:

1. Colombo
2. Tokyo
3. Liverpool
4. Paris
5. Sydney
6. Boston
7. Shanghai
8. Oslo
9. London
10. New York

City codes are stored in:

```text
backend/src/data/cities.json
```

The application reads the city codes from this file instead of hardcoding them inside the weather service.

---

# Caching Strategy

Weather API responses are cached for:

```text
5 minutes / 300 seconds
```

The application uses **NodeCache** for in-memory caching.

Two levels of caching are used.

## Raw Weather Cache

Each OpenWeatherMap response is cached using the corresponding city code.

Example cache key:

```text
raw-weather:1248991
```

If the raw response exists in the cache, the backend uses it rather than sending another request to OpenWeatherMap.

This reduces:

- External API requests
- API latency
- OpenWeatherMap usage
- Risk of exceeding API limits

---

## Processed Weather Cache

The final processed and ranked weather dataset is also cached.

This means repeated dashboard requests within the cache period can return the already-calculated rankings immediately.

---

## Cache Debug Endpoint

Cache state can be inspected using:

```text
GET /api/cache/status
```

Example:

```json
{
  "processed": {
    "status": "HIT",
    "cached": true,
    "ttlSeconds": 300
  }
}
```

A **MISS** indicates that weather data must be retrieved and processed.

A **HIT** indicates that cached data is available.

---

# Authentication and Security

Authentication is implemented using **Auth0**.

The dashboard is available only to authenticated users.

The application uses:

- Auth0 Universal Login
- Protected Next.js routes
- Restricted database signup
- Pre-approved users
- Multi-Factor Authentication
- Email MFA support
- One-Time Password MFA support

Public database signup is disabled so accounts cannot be created freely through the authentication interface.

MFA is configured with the **Always** policy.

> Authentication credentials and Auth0 secrets are never stored in the repository.

---

# API Endpoints

## Health Check

```http
GET /api/health
```

Used to verify that the backend API is running.

---

## Weather

```http
GET /api/weather
```

Returns the processed and ranked weather data.

Example response structure:

```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "city": "Example City",
      "country": "XX",
      "temperature": 22,
      "description": "clear sky",
      "comfortIndex": 90,
      "rank": 1
    }
  ]
}
```

---

## Cache Status

```http
GET /api/cache/status
```

Provides debugging information about processed and raw weather caches.

---

# Local Setup

## Prerequisites

Install:

- Node.js
- npm
- Git

You will also need:

- OpenWeatherMap account/API key
- Auth0 account/application

---

## 1. Clone the Repository

```bash
git clone <repository-url>
```

Then:

```bash
cd fidenz-weather-analytics
```

---

## 2. Backend Setup

Navigate to:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create:

```text
backend/.env
```

Add:

```env
PORT=5001
OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY
```

Start the backend:

```bash
npm run dev
```

The backend runs at:

```text
http://localhost:5001
```

Test:

```text
http://localhost:5001/api/health
```

---

## 3. Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
frontend/.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001

AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
AUTH0_CLIENT_ID=YOUR_AUTH0_CLIENT_ID
AUTH0_CLIENT_SECRET=YOUR_AUTH0_CLIENT_SECRET
AUTH0_SECRET=YOUR_GENERATED_SECRET
APP_BASE_URL=http://localhost:3000
```

Generate an Auth0 session secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Start the frontend:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# Auth0 Configuration

Create an Auth0 **Regular Web Application**.

For local development configure:

### Allowed Callback URLs

```text
http://localhost:3000/auth/callback
```

### Allowed Logout URLs

```text
http://localhost:3000
```

### Allowed Web Origins

```text
http://localhost:3000
```

Disable public database signups and manually create approved users.

Configure MFA under:

```text
Security → Multi-factor Auth
```

Enable the required MFA factors and set the MFA policy to:

```text
Always
```

---

# Testing

Backend unit tests are implemented using **Vitest**.

Run:

```bash
cd backend
npm test
```

The Comfort Index tests validate:

- Ideal weather conditions
- Expected weighted calculations
- Uncomfortable weather conditions
- Maximum score boundary
- Minimum score boundary
- Temperature penalties
- Humidity penalties
- Wind penalties

Build the backend with:

```bash
npm run build
```

For the frontend:

```bash
cd frontend
npm run lint
npm run build
```

---

# Responsive Design

The interface is designed for both desktop and mobile devices.

Desktop includes a persistent sidebar, while smaller screens use a mobile navigation menu.

The weather table supports horizontal scrolling on smaller screens to preserve readability.

---

# Additional Features

The application includes several features beyond the core requirements:

- Dark mode
- Responsive mobile navigation
- Sorting
- Manual weather refresh
- Animated weather branding
- Comfort Index visualization
- Unit testing
- About page

---

# Trade-offs

## In-Memory Cache

NodeCache was selected because it provides a lightweight solution for the assignment and does not require additional infrastructure.

For a distributed production deployment, Redis would be more appropriate because multiple backend instances could share the same cache.

## Comfort Index

The Comfort Index is intentionally understandable and easy to modify.

It uses weighted heuristic scoring rather than a machine-learning model. This makes the calculation transparent and allows parameters and weights to be changed quickly.

## Authentication

Auth0 was used rather than implementing authentication from scratch. This reduces security risk and provides established authentication and MFA functionality.

---

# Limitations

- The Comfort Index is a custom heuristic and is not an official meteorological comfort standard.
- Weather conditions may change during the five-minute cache period.
- The current cache is stored in application memory and is reset when the backend restarts.
- Comfort preferences vary between individuals and regions.
- OpenWeatherMap API availability and rate limits affect live data retrieval.
- Local development requires separate frontend and backend processes.

---

# Future Improvements

Possible production improvements include:

- Redis distributed caching
- Historical weather analytics
- Additional visualization charts
- User-specific comfort preferences
- Improved API-level authorization
- Persistent analytics storage
- Automated integration tests

---

# Author

Developed as part of the **Fidenz Technologies Full Stack Software Engineering Internship Assignment**.