# Description

This application shows food consumption throughout the world on a map. It also
shows which food types are consumed in a bar chart, and Dutch export to a
selected country in a line chart.

![screenshot](/doc/screenshot1.png)

# Technical design

There are three main components of the application: a map, a bar chart and a
line chart. Two smaller interactive components are the slider above the map,
with which the user can choose a year to show data from, and a checkbox system
below the bar chart, with which the user can choose which food categories to
show in  the bar chart.

All functions are in one file: project.js. The following functions are used:

- A window.onload 'main' function. This function will be executed first. It
calls the map function so a map is drawn, and draws the slider. It also calls
the map function again if the slider is moved.

- A mapChart function, which draws the map. If a country is clicked, it calls
the bar chart and line chart functions, so that these charts are drawn for the
selected country (and the selected year, in case of the bar chart)

- A tooltipInfo function, which is called by the map chart and renders html
for the map tooltip

- A drawBarChart function, which draws the bar chart and is called when a
country is clicked on the map.

- A drawCheckboxes function, which is called by the bar chart function and
draws the checkboxes below it

- A barchartTitle function, which draws a relevant title above the bar chart
(showing the selected country's name and selected year). This function is called
by the bar chart function.

- A maxValue function, which calculates the max value to draw the bar chart
y axis, which involves some non standard calculations. It is called by the
bar chart function.

- A drawLineChart function, which draws the linechart when a country is
selected on the map.

- A noDataMessage function, which renders a message if no export data is
available for the selected country
