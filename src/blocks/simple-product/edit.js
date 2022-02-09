import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import OwlCarousel from "react-owl-carousel";
import ReactHtmlParser from "react-html-parser";

import {
  InspectorControls,
  RichText,
  ColorPalette,
  BlockControls,
  BlockAlignmentToolbar,
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
import { PostNotfound, PostLoader } from "../block-assets/post-functions";
import BasicToggleNav from "../block-assets/utility-components/BasicToggleNav";
import Border from "../block-assets/utility-components/border";
class Edit extends Component {
  constructor(props) {
    super(props);
    const { wrapper_id } = props.attributes;
    this.state = {
      // pages state from post
      posts: [],
      category: [],
      totalPost: null,
      preview: false,
      wrapper_id: wrapper_id ? wrapper_id : "ubl" + props.clientId,
      openPanel: "style",
      // openPanel: "layout",
    };
  }
  saveClientId = () => {
    const { attributes, setAttributes, clientId } = this.props;
    if (!attributes.wrapper_id) {
      setAttributes({ wrapper_id: "ubl" + clientId });
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
    let { wrapper_id } = this.state;
    // bg color for box
    UblStyler(
      `${wrapper_id}-box-bg`,
      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-wrap,
      .${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-bottom,
      .${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-bottom:before`,
      `background-color:${boxStyle.bgColor}`
    );
    UblStyler(
      `${wrapper_id}-box-bg-boxShadow`,
      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-wrap,
      .${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-bottom`,
      `color:${boxStyle.boxShadowColor}`
    );
    UblStyler(
      `${wrapper_id}-box-bg-boxShadowhover`,
      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap:hover .elemento-product-simple-inner-wrap,
      .${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap:hover .elemento-product-simple-inner-bottom`,
      `color:${boxStyle.boxShadowColorHover}`
    );
    // --------------------------------box border--------------------------------
    UblStyler(
      `${wrapper_id}-box-border-width`,
      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-wrap,
      .${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-bottom`,
      `border-width:${boxStyle.borderWidth}`
    );
    UblStyler(
      `${wrapper_id}-box-border-style`,
      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-wrap,
      .${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-bottom`,
      `border-style:${boxStyle.borderStyle}`
    );
    UblStyler(
      `${wrapper_id}-box-border-color`,
      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-wrap,
      .${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-bottom`,
      `border-color:${boxStyle.borderColor}`
    );
    UblStyler(
      `${wrapper_id}-box-border-radius`,
      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-wrap,
      .${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-bottom`,
      `border-radius:${boxStyle.borderRadius}`
    );
    // --------------------------------box border--------------------------------
  };
  // 'attributes' => [ "boxStyle" => ["bgColor" => "#b1b1b1",]]
  // -------------------key----------key2---------value
  updateStyle = (key_, value, key2, multiple = false) => {
    const { attributes, setAttributes } = this.props;
    let getStyle = { ...attributes[key_] };
    if (multiple) {
      getStyle = { ...getStyle, ...multiple };
    } else {
      getStyle[key2] = value;
    }
    let SetAttr = {};
    SetAttr[key_] = getStyle;
    setAttributes(SetAttr);
  };
  // this will call api
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
    const { wrapper_id, preview, posts, totalPost } = this.state;
    const { attributes, setAttributes } = this.props;
    let { product_cate, numberOfPosts, boxStyle, sliderSettings } = attributes;
    // slider options
    const slider_options_ = {
      // items: 1,
      // nav: true,
      // navText: [
      //   "<div className='nav-btn prev-slide'></div>",
      //   "<div className='nav-btn next-slide'></div>",
      // ],
      // rewind: true,
      // autoplay: true,
      // slideBy: 1,
      // dots: true,
      // dotsEach: true,
      // dotData: true,
      mouseDrag: true,
      touchDrag: true,
    };

    if (numberOfPosts) {
      if (numberOfPosts > sliderSettings.numberOfColumn) {
        slider_options_["items"] = sliderSettings.numberOfColumn;
      } else {
        slider_options_["items"] = numberOfPosts;
      }
    }
    if (sliderSettings.autoplay) {
      slider_options_["autoplay"] = true;
    }
    if (sliderSettings.loop == "on") {
      slider_options_["loop"] = true;
    }
    if (sliderSettings.margin) {
      slider_options_["margin"] = sliderSettings.margin;
    }

    // margin: 30, box-spacing

    const OwlSlider = () => (
      <OwlCarousel
        className="owl-theme ul-simple-product-slider"
        {...slider_options_}
      >
        {posts.map((val_) => (
          <div className="item">{ReactHtmlParser(val_)}</div>
        ))}
      </OwlCarousel>
    );
    return (
      <>
        <BlockControls key="controls">
          <BlockAlignmentToolbar
            value={attributes.align}
            onChange={(align) => setAttributes({ align })}
            controls={["wide", "full"]}
          />
        </BlockControls>
        <InspectorControls>
          <PanelBody initialOpen={true}>
            <BasicToggleNav
              value={this.state.openPanel}
              navItem={[
                {
                  name: "layout",
                  title: "Layout",
                  icon: "dashicons dashicons-editor-table",
                },
                {
                  name: "style",
                  title: "Style",
                  icon: "dashicons dashicons-admin-customizer",
                },
              ]}
              clickme={(value_) => {
                this.setState({ openPanel: value_ });
              }}
            />
          </PanelBody>

          {this.state.openPanel == "layout" ? (
            <>
              <PanelBody
                initialOpen={true}
                title={__("Product Settings", "unlimited-blocks")}
              >
                <ToggleControl
                  label={__("Preview", "unlimited-blocks")}
                  checked={preview}
                  onChange={(e) => this.setState({ preview: e })}
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
              <PanelBody
                initialOpen={false}
                title={__("Slider Settings", "unlimited-blocks")}
              >
                <p>
                  <strong>{__("Number of Column", "unlimited-blocks")}</strong>
                </p>
                <RangeControl
                  value={sliderSettings.numberOfColumn}
                  min={1}
                  max={6}
                  onChange={(e) => {
                    this.updateStyle("sliderSettings", e, "numberOfColumn");
                  }}
                />
                <ToggleControl
                  label={__("AutoPlay", "unlimited-blocks")}
                  checked={sliderSettings.autoplay == "on"}
                  onChange={(e) => {
                    let put = e ? "on" : "";
                    this.updateStyle("sliderSettings", put, "autoplay");
                  }}
                />
                <ToggleControl
                  label={__("Loop", "unlimited-blocks")}
                  checked={sliderSettings.loop == "on"}
                  onChange={(e) => {
                    let put = e ? "on" : "";
                    this.updateStyle("sliderSettings", put, "loop");
                  }}
                />
              </PanelBody>
            </>
          ) : (
            <>
              <PanelBody
                initialOpen={false}
                title={__("Product Box Style", "unlimited-blocks")}
              >
                <p>
                  <strong>{__("Background Color", "unlimited-blocks")}</strong>
                </p>
                <ColorPalette
                  value={boxStyle.bgColor}
                  onChange={(color) => {
                    this.updateStyle("boxStyle", color, "bgColor");
                    UblStyler(
                      `${wrapper_id}-box-bg`,
                      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-wrap,
                      .${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-bottom,
                      .${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-bottom:before`,
                      `background-color:${color}`
                    );
                  }}
                />
                <p>
                  <strong>{__("Box Spacing", "unlimited-blocks")}</strong>
                </p>
                <RangeControl
                  value={sliderSettings.margin}
                  min={1}
                  max={50}
                  onChange={(e) => {
                    this.updateStyle("sliderSettings", e, "margin");
                  }}
                />
              </PanelBody>
              <PanelBody
                initialOpen={false}
                title={__("Box Border & BoxShadow", "unlimited-blocks")}
              >
                <Border
                  value={{
                    allUnit: "px",
                    borderStyle: boxStyle.borderStyle,
                    borderWidth: boxStyle.borderWidth,
                    borderColor: boxStyle.borderColor,
                    borderRadius: boxStyle.borderRadius,
                    borderWidthLink: boxStyle.borderWidthLink,
                    borderRadiusLink: boxStyle.borderRadiusLink,
                  }}
                  changeme={(getProperty) => {
                    this.updateStyle("boxStyle", true, true, getProperty);

                    UblStyler(
                      `${wrapper_id}-box-border-width`,
                      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-wrap,
      .${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-bottom`,
                      `border-width:${getProperty.borderWidth}`
                    );
                    UblStyler(
                      `${wrapper_id}-box-border-style`,
                      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-wrap,
      .${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-bottom`,
                      `border-style:${getProperty.borderStyle}`
                    );
                    UblStyler(
                      `${wrapper_id}-box-border-color`,
                      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-wrap,
      .${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-bottom`,
                      `border-color:${getProperty.borderColor}`
                    );
                    UblStyler(
                      `${wrapper_id}-box-border-radius`,
                      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-wrap,
      .${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-bottom`,
                      `border-radius:${getProperty.borderRadius}`
                    );
                  }}
                />
                <p>
                  <strong>{__("Box Shadow Color", "unlimited-blocks")}</strong>
                </p>
                <ColorPalette
                  value={boxStyle.boxShadowColor}
                  onChange={(color) => {
                    this.updateStyle("boxStyle", color, "boxShadowColor");
                    UblStyler(
                      `${wrapper_id}-box-bg-boxShadow`,
                      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-wrap,
                      .${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-bottom`,
                      `color:${color}`
                    );
                  }}
                />
                <p>
                  <strong>
                    {__("Box Shadow Hover Color", "unlimited-blocks")}
                  </strong>
                </p>
                <ColorPalette
                  value={boxStyle.boxShadowColorHover}
                  onChange={(color) => {
                    this.updateStyle("boxStyle", color, "boxShadowColorHover");
                    UblStyler(
                      `${wrapper_id}-box-bg-boxShadowhover`,
                      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap:hover .elemento-product-simple-inner-wrap,
      .${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap:hover .elemento-product-simple-inner-bottom`,
                      `color:${color}`
                    );
                  }}
                />
              </PanelBody>
            </>
          )}
        </InspectorControls>
        <div
          className={`${wrapper_id} ul-blocks-simple-product ${
            preview ? "elemento-simple-product-previewon" : ""
          }`}
        >
          {!posts ? (
            <PostNotfound msg="Product Not Found." />
          ) : posts.length ? (
            <OwlSlider />
          ) : (
            <PostLoader msg="Product Loading..." />
          )}
        </div>
      </>
    );
    // ++++++++++++++===============
  }
}
export default Edit;
