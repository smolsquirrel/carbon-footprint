import json

emissions = {
    "IN_PASSENGER_VEHICLE": 192,
    "IN_VEHICLE": 192,
    "FLYING": 255,
    "IN_BUS": 105,
    "IN_TRAIN": 41,
    "IN_FERRY": 19,
    "IN_SUBWAY": 78,
    "MOTORCYCLING": 103,
    "IN_TRAM": 78,
    "WALKING": 0,
    "CYCLING": 0,
    "STILL": 0,
    "SKIING": 0,
}


def formatDate(date):
    return f"{date[:10]} {date[11:-1]}"


def formatActivty(x):
    y = {}
    y["start"] = formatDate(x["duration"]["startTimestamp"])
    y["end"] = formatDate(x["duration"]["endTimestamp"])
    y["distance"] = x["distance"]
    y["type"] = x["activityType"]
    if y["type"] in emissions:
        y["emissions"] = emissions[y["type"]] * (int(y["distance"]) / 1000)
    else:
        y["emissions"] = emissions["IN_VEHICLE"] * (int(y["distance"]) / 1000)
    return y


def getData(f):
    data = json.loads(f.read().decode("utf-8"))
    timeline = data["timelineObjects"]
    activity = [x for x in timeline if "activitySegment" in x]
    days = {}
    for x in activity:
        segment = x["activitySegment"]
        date = segment["duration"]["startTimestamp"][:10]
        if "distance" not in segment:
            continue
        if "activityType" not in segment:
            segment["activityType"] = segment["activities"][0]["activityType"]
        if segment["activityType"] == "UNKNOWN_ACTIVITY_TYPE":
            continue
        newData = formatActivty(segment)

        if date not in days:
            days[date] = {
                "activity": [],
                "totalDistance": 0,
                "totalEmissions": 0,
                "totalDistancePerType": {},
                "totalEmissionsPerType": {},
            }

        days[date]["activity"].append(newData)
        days[date]["totalDistance"] += newData["distance"]
        days[date]["totalEmissions"] += newData["emissions"]

        if newData["type"] not in days[date]["totalDistancePerType"]:
            days[date]["totalDistancePerType"][newData["type"]] = 0

        if newData["type"] not in days[date]["totalEmissionsPerType"]:
            days[date]["totalEmissionsPerType"][newData["type"]] = 0

        days[date]["totalDistancePerType"][newData["type"]] += newData["distance"]
        days[date]["totalEmissionsPerType"][newData["type"]] += newData["emissions"]
    return days
