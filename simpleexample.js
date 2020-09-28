
/*
	Simple example of picking words on-hover and displaying the reverse in a tooltip
*/

(function() {

class HoverOverWordPicker extends HoverOverDelimitedSequencePicker {
	constructor() {
		super();
		// punctuation, whitespace, dangerous html characters
		this.regex = /\s|[<>/\\?!.,]/;
	}

	isDelimiter(character) {
		return this.regex.test(character);
	}
}

class TestHoverer extends ToolTippify(HoverOverWordPicker) {
	pick(data) {
		let reversed = data.split('').reverse().join('');
		this.show("<b>" + reversed + "</b>");
	}

	blur() {
		this.show();
	}
}

let hoverer = new TestHoverer();
hoverer.turnOn();

})();
