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

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
//   if (request.text === "image"){
//     // request.content.forEach((image) => {
//       getTags(request.content)
//     // })
//   }
// })
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if (request.text === "crawl"){
    // [].slice.call(request.content).forEach((imageLinkData) => {
      crawlForBestImageUrl(request.content)
    // })
  }
  if (request.text === "get-tags"){
    getTags(request.content)
  }
})

function crawlForBestImageUrl(imageLinkData){
  console.log("crawling");
  console.log(imageLinkData.href);
  let originalUrl = imageLinkData.url
  // let imageUrl = imageLinkData.src
  // if(imageLinkData.href === "A"){
    // let xhr = new XMLHttpRequest
    // xhr.open("GET", imageLinkData.parentNode.href);
    // xhr.responseType = "document";
    // xhr.onload = function (e) {
    //   if (xhr.readyState === 4) {
    //     if (xhr.status === 200) {
    //       console.log(xhr.responseText);
    //     } else {
    //       console.error(xhr.statusText);
    //     }
    //   }
    // };
    // xhr.send()
    $.ajax({
      'url': imageLinkData.href,
      'type': 'GET',
      success: function (response) {
        locateMainImageAndCallAPI(response, originalUrl)
          // debugger// here we can add another helper function that parses the returned data from the link and tries to find a bigger image link. if it doesnt find one, we call getTags on the original url
      }
    });
    // debugger
  // } else {
    // getTags(imageUrl)
  // }
}

function locateMainImageAndCallAPI(response, url){
  let imgs = []
  let imgElements = $(response).find("img")
  for (i = 0; i < imgElements.length; i++){
    if (imgElements[i] && imgElements[i].width > 50 && imgElements[i].height > 50){
      imgs.push(imgElements[i])
    }
  }
  if (imgs.length === 1){
    let src = imgs[0].src
    if(src[0] === "/")
    getTags(imgs[0].src)//this is a single large image on a page, getTags(this image)
  } else {
    getTags(url)//we didnt find a link leading to a full sized image, just use the original url
  }
}


// let imgs = $(response).find("img").filter((img) => (//this filter is not working for some reason... cant figure out why?
//   img.width > 50 && img.height > 50
// ))
// let imgs
// let imgElements = $(response).find("img")
// for (i = 0; i < imgElements.length; i++){
//   if imgElements[i].width > 50 && imgElements[i].height > 50
//   imgs.push(imgElements[i])
// }
