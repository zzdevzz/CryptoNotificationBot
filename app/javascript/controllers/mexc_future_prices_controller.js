import { Controller } from "@hotwired/stimulus";
import axios from "axios";

// Connects to data-controller="mexc-future-prices"
export default class extends Controller {
  static targets = ["price"]; // Define targets for Stimulus

  hoursAgoUnix(hours){  // Replace x with the number of hours
    const timeXHoursAgoInSeconds = Math.floor((Date.now() - (hours * 60 * 60 * 1000)) / 1000);
    return timeXHoursAgoInSeconds
  }

  currentTimeUnix(){
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    return currentTimeInSeconds
  }

  connect() {
    console.log("mexc controller connected")
    // this.test()
    this.getAllTickers()
  }

  organizeDataByDate(jsonData) {
    const organizedData = {};

    jsonData.data.time.forEach((timestamp, index) => {
      const date = new Date(timestamp * 1000).toLocaleDateString(); // Convert to human-readable date
      organizedData[date] = {
        open: jsonData.data.open[index],
        close: jsonData.data.close[index],
        high: jsonData.data.high[index],
        low: jsonData.data.low[index],
        volume: jsonData.data.vol[index],
        amount: jsonData.data.amount[index],
        realOpen: jsonData.data.realOpen[index],
        realClose: jsonData.data.realClose[index],
        realHigh: jsonData.data.realHigh[index],
        realLow: jsonData.data.realLow[index]
      };
    });

    return organizedData;
  }

  async test(){
    try {
      const response = await axios.get('/data/data.json');
      const jsonData = response.data;
      console.log("Loaded JSON data:", jsonData);

      // Organize data by date
      const organizedData = this.organizeDataByDate(jsonData);
      console.log("Organized Data:", organizedData);
    } catch (error) {
      console.error('Error loading JSON:', error);
    }
  }

  async getAllTickers(){
    const tickers = {}
    try {
      const response = await axios.get('/data/tickers.json')
      // console.log(response)
      const jsonData = response.data
      // console.log("Tickers: ", jsonData)
      const tickets = jsonData.data
      console.log(tickets)
    } catch(error){
      console.error('Error loading JSON:', error);
    }
  }

}
