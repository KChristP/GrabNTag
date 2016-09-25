let tagFilter

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('form').addEventListener("submit", (e) => {
    e.preventDefault();
    tagFilter = document.getElementById('user-input').value
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {text: "grab-images"});
    });
  });
});

function tagMatchesExist(tagArray){
  let matches = false
  if (tagFilter.toLowerCase() === "all"){
    matches = true
  }
  tagArray.forEach((tag) => {
    if(tag === tagFilter){
      matches = true
    }
  })
  return matches
}

function downloadIfMatched(responseObject){
  let response = responseObject.results[0]
  let url = responseObject.results[0].url
  let tags = responseObject.results[0].result.tag.classes
  if(tagMatchesExist(tags)){
    let downloadData = {}
    downloadData.url = url
    downloadData.filename = tags[0]
    chrome.downloads.download(downloadData)
  }
}


function getTags(url) {
  console.log("ajax for image at" + url);
  $.ajax({
          'url': 'https://api.clarifai.com/v1/tag',
          'headers': {
              'Authorization': 'Bearer ' + 'HHLwiLlvQ79YVFj4aAqTWPIXbMibcY'
          },
          'data': {url: url},
          'type': 'POST',
          success: function (response) {
              downloadIfMatched(response);
          }
      });
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if (request.text === "images"){
    request.content.forEach((image) => {
      getTags(image)
    })
  }
})
