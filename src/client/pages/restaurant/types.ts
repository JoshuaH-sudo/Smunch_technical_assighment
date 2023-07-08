import { Product } from "../product/Product_details";
import { Comment_info } from "./Comment_display";
import { Rating } from "./Rating_display";

export interface Restaurant {
  id: string;
  name: string;
  image_src: string;
  average_rating: Rating;
  comments: Comment_info[];
  products: Product[];
}
