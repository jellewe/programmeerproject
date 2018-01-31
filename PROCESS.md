# day 1

Today I did a few things:

- I converted my two CSV files to one JSON, so that I can access the data more easily. This was recommended by my daily standup partners, and I think it will be very useful for my future work. This took up a lot of my time today.

- I started coloring my DataMaps map with the JSON file I had made. This did not take up so much time, but I had a problem with getting the d3 scaler right. I turned out I needed the 'quantize' scaler. Tomorrow I should look up more about making a log scale, or using the 'threshold' d3 scaler. This might improve the readability of the map a bit more.

# day 2

Today I finished the color scale for the map, and started working on the bar chart. The bar chart doesn't show any elements yet, though, and I get an error I don't understand. I want to finish the bar chart tomorrow.

I also processed the data more properly today, so that the 'food' and 'feed' elements in the JSON are merged to a single value. I'm not planning to use that information.

# day 3

I still had to process the data further today, making sure that only food groups are shown in the bar chart, otherwise there would be too many bars. I worked on the bar chart as well, which is almost finished.

# day 4

Today I finished the bar chart. I also downloaded some CSV files from WITS.com with which I'm able to convert countries ([Link](https://wits.worldbank.org/wits/wits/witshelp/content/codes/country_codes.htm)). Now I can start working on the line chart.

# day 5

Today I finished the line chart and we gave a presentation about the alpha version I have now. I still need to find a way to show missing data in the line chart.

I also realized that the data for my map was food consumed by a country, not produced. This is still okay for my story though.

I got some feedback on the map at the presentation, and I think I want to divide the total amount of food consumed by the amount of people that live in a country.

# day 6

I am now using d3.slider.js for the slider above the map: ([Link](https://github.com/MasterMaps/d3-slider)). This uses the 3-clause BSD license: ([Link] https://opensource.org/licenses/BSD-3-Clause). I should include these links in the final readme.

So I finished the slider today, it's fully working. I also made the map and bar chart interactive: if a country on the map is clicked, information for that country will be shown in the barchart. I should make the line chart interactive as well, tomorrow.

I also changed the color of countries with no data to a light shade of grey. The previously used black was not very well inditinguishable with the dark shade of green used for the countries with highest consumption.

# day 7

Today I linked the line chart with the map as well: when a country is clicked on the map, both the line chart and the bar chart are updated.

I'm also using a dataset with world population from Kaggle, to divide the consumption data in the map by the amount of people living in the country: [Link](https://www.kaggle.com/centurion1986/world-population/data)

I implemented this division as well. I also based the total production value for the map only on the food consumption, not feed. This makes more sense for the visualization, I feel.

I should still implement a placeholder for the line chart if no data is available at all (some data is OK to show in the chart, but no data is not). I should also implement the checkbox system for the bar chart. And make the line chart multiseries.

# day 8

This day I was ill and didn't work.

# day 9

Today I only worked on the checkbox system, which is quite difficult to make and is still not quite working. I should finish it tomorrow.

# day 10

I managed to finish the bar chart checkboxes today. I should still make the barchart content update when I press a button, but this shouldn't be too difficult to implement. I'm happy the checkboxes are fundamentally working now.

# day 11

Finished checkbox system. Made tooltip with information for map. Line chart and bar charts show messages if no data for country.

# day 12

Added titles to charts. Commented code. Fixed bug if undefined value for bar chart. Website style improvements.

# day 13

Final changes to code.
