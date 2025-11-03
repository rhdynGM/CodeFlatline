# CODE:FLATLINE - Authentication & Profile Flow

## Overview
The game now includes a complete authentication and profile setup system to save game progress and personalize the player experience.

## Flow Sequence

```
Boot Screen → Login Screen → Profile Setup → Mainframe Terminal
```

### 1. Boot Screen
- Displays system initialization messages
- Auto-transitions after 3 seconds
- Checks localStorage for existing user session

### 2. Login Screen
**Features:**
- Email and password authentication
- Toggle between login and registration
- Input validation (email format, required fields)
- Server status display (ONLINE, ping, connected operators)
- Progress saved to localStorage

**Fields:**
- Email Address (required, validated)
- Password (required)

**Storage:**
- `flatline_user_email` - User's email
- `flatline_logged_in` - Login status flag

### 3. Profile Setup
**Features:**
- Profile photo upload (max 5MB, jpg/png/gif)
- Complete profile customization
- Character counter for text fields
- Gender selection buttons
- Profile saved to localStorage

**Fields:**
- Profile Photo (optional, preview before save)
- Nickname* (required, 3-20 characters)
- Status (optional, max 50 characters, e.g., "Online", "AFK", "Busy")
- Bio (optional, max 200 characters)
- Date of Birth (optional, date picker)
- Gender* (required, Male/Female/Other)

**Storage:**
- `flatline_profile` - Complete profile data as JSON

**Profile Data Structure:**
```typescript
interface ProfileData {
  nickname: string;
  bio: string;
  status: string;
  dateOfBirth: string;
  gender: string;
  photoUrl?: string;
}
```

### 4. Mainframe Terminal
- User profile displayed in header (avatar + nickname + status)
- Full access to all game features
- Profile persists across sessions

## Smart Session Management

### First Time Users
1. Boot → Login → Profile Setup → Mainframe

### Returning Users
1. Boot → Mainframe (auto-login with saved profile)

### Partial Session (logged in but no profile)
1. Boot → Profile Setup → Mainframe

## User Profile Display

In the Mainframe Terminal header:
- Avatar/Photo (or default icon)
- Nickname (in cyan)
- Status message (in green, if set)
- Positioned between game title and stats

## Data Persistence

All data is stored in browser localStorage:

```javascript
// Check if user is logged in
const isLoggedIn = localStorage.getItem('flatline_logged_in');

// Get user email
const email = localStorage.getItem('flatline_user_email');

// Get profile data
const profile = JSON.parse(localStorage.getItem('flatline_profile'));
```

## Validation Rules

### Email
- Required field
- Must match email format: `user@domain.com`
- Validated with regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

### Password
- Required field
- No minimum length (can be enhanced later)

### Nickname
- Required field
- Minimum: 3 characters
- Maximum: 20 characters
- Real-time character counter

### Photo Upload
- Maximum file size: 5MB
- Accepted formats: image/* (jpg, png, gif, etc.)
- Preview before submission
- Converted to base64 for storage

### Gender
- Required field
- Options: Male, Female, Other
- Visual button selection

### Bio
- Optional field
- Maximum: 200 characters
- Real-time character counter

### Status
- Optional field
- Maximum: 50 characters

### Date of Birth
- Optional field
- HTML5 date picker
- No age validation

## Error Handling

### Login Screen Errors
- Empty email or password
- Invalid email format
- Displayed in red error box with neon glow

### Profile Setup Errors
- Missing nickname
- Nickname too short (< 3 chars)
- Nickname too long (> 20 chars)
- No gender selected
- Photo too large (> 5MB)
- Invalid file type (not an image)

## UI/UX Features

### Login Screen
- Cyberpunk terminal aesthetic
- Green neon borders and text
- Cyan accent for secondary elements
- Glowing hover effects
- Active state: green background
- Server status indicators

### Profile Setup
- Two-column responsive layout
- Photo upload with preview
- Gender selection buttons (toggle style)
- Character counters for text fields
- Cyan highlight for selected gender
- Green glow effects on focus
- Scrollable for mobile devices

### Mainframe Header
- Compact profile display
- 32x32px avatar
- Border separator from main title
- Fits seamlessly into existing header

## Styling

All screens use consistent cyberpunk terminal styling:
- Black background (#000)
- Green primary (#0f0, rgb(34, 197, 94))
- Cyan accent (#0ff, rgb(6, 182, 212))
- Red error (#f00, rgb(239, 68, 68))
- JetBrains Mono font
- Neon glow effects
- Border animations
- Scanline overlay

## Future Enhancements

Potential additions:
- Backend database integration (Supabase)
- Password strength meter
- Email verification
- Password reset flow
- Social login (Google, Discord)
- Profile editing from settings
- Avatar selection library
- Friend system
- Profile visibility settings
- Achievement badges on profile
- Level/rank display
- Last seen timestamp

## Development Notes

### Component Files
- `/components/screens/LoginScreen.tsx` - Email/password authentication
- `/components/screens/ProfileSetup.tsx` - Complete profile configuration
- `/components/screens/MainTerminal.tsx` - Updated to display user profile
- `/App.tsx` - Flow orchestration and session management

### Dependencies
- lucide-react (User icon)
- React hooks (useState, useRef)
- Browser localStorage API
- FileReader API (photo upload)

### Responsive Design
- Mobile-friendly layouts
- Grid system for form fields
- Scrollable content areas
- Touch-optimized buttons

---

**Build:** 20251103  
**Version:** 2.47.3  
**Status:** ✅ PRODUCTION READY
