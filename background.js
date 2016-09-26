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
        'Authorization': 'Bearer ' + 'k3DcKwLUFrDqz3CCNNR5SieiIDCUZ6'
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


// function crawlForBestImageUrl(imageLinkData){
//   let originalUrl = imageLinkData.url
//
//     $.ajax({
//       'url': imageLinkData.href,
//       'type': 'GET',
//       success: function (response) {
//         locateMainImageAndCallAPI(response, originalUrl)
//         },
//       error: function (response){
//         getTags(originalUrl)
//       }
//     });
//
// }

// function locateMainImageAndCallAPI(response, url){
//   let imgs = []
//   let imgElements = $(response).find("img")
//   for (i = 0; i < imgElements.length; i++){
//     if (imgElements[i] && imgElements[i].width > 50 && imgElements[i].height > 50){
//       imgs.push(imgElements[i])
//     }
//   }
//   if (imgs.length === 1){
//     let src = imgs[0].src[0] === "/" ? "http:" + imgs[0].src : imgs[0].src
//     getTags(src)//this is a single large image on a page, getTags(this image)
//   } else {
//     getTags(url)//we didnt find a link leading to a full sized image, just use the original url
//   }
// }


// let imgs = $(response).find("img").filter((img) => (//this filter is not working for some reason... cant figure out why?
//   img.width > 50 && img.height > 50
// ))
