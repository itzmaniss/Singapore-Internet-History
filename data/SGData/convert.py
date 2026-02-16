import json
import csv
import sys

def main():
    file_in = sys.argv[1] 
    file_out = sys.argv[2]

    with open(file_in, "r") as file:
        reader = csv.DictReader(file, delimiter = ",")
        data = list(reader)
    with open(file_out, "w") as file:
        json.dump(data, file, indent=4)

if __name__ == "__main__":
    main()
