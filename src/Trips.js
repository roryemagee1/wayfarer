class Trips {
  constructor(data) {
    this.data = data;
  }

  dateConversion(date) {
    let splitDate = date.split('/');
    let comparisonDate = new Date(splitDate[0], splitDate[1], splitDate[2]);
    return comparisonDate;
  }

  dateConversionForDayAfter(date) {
    let splitDate = date.split('/');
    let comparisonDate = new Date(splitDate[0], splitDate[1], splitDate[2]+1);
    return comparisonDate;
  }

  dateConversionForDayBefore(date) {
    let splitDate = date.split('/');
    let comparisonDate = new Date(splitDate[0], splitDate[1], splitDate[2]-1);
    return comparisonDate;
  }

  retrieveAllTrips(traveler) {
    let result = 'No Trip data available.'
    if (this.data.trips.find(trip => trip.userID === traveler.id)) {
      result = this.data.trips.filter(trip => trip.userID === traveler.id);
    }
    return result;
  }

  retrievePastTrips(traveler, useDate) {
    let input = this.retrieveAllTrips(traveler);
    let result = input.filter(trip => (this.dateConversion(trip.date) < this.dateConversion(useDate)));
    return result;
  }

  retrieveFutureTrips(traveler, useDate) {
    let input = this.retrieveAllTrips(traveler);
    let result = input.filter(trip => (this.dateConversion(trip.date) > this.dateConversion(useDate)));
    return result;
  }

  retrievePresentAndFutureTrips(traveler, useDate) {
    let input = this.retrieveAllTrips(traveler);
    let result = input.filter(trip => (this.dateConversion(trip.date) > this.dateConversionForDayBefore(useDate)) && trip.status === "approved");
    return result;
  }

  // retrievePendingTrips(traveler, useDate) {
  retrievePendingTrips(traveler) {
    let input = this.retrieveAllTrips(traveler);
    // let result = input.filter(trip => ((this.dateConversion(trip.date) > this.dateConversion(useDate)) && (trip.status === 'pending')));
    let result = input.filter(trip => trip.status === 'pending');
    return result;
  }

  retrievePresentTrips(traveler, useDate) {
    let input = this.retrieveAllTrips(traveler);
    let result = input.filter(trip => ((this.dateConversionForDayAfter(trip.date) > this.dateConversion(useDate)) && (this.dateConversionForDayBefore(trip.date) < this.dateConversion(useDate))));
    return result;
  }

  retrieveTripsFromNow(traveler, useDate) {
    let input = this.retrieveAllTrips(traveler);
    let pastDateCuts = this.retrievePastTrips(traveler, useDate);
    let result = [];
    input.forEach(trip => {
      if (!pastDateCuts.includes(trip)) {
        result.push(trip);
      }
    })
    return result;
  }

  retrieveTripsBetweenDates(traveler, begin, end) {
    let input = this.retrieveAllTrips(traveler)
    let result = input.filter(trip => ((this.dateConversionForDayBefore(begin) < this.dateConversion(trip.date)) && (this.dateConversionForDayAfter(end) > this.dateConversion(trip.date))));
    return result;
  }

  getTodayDate() {
    let today = new Date();
    let date = today.getFullYear();
    if (today.getMonth()+1 < 10) {
      date = date + '/0' + (today.getMonth()+1);
    } else {
      date = date + '/' + (today.getMonth()+1);
    }
    if (today.getDate() < 10) {
      date = date + '/0' + (today.getDate());
    } else {
      date = date + '/' + (today.getDate());
    }
    return date;
  }

  getYearBeginDate() {
    let today = new Date();
    let begin = today.getFullYear() + '/01/01';
    return begin;
  }

  getYearEndDate() {
    let today = new Date();
    let end = today.getFullYear() + '/12/12';
    return end;
  }

  // getYearlyCostLedger(traveler, destinationData) {
  //   let begin = this.getYearBeginDate();
  //   let today = this.getTodayDate();
  //   let input = this.retrieveTripsBetweenDates(traveler, begin, today);
  //   input.reduce((acc, trip) => {
  //     let theDestination = destinationData.data.destinations.find(destination => trip.destinationID === destination.id));
  //     let obj = {};
  //     obj["tripName"] = theDestination.destination;
  //     obj["lodgingCostPerDay"] = theDestination.estimatedLodgingCostPerDay;
  //     obj["numberOfDays"] = trip.duration
  //     obj["totalLodgingCost"] = obj["lodgingCostPerDay"] * obj["numberOfDays"];
  //     obj["roundTripFlightCost"] = theDestination.estimatedFlightCostPerPerson * 2;
  //     obj["totalGuests"] = trip.travelers;
  //     obj["totalFlightCost"] = obj["roundTripFlightCost"] * obj["totalGuests"];
  //     obj
  //   }, []);
  // }

  // getCostLedger(tripID, destinationData) {
  //   let theTrip = this.data.trips.find(trip => trip.id === tripID);
  //   let theDestination = destinationData.data.destinations.find(destination => theTrip.destinationID === destination.id);
  //   let obj = {};
  //   console.log(theDestination);
  //   // obj["tripName"] = theDestination.destination;
  //   // obj["lodgingCostPerDay"] = theDestination.estimatedLodgingCostPerDay;
  //   // obj["numberOfDays"] = theTrip.duration
  //   // obj["totalLodgingCost"] = obj["lodgingCostPerDay"] * obj["numberOfDays"];
  //   // obj["roundTripFlightCost"] = theDestination.estimatedFlightCostPerPerson * 2;
  //   // obj["totalGuests"] = theTrip.travelers;
  //   // obj["totalFlightCost"] = obj["roundTripFlightCost"] * obj["totalGuests"];
  //   // obj["subTotal"] = obj["totalLodgingCost"] + obj["totalFlightCost"];
  //   // obj["agentPercentage"] = 0.1;
  //   // obj["agentFee"] = obj["subTotal"] * obj["agentPercentage"];
  //   // obj["totalCost"] = obj["subTotal"] + obj["agentFee"];
  //   // console.log(obj);
  //   // return obj;
  // }

  getTotalSpent(traveler, destinationData) {
    let begin = this.getYearBeginDate();
    let today = this.getTodayDate();
    let input = this.retrieveTripsBetweenDates(traveler, begin, today);
    let result = input.reduce((acc, trip) => {
      let theDestination = destinationData.data.destinations.find(destination => trip.destinationID === destination.id);
      let total = 0;
      total += (theDestination.estimatedLodgingCostPerDay * trip.duration)
      total += (theDestination.estimatedFlightCostPerPerson * trip.travelers) * 2;
      total * 1.1;
      acc += total;
      return acc;
    }, 0);
    return result;
  }

}

export default Trips;
