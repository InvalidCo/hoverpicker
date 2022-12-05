
/*
	Mix-in to provide a simple tooltip

	Basic usage:
		Mix in with picker class
		Call show with HTML string to display tooltip
		Call show with falsy/no argument to hide tooltip

	Modifying:
		Set the offsets object in constructor or override positionTooltip to modify positioning
		Override createTooltipElement to add stylish flavor
 */

let ToolTippify = (picker) => class extends picker {
	constructor() {
		super();
		this.tooltipElement = null;
		this.offsets = { x: 16, y: 16 };
	}

	turnOn() {
		this.tooltipElement = this.createTooltipElement();
		document.body.appendChild(this.tooltipElement);
		super.turnOn();
	}

	turnOff() {
		super.turnOff();
		if (this.tooltipElement) {
			document.body.removeChild(this.tooltipElement);
		}
		this.tooltipElement = null;
	}

	createTooltipElement() {
		let elt = document.createElement("div");
		Object.assign(elt.style, {
			position: "absolute",
			display: "none",
			backgroundColor: "#ffffff",
			border: "1px solid black",
			zIndex: "99999999",
			overflow: "hidden",
			"pointer-events": "none"
		});
		return elt;
	}

	show(html) {
		this.tooltipElement.innerHTML = html;
		this.tooltipElement.style.display = html ? "block" : "none";
	}

	positionTooltip(event) {
		Object.assign(this.tooltipElement.style, {
			left: event.pageX + this.offsets.x + "px",
			top: event.pageY + this.offsets.y + "px",
		});
	}

	onHover(event) {
		super.onHover(event);
		this.positionTooltip(event);
	}
}

