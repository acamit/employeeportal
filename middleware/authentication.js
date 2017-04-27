module.exports = function (authInfo) {
	return function(req, res, next){
		console.log(req._parsedUrl);
		var currentUrl = req._parsedUrl || '/';
		console.log(currentUrl);
		var currentUrl = req._parsedUrl.pathname.substring(1);
		console.log(currentUrl);
		if(currentUrl.indexOf('/') !==-1){
			currentUrl = currentUrl.substring(0, currentUrl.indexOf('/'));
		}

		var authRequired = (authInfo.indexOf(currentUrl) != -1);

		if(authRequired){
			if(!req.userSession.IsAuthenticated){
				req.userSession.IsAuthenticated = false;
				req.userSession.IsAuthorised = false;
				req.userSession.user = null;
				res.send(req.userSession);
			}
		}
		next();
	}
}