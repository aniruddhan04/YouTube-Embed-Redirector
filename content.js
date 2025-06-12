function redirectIfYouTubeWatchLink(event) {
  let target = event.target;
  
  while (target && target.tagName !== 'A' && target.tagName !== 'BODY') {
    target = target.parentNode;
  }

  if (target && target.tagName === 'A') {
    const href = target.href;

    const youtubeWatchRegex = /^http?s:\/\/(?:www\.)?youtube.com\/watch\?v=([a-zA-Z0-9_-]+)/;
    const match = href.match(youtubeWatchRegex);

    if (match) {
      const videoId = match[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;

      event.preventDefault();
      event.stopPropagation(); 

      chrome.runtime.sendMessage({ action: "redirectTab", url: embedUrl });
    }
  }
}

document.addEventListener('click', redirectIfYouTubeWatchLink, { capture: true });
