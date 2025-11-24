# Music Player App - AI Coding Assistant Guide

## Project Overview
Simple client-side music player built with jQuery and vanilla HTML5 audio API. Deployed on IIS (see `web.config`).

## Architecture

### File Structure
- **`index.html`** - Main entry point with audio player UI and control buttons
- **`script.js`** - Active implementation with full features (loop, playlist, rain button)
- **`script1.js`** - Legacy/simplified version without loop functionality
- **`style.css`** - Player styling with centered layout
- **`web.config`** - IIS server configuration

### Key Components
1. **Tracks Array**: Hardcoded playlist in `script.js` with `{title, src}` objects
2. **Audio Controls**: Custom buttons wrapping HTML5 `<audio>` element
3. **Dynamic Playlist**: `#listsong` ul populated from tracks array with clickable items

## Critical Patterns

### Track Management
```javascript
var tracks = [
    { title: "rain-sound 15minutes", src: "rain-sound 15minutes.mp3" },
    // ...
];
var currentTrack = 0; // Index-based navigation
```
- Tracks are **zero-indexed**
- Files referenced by relative paths (must exist in root directory)
- No validation for missing audio files

### State Management
```javascript
var isLooping = false; // Loop state
currentTrack = (currentTrack + 1) % tracks.length; // Circular navigation
```
- All state lives in closure scope of `$(document).ready()`
- Loop toggles affect `ended` event handler behavior
- No persistence - state resets on page reload

### Event Handling
- **Direct audio controls**: `audio.play()`, `audio.pause()` on native element
- **jQuery event binding**: `$('#btn').click()` for all buttons
- **Playlist clicks**: Use custom `indexs` attribute (note: non-standard attribute, should use `data-indexs`)
- **Auto-advance**: `audio.addEventListener('ended')` handles next track or loop

### UI Updates
```javascript
function updateTrack() {
    $('#audio-source').attr('src', tracks[currentTrack].src);
    $('#track-title').text(tracks[currentTrack].title);
    audio.load(); // Required after src change
    audio.play();
}
```
- **Always call `audio.load()`** after changing source before playing
- Track title syncs with `#track-title` span
- No visual indication of currently playing track in playlist

## Development Workflow

### Adding New Songs
1. Place `.mp3` files in root directory
2. Add entries to `tracks` array in `script.js`
3. Playlist UI auto-generates from array

### Testing
- Open `index.html` directly in browser (client-side only)
- No build step or dependencies beyond jQuery CDN
- Test with dev tools console for errors

### Deployment
- IIS hosting configured via `web.config`
- Ensure `index.html` is default document
- Audio files must be in same directory as HTML

## Common Issues & Quirks

### Non-Standard Attribute
- `<li class='asong' indexs="+i+">` uses `indexs` instead of `data-indexs`
- Works but not HTML5 compliant

### Script File Confusion
- `script.js` is the **active version** (loaded in HTML)
- `script1.js` exists but is **not referenced** - likely old version or backup
- When updating functionality, modify `script.js` only

### Rain Button Special Behavior
```javascript
$('#rain-btn').click(function () {
    currentTrack = 0; // Hardcoded to first track
    updateTrack();
});
```
- Assumes first track (index 0) is always rain sound
- No validation if tracks array changes

## Conventions
- Vietnamese song titles in tracks array
- jQuery DOM manipulation over vanilla JS
- Comments in Vietnamese: "mua roi" (rain), "Trạng thái loop" (loop state)
- Inline event handlers, no event delegation
- No ES6+ features (uses `var`, not `const`/`let`)
