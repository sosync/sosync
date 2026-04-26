# CrisisX AI - Screen Flow Map

## Complete Interactive Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          HOME SCREEN                                    │
│                                                                         │
│                      📍 Location ON    📡 Network OK                    │
│                                                                         │
│                         CrisisX AI                                      │
│                   Emergency Response Platform                          │
│                                                                         │
│                    ┌─────────────────┐                                 │
│                    │       SOS       │  ← Glowing Pulse               │
│                    │     (RED)       │    (2s infinite)               │
│                    └─────────────────┘                                 │
│                                                                         │
│              ┌──────────────────────────────┐                          │
│              │      I Need Help             │                          │
│              └──────────────────────────────┘                          │
│              ┌──────────────────────────────┐                          │
│              │   Help Someone Nearby       │                          │
│              └──────────────────────────────┘                          │
│                                                                         │
│    For life-threatening emergencies, always call 911                   │
└─────────────────────────────────────────────────────────────────────────┘
                              ↓ (Click SOS)
┌─────────────────────────────────────────────────────────────────────────┐
│                      SOS COUNTDOWN SCREEN                               │
│                                                                         │
│                     SOS Alert                                          │
│            Sending emergency alert...                                  │
│                                                                         │
│                    ┌─────────────────┐                                 │
│                    │       10        │  ← Count-down pulse             │
│                    │    seconds      │  Spinning border                │
│                    └─────────────────┘                                 │
│                                                                         │
│  Your location and emergency contact info are being shared with        │
│  nearby responders                                                     │
│                                                                         │
│              ┌──────────────────────────────┐                          │
│              │       Send Now               │ (RED)                    │
│              └──────────────────────────────┘                          │
│              ┌──────────────────────────────┐                          │
│              │       Cancel                 │ (Disable after 5s)       │
│              └──────────────────────────────┘                          │
│                                                                         │
│          Auto-redirect to Alert Sent after countdown                   │
└─────────────────────────────────────────────────────────────────────────┘
                         ↓ (Auto after 10s)
┌─────────────────────────────────────────────────────────────────────────┐
│                       ALERT SENT SCREEN                                 │
│                                                                         │
│                    Alert Sent! (GREEN)                                 │
│                     Help is on the way                                 │
│                                                                         │
│            ┌──────────────────────────────┐                            │
│            │                              │                            │
│            │  📍 Map with Location Pin    │ (Animated pulse)           │
│            │  Your Location               │                            │
│            │                              │                            │
│            └──────────────────────────────┘                            │
│                                                                         │
│          ┌─────────────────┐  ┌─────────────────┐                      │
│          │        8        │  │    2m 15s       │                      │
│          │   Responders    │  │  Est. Arrival   │                      │
│          │   Notified      │  │  (Countdown)    │                      │
│          └─────────────────┘  └─────────────────┘                      │
│                                                                         │
│         ✓ 📍 Location shared with responders                           │
│         ✓ 🔔 Emergency contacts notified                               │
│         ✓ 📱 Your location is being tracked                            │
│                                                                         │
│              ┌──────────────────────────────┐                          │
│              │ Call Emergency Contact       │ (RED)                    │
│              └──────────────────────────────┘                          │
│                                                                         │
│      Stay calm. Help is on the way. Keep your phone nearby.            │
└─────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════

ALTERNATIVE FLOW: VOLUNTEER RESPONDER

┌─────────────────────────────────────────────────────────────────────────┐
│                          HOME SCREEN                                    │
│                                                                         │
│                    ┌──────────────────────────────┐                     │
│                    │   Help Someone Nearby       │                     │
│                    └──────────────────────────────┘ ← Click here        │
└─────────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                    VOLUNTEER ALERT SCREEN                               │
│                                                                         │
│                         🚨 (Bounce)                                     │
│                    Emergency Nearby                                    │
│                      300 meters away                                   │
│               Medical assistance needed                                │
│                                                                         │
│     ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐
│     │      ⏱️      │  │      📍     │  │      🚗     │  │      👥      │
│     │  Response   │  │  Distance   │  │  Vehicles   │  │ Responders   │
│     │   2-3 mins  │  │    300m     │  │  4 Active   │  │  2 Nearby    │
│     └─────────────┘  └─────────────┘  └─────────────┘  └──────────────┘
│                                                                         │
│        Your help could save a life. Accept to receive                 │
│         navigation to the scene.                                       │
│                                                                         │
│              ┌──────────────────────────────┐                          │
│              │       Accept                 │ (GREEN)                  │
│              └──────────────────────────────┘                          │
│              ┌──────────────────────────────┐                          │
│              │       Decline                │ (GRAY)                   │
│              └──────────────────────────────┘                          │
│                                                                         │
│    By accepting, you agree to provide assistance and follow            │
│    emergency protocols.                                                │
└─────────────────────────────────────────────────────────────────────────┘
                         ↓ (Click Accept)
