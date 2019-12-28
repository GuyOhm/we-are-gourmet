class RestaurantData {
  constructor(json) {
    this.ratings = [];
    this.initData(json);
  }

  initData(json) {
    this.place_id = json.place_id;
    this.name = json.name;
    this.address = json.vicinity;
    this.position = {
      lat: json.geometry.location.lat(),
      lng: json.geometry.location.lng()
    }
    this.averageRating = json.rating;
    this.nbOfVotes = json.user_ratings_total;
  }

  updateAverageRatingData(newRating) {
    const newAverage = (this.nbOfVotes * this.averageRating + newRating) / (this.nbOfVotes + 1);
    this.averageRating = Math.round(newAverage * 100) / 100;
    this.nbOfVotes += 1;
  }
}

export default RestaurantData;