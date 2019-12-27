# Edit Attraction Pages
This module contains:
* Set of three tab pages covering
  * Drafts (no Images or Puzzles)
  * Places (Images, but no Puzzles)
  * Full Attractions (Images and Puzzles)
* Edit Tab module residing in the footer slot
* Active Attraction Service for keeping track of the Attraction
for tab navigation.
* Image Page for choosing a Featured Image; reached from 
the Places Page.
* Image Capture Page for taking a picture and
adding it to an Attraction.

Routing is defined as part of the Edit Module to
setup lazy loading of the entire module, but
all sub-modules are loaded at the time the Edit 
Module is loaded.
  
  
  