┌─────────────────────────────────────────────────────────────────────────┐
│                      NAVIGATION SCREEN                                  │
│                                                                         │
│              Navigate to Emergency                                     │
│                Follow the route below                                  │
│                                                                         │
│            ┌──────────────────────────────┐                            │
│            │                              │                            │
│            │  🟢 You  ←→ Route ↗️         │ (You on Green,             │
│            │            Red Pulse         │  Scene on Red pulse)       │
│            │                 🔴 Scene     │                            │
│            │                              │                            │
│            └──────────────────────────────┘                            │
│                                                                         │
│         ┌────────────────────────────────────────┐                     │
│         │  ↗️  Continue Northeast                 │                     │
│         │      280 meters                        │                     │
│         └────────────────────────────────────────┘                     │
│         ┌────────────────────────────────────────┐                     │
│         │  🚗 Turn Right on Main St               │                     │
│         │     Follow the arrows                  │                     │
│         └────────────────────────────────────────┘                     │
│         ┌────────────────────────────────────────┐                     │
│         │  🏁 Destination on Right                │                     │
│         │     Red marker near traffic light      │                     │
│         └────────────────────────────────────────┘                     │
│                                                                         │
│          ┌─────────────────┐  ┌─────────────────┐                      │
│          │      280m       │  │     3 min       │                      │
│          │   Distance      │  │ Estimated Time  │                      │
│          └─────────────────┘  └─────────────────┘                      │
│                                                                         │
│              ┌──────────────────────────────┐                          │
│              │ I've Reached the Scene       │ (GREEN)                  │
│              └──────────────────────────────┘                          │
└─────────────────────────────────────────────────────────────────────────┘
                   ↓ (Click I've Reached)
┌─────────────────────────────────────────────────────────────────────────┐
│                    ON-SCENE GUIDANCE SCREEN                             │
│                                                                         │
│                    On-Scene Guidance                                   │
│                    Follow the steps below                              │
│                                                                         │
│                  Progress: 0 of 4                                      │
│                  ▓░░░░░░░░░░░░░░░░░░░░ (Progress bar)                  │
│                                                                         │
│         ┌──────────────────────────────────────┐                       │
│         │ 📞 Call Ambulance                    │ ← Click to check       │
│         │    Alert emergency medical services  │                       │
│         │    immediately                       │                       │
│         └──────────────────────────────────────┘                       │
│         ┌──────────────────────────────────────┐                       │
│         │ 💨 Check Breathing                   │                       │
│         │    Ensure airway is clear, position  │                       │
│         │    recovery                          │                       │
│         └──────────────────────────────────────┘                       │
│         ┌──────────────────────────────────────┐                       │
│         │ 🩸 Stop Bleeding                     │                       │
│         │    Apply pressure with clean cloth,  │                       │
│         │    elevate if possible               │                       │
│         └──────────────────────────────────────┘                       │
│         ┌──────────────────────────────────────┐                       │
│         │ 🧊 Apply First Aid                   │                       │
│         │    Use first aid kit if available,   │                       │
│         │    keep patient calm                 │                       │
│         └──────────────────────────────────────┘                       │
│                                                                         │
│        💡 Tips:                                                        │
│        Keep the person comfortable and conscious. Communicate with    │
│        emergency responders when they arrive.                         │
│                                                                         │
│              ┌──────────────────────────────┐                          │
│              │ Complete All Steps           │ (GRAY - disabled)        │
│              └──────────────────────────────┘                          │
│              ┌──────────────────────────────┐                          │
│              │ Call Support                 │ (GRAY)                   │
│              └──────────────────────────────┘                          │
│                                                                         │
│    (After checking all 4 boxes → Return to Home button turns GREEN)   │
└─────────────────────────────────────────────────────────────────────────┘
                  ↓ (After all steps complete)
                    Return to HOME SCREEN
```

## Key Interactions

### SOS Flow
1. **SOS Button** → Triggers countdown
2. **Countdown Auto-Advances** → After 10s, goes to Alert Sent
3. **Send Now Button** → Skip to Alert Sent immediately
4. **Cancel Button** → Return to home (disabled after 5s)
5. **Responder Count** → Increments every 300ms (simulated)
6. **ETA Countdown** → Decrements every second
7. **Emergency Contact** → Placeholder for calling emergency contact

### Volunteer Flow
1. **Help Someone Nearby** → Shows alert card
2. **Accept** → Navigate to scene
3. **Navigation** → Turn-by-turn with map
4. **I've Reached** → Go to guidance
5. **Steps** → Click each to check off
6. **Progress Bar** → Fills as steps completed
7. **Return to Home** → Only enabled when all complete

## Animation Timings

- **SOS Pulse**: 2000ms infinite (pulse-glow + pulse-scale)
- **Countdown Pulse**: 500ms infinite alternate (count-down)
- **Countdown Spinner**: 2000ms rotation
- **Responder Increment**: 300ms intervals (0-8)
- **ETA Countdown**: 1000ms intervals (decrement)
- **Screen Transitions**: 300ms slide-up ease-out

---

This is a fully-interactive, clickable prototype that demonstrates the complete emergency response platform in both caller and volunteer scenarios.
