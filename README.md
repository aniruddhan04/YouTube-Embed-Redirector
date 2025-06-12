# YouTube Embed Redirector

A lightweight Chrome extension that automatically redirects YouTube `watch?v=` links to their `embed/` equivalents, providing a seamless viewing experience without extra UI clutter.

## Features

* **Automatic Navigation Redirect**: Converts direct navigation (address bar, new tabs, external links) from `https://www.youtube.com/watch?v=VIDEO_ID` to `https://www.youtube.com/embed/VIDEO_ID`.
* **Click Interception**: Listens for clicks on YouTube pages and intercepts `watch?v=` links, redirecting the current tab to the embed URL.
* **No UI Needed**: Runs silently in the background without adding interface elements.

## Installation

1. **Clone or download** this repository:

   ```bash
   git clone https://github.com/your-username/youtube-embed-redirector.git
   ```
2. **Open** Chrome and navigate to `chrome://extensions`.
3. **Enable** *Developer mode* (toggle in the top-right).
4. Click **Load unpacked** and **select** the project directory.

## Usage

* **Navigate** to any YouTube watch page (e.g., `https://www.youtube.com/watch?v=dQw4w9WgXcQ`).
* The extension will **automatically redirect** to the embed URL (`https://www.youtube.com/embed/dQw4w9WgXcQ`).
* **Click** on any `watch?v=` link within YouTube pages to be redirected in-place to the embed version.

## File Structure

```
├── background.js    # Service worker: handles webNavigation events and redirects
├── content.js       # Content script: intercepts clicks and sends messages to background
├── manifest.json    # Extension metadata, permissions, and script registrations
└── icons/           # Extension icons (16x16, 48x48, 128x128)
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## Permissions

* `webNavigation`: To listen for navigation events across YouTube URLs.
* Host permissions `*://*.youtube.com/*`: To intercept and redirect all watch pages.


* Fork the repository.
* Create a new branch for your feature or bug fix.
* Submit a pull request with a clear description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).
