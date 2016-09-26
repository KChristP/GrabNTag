let tagFilter
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.text === "grab-images"){
    tagFilter = request.tagFilter
  }
})


function tagMatchesExist(tagArray){
  let matches = false
  if (typeof(tagFilter) === 'undefined' || tagFilter.toLowerCase() === "all"){
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
  if (request.text === "crawl"){
      // crawlForBestImageUrl(request.content)
      getTags(request.content.url)
  }
  if (request.text === "get-tags"){
    getTags(request.content)
  }
})
