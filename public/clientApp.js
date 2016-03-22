/** 
 * Example of how to apply the strategy pattern 
 * in a very basic SVG rendering engine
 */


/** setting up SVG library */

var svgScreen = Snap(500, 500);
document.getElementById('container').appendChild(svgScreen.node);

/**
 * Represents a visual item (a basic or complex shape)
 * @constructor
 * @param {string} id - The id of the visual object.
 */ 
 
function VisualItem(id) {

	this.id = id;
	this.data = [];
	this.options = {};

	// this will be our interchangeable algorithm
	this.renderStrategy = {};
}

/** setting up SVG library */

VisualItem.prototype = {

	/**
	 * @setStrategy
	 * @param {string} renderStrategy - The name of the algorithm used to render the shape
	 */
	
	setStrategy: function(renderStrategy) {
		this.renderStrategy = renderStrategy;
	},

	/** call the render method */
	
	render: function() {
		this.renderStrategy.render(this.data, this.options);
	}
}

/**
 * Strategy to render a box
 * @param {string} paper - The name of the svg canvas element
 */ 

var RenderBoxStrategy = function(paper) {
	this.render = function(data, options) {
		var block = paper.rect(data[0],data[1],data[2],data[3],data[4],data[5]).attr(
			{ 'fill' : options.fill || "#00ff00" }
		);
		block.drag();
	}
};

/**
 * Strategy to render a circle
 * @param {string} paper - The name of the svg canvas element
 */ 

var RenderCircleStrategy = function(paper) {
	this.render = function(data, options) {
		var block = paper.circle(data[0],data[1],data[2]).attr(
			{ 'fill' : options.fill || "#00ff00" }
		);;
		block.drag();
	}
};

/**
 * Factory Pattern: used to to create different visual items
 */ 

function VisualItemsFactory() {

	/**
	 * Creates a visual item and set the proper render strategy
	 * @param {string} type - Box or Circle
	 * @param {targetSVGScreen} the name of the SVG canvas element
	 */ 

	this.createVisual = function(type, targetSVGScreen) {
  
	  	var visualItem;
		visualItem = new VisualItem(type + '1');
		visualItem.options = { "fill" : "#F44336" };
		
	    var renderStrategy;
  
	  	switch (type)
	    {
			case 'rect':
				visualItem.data = [100,100,100,100,0,0];
				renderStrategy = new RenderBoxStrategy(targetSVGScreen);
				visualItem.setStrategy(renderStrategy);
				break;
			case 'circle':
				visualItem.data = [100,100,40];
				renderStrategy = new RenderCircleStrategy(targetSVGScreen);
				visualItem.setStrategy(renderStrategy);
				break;
	    }
    
	    return visualItem;
	}
}

// we create an instance of our factory
var factory = new VisualItemsFactory();

// we call the factory to create a circle
var vItemCircle = factory.createVisual('circle', svgScreen);


var vItemRect = factory.createVisual('rect', svgScreen);

// we call its render method, which calls the strategy that we have set
// when the object has been created within the factory
vItemCircle.render();
vItemRect.render();

