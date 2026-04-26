# CrisisX AI - Testing Guide

## Quick Start

The app is fully functional and ready to test. Start by clicking buttons to navigate through the flows.

## Testing Checklist

### Home Screen Tests
- [ ] SOS button has red pulsing glow effect
- [ ] Two action buttons are visible and clickable
- [ ] Status bar shows Location ON and Network OK
- [ ] Responsive on mobile viewport

### SOS Caller Flow
1. **Click SOS Button**
   - [ ] Navigate to countdown screen
   - [ ] Countdown starts at 10 and decrements
   - [ ] "Send Now" button skips countdown
   - [ ] "Cancel" button enabled (first 5 seconds)
   - [ ] "Cancel" button disabled after 5 seconds
   - [ ] Countdown reaches 0 automatically

2. **Countdown Auto-Transition**
   - [ ] Responder count increments (0 → 8)
   - [ ] Auto-navigate to Alert Sent after 2 seconds
   - [ ] Animations smooth with no jumps

3. **Alert Sent Screen**
   - [ ] Map placeholder shows location pin
   - [ ] Responder count shows final number (8)
   - [ ] ETA starts at 2m 15s (135 seconds)
   - [ ] ETA decrements by 1 second every second
   - [ ] Status messages display correctly
   - [ ] "Call Emergency Contact" button visible
   - [ ] Slide-up animation on entrance

### Volunteer Responder Flow
1. **Click "Help Someone Nearby"**
   - [ ] Navigate to Volunteer Alert screen
   - [ ] Alert card displays with emoji bounce
   - [ ] Emergency details visible (300m, 2-3 mins, etc.)
   - [ ] "Accept" button highlighted
   - [ ] "Decline" button available

2. **Accept Alert**
   - [ ] Navigate to Navigation screen
   - [ ] Map shows route with start (green) and end (red)
   - [ ] Turn-by-turn directions displayed
   - [ ] Distance and time estimates shown
   - [ ] "I've Reached the Scene" button visible

3. **Navigation Screen**
   - [ ] Route line visible between start and destination
   - [ ] "I've Reached" button triggers guidance screen
   - [ ] Slide-up animation on entrance

4. **On-Scene Guidance**
   - [ ] 4 emergency response steps visible
   - [ ] Progress bar at 0 of 4
   - [ ] Click each step to check off
   - [ ] Checkmarks appear on completed steps
   - [ ] Progress bar fills as steps complete
   - [ ] "Return to Home" button disabled until all complete
   - [ ] "Return to Home" button turns green when all done
   - [ ] Can complete steps in any order

### Visual & Animation Tests
- [ ] SOS button glows/pulses continuously
- [ ] Countdown number pulses while counting
- [ ] Countdown spinner rotates
- [ ] Responders increment smoothly (not all at once)
- [ ] ETA counts down in real-time
- [ ] All screen transitions slide up from bottom
- [ ] All buttons have hover state
- [ ] All buttons have click/active state
- [ ] No horizontal scrolling on any screen
- [ ] All text readable on mobile

### Responsive Design Tests
- [ ] Test on mobile viewport (375px width)
- [ ] Test on tablet viewport (768px width)
- [ ] Test on desktop viewport (1024px width)
- [ ] All buttons remain thumb-friendly (min 44px tall)
- [ ] No content cut off at any viewport
- [ ] Status bar doesn't overflow
- [ ] Cards properly padded and readable

### Color & Contrast Tests
- [ ] Red (#ff0000) SOS button contrasts well
- [ ] White text (#fafafa) readable on black background
- [ ] Green (#22c55e) success state clear
- [ ] All text meets WCAG AA contrast requirements
- [ ] Dark theme applied consistently

### State Management Tests
1. **Context State**
   - [ ] Current screen updates correctly when navigating
   - [ ] User role changes between "caller" and "volunteer"
   - [ ] Responder count persists and animates
   - [ ] ETA updates continuously

2. **Navigation Back to Home**
   - [ ] Cancel on countdown returns to home
   - [ ] Decline on alert returns to home
   - [ ] Return to Home on guidance returns to home
   - [ ] Home state resets for new flow

### Button Interaction Tests
- [ ] All buttons clickable
- [ ] Active state visible on click
- [ ] Hover states smooth
- [ ] Disabled buttons not clickable
- [ ] Disabled buttons have visual indicator
- [ ] No console errors on interactions

### Text & Copy Tests
- [ ] "SOS Alert" clearly labeled
- [ ] Countdown instructions clear
- [ ] "Help is on the way" message reassuring
- [ ] Emergency response steps are clear and actionable
- [ ] No typos or grammatical errors
- [ ] Minimal text throughout (icon-driven)

## Manual Flow Testing

### Complete SOS Caller Path
```
Home → SOS → Countdown (10s) → Alert Sent (2m 15s ETA) → (Call Contact)
```
**Time**: ~12 seconds

### Complete Volunteer Responder Path
```
Home → Help Nearby → Accept → Navigation → I've Reached → 
Guidance → Check All 4 Steps → Return to Home
```
**Time**: ~30 seconds (includes manual step completion)

### Rapid Interaction Test
- [ ] Click SOS, immediately click Send Now
- [ ] Responders should increment to 8
- [ ] Auto-navigate after 2s
- [ ] No lag or janky animations

### Keyboard Navigation (if applicable)
- [ ] Tab through all buttons
- [ ] Enter/Space activates buttons
- [ ] Proper focus indicators
- [ ] Tab order logical and predictable

## Performance Checklist
- [ ] No console errors
- [ ] Animations are smooth (60fps)
- [ ] No memory leaks on repeated flows
- [ ] App responds instantly to clicks
- [ ] No lag during transitions
- [ ] Countdown timer accurate
- [ ] ETA countdown accurate

## Browser Compatibility
Test on:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Accessibility Tests
- [ ] Screen reader can announce buttons
- [ ] Color not sole means of conveying information
- [ ] Text is at least 14px
- [ ] Touch targets at least 44px × 44px
- [ ] Focus indicators visible
- [ ] Animations respect prefers-reduced-motion

## Demo Talking Points

1. **Design Under Stress**
   - Minimal interface with only critical actions
   - Large, clear buttons (thumb-friendly)
   - High contrast red for emergency
   - No unnecessary information

2. **Real Interactions**
   - Countdown actually counts down
   - Responder count increments in real-time
   - ETA updates every second
   - All screens fully functional and linked

3. **Two Complete Flows**
   - Caller: SOS → Dispatch → Help incoming
   - Responder: Alert → Navigate → Assist

4. **Production-Ready Code**
   - TypeScript for type safety
   - React Context for state management
   - Tailwind CSS for styling
   - Proper component structure
   - Optimized animations

---

**Expected Test Duration**: 5-10 minutes for complete flow
**Expected Demo Duration**: 2-3 minutes for full presentation
