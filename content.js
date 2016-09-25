function imageFind() {
  let imgs = document.getElementsByTagName("img");
  [].slice.call(imgs).forEach((img) => {
    if(img.parentNode.nodeName === "A"){
      chrome.runtime.sendMessage({text: "crawl", content: {href: img.parentNode.href, url: img.src}})
    } else {
      chrome.runtime.sendMessage({text: "get-tags", content: img.src})
    }
    // crawlForBestImageUrl(imgElement)
  })
  // let imgSrcs = [];
  // debugger
  // for (let i = 0; i < imgs.length; i++) {
  //   if (imgs[i].height > 25 && imgs[i].width > 25){
  //     imgSrcs.push(imgs[i].src);
  //   }
    // [].slice.call(imgs).forEach((img) => {
    //
    //   crawlForBestImageUrl(img)
    // })
  // }

  // return imgSrcs;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  console.log("getting to content");
  if(request.text === "grab-images"){
    imageFind()
  }
})

// console.log("content.js is running");


// function crawlForBestImageUrl(imgElement){
//   let imageUrl = imgElement.src
//   if(imgElement.parentNode.nodeName === "A"){
//     // let xhr = new XMLHttpRequest
//     // xhr.open("GET", imgElement.parentNode.href);
//     // xhr.responseType = "document";
//     // xhr.onload = function (e) {
//     //   if (xhr.readyState === 4) {
//     //     if (xhr.status === 200) {
//     //       console.log(xhr.responseText);
//     //     } else {
//     //       console.error(xhr.statusText);
//     //     }
//     //   }
//     // };
//     // xhr.send()
//     $.ajax({
//       'url': imgElement.parentNode.href,
//       'type': 'GET',
//       success: function (response) {
//           console.log(response);
//       }
//     });
//     debugger
//   } else {
//     chrome.runtime.sendMessage({text: "image", content: imageUrl})
//   }
// }
// aTagsWithNestedImages = [].slice.call(document.getElementsByTagName("a")).filter((el) => (el.getElementsByTagName("img").length === 1))
