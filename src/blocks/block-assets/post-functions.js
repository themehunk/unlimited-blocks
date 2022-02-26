import { decodeEntities } from "@wordpress/html-entities";
import { __ } from "@wordpress/i18n";

const { apiFetch } = wp;

/**
 * this api setting for post
 */

//<<<<<<<<<<<-------->>>>>>>>>>>>>>
export const postDataInit = (data = {}) => {
  let sendData = data;
  return apiFetch({
    path: "/unlimited-blocks-post-api/v3/posts/",
    method: "POST",
    data: sendData,
  })
    .then((postsData) => {
      return postsData;
    })
    .catch((error) => console.error(error));
};
//<<<<<<<<<<<-------->>>>>>>>>>>>>>
export const filterPostInit = async (this_, data_ = {}) => {
  let argData = data_;
  //number of post
  if (!("numberOfPosts" in argData)) {
    argData["numberOfPosts"] = this_.props.attributes.numberOfPosts;
  }
  // choose category
  let categoryIes =
    "postCategories" in argData
      ? argData.postCategories
      : this_.props.attributes.postCategories;
  if (categoryIes) {
    argData["postCategories"] = categoryIes.join(",");
  }
  // featured image
  if ("featured_image" in argData && argData.featured_image == "1") {
    argData["featured_image"] = 1;
  }
  let postData = await postDataInit(argData);
  if (postData) {
    // all posts
    if ("posts" in postData && postData.posts != "") {
      let posts_ = postData.posts;
      this_.setState({ posts: posts_ });
    } else {
      this_.setState({ posts: null });
    }
    //total post
    if ("totalPost" in postData && postData.totalPost != "") {
      let totalPost_ = postData.totalPost;
      this_.setState({ totalPost: totalPost_ });
    } else {
      this_.setState({ totalPost: null });
    }
  }
};
//<<<<<<<<<<<-------->>>>>>>>>>>>>>
export const firstTimeInit = async (this_, data_ = {}) => {
  let { numberOfPosts, postCategories } = this_.props.attributes;
  let sendData = {
    initialize: 1,
    numberOfPosts: numberOfPosts,
  };
  // featured image
  if ("featured_image" in data_) {
    sendData["featured_image"] = 1;
  }
  // choose category
  if (postCategories) {
    sendData["postCategories"] = postCategories.join(",");
  }
  let postData = await postDataInit(sendData);

  if (postData) {
    // all posts
    if ("posts" in postData && postData.posts != "") {
      let posts_ = postData.posts;
      this_.setState({ posts: posts_ });
    } else {
      this_.setState({ posts: null });
    }
    //all categories
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
    //total post
    if ("totalPost" in postData && postData.totalPost != "") {
      let totalPost_ = postData.totalPost;
      this_.setState({ totalPost: totalPost_ });
    } else {
      this_.setState({ totalPost: null });
    }
  }
};
//<<<<<<<<<<<-------->>>>>>>>>>>>>>
export const excerptWords = (words, words_) => {
  words_ = decodeEntities(words_);
  words_ = words_.replace(/<\/?[^>]+(>|$)/g, "");
  words_ = words_.split(" ");
  words_ = words_.slice(0, words);
  words_ = words_.join(" ");
  // words_ = decodeEntities(words_);
  return words_;
};
//<<<<<<<<<<<-------->>>>>>>>>>>>>>
export const showCateFn = (this_props, categories, cate_) => {
  if (categories && categories instanceof Array && categories.length > 0) {
    let copiedCate = [...categories];
    let countCate = cate_.count;
    if (countCate < copiedCate.length) {
      let filterChoosen = this_props.attributes.postCategories;
      if (
        filterChoosen.length > 0 &&
        filterChoosen.length < copiedCate.length
      ) {
        filterChoosen.map((cateSlug) => {
          let getIndex = copiedCate.findIndex((slug_) => {
            if (slug_ && "slug" in slug_) {
              return slug_.slug == cateSlug;
            }
          });
          if (getIndex && getIndex + 1 > countCate) {
            delete copiedCate[getIndex];
            copiedCate.unshift({ name: cateSlug });
          }
        });
      }
    }
    let putCateStyle = { fontSize: cate_.fontSize + "px" };
    if (cate_.customColor) {
      putCateStyle["color"] = cate_.color;
      putCateStyle["backgroundColor"] = cate_.backgroundColor;
    }
    copiedCate.splice(countCate);
    return copiedCate.map((returnH) => (
      <span style={putCateStyle}>{returnH.name}</span>
    ));
  }
};
//<<<<<<<<<<<-------->>>>>>>>>>>>>>
export const showTagsFn = (tags_, tag_r) => {
  if (tags_ && tags_ instanceof Array && tags_.length) {
    let putTagStyle = { color: tag_r.color };
    putTagStyle["color"] = tag_r.color;
    putTagStyle["backgroundColor"] = tag_r.backgroundColor;
    putTagStyle["fontSize"] = tag_r.fontSize + "px";
    let countTag = tag_r.count;
    let tagCopied = [...tags_];
    tagCopied.splice(countTag);
    return tagCopied.map((returnH) => (
      <span style={putTagStyle}>{returnH.name}</span>
    ));
  }
};

/**
 * this api setting for post end ---------------------------------------------------
 */

