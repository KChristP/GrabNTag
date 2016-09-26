
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
