let selfSelect = false

function imageFind() {
  let imgs = document.getElementsByTagName("img");
  chrome.runtime.sendMessage({text: "count", content: imgs.length});

  [].slice.call(imgs).forEach((img) => {
    if(img.parentNode.nodeName === "A"){
      chrome.runtime.sendMessage({text: "crawl", content: {href: img.parentNode.href, url: img.src}})
    } else {
      chrome.runtime.sendMessage({text: "get-tags", content: img.src})
    }
  })
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.text === "grab-images"){
    imageFind()
  }
  // if (request.text === "self-select-toggled"){
  //   console.log("self-select-active")
  //   selfSelect = !selfSelect
  //   document.addEventListener("click", (e) => {
  //     if (e.target.nodeName.toLowerCase() === "img" && selfSelect){
  //       e.preventDefault()
  //       chrome.runtime.sendMessage({text: "get-tags", content: e.target.src})
  //     }
  //   })
  // }
})
