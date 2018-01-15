import csv
import os

# constants for total amount of years in dataset and first year
YEARS = 53
FIRST_YEAR = 1961

# dict with country abbreveations as keys and lists with production over the years as values
productionDict = {}

with open(os.path.relpath("../doc/dataset.csv"), encoding='latin-1') as file:
    reader = csv.reader(file)

    # variable that contains descriptions (first row of csv) of columns
    columnDescriptions = next(reader)

    # preparations for first country
    row1 = next(reader)
    countryCode = row1[0]
    curRow = row1

    # iterate over every row in CSV
    while not curRow == []:

        # list with total production data per year for current country
        productionList = []

        # initialize productions list with zero's for every year
        for i in range(YEARS):
            productionList.append(0)

        # while still reading rows about current country, calculate total production per year
        while curRow[0] == countryCode:

            # iterate over values in current row
            for i in range(len(curRow)):

                # store current country abbrevation in variable
                if columnDescriptions[i] == 'Area Abbreviation':
                    curCountry = curRow[i]

                # if column has information about production and contains information about product group
                if columnDescriptions[i][:1] == 'Y' and curRow[3][:2] == '29':

                    # convert year to list index and update list (only if value in current field)
                    index = int(columnDescriptions[i][-4:]) - FIRST_YEAR
                    if curRow[i]:
                        productionList[index] += int(curRow[i])

            # advance to next row in CSV, unless end of file reached
            try:
                curRow = next(reader)
            except StopIteration:
                curRow = []
                break

        # print current country's code and production list
        # print(countryCode)
        # print(productionList)

        productionDict[countryCode] = productionList
        print(productionDict)

        # advance to next country in CSV, unless end of file reached
        if curRow:
            countryCode = curRow[0]
        else:
            break

with open(os.path.relpath("../doc/total_production.csv"), 'w') as outfile:
    writer = csv.writer(outfile)

    # write first line of CSV with column descriptions
    row0 = "Country_code"
    for i in range(YEARS):
        row0 += " Y" + str(i + FIRST_YEAR)
    writer.writerow(row0.split())

    # write rows with country production info to CSV
    for key, productionList in productionDict.items():
        row = key
        for value in productionList:
            row += " " + str(value)
        writer.writerow(row.split())
