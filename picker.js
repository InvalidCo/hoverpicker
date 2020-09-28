
/*

	Different base classes for hovering on nodes, textnodes and delimited areas of text

	Classes, in order of usefulness:

	HoverOverCharacterPicker, HoverOverDelimitedSequencePicker:
		define pick(data) for onmouse events. Note that this is may be called multiple times in succession with the exact same data argument, once for every mousemove event.
		define blur() for onmouse events on non-interesting nodes

	HoverOverDelimitedSequencePicker:
		define isDelimiter(character) to break a string at custom character boundaries
			This class will only collect strings up to and util the corresponding text node

	HoverOverSequencePicker:
		define onHoverSequence to create custom logic for data grabbing from text nodes

	HoverOverPicker:
		define onHoverNode to create custom logic for data grabbing from nodes

 */

class HoverOverPicker {
	turnOn() {
		document.addEventListener('mousemove', this.onHover.bind(this));
	}

	turnOff() {
		document.removeEventListener('mousemove', this.onHover.bind(this));
	}

	flip(onoff) {
		this.turnOff();
		if(onoff) this.turnOn();
	}

	onHover(event) {
		// https://developer.mozilla.org/en-US/docs/Web/API/Document/caretRangeFromPoint
		let range, node, offset;
		if (document.caretPositionFromPoint) {
			range = document.caretPositionFromPoint(event.clientX, event.clientY);
			node = range.offsetNode;
			offset = range.offset;
		} else if (document.caretRangeFromPoint) {
			range = document.caretRangeFromPoint(event.clientX, event.clientY);
			node = range.startContainer;
			offset = range.startOffset;
		}
		this.onHoverNode(node, offset);
	}
}

class HoverOverSequencePicker extends HoverOverPicker {
	onHoverNode(node, offset) {
		if (node && node.nodeType == document.TEXT_NODE) {
				this.onHoverSequence(node, offset);
		}
	}
}

class HoverOverCharacterPicker extends HoverOverSequencePicker {
	onHoverSequence(node, offset) {
		let character = node.textContent[offset];
		if(character) {
			this.pick(character);
		} else {
			this.blur();
		}
	}
}

class HoverOverDelimitedSequencePicker extends HoverOverSequencePicker {
	onHoverSequence(node, offset) {
		let start = offset, end = offset, txt = node.textContent;
		while(txt[start] && !this.isDelimiter(txt[start])) {
			start--;
			if (start<0) break;
		}
		start++;
		while(txt[end] && !this.isDelimiter(txt[end])) {
			end++;
			if (end>=txt.length) break;
		}
		if (end-start > 0)
			this.pick(node.textContent.substring(start, end));
		else
			this.blur();
	}
}

