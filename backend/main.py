from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from utils import getData
import zipfile
import pandas as pd

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

months = {
    "JANUARY": "01",
    "FEBRUARY": "02",
    "MARCH": "03",
    "APRIL": "04",
    "MAY": "05",
    "JUNE": "06",
    "JULY": "07",
    "AUGUST": "08",
    "SEPTEMBER": "09",
    "OCTOBER": "10",
    "NOVEMBER": "11",
    "DECEMBER": "12",
}


@app.post("/getEmissions")
def emissions(file: UploadFile = File(...)):
    contents = file.file.read()
    with open(file.filename, "wb") as f:
        f.write(contents)

    d = {}
    with zipfile.ZipFile(file.filename, "r") as f:
        for x in f.namelist():
            if x.startswith("Takeout/Location History/Semantic Location History"):
                year = x[51:55]
                if year not in d:
                    d[year] = {}
                month = x[61:-5]
                dPerT = {}
                ePerT = {}
                tD = 0
                tE = 0
                if month not in d[year]:
                    d[year][f"{months[month]}-{month}"] = {"days": []}
                with f.open(x) as file:
                    data = getData(file)
                    for day in data:
                        tD += data[day]["totalDistance"]
                        tE += data[day]["totalEmissions"]
                        for t in data[day]["totalDistancePerType"]:
                            if t not in dPerT:
                                dPerT[t] = 0
                                ePerT[t] = 0
                            dPerT[t] += data[day]["totalDistancePerType"][t]
                            ePerT[t] += data[day]["totalEmissionsPerType"][t]
                    d[year][f"{months[month]}-{month}"]["days"].append(data)
                    d[year][f"{months[month]}-{month}"]["totalDistance"] = tD
                    d[year][f"{months[month]}-{month}"]["totalEmissions"] = tE
                    d[year][f"{months[month]}-{month}"]["totalDistancePerType"] = dPerT
                    d[year][f"{months[month]}-{month}"]["totalEmissionsPerType"] = ePerT

    return d
