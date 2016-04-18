var validatorService = {
	isEmail: function (email) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
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
	}
};

module.exports = validatorService;
