let tripsTestData = {
  "trips": [
    {"id":1,"userID":44,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]},
    {"id":2,"userID":35,"destinationID":25,"travelers":5,"date":"2022/10/04","duration":18,"status":"approved","suggestedActivities":[]},
    {"id":3,"userID":3,"destinationID":22,"travelers":4,"date":"2022/05/22","duration":17,"status":"approved","suggestedActivities":[]},
    {"id":4,"userID":43,"destinationID":14,"travelers":2,"date":"2022/02/25","duration":10,"status":"approved","suggestedActivities":[]}
  ]
}

let oneTrip = {"id":1,"userID":44,"destinationID":49,"travelers":1,"date":"2022/09/16","duration":8,"status":"approved","suggestedActivities":[]};

let travelersTestData = {
  "travelers": [
    {"id":1,"name":"Ham Leadbeater","travelerType":"relaxer"},
    {"id":2,"name":"Rachael Vaughten","travelerType":"thrill-seeker"},
    {"id":3,"name":"Sibby Dawidowitsch","travelerType":"shopper"},
    {"id":4,"name":"Leila Thebeaud","travelerType":"photographer"}
  ]
}

let oneTraveler = {"id":1,"name":"Ham Leadbeater","travelerType":"relaxer"};

export {tripsTestData, oneTrip, travelersTestData, oneTraveler};
