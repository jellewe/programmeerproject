# Programmeerproject
Programming project for the programming minor at the University of Amsterdam

Jelle Witsen Elias

## Summary
This application will show food production throughout the world, and how much
the Netherlands has been exporting to a specific country. The goal is to
show people which countries produce which types of food, and what they have been
producing throughout the past few years, and to show how much the Netherlands
has been exporting to these countries.

## Problem statement
The 'problem' is that a lot of people in the Netherlands have no idea how big
the Netherlands is in the food export industry. It actually is the second
largest food exporter in the world. People also generally don't know a lot
about which different foods are grown/used in other countries than their own.

## Solution
The solution is to show which food is grown by which countries, and how much of
it per country. The website will also show how much of the food type the
Netherlands exports to the specific country.

![Sketch](doc/sketch.jpg)

The main features that will be available to users are that they are able to
click on a country on a world map, and instantly see which foods are grown most
by that country in a bar chart. The map will also show the total food production
of all the countries in the world by color-mapping information to them. There
will also be a third visualization: a line chart of the food export of the
Netherlands to the specific country over the course of the years 1992 - 2013.

Other features are a slider below the map with which the user can switch between
different years to view in the map, and checkboxes that will allow you to change
which food types are shown in the bar chart.

All of these features will be part of the minimum viable product. A feature that
is optional to implement is a dropdown menu above the map with which you can
select a continent to zoom in to.

## Prerequisites
The main data source is a Kaggle database:
[Database](https://www.kaggle.com/dorbicycle/world-foodfeed-production/data)

The second data source, with information about Dutch food export to countries,
is from wits.worldbank.org:
[Database2](https://wits.worldbank.org/CountryProfile/en/Country/NLD/StartYear/1992/EndYear/2013/TradeFlow/Export/Indicator/XPRT-TRD-VL/Partner/BY-COUNTRY/Product/16-24_FoodProd)

The external components used by the website are the d3 library for javascript:
[d3](https://d3js.org/)

A hard part of making this application might be making sure that the two
different datasets work together well. I think this can be overcome by properly
preparing them, though.
