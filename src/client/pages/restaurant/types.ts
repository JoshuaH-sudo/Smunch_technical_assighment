import { Product } from "../product/Product_details";
import { Comment_info } from "./Comment_display";
import { Rating } from "./Rating_display";

export interface Restaurant_data {
  id: string;
  name: string;
  image_src: string;
  average_rating: Rating;
  comments: Comment_info[];
  products: Product[];
}

// export const DUMMY_DATA: Restaurant_data[] = [
//     {
//       id: "1",
//       name: "Cool Bakery",
//       image_src:
//         "https://upload.wikimedia.org/wikipedia/commons/7/77/MagasinDandoy.jpg",
//       average_rating: 3,
//       comments: [
//         {
//           username: "bread_man",
//           timestamp_date: moment().subtract(3, "days").toString(),
//           rating: 3,
//           title: "BREAD!",
//           review: "BREAD BREAD",
//         },
//       ],
//       products: [DUMMY_PRODUCT, DUMMY_PRODUCT, DUMMY_PRODUCT],
//     },
//     {
//       id: "2",
//       name: "Cool Bakery",
//       image_src:
//         "https://upload.wikimedia.org/wikipedia/commons/7/77/MagasinDandoy.jpg",
//       average_rating: 0,
//       comments: [
//         {
//           username: "josh",
//           rating: 0,
//           timestamp_date: moment().subtract(1, "day").toString(),
//           title: "I want to speak with the manager",
//           review: "Where is the gluten free food!?",
//         },
//       ],
//       products: [DUMMY_PRODUCT],
//     },
//   ];
