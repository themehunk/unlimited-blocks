import { decodeEntities } from "@wordpress/html-entities";
import { __ } from "@wordpress/i18n";
const { apiFetch } = wp;
/**
 * this api setting for product ---------------------------------------------------
 */
export const productDataInit = (data = {}) => {
  let sendData = data;
  return apiFetch({
    path: "/unlimited-blocks-product-api/v3/product/",
    method: "POST",
    data: sendData,
  })
    .then((postsData) => {
      return postsData;
    })
    .catch((error) => console.error(error));
};
// //<<<<<<<<<<<-------->>>>>>>>>>>>>>
// export const filterProductInit = async (this_, data_ = {}) => {
//   let argData = data_;
//   //number of post
//   if (!("numberOfPosts" in argData)) {
//     argData["numberOfPosts"] = this_.props.attributes.numberOfPosts;
//   }
//   // choose category
//   let categoryIes =
//     "product_cate" in argData
//       ? argData.product_cate
//       : this_.props.attributes.product_cate;
//   if (categoryIes) {
//     argData["product_cate"] = categoryIes.join(",");
//   }
//   // featured image
//   if ("featured_image" in argData && argData.featured_image == "1") {
//     argData["featured_image"] = 1;
//   }
//   let postData = await productDataInit(argData);
//   if (postData) {
//     // all posts
//     if ("posts" in postData && postData.posts != "") {
//       let posts_ = postData.posts;
//       this_.setState({ posts: posts_ });
//     } else {
//       this_.setState({ posts: null });
//     }
//     //total post
//     if ("totalPost" in postData && postData.totalPost != "") {
//       let totalPost_ = postData.totalPost;
//       this_.setState({ totalPost: totalPost_ });
//     } else {
//       this_.setState({ totalPost: null });
//     }
//   }
// };
//<<<<<<<<<<<-------->>>>>>>>>>>>>>
export const firstTimeInitProduct = async (this_, data_ = {}) => {
  let { numberOfPosts, product_cate } = this_.props.attributes;
  let sendData = {
    initialize: 1,
    numberOfPosts: numberOfPosts,
  };
  // featured image
  if ("featured_image" in data_) {
    sendData["featured_image"] = 1;
  }
  // choose category
  if (product_cate.length) {
    sendData["product_cate"] = product_cate.join(",");
  }
  let postData = await productDataInit(sendData);
  console.log("postData->", postData);
  if (postData) {
    // // all posts
    if ("posts" in postData && postData.posts != "") {
      let posts_ = postData.posts;
      this_.setState({ posts: posts_ });
    } else {
      this_.setState({ posts: null });
    }
    // //all categories
    if ("category" in postData && postData.category != "") {
      let category_ = postData.category;
      if (category_ instanceof Object && Object.keys(category_).length) {
        let setobjasArray = [];
        for (let objKey in category_) {
          setobjasArray.push(category_[objKey]);
        }
        this_.setState({ category: setobjasArray });
      } else {
        this_.setState({ category: category_ });
      }
    } else {
      this_.setState({ category: null });
    }
    // //total post
    if ("totalPost" in postData && postData.totalPost != "") {
      let totalPost_ = postData.totalPost;
      this_.setState({ totalPost: totalPost_ });
    } else {
      this_.setState({ totalPost: null });
    }
  }
};
/**
 * this api setting for product end ---------------------------------------------------
 */
