# Drupal 8 and React Hydrate

## What is this?
This is a work in progress module that aim to accomplish the folowing:
Phase 1:
(x) 1. Generate a block that can be shared sitewide.
(x) 2. Obtain fields value from node into DrupalSettings for sharing in Javascript. 
(x) 3. Use React Hydrate method to render content for social media preview.
( ) 4. Create a share button to share content in social media.

Phase 2:
(x) 1. Get node id only for DrupalSettngs.
( ) 2. Generate a json via RESTAPI or other methods to accurately fetch specific node content using node from DrupalSettings.
( ) 3. Intergrate content with React rendering.
( ) 4. Allow content admin to edit/save using React generated form and save content back to Drupal.


## Installation
Download this module into your Drupal 8 modules folder and enable it. It will create a block that can be added to any node, using something like Block Layout.

Run 'Drush cim' to enable the new image style.