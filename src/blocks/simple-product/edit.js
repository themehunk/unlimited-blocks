import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import OwlCarousel from "react-owl-carousel";
// import { decodeEntity } from "html-entities";
import { decode } from "html-entities";

// const result = decodeEntities( '&aacute;' );

import {
  InspectorControls,
  RichText,
  ColorPalette,
} from "@wordpress/block-editor";
import {
  PanelBody,
  RangeControl,
  ToggleControl,
  SelectControl,
  ColorPicker,
  __experimentalGradientPicker as GradientPicker,
} from "@wordpress/components";
import {
  // showCateFn,
  // showTagsFn,
  // excerptWords,
  // filterPostInit,
  firstTimeInitProduct,
  // categoryList,
  // PostNotfound,
  // PostLoader,
  // UBLGraDientColors,
} from "../block-assets/woocommerce/product-functions";
import ProductCategory from "../block-assets/woocommerce/productCategory";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // pages state from post
      posts: [],
      category: [],
      totalPost: null,
    };
  }
  componentDidMount() {
    let sendData = { featured_image: 1 };
    firstTimeInitProduct(this, sendData);
  }
  updateObj = (parent_key, child_key, initialValue, value_) => {
    let newNewValue = [...initialValue];
    newNewValue[0][child_key] = value_;
    let setAttr_ = {};
    setAttr_[parent_key] = newNewValue;
    this.props.setAttributes(setAttr_);
  };
  render() {
    // ++++++++++++++===============

    console.log("product props", this.props);
    console.log("product state", this.state);
    // const {} = this.state;
    const { attributes, setAttributes } = this.props;
    // const { posts, category, totalPost } = this.state;
    let { product_cate, numberOfPosts, numberOfColumn } = attributes;
    // let heading_ = heading[0];
    // let thumbnail_ = thumbnail[0];
    // let excerpt_ = excerpt[0];
    // let date_ = date[0];
    // let author_ = author[0];
    // let meta_style_ = meta_style[0];
    // let title_ = title[0];
    // let showTag_ = showTag[0];
    // let showCate_ = showCate[0];
    // let layout_ = layout[0];
    // // category init
    // let cateGory = [];
    // if (!category) {
    //   cateGory = false;
    // } else {
    //   cateGory = categoryList(category);
    // }
    const slider_options_ = {
      items: numberOfColumn,
      // nav: true,
      // navText: [
      //   "<div class='ul-kk nav-btn prev-slide'>Prev</div>",
      //   "<div class='ul-kk nav-btn next-slide'>Next</div>",
      // ],
    };

    const OwlSlider = () => (
      <OwlCarousel className="owl-theme" {...slider_options_}>
        {this.state.posts.map((val_) => (
          <div className="item">{this.returnHtml(val_)}</div>
        ))}
      </OwlCarousel>
    );

    return (
      <>
        <InspectorControls>
          <PanelBody initialOpen={true}>
            <p>
              <strong>{__("Number of Column", "unlimited-blocks")}</strong>
            </p>
            <RangeControl
              value={numberOfColumn}
              min={1}
              max={24}
              onChange={(e) => {
                setAttributes({ numberOfColumn: e });
              }}
            />
            <p>
              <strong>
                {__("Number of Post Display", "unlimited-blocks")}
              </strong>
            </p>
            <RangeControl
              value={numberOfPosts}
              min={1}
              max={24}
              onChange={(e) => {
                setAttributes({ numberOfPosts: e });
              }}
            />

            <ProductCategory
              value={product_cate}
              category={this.state.category}
              onMovement={(category) => {
                setAttributes({ product_cate: category });
              }}
            />
          </PanelBody>
        </InspectorControls>
        <div>
          <h1>hello product editor</h1>
          {this.state.posts.length ? <OwlSlider /> : ""}
        </div>
      </>
    );
    // ++++++++++++++===============
  }
  returnHtml = (postAttr) => {
    return (
      <div className="elemento-product-outer-wrap">
        <div className="elemento-product-simple-inner-wrap">
          {postAttr.sale ? postAttr.sale : ""}

          <a href="#" className="elemento-addons-quickview-simple">
            {__("Quick View", "unlimited-blocks")}
          </a>
          <a class="img_" href="#" target="_blank">
            {postAttr.product_image}
          </a>
          <a class="elemento-addons-product-title" href="#" target="_blank">
            {postAttr.product_title}
          </a>
          {postAttr.rating ? postAttr.rating : ""}
        </div>
      </div>
    );
  };
}
export default Edit;

// $salePrice = $regularPrice - $currentPrice;
//             // $saleText = __('Sale', 'elemento-addons');
//             $currency_ = get_woocommerce_currency_symbol();
//             $ps_sale = '<div class="elemento-addons-sale">
//                         <span class="elemento-addons-sale-tag">-' . $currency_ . $salePrice . '</span>
//                     </div>';

// $productHtml .= $ps_sale;
// $productHtml .= '<a class="img_" href="' . get_permalink($productId) . '" target="_blank">
//                           ' . $product->get_image() . '
//                           </a>';

// $productHtml .= '<a class="elemento-addons-product-title" href="' . get_permalink($productId) . '" target="_blank">' . $product->get_name() . '</a>';
// $productHtml .= $ratingHtml ? '<div class="elemento-addons-rating">' . $ratingHtml . '</div>' : '';
// // add to cart
// $productHtml .=  $price;
// $productHtml .=  '</div>';
// ------------------------------------------------
// $productHtml .=  "<div class='elemento-product-simple-inner-bottom'>";
// $productHtml .=  $addToCart;
// if ($wishlist_ || $compare_) {
//   // buttons icon
//   $productHtml .=  "<div class='buttons_'>";
//   $productHtml .=  $wishlist_;
//   $productHtml .=  $compare_;
//   $productHtml .=  "</div>";
// buttons icon
// }
