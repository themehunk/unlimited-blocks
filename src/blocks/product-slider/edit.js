import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import OwlCarousel from "react-owl-carousel";
import ReactHtmlParser from "react-html-parser";

import {
  InspectorControls,
  ColorPalette,
  // BlockControls,
  // BlockAlignmentToolbar,
} from "@wordpress/block-editor";
import {
  PanelBody,
  RangeControl,
  ToggleControl,
  SelectControl,
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
import Switcher from "../block-assets/utility-components/TwoSwitcher";

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
      openPanel: "layout",
      productBoxBoxShadow: "normal",
      aTcart: "normal",
      pTitle: "normal",
      buttonsStyleType: "normal",
      no_plugin_active: false,
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
    let {
      boxStyle,
      addToCart,
      productTitle,
      ratingStyle,
      priceStyle,
      saleStyle,
      sliderSettings,
      buttonsStyle,
    } = attributes;
    let { wrapper_id } = this.state;
    // --------------------------------box spacing--------------------------------
    if (sliderSettings.numberOfrow == "2") {
      UblStyler(
        `${wrapper_id}-box-spacing`,
        `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap + .elemento-product-outer-wrap`,
        `margin-top:calc(${sliderSettings.margin}px + 12px)`
      );
    }
    // --------------------------------box spacing--------------------------------
    // --------------------------------box style--------------------------------
    let BoxSelector1 = `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-wrap`;
    let BoxSelector2 = `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-bottom`;
    UblStyler(
      `${wrapper_id}-box-bg`,
      `${BoxSelector1},
      ${BoxSelector2},
      ${BoxSelector2}:before`,
      `background-color:${boxStyle.bgColor}`
    );
    UblStyler(
      `${wrapper_id}-box-bg-boxShadow`,
      `${BoxSelector1},
      ${BoxSelector2}`,
      `color:${boxStyle.boxShadowColor}`
    );
    UblStyler(
      `${wrapper_id}-box-bg-boxShadowhover`,
      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap:hover .elemento-product-simple-inner-wrap,
      .${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap:hover .elemento-product-simple-inner-bottom`,
      `color:${boxStyle.boxShadowColorHover}`
    );
    UblStyler(
      `${wrapper_id}-box-border-width`,
      `${BoxSelector1},
      ${BoxSelector2}`,
      `border-width:${boxStyle.borderWidth}`
    );
    UblStyler(
      `${wrapper_id}-box-border-style`,
      `${BoxSelector1},
      ${BoxSelector2}`,
      `border-style:${boxStyle.borderStyle}`
    );
    UblStyler(
      `${wrapper_id}-box-border-color`,
      `${BoxSelector1},
      ${BoxSelector2}`,
      `border-color:${boxStyle.borderColor}`
    );
    UblStyler(
      `${wrapper_id}-box-border-radius`,
      `${BoxSelector1},
      ${BoxSelector2}`,
      `border-radius:${boxStyle.borderRadius}`
    );
    // --------------------------------Add To cart Style --------------------------------
    let addToCartSelector = `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-add-to-cart-btn`;
    UblStyler(
      `${wrapper_id}-atc-border-width`,
      `${addToCartSelector}`,
      `border-width:${addToCart.borderWidth}`
    );
    UblStyler(
      `${wrapper_id}-atc-hide-show`,
      `${addToCartSelector}`,
      `display:${addToCart.enable ? "flex" : "none"}`
    );
    UblStyler(
      `${wrapper_id}-atc-border-style`,
      `${addToCartSelector}`,
      `border-style:${addToCart.borderStyle}`
    );
    UblStyler(
      `${wrapper_id}-atc-border-color`,
      `${addToCartSelector}`,
      `border-color:${addToCart.borderColor}`
    );
    UblStyler(
      `${wrapper_id}-atc-border-radius`,
      `${addToCartSelector}`,
      `border-radius:${addToCart.borderRadius}`
    );

    UblStyler(
      `${wrapper_id}-atc-Color`,
      `${addToCartSelector}`,
      `color:${addToCart.Color}`
    );
    UblStyler(
      `${wrapper_id}-atc-ColorHover`,
      `${addToCartSelector}:hover`,
      `color:${addToCart.ColorHover}`
    );
    UblStyler(
      `${wrapper_id}-atc-bgColor`,
      `${addToCartSelector}`,
      `background-color:${addToCart.bgColor}`
    );
    UblStyler(
      `${wrapper_id}-atc-bgColorHover`,
      `${addToCartSelector}:hover`,
      `background-color:${addToCart.bgColorHover}`
    );
    UblStyler(
      `${wrapper_id}-atc-v`,
      `${addToCartSelector}`,
      `height:${addToCart.paddingV}px;`
    );
    UblStyler(
      `${wrapper_id}-atc-h`,
      `${addToCartSelector}`,
      `width:${addToCart.paddingH}px;`
    );

    // --------------------------------title style--------------------------------
    let titleSelector = `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-addons-product-title`;
    UblStyler(
      `${wrapper_id}-ptitle-fontSize`,
      `${titleSelector}`,
      `font-size:${productTitle.fontSize}px`
    );
    UblStyler(
      `${wrapper_id}-ptitle-ColorHover`,
      `${titleSelector}:hover`,
      `color:${productTitle.colorHover}`
    );
    UblStyler(
      `${wrapper_id}-ptitle-Color`,
      `${titleSelector}`,
      `color:${productTitle.color}`
    );
    // --------------------------------rating style--------------------------------
    UblStyler(
      `${wrapper_id}-ratingStyle-fontSize`,
      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-addons-rating .star-rating`,
      `font-size:${ratingStyle.fontSize}px`
    );
    UblStyler(
      `${wrapper_id}-ratingStyle-color`,
      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-addons-rating .star-rating`,
      `color:${ratingStyle.color}`
    );
    UblStyler(
      `${wrapper_id}-ratingStyle-bgColor`,
      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-addons-rating .star-rating:before`,
      `color:${ratingStyle.bgColor}`
    );
    // --------------------------------price style--------------------------------
    let priceStyleSelector = `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-addons-price`;
    UblStyler(
      `${wrapper_id}-priceStyle-fontSize`,
      `${priceStyleSelector}`,
      `font-size:${priceStyle.fontSize}px`
    );
    UblStyler(
      `${wrapper_id}-priceStyle-color`,
      `${priceStyleSelector}`,
      `color:${priceStyle.color}`
    );
    UblStyler(
      `${wrapper_id}-priceStyle-discountColor`,
      `${priceStyleSelector} del`,
      `color:${priceStyle.discountColor}`
    );
    // --------------------------------sale text style--------------------------------
    let saleStyleSelector = `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-addons-sale > span`;
    UblStyler(
      `${wrapper_id}-saleStyle-fontSize`,
      `${saleStyleSelector}`,
      `font-size:${saleStyle.fontSize}px`
    );
    UblStyler(
      `${wrapper_id}-saleStyle-color`,
      `${saleStyleSelector}`,
      `color:${saleStyle.color}`
    );
    UblStyler(
      `${wrapper_id}-saleStyle-bgColor`,
      `${saleStyleSelector}`,
      `background-color:${saleStyle.bgColor}`
    );
    // --------------------------------sale text style--------------------------------
    // --------------------------------Buttons style--------------------------------
    UblStyler(
      `${wrapper_id}-buttonsStyle-fontSize`,
      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .buttons_ button.woosw-btn:before,.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .buttons_ button.woosw-btn:after,.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .buttons_ > button`,
      `font-size:${buttonsStyle.fontSize}px`
    );
    UblStyler(
      `${wrapper_id}-buttonsStyle-ColorHover`,
      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .buttons_ > button:hover`,
      `color:${buttonsStyle.colorHover}`
    );
    UblStyler(
      `${wrapper_id}-buttonsStyle-Color`,
      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .buttons_ > button`,
      `color:${buttonsStyle.color}`
    );
    // --------------------------------Buttons style--------------------------------
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
    // console.log("chunks _", _.chunk([1, 2, 3, 4, 5, 6, 7], 2));

    const {
      wrapper_id,
      posts,
      pTitle,
      productBoxBoxShadow,
      aTcart,
      buttonsStyleType,
      no_plugin_active,
    } = this.state;
    const { attributes, setAttributes } = this.props;

    let {
      product_cate,
      numberOfPosts,
      boxStyle,
      addToCart,
      sliderSettings,
      productTitle,
      ratingStyle,
      priceStyle,
      saleStyle,
      buttonsStyle,
      preview,
    } = attributes;
    // th-layout-1

    // console.log("preview", plugin_url, preview);

    if (preview) {
      return <img src={`${plugin_url.url}assets/img/simple-product.png`} />;
    }
    let BoxSelector1 = `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-wrap`;
    let BoxSelector2 = `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-product-simple-inner-bottom`;
    let addToCartSelector = `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-add-to-cart-btn`;
    let titleSelector = `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-addons-product-title`;
    let priceStyleSelector = `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-addons-price`;
    let saleStyleSelector = `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-addons-sale > span`;

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

    const OwlSlider = () => {
      // console.log("OwlSlider->", this.props);
      let numberOfrow = sliderSettings.numberOfrow;
      numberOfrow = numberOfrow ? parseInt(numberOfrow) : 1;
      let Posts_ = [...posts];
      if (numberOfrow == 2) {
        Posts_ = _.chunk(Posts_, 2);
      }
      let productRow = (val_) => {
        let return_;
        if (numberOfrow == 2) {
          return_ = (
            <div className="item">
              {val_.map((val2) => ReactHtmlParser(val2))}
            </div>
          );
        } else {
          return_ = <div className="item">{ReactHtmlParser(val_)}</div>;
        }
        return return_;
      };
      return (
        <OwlCarousel
          className="owl-theme ul-simple-product-slider"
          {...slider_options_}
        >
          {Posts_.map((val_) => productRow(val_))}
        </OwlCarousel>
      );
    };
    return (
      <>
        {/* <BlockControls key="controls">
          <BlockAlignmentToolbar
            value={attributes.align}
            onChange={(align) => setAttributes({ align })}
            controls={["wide", "full"]}
          />
        </BlockControls> */}
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
                  checked={this.state.preview}
                  onChange={(e) => this.setState({ preview: e })}
                />
                <p>
                  <strong>{__("Number of Post", "unlimited-blocks")}</strong>
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
                <p>
                  <strong>{__("Number of Row", "unlimited-blocks")}</strong>
                </p>
                <SelectControl
                  value={sliderSettings.numberOfrow}
                  onChange={(choosen) => {
                    this.updateStyle("sliderSettings", choosen, "numberOfrow");
                  }}
                  options={[
                    {
                      value: 1,
                      label: 1,
                    },
                    {
                      value: 2,
                      label: 2,
                    },
                  ]}
                />
              </PanelBody>

              <PanelBody
                initialOpen={false}
                title={__("Product Category", "unlimited-blocks")}
              >
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
                      `${BoxSelector1},
                      ${BoxSelector2},
                      ${BoxSelector2}:before`,
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
                    if (sliderSettings.numberOfrow == "2") {
                      UblStyler(
                        `${wrapper_id}-box-spacing`,
                        `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap + .elemento-product-outer-wrap`,
                        `margin-top:calc(${e}px + 12px)`
                      );
                    }
                  }}
                />
                <p>
                  <strong>{__("Border", "unlimited-blocks")}</strong>
                </p>
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
                      `${BoxSelector1},
              ${BoxSelector2}`,
                      `border-width:${getProperty.borderWidth}`
                    );
                    UblStyler(
                      `${wrapper_id}-box-border-style`,
                      `${BoxSelector1},
      ${BoxSelector2}`,
                      `border-style:${getProperty.borderStyle}`
                    );
                    UblStyler(
                      `${wrapper_id}-box-border-color`,
                      `${BoxSelector1},
      ${BoxSelector2}`,
                      `border-color:${getProperty.borderColor}`
                    );
                    UblStyler(
                      `${wrapper_id}-box-border-radius`,
                      `${BoxSelector1},
      ${BoxSelector2}`,
                      `border-radius:${getProperty.borderRadius}`
                    );
                  }}
                />
                <p>
                  <strong>{__("Box Shadow Color", "unlimited-blocks")}</strong>
                </p>
                <Switcher
                  value={productBoxBoxShadow}
                  navItem={[
                    {
                      name: "normal",
                      title: "Normal",
                    },
                    {
                      name: "hover",
                      title: "Hover",
                    },
                  ]}
                  clickme={(value_) => {
                    this.setState({ productBoxBoxShadow: value_ });
                  }}
                />
                {productBoxBoxShadow == "hover" ? (
                  <ColorPalette
                    value={boxStyle.boxShadowColorHover}
                    onChange={(color) => {
                      this.updateStyle(
                        "boxStyle",
                        color,
                        "boxShadowColorHover"
                      );
                      UblStyler(
                        `${wrapper_id}-box-bg-boxShadowhover`,
                        `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap:hover .elemento-product-simple-inner-wrap,
      .${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap:hover .elemento-product-simple-inner-bottom`,
                        `color:${color}`
                      );
                    }}
                  />
                ) : (
                  <ColorPalette
                    value={boxStyle.boxShadowColor}
                    onChange={(color) => {
                      this.updateStyle("boxStyle", color, "boxShadowColor");
                      UblStyler(
                        `${wrapper_id}-box-bg-boxShadow`,
                        `${BoxSelector1},
                      ${BoxSelector2}`,
                        `color:${color}`
                      );
                    }}
                  />
                )}
              </PanelBody>
              <PanelBody
                title={__("Add To Cart Button", "unlimited-blocks")}
                initialOpen={false}
              >
                <ToggleControl
                  label={
                    addToCart.enable
                      ? __("Enable", "unlimited-blocks")
                      : __("Disable", "unlimited-blocks")
                  }
                  checked={addToCart.enable}
                  onChange={(e) => {
                    this.updateStyle("addToCart", e, "enable");

                    UblStyler(
                      `${wrapper_id}-atc-hide-show`,
                      `${addToCartSelector}`,
                      `display:${e ? "flex" : "none"}`
                    );
                  }}
                />

                <Switcher
                  value={aTcart}
                  navItem={[
                    {
                      name: "normal",
                      title: "Normal",
                    },
                    {
                      name: "hover",
                      title: "Hover",
                    },
                  ]}
                  clickme={(value_) => {
                    this.setState({ aTcart: value_ });
                  }}
                />
                {aTcart == "hover" ? (
                  <>
                    <p>
                      <strong>{__("Color", "unlimited-blocks")}</strong>
                    </p>
                    <ColorPalette
                      value={addToCart.ColorHover}
                      onChange={(color) => {
                        this.updateStyle("addToCart", color, "ColorHover");
                        UblStyler(
                          `${wrapper_id}-atc-ColorHover`,
                          `${addToCartSelector}:hover`,
                          `color:${color}`
                        );
                      }}
                    />
                    <p>
                      <strong>
                        {__("Background Color", "unlimited-blocks")}
                      </strong>
                    </p>
                    <ColorPalette
                      value={addToCart.bgColorHover}
                      onChange={(color) => {
                        this.updateStyle("addToCart", color, "bgColorHover");
                        UblStyler(
                          `${wrapper_id}-atc-bgColorHover`,
                          `${addToCartSelector}:hover`,
                          `background-color:${color}`
                        );
                      }}
                    />
                  </>
                ) : (
                  <>
                    <p>
                      <strong>{__("Color", "unlimited-blocks")}</strong>
                    </p>
                    <ColorPalette
                      value={addToCart.Color}
                      onChange={(color) => {
                        this.updateStyle("addToCart", color, "Color");
                        UblStyler(
                          `${wrapper_id}-atc-Color`,
                          `${addToCartSelector}`,
                          `color:${color}`
                        );
                      }}
                    />
                    <p>
                      <strong>
                        {__("Background Color", "unlimited-blocks")}
                      </strong>
                    </p>
                    <ColorPalette
                      value={addToCart.bgColor}
                      onChange={(color) => {
                        this.updateStyle("addToCart", color, "bgColor");
                        UblStyler(
                          `${wrapper_id}-atc-bgColor`,
                          `${addToCartSelector}`,
                          `background-color:${color}`
                        );
                      }}
                    />
                  </>
                )}
                <p>
                  <strong>{__("Height", "unlimited-blocks")}</strong>
                </p>
                <RangeControl
                  value={addToCart.paddingV}
                  min={1}
                  max={140}
                  onChange={(e) => {
                    this.updateStyle("addToCart", e, "paddingV");
                    UblStyler(
                      `${wrapper_id}-atc-v`,
                      `${addToCartSelector}`,
                      `height:${e}px;`
                    );
                  }}
                />
                <p>
                  <strong>{__("Width", "unlimited-blocks")}</strong>
                </p>
                <RangeControl
                  value={addToCart.paddingH}
                  min={1}
                  max={450}
                  onChange={(e) => {
                    this.updateStyle("addToCart", e, "paddingH");
                    UblStyler(
                      `${wrapper_id}-atc-h`,
                      `${addToCartSelector}`,
                      `width:${e}px;`
                    );
                  }}
                />
                <p>
                  <strong>{__("Border", "unlimited-blocks")}</strong>
                </p>
                <Border
                  value={{
                    allUnit: "px",
                    borderStyle: addToCart.borderStyle,
                    borderWidth: addToCart.borderWidth,
                    borderColor: addToCart.borderColor,
                    borderRadius: addToCart.borderRadius,
                    borderWidthLink: addToCart.borderWidthLink,
                    borderRadiusLink: addToCart.borderRadiusLink,
                  }}
                  changeme={(getProperty) => {
                    // console.log("getProperty", getProperty);
                    this.updateStyle("boxStyle", true, true, getProperty);
                    UblStyler(
                      `${wrapper_id}-atc-border-width`,
                      `${addToCartSelector}`,
                      `border-width:${getProperty.borderWidth}`
                    );
                    UblStyler(
                      `${wrapper_id}-atc-border-style`,
                      `${addToCartSelector}`,
                      `border-style:${getProperty.borderStyle}`
                    );
                    UblStyler(
                      `${wrapper_id}-atc-border-color`,
                      `${addToCartSelector}`,
                      `border-color:${getProperty.borderColor}`
                    );
                    UblStyler(
                      `${wrapper_id}-atc-border-radius`,
                      `${addToCartSelector}`,
                      `border-radius:${getProperty.borderRadius}`
                    );
                  }}
                />
              </PanelBody>
              <PanelBody
                title={__("Title", "unlimited-blocks")}
                initialOpen={false}
              >
                {/* title ____________________________________________________________________________________ */}
                <p>
                  <strong>{__("Font Size", "unlimited-blocks")}</strong>
                </p>
                <RangeControl
                  value={productTitle.fontSize}
                  min={1}
                  max={50}
                  onChange={(e) => {
                    this.updateStyle("productTitle", e, "fontSize");
                    UblStyler(
                      `${wrapper_id}-ptitle-fontSize`,
                      `${titleSelector}`,
                      `font-size:${e}px`
                    );
                  }}
                />
                <Switcher
                  value={pTitle}
                  navItem={[
                    {
                      name: "normal",
                      title: "Normal",
                    },
                    {
                      name: "hover",
                      title: "Hover",
                    },
                  ]}
                  clickme={(value_) => {
                    this.setState({ pTitle: value_ });
                  }}
                />
                {pTitle == "hover" ? (
                  <>
                    <p>
                      <strong>{__("Color", "unlimited-blocks")}</strong>
                    </p>
                    <ColorPalette
                      value={productTitle.ColorHover}
                      onChange={(color) => {
                        this.updateStyle("productTitle", color, "colorHover");
                        UblStyler(
                          `${wrapper_id}-ptitle-ColorHover`,
                          `${titleSelector}:hover`,
                          `color:${color}`
                        );
                      }}
                    />
                  </>
                ) : (
                  <>
                    <p>
                      <strong>{__("Color", "unlimited-blocks")}</strong>
                    </p>
                    <ColorPalette
                      value={productTitle.Color}
                      onChange={(color) => {
                        this.updateStyle("productTitle", color, "color");
                        UblStyler(
                          `${wrapper_id}-ptitle-Color`,
                          `${titleSelector}`,
                          `color:${color}`
                        );
                      }}
                    />
                  </>
                )}
                {/* title ____________________________________________________________________________________ */}
              </PanelBody>
              <PanelBody
                title={__("Rating", "unlimited-blocks")}
                initialOpen={false}
              >
                <p>
                  <strong>{__("Font Size", "unlimited-blocks")}</strong>
                </p>
                <RangeControl
                  value={ratingStyle.fontSize}
                  min={1}
                  max={50}
                  onChange={(e) => {
                    this.updateStyle("ratingStyle", e, "fontSize");
                    UblStyler(
                      `${wrapper_id}-ratingStyle-fontSize`,
                      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-addons-rating .star-rating`,
                      `font-size:${e}px`
                    );
                  }}
                />
                <p>
                  <strong>{__("Color", "unlimited-blocks")}</strong>
                </p>
                <ColorPalette
                  value={ratingStyle.bgColor}
                  onChange={(color) => {
                    this.updateStyle("ratingStyle", color, "bgColor");
                    UblStyler(
                      `${wrapper_id}-ratingStyle-bgColor`,
                      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-addons-rating .star-rating:before`,
                      `color:${color}`
                    );
                  }}
                />
                <p>
                  <strong>{__("Background Color", "unlimited-blocks")}</strong>
                </p>
                <ColorPalette
                  value={ratingStyle.color}
                  onChange={(color) => {
                    this.updateStyle("ratingStyle", color, "color");
                    UblStyler(
                      `${wrapper_id}-ratingStyle-color`,
                      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .elemento-addons-rating .star-rating`,
                      `color:${color}`
                    );
                  }}
                />
              </PanelBody>
              <PanelBody
                title={__("Price", "unlimited-blocks")}
                initialOpen={false}
              >
                <p>
                  <strong>{__("Font Size", "unlimited-blocks")}</strong>
                </p>
                <RangeControl
                  value={priceStyle.fontSize}
                  min={1}
                  max={50}
                  onChange={(e) => {
                    this.updateStyle("priceStyle", e, "fontSize");
                    UblStyler(
                      `${wrapper_id}-priceStyle-fontSize`,
                      `${priceStyleSelector}`,
                      `font-size:${e}px`
                    );
                  }}
                />
                <p>
                  <strong>{__("Color", "unlimited-blocks")}</strong>
                </p>
                <ColorPalette
                  value={priceStyle.color}
                  onChange={(color) => {
                    this.updateStyle("priceStyle", color, "color");
                    UblStyler(
                      `${wrapper_id}-priceStyle-color`,
                      `${priceStyleSelector}`,
                      `color:${color}`
                    );
                  }}
                />
                <p>
                  <strong>
                    {__("Discount Price Color", "unlimited-blocks")}
                  </strong>
                </p>
                <ColorPalette
                  value={priceStyle.bgColor}
                  onChange={(color) => {
                    this.updateStyle("priceStyle", color, "discountColor");
                    UblStyler(
                      `${wrapper_id}-priceStyle-discountColor`,
                      `${priceStyleSelector} del`,
                      `color:${color}`
                    );
                  }}
                />
              </PanelBody>
              <PanelBody
                title={__("Buttons Style", "unlimited-blocks")}
                initialOpen={false}
              >
                <p>
                  <strong>{__("Font Size", "unlimited-blocks")}</strong>
                </p>
                <RangeControl
                  value={buttonsStyle.fontSize}
                  min={1}
                  max={50}
                  onChange={(e) => {
                    this.updateStyle("buttonsStyle", e, "fontSize");
                    UblStyler(
                      `${wrapper_id}-buttonsStyle-fontSize`,
                      `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .buttons_ button.woosw-btn:before,.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .buttons_ button.woosw-btn:after,.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .buttons_ > button`,
                      `font-size:${e}px`
                    );
                  }}
                />
                <Switcher
                  value={buttonsStyleType}
                  navItem={[
                    {
                      name: "normal",
                      title: "Normal",
                    },
                    {
                      name: "hover",
                      title: "Hover",
                    },
                  ]}
                  clickme={(value_) => {
                    this.setState({ buttonsStyleType: value_ });
                  }}
                />
                {buttonsStyleType == "hover" ? (
                  <>
                    <p>
                      <strong>{__("Color", "unlimited-blocks")}</strong>
                    </p>
                    <ColorPalette
                      value={buttonsStyle.colorHover}
                      onChange={(color) => {
                        this.updateStyle("buttonsStyle", color, "colorHover");
                        UblStyler(
                          `${wrapper_id}-buttonsStyle-ColorHover`,
                          `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .buttons_ > button:hover`,
                          `color:${color}`
                        );
                      }}
                    />
                  </>
                ) : (
                  <>
                    <p>
                      <strong>{__("Color", "unlimited-blocks")}</strong>
                    </p>
                    <ColorPalette
                      value={productTitle.Color}
                      onChange={(color) => {
                        this.updateStyle("buttonsStyle", color, "color");
                        UblStyler(
                          `${wrapper_id}-buttonsStyle-Color`,
                          `.${wrapper_id}.ul-blocks-simple-product .elemento-product-outer-wrap .buttons_ > button`,
                          `color:${color}`
                        );
                      }}
                    />
                  </>
                )}
                {/* ------------------------------------------------ */}
              </PanelBody>
              <PanelBody
                title={__("Sale Text", "unlimited-blocks")}
                initialOpen={false}
              >
                <p>
                  <strong>{__("Font Size", "unlimited-blocks")}</strong>
                </p>
                <RangeControl
                  value={saleStyle.fontSize}
                  min={1}
                  max={50}
                  onChange={(e) => {
                    this.updateStyle("saleStyle", e, "fontSize");
                    UblStyler(
                      `${wrapper_id}-saleStyle-fontSize`,
                      `${saleStyleSelector}`,
                      `font-size:${e}px`
                    );
                  }}
                />
                <p>
                  <strong>{__("Color", "unlimited-blocks")}</strong>
                </p>
                <ColorPalette
                  value={saleStyle.color}
                  onChange={(color) => {
                    this.updateStyle("saleStyle", color, "color");
                    UblStyler(
                      `${wrapper_id}-saleStyle-color`,
                      `${saleStyleSelector}`,
                      `color:${color}`
                    );
                  }}
                />
                <p>
                  <strong>{__("Background Color", "unlimited-blocks")}</strong>
                </p>
                <ColorPalette
                  value={saleStyle.bgColor}
                  onChange={(color) => {
                    this.updateStyle("saleStyle", color, "bgColor");
                    UblStyler(
                      `${wrapper_id}-saleStyle-bgColor`,
                      `${saleStyleSelector}`,
                      `background-color:${color}`
                    );
                  }}
                />
              </PanelBody>
            </>
          )}
        </InspectorControls>
        <div
          className={`${wrapper_id} ul-blocks-simple-product ${
            this.state.preview ? "elemento-simple-product-previewon" : ""
          }`}
        >
          {no_plugin_active ? (
            <PostNotfound msg="Activate Woocommerce Plugin." />
          ) : !posts ? (
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
