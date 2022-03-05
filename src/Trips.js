class Trips {
  constructor(data) {
    this.data = data;
  }

  dateConversion(date) {
    let splitDate = date.split('/')
    console.log(splitDate);
    let comparisonDate = new Date(splitDate[0], splitDate[1], splitDate[2]);
    console.log(comparisonDate);
    return comparisonDate;
  }

  retrieveAllTrips(param) {
    let result = "No Trip data available."
    if (this.data.trips.find(trip => trip.userID === param)) {
      result = this.data.trips.filter(trip => trip.userID === param);
    }
    return result;
  }

  retrievePastTrips(param, useDate) {
    let result = this.retrieveAllTrips(param);

  }


}

export default Trips;
