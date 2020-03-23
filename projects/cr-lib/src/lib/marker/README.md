# Responsibilities

* Provide location-specific "Pool" markers to place on the Ranger map
for maintaining the pool of Attractions.
* Clickable Marker interface which carries Attraction ID
information for the click event.
* Provide Game-specific "Game" markers to place on the Seeker map
while playing the game.
* Coordinate assembly of the resources to create those markers. (Importing 
the resources is part of the environment and project setup.)

## Collaborators
* Heading Marker is its own component which works with a Compass.
* The build tools assure the resources (images and CSS) are
copied to the right locations.

# Setup

* The JavaScript files which support Leaflet are intended to be 
used across a broad range of browser-based applications.
* Since ionic builds device apps using Type Script, there are a 
few steps required to get the resources in place:
  * Image files for the "balloons".
  * CSS for the translation and font icons.
  * JavaScript for `L.AwesomeMarkers.Icon` (and probably more).
* For the Ionic 2 and 3 days, the steps were more complicated
  and involved, but now there are just a few steps: 
  1. Install `leaflet.awesome-markers` (via npm) to the top level.
  1. Manually copy that package's `dist/images` directory into the project's
  `www/images` directory.
  1. Add an import of the JavaScript to the service which invokes 
  `L.AwesomeMarkers`.
  1. Add a line to the `angular.json` file for the project which includes
  the CSS file in the build.

## Debugging

Looking at the markup and styles that get brought in and placed 
on the map is perhaps the easiest way to tell if the needed 
resources have been applied to the DOM elements.

## Resources
* Font Awesome icon cheatsheet: http://fontawesome.io/cheatsheet/
* Plugin: https://github.com/lvoogdt/Leaflet.awesome-markers
    
  
