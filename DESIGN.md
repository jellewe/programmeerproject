# Design document

## Data sources
The main data will come from kaggle.com. It's a CSV file with food production
per food type from all the countries in the world, with data from 1961 to 2013.

[Database](https://www.kaggle.com/dorbicycle/world-foodfeed-production/data)

The second dataset will come from wits.worldbank.org. This an xlsx file with
information about Dutch food exports:

[Database2](https://wits.worldbank.org/CountryProfile/en/Country/NLD/StartYear/1992/EndYear/2013/TradeFlow/Export/Indicator/XPRT-TRD-VL/Partner/BY-COUNTRY/Product/16-24_FoodProd)


I will further get a world map topojson from bl.ocks.org:

[Topojson](http://bl.ocks.org/mbostock/raw/4090846/world-50m.json)

## Technical components
These is a list of the technical components of the application:
- Map

	The map displays countries, zoomed in on a certain continent (selected by the
	dropdown menu). The countries are clickable.
- Bar chart

	The bar chart shows food produced by the clicked country. The food types that
	the bar chart shows are selected in a checkbox menu.
- Line chart

	The line chart shows how much the Netherlands has exported to the selected
	country, over the years 1992 - 2013. Lines will be added when new countries
	are clicked, and they will be removed when visible countries are clicked
	again.
- Dropdown menu - continent selector

	The dropdown menu selects a continent, which then makes the map zoom in to the
	specific continent (not part of the minimum viable product).
- Checkboxes - food type selector

	With the checkbox menu the user can select which food types are shown in the
	bar chart.
- Slider below map
	The slider will make the map show information from different years.

- Update functions to update charts based on selection

	The update functions make sure that the several charts update based on
	selections in the other charts and the selections in the dropdown- slider- and
	checkbox menu
- Program to seperately process the CSV to only useful data

	This program will scrape the useful the data from the CSV file. It will
	only keep the useful data.

## List of used API's or D3 plugins
- The topoJSON d3 plugin to draw the map:

	[topojson](https://d3js.org/topojson.v1.min.js)
