# Scientific Calculator Pro

A clean, offline scientific calculator built with React Native and Expo.

## Features
- Basic arithmetic
- Scientific functions: sin, cos, tan, ln, log, square root
- Powers, factorial, percentage, pi and e
- DEG / RAD mode
- Calculation history
- Answer memory
- Dark mobile-first interface
- No account, network permission, or backend required

## Run locally
```bash
npm install
npx expo start
```

## Android production build
```bash
npm install -g eas-cli
eas login
eas build -p android --profile production
```

## Play Store
The production build is an Android App Bundle (`.aab`) suitable for Google Play Console after completing the required store listing, testing, Data Safety, and release steps.
