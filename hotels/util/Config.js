/**
 * @author dlafuente
 */

var Config = new function(){
	//self reference
	var self = this;
	//Base URL
	self.BASE_URL = "http://127.0.0.1:8000/api/";
	//default location
	self.LATITUDE_BASE = 39.475337;
	self.LONGITUDE_BASE = 3.150673;
	//load this default location into local properties
	Ti.App.Properties.setObject('location', {latitude: self.LATITUDE_BASE, longitude: self.LONGITUDE_BASE});
	
	return self;
};

module.exports = Config;
