class RatingData {
  constructor(ratingJson) {
    this.initData(ratingJson);
  }

  initData(ratingJson) {
    this.name = ratingJson.author_name;
    this.pic = ratingJson.profile_photo_url;
    this.rating = ratingJson.rating;
    this.comment = ratingJson.text;
  }

}

export default RatingData;