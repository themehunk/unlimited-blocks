import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import OwlCarousel from "react-owl-carousel";
import ReactHtmlParser from "react-html-parser";

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
  filterProductInit,
  firstTimeInitProduct,
} from "../block-assets/woocommerce/product-functions";
import ProductCategory from "../block-assets/woocommerce/productCategory";
import UblStyler from "../block-assets/Styler";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // pages state from post
      posts: [],
      category: [],
      totalPost: null,
      preview: false,
    };
  }

  saveClientId = () => {
    let { attributes, setAttributes, clientId } = this.props;
    let { client_id } = attributes;
    if (!client_id) {
      setAttributes({ client_id: clientId });
    }
  };
  componentDidMount() {
    this.saveClientId();
    let sendData = { productlayout: "simple_layout" };
    firstTimeInitProduct(this, sendData);
    // content box style
    this.styleAdd();
  }

  styleAdd = () => {
    let { attributes } = this.props;
    let { boxStyle } = attributes;
    let wrapperId = attributes.client_id;
    UblStyler(
      `${wrapperId}-box-bg`,
      `${wrapperId} .ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-wrap`,
      `background-color:${boxStyle.bgColor}`
    );
  };

  updateStyle = (key_, value, multiple = false) => {
    const { attributes, setAttributes } = this.props;
    let getStyle = { ...attributes.styles };
    if (multiple) {
      getStyle = { ...getStyle, ...multiple };
    } else {
      getStyle[key_] = value;
    }
    setAttributes({ styles: getStyle });
  };
  updateProduct(key_, val_) {
    let SendObj = {};
    SendObj[key_] = val_;
    SendObj["productlayout"] = "simple_layout";
    filterProductInit(this, SendObj);
  }

  render() {
    // ++++++++++++++===============

    console.log("product props", this.props);
    // console.log("product state", this.state);
    // const {} = this.state;
    const { attributes, setAttributes } = this.props;
    // const { posts, category, totalPost } = this.state;
    let { product_cate, numberOfPosts, numberOfColumn, boxStyle } = attributes;

    const slider_options_ = {
      items: numberOfColumn,
      // nav: true,
      // navText: [
      //   "<div class='ul-kk nav-btn prev-slide'>Prev</div>",
      //   "<div class='ul-kk nav-btn next-slide'>Next</div>",
      // ],
    };
    const OwlSlider = () => (
      <OwlCarousel
        className="owl-theme ul-simple-product-slider"
        {...slider_options_}
      >
        {this.state.posts.map((val_) => (
          <div className="item">{ReactHtmlParser(val_)}</div>
        ))}
      </OwlCarousel>
    );
    return (
      <>
        <InspectorControls>
          <PanelBody initialOpen={true}>
            <ToggleControl
              label={__("Preview", "unlimited-blocks")}
              checked={this.state.preview}
              onChange={(e) => this.setState({ preview: e })}
            />
            <p>
              <strong>{__("Background Color", "unlimited-blocks")}</strong>
            </p>
            <ColorPalette
              value={boxStyle.bgColor}
              onChange={(color) => {
                // this.updateObj("title", "color", title, color)
              }}
            />
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
                this.updateProduct("numberOfPosts", e);
              }}
            />

            <ProductCategory
              value={product_cate}
              category={this.state.category}
              onMovement={(category) => {
                setAttributes({ product_cate: category });
                this.updateProduct("product_cate", category);
              }}
            />
          </PanelBody>
        </InspectorControls>
        <div
          className={`ul-blocks-simple-product ${
            this.state.preview ? "elemento-simple-product-previewon" : ""
          }`}
        >
          {this.state.posts.length ? <OwlSlider /> : ""}
        </div>
      </>
    );
    // ++++++++++++++===============
  }
}
export default Edit;
