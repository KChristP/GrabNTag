function imageFind() {
  let imgs = document.getElementsByTagName("img");
  let imgSrcs = [];
  // debugger
  for (let i = 0; i < imgs.length; i++) {
    if (imgs[i].height > 25 && imgs[i].width > 25){
      imgSrcs.push(imgs[i].src);
    }
  }

  return imgSrcs;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.text === "grab-images"){
    chrome.runtime.sendMessage({text: "images", content: imageFind()})
  }
})

console.log("content.js is running");


// function crawlForBestImageUrl(imgElement){
//   if(imgElement.parentNode.nodeName === "A"){
//     let xhr = new XMLHttpRequest
//     xhr.open("GET", imgElement.parentNode.href);
//     xhr.responseType = "document";
//     xhr.send()
//     xhr.response
//   } else {
//     return imgElement.src
//   }
// }
// aTagsWithNestedImages = [].slice.call(document.getElementsByTagName("a")).filter((el) => (el.getElementsByTagName("img").length === 1))
