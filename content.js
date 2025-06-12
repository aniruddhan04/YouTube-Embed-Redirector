// content.js

function redirectIfYouTubeWatchLink(event) {
  let target = event.target;

  // Traverse up the DOM tree to find the nearest anchor tag (<a>)
  // that was clicked, as clicks can occur on child elements (e.g., img, span within an <a>)
  while (target && target.tagName !== 'A' && target.tagName !== 'BODY') {
    target = target.parentNode;
  }

  if (target && target.tagName === 'A') {
    const href = target.href;

    // Check if the link is a YouTube watch?v= link
    // We'll use a regex for robustness
    const youtubeWatchRegex = /^http?s:\/\/(?:www\.)?youtube.com\/watch\?v=([a-zA-Z0-9_-]+)/;
    const match = href.match(youtubeWatchRegex);

    if (match) {
      const videoId = match[1]; // Extract the video ID
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;

      // Prevent the default navigation of the link
      event.preventDefault();
      event.stopPropagation(); // Stop propagation to prevent other click handlers from firing

      // Now, tell the background script to redirect the current tab
      // We send a message because content scripts cannot directly change tab URLs
      chrome.runtime.sendMessage({ action: "redirectTab", url: embedUrl });
    }
  }
}

// Add a click listener to the entire document
// Using 'capture: true' ensures our listener is called during the capture phase,
// before most other event listeners, giving us a better chance to prevent default.
document.addEventListener('click', redirectIfYouTubeWatchLink, { capture: true });

// You might also want to re-attach listeners if YouTube loads new content dynamically
// (e.g., when scrolling down and more videos load).
// MutationObserver is good for this, but adds complexity.
// For now, let's keep it simple with just the initial click listener.
// If clicks on newly loaded videos don't redirect, consider a MutationObserver.