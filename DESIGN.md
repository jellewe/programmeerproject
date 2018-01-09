# Design document

## Data sources
The main data will come from kaggle.com. It's a CSV file with food production per food 
type from all the countries in the world, with data from 1961 to 2013.

[Database](https://www.kaggle.com/dorbicycle/world-foodfeed-production/data)

I will further get a world map topojson from bl.ocks.org:

[Topojson](http://bl.ocks.org/mbostock/raw/4090846/world-50m.json)

## Technical components
These are the technical components of the application:
- Map
	The map displays countries, zoomed in on a certain continent (selected by the
	dropdown menu). The countries are clickable.
- Bar chart
	The bar chart shows food produced by the clicked country. The food types that
	the bar chart shows are selected in a checkbox menu. The bars are clickable.
- Line chart
	The line chart shows how much of the selected food type was produced by 
	country over the course of the years 1961 to 2013
- Dropdown menu - continent selector
	The dropdown menu selects a continent, which then makes the map zoom in to the 
	specific continent.
- Checkboxes - food type selector
	With the checkbox menu the user can select which food types are shown in the 
	bar chart.
- Update functions to update charts based on selection
	The update functions make sure that the several charts update based on
	selections in the other charts and the selections in the dropdown- and
	checkbox menu

## List of used API's or D3 plugins
Todo
