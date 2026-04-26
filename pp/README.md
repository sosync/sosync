# CrisisX AI - Emergency Response Platform

A fast, minimal, high-clarity emergency response app designed to work under stress. Fully clickable prototype with realistic flow and animations.

## Features

### For Emergency Callers
- **Instant SOS Button** - Large, pulsing red button on the home screen with glowing effect
- **10-Second Countdown** - Configurable delay with "Send Now" and "Cancel" options
- **Live Status** - Real-time responder count and ETA
- **Location Sharing** - Automatic location sharing with emergency contacts and responders
- **Call Support** - Emergency contact button for direct communication

### For Volunteers/Responders
- **Alert Notifications** - Get notified of nearby emergencies within 300m radius
- **Accept/Decline** - Quick action buttons to respond to emergencies
- **Navigation** - Turn-by-turn directions to the emergency scene
- **On-Scene Guidance** - Step-by-step instructions for emergency response:
  - Call ambulance
  - Check breathing
  - Stop bleeding
  - Apply first aid

## Design System

- **Dark Theme** - Black (#0f0f0f) background with white (#fafafa) text
- **High Contrast** - Bright red (#ff0000) for emergencies, green (#22c55e) for success
- **Thumb-Friendly** - Large buttons (60x60px minimum), minimal scrolling
- **Icon-Driven** - Emoji icons for quick visual recognition
- **Minimal Text** - Clear, short instructions under stress

## Interactive Flows

### Flow 1: Trigger SOS (Caller)
1. Home Screen → Click SOS button
2. SOS Countdown → Automatic countdown to alert dispatch
3. Alert Sent → Real-time status of responders arriving
4. Can call emergency contact

### Flow 2: Respond to Emergency (Volunteer)
1. Home Screen → Click "Help Someone Nearby"
2. Volunteer Alert → See emergency details, distance, responders
3. Accept Alert → Navigate to emergency
4. Navigation → Follow turn-by-turn directions
5. On-Scene → Check off emergency response steps

## Animations

- **SOS Pulse** - Glowing red pulse effect with scale animation (2s infinite)
- **Countdown** - Pulsing opacity on countdown numbers
- **Slide-Up** - Screen transitions slide up from bottom
- **Responder Animation** - Responder count increments in real-time
- **ETA Countdown** - Live countdown to emergency arrival

## Technology

- **Next.js 16** - App Router, Server/Client Components
- **React 19** - State management with Context API
- **Tailwind CSS** - Utility-first styling with custom theme
- **TypeScript** - Type-safe components and state

## Color Palette

- **Background**: #0f0f0f (deep black)
- **Foreground**: #fafafa (off-white)
- **Primary**: #ff0000 (emergency red)
- **Primary Dark**: #cc0000 (dark red hover)
- **Secondary**: #404040 (dark gray)
- **Accent**: #666666 (medium gray)
- **Success**: #22c55e (green)
- **Text Secondary**: #b3b3b3 (light gray)

## How to Use

1. Click the **SOS** button to trigger an emergency alert
2. Wait 10 seconds or click "Send Now" to immediately dispatch
3. Track responders arriving with real-time updates
4. Or click **"Help Someone Nearby"** to become a volunteer responder
5. Accept alerts and navigate to emergency scenes
6. Follow step-by-step guidance for emergency response

## Responsive Design

- Mobile-first layout optimized for smartphones
- Full viewport utilization with no horizontal scroll
- Touch-friendly with active state feedback
- Viewport locked to prevent zoom (emergency UX requirement)

## State Management

- **CrisisContext** - Global state for screen navigation, user role, responder count, ETA
- **Local State** - Component-level state for UI elements (countdown, steps completion)
- **Mock Data** - Simulated responders, locations, and ETAs

---

Built for speed and clarity under emergency situations.
