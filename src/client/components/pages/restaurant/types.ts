import { Product_info, Rating } from "../../../../server/models/product";
import { Review_info } from "../../../../server/models/review";

export interface Restaurant_data {
  _id: string;
  name: string;
  image_src: string;
  average_rating: Rating;
  reviews: Review_info[];
  products: Product_info[];
}
