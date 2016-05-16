var Parser = require('./Parser.service');

var validatorService = {
	isEmail: function (email) {
		var regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	},
	isNumericAndNotNegative: function (value) {
		if (!$.isNumeric(value)) {
			return false;
		}
		if (value < 0) {
			return false;
		}
		return true;
	},
	isModeratorPermission: function (token) {
		if (!token) {
			return false;
		}
		var decodedToken = Parser.decodeJWT(token);
		return decodedToken && (parseInt(decodedToken.claims.privileges) > 0);
	},
	requestOptionsAreEqual: function (option1, option2) {
		if (!option1 || !option2) {
			return false;
		}
		if (option1.type !== option2.type) {
			return false;
		}
		if (option1.url !== option2.url) {
			return false;
		}
		if (option1.body && !option2.body) {
			return false;
		}
		if (option2.body && !option1.body) {
			return false;
		}
		if (option1.body && option2.body) {
			objectHasSamePropertiesWithSameValues(option1.body, option2.body);
		}
		return true;
	},
	isAdminPermission: function (token) {
		if (!token) {
			return false;
		}
		var decodedToken = Parser.decodeJWT(token);
		return decodedToken && (parseInt(decodedToken.claims.privileges) > 1);
	}
};

function objectHasSamePropertiesWithSameValues (object1, object2) {
	var object1Properties = [];
	var object2Properties = [];
	for (var property1 in object1) {
		object1Properties.push(property1);
	}
	for (var property2 in object2) {
		object2Properties.push(property2);
	}
	if (object2Properties.length !== object1Properties.length) {
		return false;
	}
	/* check if both has the same props*/
	if (!object1Properties.every(function (prop1) {
		if (!object2Properties.indexOf(prop1)) {
			return false;
		}
		return true;
	})) {
		return false;
	}
	if (!object1Properties.every(function (prop1) {
		if (object1Properties[prop1] !== object2Properties[prop1]) {
			return false;
		}
		return true;
	})) {
		return false;
	}
	return true;
}

module.exports = validatorService;
