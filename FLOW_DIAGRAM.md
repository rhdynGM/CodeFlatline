# CODE:FLATLINE - User Flow Diagram

## Complete User Journey

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          BOOT SCREEN (3 seconds)                            │
│                                                                             │
│  > INITIALIZING CODE:FLATLINE OS v2.47.3                                   │
│  > LOADING KERNEL MODULES...                                               │
│  > MOUNTING ENCRYPTED FILESYSTEMS...                                       │
│  > CHECKING NETWORK INTERFACES...                                          │
│  > ESTABLISHING SECURE TUNNELS...                                          │
│  > LOADING WEAPON SYSTEMS...                                               │
│  > INITIALIZING MAINFRAME CONNECTION...                                    │
│  > SCANNING FOR HOSTILE INTRUSIONS...                                      │
│  > ALL SYSTEMS NOMINAL                                                     │
│  > WELCOME, OPERATOR                                                       │
│  > BOOTING TERMINAL...                                                     │
│                                                                             │
└───────────────────────────┬─────────────────────────────────────────────────┘
                            │
                            ├─ Check localStorage
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
   No Session      Logged In (No Profile)   Full Session
        │                   │                   │
        │                   │                   │
┌───────▼────────┐  ┌───────▼────────┐  ┌───────▼────────┐
│ LOGIN SCREEN   │  │ PROFILE SETUP  │  │   MAINFRAME    │
│                │  │                │  │   TERMINAL     │
│ • Email        │  │ • Photo        │  │                │
│ • Password     │  │ • Nickname*    │  │ • Towers       │
│ • Register     │  │ • Status       │  │ • System Logs  │
│ • Validation   │  │ • Bio          │  │ • Commands     │
│                │  │ • DOB          │  │ • Quick Nav    │
│                │  │ • Gender*      │  │                │
└───────┬────────┘  └───────┬────────┘  └───────┬────────┘
        │                   │                   │
        │ [LOGIN] ──────────┤                   │
        │                   │                   │
        │                   ▼                   │
        │         ┌──────────────────┐          │
        │         │  PROFILE SETUP   │          │
        │         │                  │          │
        │         │  Save Profile    │          │
        │         │  to localStorage │          │
        │         └─────────┬────────┘          │
        │                   │                   │
        │                   │ [ENTER MAINFRAME] │
        └───────────────────┴───────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │        MAINFRAME TERMINAL             │
        │  ┌─────────────────────────────────┐  │
        │  │ Header with User Profile        │  │
        │  │ [Avatar] Nickname | Status      │  │
        │  └─────────────────────────────────┘  │
        │                                       │
        │  ┌──────────────┬──────────────────┐  │
        │  │ Tower Status │  System Log      │  │
        │  │ • Alpha: 87% │  • Scrolling     │  │
        │  │ • Beta:  92% │  • Real-time     │  │
        │  │              │  • Color-coded   │  │
        │  │ Quick Actions│  Navigation Grid │  │
        │  │ • Deploy     │  • Channels      │  │
        │  │ • Upgrade    │  • Rankings      │  │
        │  │ • Network    │  • Market        │  │
        │  │              │  • Config        │  │
        │  └──────────────┴──────────────────┘  │
        │                                       │
        │  Command Bar: > _                     │
        └───────────────┬───────────────────────┘
                        │
        ┌───────────────┼───────────────────────────────┐
        │               │                               │
        ▼               ▼                               ▼
   [Deploy]        [Upgrade]                      [Settings]
   [Network]       [Market]                       [Channels]
   [Rankings]      [Virus Alert]                  [Flatline]
```

## Session Management Logic

```javascript
// On Boot Complete (after 3 seconds)
const isLoggedIn = localStorage.getItem('flatline_logged_in');
const savedProfile = localStorage.getItem('flatline_profile');

if (isLoggedIn === 'true' && savedProfile) {
  // Scenario A: Returning User with Complete Profile
  → Go directly to MAINFRAME TERMINAL
  → Show navigation
  → Display user profile in header
  
} else if (isLoggedIn === 'true') {
  // Scenario B: Logged in but Missing Profile
  → Go to PROFILE SETUP
  
} else {
  // Scenario C: New User or Logged Out
  → Go to LOGIN SCREEN
}
```

## Data Flow

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   LOGIN     │      │   PROFILE    │      │  MAINFRAME  │
│   SCREEN    │─────>│   SETUP      │─────>│  TERMINAL   │
│             │      │              │      │             │
│ Save:       │      │ Save:        │      │ Read:       │
│ • email     │      │ • nickname   │      │ • email     │
│ • logged_in │      │ • bio        │      │ • profile   │
│             │      │ • status     │      │             │
└─────────────┘      │ • dob        │      └─────────────┘
                     │ • gender     │
                     │ • photoUrl   │
                     └──────────────┘
                            │
                            ▼
                   localStorage Keys:
                   • flatline_user_email
                   • flatline_logged_in
                   • flatline_profile (JSON)
```