//<<<<<<<<<<<-------->>>>>>>>>>>>>>
export const PostLoader = ({ msg }) => {
  msg = msg
    ? __(msg, "unlimited-blocks")
    : __("Post Loading...", "unlimited-blocks");
  return (
    <div className="post-loader">
      <div className="active linear-bubble ubl-block-loader">
        {msg}
        <div>
          <span></span>
        </div>
      </div>
    </div>
  );
};
//<<<<<<<<<<<-------->>>>>>>>>>>>>>

export const PostNotfound = ({ msg }) => {
  msg = msg
    ? __(msg, "unlimited-blocks")
    : __("No Post Found", "unlimited-blocks");
  return (
    <div className="no-post-found">
      <p>{msg}</p>
    </div>
  );
};
//<<<<<<<<<<<-------->>>>>>>>>>>>>>
export const UBLGraDientColors = [
  {
    name: __("ubl color 1", "unlimited-blocks"),
    gradient:
      "linear-gradient(135deg, rgb(6, 147, 227) 0%, rgb(155, 81, 224) 100%)",
  },
  {
    name: __("ubl color 2", "unlimited-blocks"),
    gradient:
      "linear-gradient(135deg, rgb(255, 203, 112) 0%, rgb(199, 81, 192) 50%, rgb(65, 88, 208) 100%)",
  },
  {
    name: __("ubl color 3", "unlimited-blocks"),
    gradient:
      "linear-gradient(135deg, rgb(74, 234, 220) 0%, rgb(151, 120, 209) 20%, rgb(207, 42, 186) 40%, rgb(238, 44, 130) 60%, rgb(251, 105, 98) 80%, rgb(254, 248, 76) 100%)",
  },
  {
    name: __("ubl color 4", "unlimited-blocks"),
    gradient:
      "linear-gradient(135deg, rgb(2, 3, 129) 0%, rgb(40, 116, 252) 100%)",
  },
  {
    name: __("Vivid cyan blue to vivid purple", "unlimited-blocks"),
    gradient:
      "linear-gradient(135deg,rgba(6,147,227,1) 0%,rgb(155,81,224) 100%)",
  },
  {
    name: __("Vivid green cyan to vivid cyan blue", "unlimited-blocks"),
    gradient:
      "linear-gradient(135deg,rgba(0,208,132,1) 0%,rgba(6,147,227,1) 100%)",
  },
  {
    name: __("Light green cyan to vivid green cyan", "unlimited-blocks"),
    gradient: "linear-gradient(135deg,rgb(122,220,180) 0%,rgb(0,208,130) 100%)",
  },
  {
    name: __(
      "Luminous vivid amber to luminous vivid orange",
      "unlimited-blocks"
    ),
    gradient:
      "linear-gradient(135deg,rgba(252,185,0,1) 0%,rgba(255,105,0,1) 100%)",
  },
  {
    name: __("Luminous vivid orange to vivid red", "unlimited-blocks"),
    gradient:
      "linear-gradient(135deg,rgba(255,105,0,1) 0%,rgb(207,46,46) 100%)",
  },
  // new added
  {
    name: __("ubl color 6", "unlimited-blocks"),
    gradient: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
  },

  {
    name: __("ubl color 7", "unlimited-blocks"),
    gradient: "linear-gradient(180deg, #2AF598 0%, #009EFD 100%)",
  },
  {
    name: __("ubl color 8", "unlimited-blocks"),
    gradient: "linear-gradient(to top, #F43B47 0%, #453A94 100%)",
  },
  {
    name: __("ubl color 10", "unlimited-blocks"),
    gradient: "linear-gradient(to top, #CC208E 0%, #6713D2 100%)",
  },

  {
    name: __("ubl color 11", "unlimited-blocks"),
    gradient:
      "linear-gradient( 67.2deg,  rgba(37,208,199,1) -7.5%, rgba(165,90,240,1) 62.7% )",
  },
  {
    name: __("ubl color 12", "unlimited-blocks"),
    gradient: "linear-gradient(to top, #E6E9F0 0%, #EEF1F5 100%)",
  },
  {
    name: __("ubl color 13", "unlimited-blocks"),
    gradient: "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)",
  },
  {
    name: __("ubl color 14", "unlimited-blocks"),
    gradient:
      "linear-gradient(to right top, #051937, #004D7A, #008793, #00BF72, #A8EB12)",
  },
];

//<<<<<<<<<<<-------->>>>>>>>>>>>>>
export const UblColorPlates = [
  { name: "Color: Black", color: "rgb(0, 0, 0)" },

  { name: "Color: Cyan bluish gray", color: "rgb(171, 184, 195)" },

  { name: "Color: White", color: "rgb(255, 255, 255)" },

  { name: "Color: Pale pink", color: "rgb(247, 141, 167)" },

  { name: "Color: Vivid red", color: "rgb(207, 46, 46)" },

  { name: "Color: Luminous vivid orange", color: "rgb(255, 105, 0)" },

  { name: "Color: Luminous vivid amber", color: "rgb(252, 185, 0)" },

  { name: "Color: Light green cyan", color: "rgb(123, 220, 181)" },

  { name: "Color: Vivid green cyan", color: "rgb(0, 208, 132)" },

  { name: "Color: Pale cyan blue", color: "rgb(142, 209, 252)" },

  { name: "Color: Vivid cyan blue", color: "rgb(6, 147, 227)" },

  { name: "Color: Vivid purple", color: "rgb(155, 81, 224)" },
];
