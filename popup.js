let searching = false
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('form').addEventListener("submit", (e) => {
    e.preventDefault();
    searching = true
    searchNotification()
    tagFilter = document.getElementById('user-input').value
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {text: "grab-images"});
    });
    chrome.runtime.sendMessage({text: "grab-images", tagFilter: tagFilter})
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if (request.text === "finished-search"){
    searching = false
    searchNotification()
  }
})

function searchNotification(){
  if (searching){
    document.getElementById("loader").style.display = "block"
  } else {
    document.getElementById("loader").style.display = "none"
  }
}
