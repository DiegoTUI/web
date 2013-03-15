/**
 * @author dlafuente
 */

var Network = new function(){
	//self reference
	var self = this;
	//Config options
	var Config = require('util/Config');
	var Util = require('util/Util');
	
	//get hotels
	self.getHotels = function(region, callback){
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function() {
			Ti.API.info("Connection loaded. Callback.");
			Ti.API.info("response: " + xhr.responseText);
			var responseJSON = Util.isolateJSON(xhr.responseText);
			callback(JSON.parse(responseJSON));
		};
		Ti.API.info("Opening connection: " + Config.BASE_URL + 'get_hotels.php?params=' + JSON.stringify(region));
		xhr.open("GET", Config.BASE_URL + 'get_hotels.php?params=' + JSON.stringify(region));
		xhr.send();
	}
	
	return self;
};

module.exports = Network;
