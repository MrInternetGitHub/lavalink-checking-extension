function checkLavalink() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs.length > 0) { // added check for tabs length
      var url = tabs[0].url;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "http://lavalink-server.com:8080/stats", true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.players == 0) {
              chrome.tabs.sendMessage(tabs[0].id, {lavalinkStatus: "offline"});
            } else {
              chrome.tabs.sendMessage(tabs[0].id, {lavalinkStatus: "online"});
            }
          } else {
            chrome.tabs.sendMessage(tabs[0].id, {lavalinkStatus: "error"});
          }
        }
      };
      xhr.send();
    }
  });
}
