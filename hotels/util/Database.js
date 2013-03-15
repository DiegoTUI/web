/**
 * @author dlafuente
 */

var Database = new function(){
	//self reference
	var self = this;
	//Open database
	var db = null;
	//Toolbox
	var util = require('util/Util');
	//open database
	function openDB(){
		db = Titanium.Database.open('TiBountyHunter')
	};
	//Create the database if it hasnt been done yet
	(function create(){
		Ti.API.info("Creating database");
		openDB();
		db.execute('CREATE TABLE IF NOT EXISTS fugitives (id TEXT PRIMARY KEY, name TEXT, captured INTEGER)');
	})();
	
	//count the elements of the DB
	self.count = function(captured){
		Ti.API.info("Counting...");
		openDB();
		var row = db.execute('SELECT COUNT(*) FROM fugitives WHERE captured = ?', captured);
		return row.field(0);
	}
	
	//list elements of the DB
	self.list = function(captured){
		Ti.API.info("Listing...");
		openDB();
		var data = [];
		var rows = db.execute('SELECT * FROM fugitives WHERE captured = ?', captured);
		while (rows.isValidRow()) {
			data.push({
				title: rows.fieldByName('name'),
				id: rows.fieldByName('id'),
				hasChild : true,
				captured : captured,
				name: rows.fieldByName('name')
			});
			rows.next();
		}
		rows.close();
		db.close();
		
		return data;
	}
	
	//add a new fugitive name
	self.add = function(name){
		Ti.API.info("Adding...");
		openDB();
		db.execute('INSERT INTO fugitives (id, name, captured) VALUES(?,?,?)', util.randomId(), name, false);
		db.close();
		Ti.API.info("Count after adding. Fugitives: " + self.count(false) + " - Captured: " + self.count(true));
		//Fire an App level event
		Ti.App.fireEvent('app:db_updated');
		Ti.App.fireEvent('crap');
	}
	
	//delete a fugitive by id
	self.del = function (id){
		Ti.API.info("Deleting...");
		openDB();
		db.execute("DELETE FROM fugitives WHERE id = ?", id);
		db.close();
		//Fire an App level event
		Ti.App.fireEvent('app:db_updated');
	}
	
	//busts a fugitive by id
	self.bust = function (id){
		Ti.API.info("Busting...");
		openDB();
		db.execute("UPDATE fugitives SET captured = ? WHERE id = ?", true, id);
		db.close();
		//Fire an App level event
		Ti.App.fireEvent('app:db_updated');
	}
	
	return self;
}

module.exports = Database;
