
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('form').addEventListener("submit", (e) => {
    e.preventDefault();
    tagFilter = document.getElementById('user-input').value
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {text: "grab-images"});
    });
    chrome.runtime.sendMessage({text: "grab-images", tagFilter: tagFilter})
  });
});
