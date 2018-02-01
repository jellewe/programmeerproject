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
the map function again if the slider is moved. The slider is drawn with the
help of d3.slider, with components in the css and javascript folders.

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

The main html and css files are index.html and css/stylesheet.css.

# Challenges and changes made

- In the beginning I found out it would be a lot easier to work with json files
than with CSV files. This took some work, but definitely worked out well
because it was way easier to access the data from the javascript file.

- Total consumption data for the map was not very interesting, because it meant
that countries with a larger population simply consumed more, generally. So I
made the decision to get population data from countries as well, and divide the
total consumption by the total population in a country. This gives a more
interesting image.

- The checkbox system was a big hassle to make. In the end I managed to make it
bug-free though, but this took almost three days.

- I made a tooltip on the bar chart, so you could see the exact values.

- Quite late in the project I realized my dataset was about food consumption,
not

I think these changes made the overall product better. Especially the decision
of dividing a country's total consumption by the total population makes the map
a lot more interesting, and makes you wonder why some countries have much higher
consumption per capita than others. This makes it also more interesting to see
which food product it is that they produce most. I don't think there are any
trade-offs to this. I think the tooltip is also a good addition, but maybe it
was not necessary. The trade-off to this is that I don't like to have too many
elements on the screen, but because it doesn't always show op it's not too bad.

As to the overall design: I decided to pick a shade of green to use in almost
all elements of the website (the map and charts). I think this gives the website
a coherent style. For the line chart, it simply wasn't practical to pick shades
of green so I picked some well distinguishable colors from colorbrewer2.org
