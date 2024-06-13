"""

Python function to convert file til csv format. needs further development before implementing

"""
import csv

data = []

filename = "memorydump.csv"

with open(filename, "w", newline" ") as csvfile:
    csv.writer = csv.writer(csvfile)

    csvwriter.writerows(data)