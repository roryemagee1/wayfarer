class Trips {
  constructor(data) {
    this.data = data;
  }

  dateConversion(date) {
    let splitDate = date.split('/');
    // console.log(splitDate);
    let comparisonDate = new Date(splitDate[0], splitDate[1], splitDate[2]);
    // console.log(comparisonDate);
    return comparisonDate;
  }

  dateConversionForPresentAfter(date) {
    let splitDate = date.split('/');
    // console.log(splitDate);
    let comparisonDate = new Date(splitDate[0], splitDate[1], splitDate[2]+1);
    // console.log(comparisonDate);
    return comparisonDate;
  }

  dateConversionForPresentBefore(date) {
    let splitDate = date.split('/');
    // console.log(splitDate);
    let comparisonDate = new Date(splitDate[0], splitDate[1], splitDate[2]-1);
    // console.log(comparisonDate);
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
    let input = this.retrieveAllTrips(param);
    let result = input.filter(trip => (this.dateConversion(trip.date) < this.dateConversion(useDate)));
    return result;
  }

  retrieveFutureTrips(param, useDate) {
    let input = this.retrieveAllTrips(param);
    let result = input.filter(trip => (this.dateConversion(trip.date) > this.dateConversion(useDate)));
    return result;
  }

  retrievePendingTrips(param, useDate) {
    let input = this.retrieveAllTrips(param);
    let result = input.filter(trip => ((this.dateConversion(trip.date) > this.dateConversion(useDate)) && (trip.status === 'pending')));
    return result;
  }

  retrievePresentTrips(param, useDate) {
    let input = this.retrieveAllTrips(param);
    let result = input.filter(trip => ((this.dateConversionForPresentAfter(trip.date) > this.dateConversion(useDate)) && (this.dateConversionForPresentBefore(trip.date) < this.dateConversion(useDate))));
    return result;
  }

  retrieveTripsFromNow(param, useDate) {
    let input = this.retrieveAllTrips(param);
    let pastDateCuts = this.retrievePastTrips(param, useDate);
    let result = [];
    input.forEach(trip => {
      if (!pastDateCuts.includes(trip)) {
        result.push(trip);
      }
    })
    return result;
  }

}

export default Trips;
