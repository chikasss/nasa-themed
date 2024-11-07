
# Space-themed Nasa APIs App

## Description
This is Space-themed application which user can explore various NASA datasets through APIs which are APOD (Astronomy Picture Of the Day), Mars Rover Photo and Asteroid NeoWs.

## Built With

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Set up

make a repo

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Key function

### Homepage /
On search function, user can search
- Keyword for APOD
- Date for Mars Rover Photos taken
- Date for Asteroid

### APOD (Astronomy Picture of the Day) /apod
Astronomy Picture of the Day appear on this page.
User can search previous picture picking the day on calendar.

### Mars Rover Photos /mars
User can search by combination of rover name which are Curiosity, Opportunity, and Spirit, Camera Type and Earth date.

e.g.
Rover name: Curiosity
Camera Type: Front Hazard Avoidance Camera
Date: 2021-10-01

### Asteroids - NeoWs (Near Earth Object Web Service) /asteroids
User can search near earth Asteroid information by selecting start date and end date.
Date range should be one week.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
