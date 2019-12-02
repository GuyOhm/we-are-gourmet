class RatingData {
  constructor(ratingJson) {
    this.initData(ratingJson);
  }

  initData(ratingJson) {
    this.stars = ratingJson.stars;
    this.comment = ratingJson.comment;
  }

}

export default RatingData;