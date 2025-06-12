chrome.webNavigation.onBeforeNavigate.addListener(
  (details) => {
    const url = new URL(details.url);

    if (url.hostname.includes("youtube.com") && url.pathname === "/watch" && url.searchParams.has("v")) {
      const videoId = url.searchParams.get("v");
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;

      chrome.tabs.update(details.tabId, { url: embedUrl });
    }
  },
  { url: [{ hostContains: ".youtube.com", pathPrefix: "/watch" }] }
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "redirectTab" && message.url) {
    if (sender.tab && sender.tab.id) {
      chrome.tabs.update(sender.tab.id, { url: message.url });
    }
  }
});
