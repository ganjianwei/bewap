// Check blacklist
//  if on blacklist and not recently completed, direct to service
//  else go through normally
//

chrome.extension.sendRequest({location: document.location}, function(response) {
	console.log(document.location.host);
	console.log(response.shouldBlock);
	console.log(response.service);
	var BEUTEL_SITE = "http://alexbeutel.com/bewap/";
    var sites = {
        "recaptcha" : BEUTEL_SITE + "recaptcha.php",
        "flashcards" : BEUTEL_SITE + "flashcards.php"
    };
	// response.shouldBlock is true or false
	if (response.shouldBlock) {
		var service = sites["flashcards"];
		if(response.service && sites[response.service])
			service = sites[response.service];
		document.location = service + "?uid=" + response.uid + "&w=1";
	} else if (response.finishedTask) {
		console.log("Destination: %s", response.destination);
		document.location = response.destination;
	}
});


