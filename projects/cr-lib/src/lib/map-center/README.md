# Responsibilities

This knows how to display the lat/lon on a Leaflet map.
- It is given an Observable which it subscribes to for obtaining the
values it should be displaying.
- It chooses the number of digits to display (maybe configurable?)
- It can be turned on/off.

Because this control is coupled to Leaflet, it doesn't follow the
Angular way of doing things, but instead, makes direct manipulation
of the DOM. More details in the section Component vs. Leaflet Control.

This has a particularly non-standard effect on the CSS.

The private `setContent()` function implements the HTML interaction
with the DOM.

The DOMUtil is used to manipulate the `style` properties directly from 
the JavaScript.

# Component vs. Leaflet Control
The MapCenterDisplayComponent is a hybrid between Angular Component 
and Leaflet Control. This implies a few things:
* The component is non-injectable. The class is extending
L.Control and the constructor needs to call the `super()` no-arg
constructor.
* To get this to compile, we need to add the `@types/leaflet` to the 
`package.json` under `devDependencies`.
* Instead of passing services into the constructor, they
are directly instantiated within the module's code.


