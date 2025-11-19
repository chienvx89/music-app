## AI Coding Agent Instructions for `music-app`

Purpose: Static browser-based music player served from root with IIS (`web.config`). No build step, no package manager. Keep solutions lightweight and file-based unless explicitly asked to modernize.

### Project Snapshot
- Entry point: `index.html` (audio player UI + buttons) referenced in `web.config` default documents.
- Core logic: `script.js` (active) vs `script1.js` (older/simpler variant – do not duplicate changes there unless requested).
- Styling: `style.css` (local basic layout). `error.html` uses Tailwind via CDN only for error page; do not assume Tailwind elsewhere.
- Assets: MP3 files expected in root alongside HTML/JS/CSS (filenames must match `tracks[].src`).

### Runtime & Deployment
- Served as plain static files; no Node/IIS server code here beyond `web.config` defaults.
- To add a different landing page, update `<defaultDocument>` in `web.config` rather than renaming without config change.
- Avoid introducing bundlers (Webpack/Vite) unless user explicitly opts in.

### JavaScript Patterns (jQuery-centric)
- Initialization pattern: single `$(document).ready(function(){ ... })` block; keep all event bindings inside it.
- Track list structure: `var tracks = [ { title, src }, ... ];` Use consistent keys; do not add extra metadata without confirming.
- Dynamic playlist UI: Items appended with `$('#listsong').append('<li class="asong" indexs='+i+'>'+tracks[i].title+'</li>');`; preserve class `asong` and attribute `indexs` if extending (or migrate to `data-index` with a conscious change across handlers).
- State variables: `currentTrack`, `isLooping`; toggle loop with button text `Loop: On|Off` (update both text and boolean when modifying behavior).
- Event model: Button handlers via `$('#id').click(...)`; for new controls follow same pattern; avoid mixing vanilla and jQuery unless refactoring wholesale.
- Track switching logic centralized in `updateTrack()`; always call it after changing `currentTrack` to ensure `audio.load()` then `audio.play()`.
- End-of-track behavior: `audio.addEventListener('ended', ...)` chooses loop replay or sequential advance; keep conditional branching minimal.

### Adding / Modifying Tracks
- Place new `.mp3` file in project root.
- Append `{ title: "DisplayName", src: "ExactFileName.mp3" }` to `tracks` array.
- For default start track adjust initial `currentTrack` or reorder array.
- Ensure filenames do not contain mismatched casing/spaces; code references literal string.

### UI / Styling Conventions
- Keep `style.css` simple; rely on Flexbox already present. For new components, follow existing class naming (lowercase hyphen if needed). Avoid Tailwind in `index.html` unless converging entire project.
- Error page (`error.html`) is self-contained; changes there should not assume jQuery or local CSS.

### Internationalization / Language
- Some Vietnamese comments / labels (e.g., "mua roi" for rain button). Maintain existing language style; add English alongside only if asked.

### Safe Extension Examples
- Add Shuffle: introduce `var isShuffle=false;` toggle button; on `ended` or Next, if shuffle pick random index != current.
- Add Volume Slider: `<input type="range" id="vol" min="0" max="1" step="0.01">` then `$('#vol').on('input', ()=> audio.volume = parseFloat($('#vol').val()));` inside ready.

### Refactoring Guidance
- If migrating away from jQuery: replicate selectors/events (`document.querySelector`, `addEventListener`) but do so in a dedicated refactor branch; keep one paradigm consistent per file.
- Do not introduce asynchronous loading or promises around audio unless adding advanced features (preloading, analytics).

### What NOT to Do Without Approval
- Do not add build tooling, transpilers, or package managers.
- Do not rename existing IDs/classes used in selectors (`#play-btn`, `#pause-btn`, `#next-btn`, `#loop-btn`, `#rain-btn`, `.asong`).
- Do not alter loop semantics (current design: loop replays same track indefinitely) unless requested.

### Quick Diagnostic Tips
- If a track fails to play: check file exists & correct `src` string; inspect browser console for 404.
- If playlist click fails: ensure `<li>` preserved attribute `indexs`; handler depends on it.

### Agent Workflow Suggestions
1. Small change: modify `tracks` array, test in browser (no build step).
2. Feature addition: add markup in `index.html`, bind in `script.js`, adjust CSS.
3. Structural refactor: propose plan referencing existing patterns before code edits.

Request Clarifications: If needing analytics, bundling, or multi-directory asset organization, ask before implementing (current scope is minimal static site).
