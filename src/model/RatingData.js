class RatingData {
  constructor(ratingJson) {
    this.initData(ratingJson);
  }

  initData(ratingJson) {
    this.name = ratingJson.author_name;
    this.rating = ratingJson.rating;
    this.comment = ratingJson.text;
  }

}

export default RatingData;