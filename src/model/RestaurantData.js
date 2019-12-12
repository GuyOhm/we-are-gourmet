class RestaurantData {
  constructor(json) {
    this.ratings = [];
    this.initData(json);
  }

  initData(json) {
    this.place_id = json.place_id;
    this.name = json.name;
    this.position = {
      lat: json.geometry.location.lat(),
      lng: json.geometry.location.lng()
    }
    this.averageRating = json.rating;
    this.nbOfVotes = json.user_ratings_total;
  }
}

export default RestaurantData;