## Profile Display in Mainframe

```
┌──────────────────────────────────────────────────────────────────┐
│ Header                                                           │
├──────────────────────────────────────────────────────────────────┤
│ CODE:FLATLINE  │  [📷 Avatar]  UserNickname  │  CREDITS: 2,450  │
│ // MAINFRAME   │        └─ Status: Online    │  THREATS: 1      │
└──────────────────────────────────────────────────────────────────┘
```

## Screen Relationships

```
Boot (auto 3s)
  ↓
Login (manual)
  ↓
Profile Setup (manual)
  ↓
Mainframe Terminal ←─┬─← All other screens return here
  ↓                  │
  ├─→ Deploy Panel ──┤
  ├─→ Upgrade Bench ─┤
  ├─→ Network Grid ──┤
  ├─→ Channel Lobby ─┤
  ├─→ War HUD ───────┤
  ├─→ Leaderboard ───┤
  ├─→ Market ────────┤
  ├─→ Settings ──────┤
  ├─→ Virus Alert ───┤
  └─→ Flatline ──────┴─→ Boot (restart)
```

## Navigation Methods

### From Mainframe Terminal:

1. **Quick Action Buttons**
   - Deploy Units → Deploy Panel
   - Upgrade Bench → Upgrade Bench
   - Network Grid → Network Grid

2. **Navigation Grid**
   - Channels → Channel Lobby
   - Rankings → Leaderboard
   - Market → Trade Market
   - Config → Settings

3. **Command Bar**
   - Type: `deploy` → Deploy Panel
   - Type: `upgrade` → Upgrade Bench
   - Type: `market` → Trade Market
   - Type: `flatline` → Flatline Screen

4. **Alert Triggers**
   - Virus Detected → Virus Alert (auto popup)

### Dev Navigation (Top Right)
- Quick jump to any screen
- Shows current screen
- Hidden until after profile setup

## Validation Flow

```
LOGIN SCREEN
  ├─ Email empty? → Error: "Email and password are required"
  ├─ Password empty? → Error: "Email and password are required"
  ├─ Invalid email format? → Error: "Invalid email format"
  └─ Valid ✓ → Save to localStorage → Go to Profile Setup

PROFILE SETUP
  ├─ Nickname empty? → Error: "Nickname is required"
  ├─ Nickname < 3 chars? → Error: "Nickname must be at least 3 characters"
  ├─ Nickname > 20 chars? → Error: "Nickname must be less than 20 characters"
  ├─ No gender selected? → Error: "Please select your gender"
  ├─ Photo > 5MB? → Error: "Image size must be less than 5MB"
  ├─ Photo not image? → Error: "Please upload an image file"
  └─ Valid ✓ → Save to localStorage → Go to Mainframe Terminal
```

## localStorage Structure

```json
{
  "flatline_logged_in": "true",
  "flatline_user_email": "operator@flatline.net",
  "flatline_profile": {
    "nickname": "CyberOps",
    "bio": "Elite hacker defending the mainframe",
    "status": "Online",
    "dateOfBirth": "1995-06-15",
    "gender": "Male",
    "photoUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
  }
}
```

## Key Features

### Smart Routing
- ✅ Auto-detects returning users
- ✅ Skips login/profile for authenticated sessions
- ✅ Remembers incomplete profiles
- ✅ Seamless user experience

### Data Persistence
- ✅ All data in localStorage
- ✅ Profile survives page refresh
- ✅ No backend required (MVP)
- ✅ Easy to migrate to Supabase later

### User Experience
- ✅ Single flow for new users
- ✅ Fast access for returning users
- ✅ Profile visible everywhere
- ✅ Clear error messages
- ✅ Real-time validation

### Visual Design
- ✅ Consistent cyberpunk aesthetic
- ✅ Neon green/cyan color scheme
- ✅ Scanline overlay effects
- ✅ Terminal font styling
- ✅ Glow effects on interactions

---

**Last Updated:** November 3, 2025  
**Flow Version:** 2.0  
**Status:** ✅ FULLY IMPLEMENTED
