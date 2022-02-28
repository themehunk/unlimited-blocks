import {
  RichText,
  InspectorControls,
  ColorPalette,
} from "@wordpress/block-editor";
import { PanelBody, RangeControl, ToggleControl } from "@wordpress/components";
import { Component } from "@wordpress/element";
import {
  showCateFn,
  showTagsFn,
  excerptWords,
  filterPostInit,
  firstTimeInit,
  PostNotfound,
  PostLoader,
} from "../block-assets/post-functions";
import { __ } from "@wordpress/i18n";
import cloneDeep from "clone-deep";
import BackgroundColor from "../block-assets/utility-components/backgroundType/backgroundColor";
// import Switcher from "../block-assets/utility-components/TwoSwitcher";
import ProductCategory from "../block-assets/woocommerce/productCategory";
import SlickSlider from "react-slick";
import BasicToggleNav from "../block-assets/utility-components/BasicToggleNav";
class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      trigger: "linear",
      posts: [],
      category: [],
      totalPost: null,
      commonDropDown: "",
      openPanel: "post-setting",
    };
  }
  // rest api call
  componentDidMount() {
    if (this.props.attributes.wrapper_id == "") {
      this.props.setAttributes({
        wrapper_id: "wrapper-" + this.props.clientId,
      });
    }
    let sendData = { featured_image: 1 };
    firstTimeInit(this, sendData);
  }
  updateObj = (parent_key, child_key, initialValue, value_) => {
    console.log(parent_key, child_key, initialValue, value_);

    let newNewValue = cloneDeep(initialValue);
    // console.log("newNewValue->", newNewValue);

    newNewValue[child_key] = value_;
    let setAttr_ = {};
    setAttr_[parent_key] = newNewValue;
    this.props.setAttributes(setAttr_);
  };
  updateGlobalSlide = (value, for_, type) => {
    let sliderSetting = this.props.attributes.sliderSetting;
    let newSetting = cloneDeep(sliderSetting);
    if (type) {
      newSetting[for_][type] = value;
    } else {
      newSetting[for_] = value;
    }
    this.props.setAttributes({ sliderSetting: newSetting });
  };
  render() {
    const { attributes, setAttributes } = this.props;
    const { posts, category, commonDropDown, openPanel } = this.state;
    let {
      heading,
      author,
      numberOfPosts,
      date,
      showTag,
      showCate,
      excerpt,
      postCategories,
      meta_style,
      sliderSetting,
      wrapper_id,
      preview,
    } = attributes;
    // console.log("preview", preview);
    if (preview) {
      return <img src={`${plugin_url.url}assets/img/th-post-slider.png`} />;
    }
    // console.log("this.props", this.props);
    let WrapperClass = wrapper_id ? wrapper_id : this.props.clientId;
    WrapperClass = `ubl-post-slider-wrapper ${WrapperClass}`;
    // const sliderWidth = { width: sliderSetting.dimension.custom_width + "%" };

    return (
      <>
        <InspectorControls>
          <PanelBody initialOpen={true}>
            <BasicToggleNav
              value={openPanel}
              navItem={[
                {
                  name: "post-setting",
                  title: "Post Settings",
                  // icon: "dashicons dashicons-slides",
                },
                {
                  name: "slider-setting",
                  title: "Slider Settings",
                  // icon: "dashicons dashicons-admin-customizer",
                },
              ]}
              clickme={(value_) => {
                this.setState({ openPanel: value_ });
              }}
            />
          </PanelBody>
          {openPanel == "post-setting" ? (
            <>
              <PanelBody
                title={__("Post Settings", "unlimited-blocks")}
                initialOpen={false}
              >
                <p>
                  <strong>
                    {__("Number Of Post Display", "unlimited-blocks")}
                  </strong>
                </p>
                <RangeControl
                  value={numberOfPosts}
                  min={1}
                  max={20}
                  onChange={(e) => {
                    setAttributes({ numberOfPosts: e });
                    // console.log("ee", e);
                    filterPostInit(this, {
                      numberOfPosts: e,
                      featured_image: 1,
                    });
                  }}
                />
                <p>
                  <strong>{__("Number Of Column", "unlimited-blocks")}</strong>
                </p>
                <RangeControl
                  value={sliderSetting.numberOfcolumn}
                  min={1}
                  max={3}
                  onChange={(e) => {
                    this.updateGlobalSlide(e, "numberOfcolumn");
                  }}
                />
                <p>
                  <strong>{__("Number Of Row", "unlimited-blocks")}</strong>
                </p>
                <RangeControl
                  value={sliderSetting.numberOfRow}
                  min={1}
                  max={2}
                  onChange={(e) => {
                    this.updateGlobalSlide(e, "numberOfRow");
                  }}
                />
              </PanelBody>

              <PanelBody
                title={__("Post Title", "unlimited-blocks")}
                initialOpen={false}
              >
                <p>
                  <strong>{__("Post Title Tag", "unlimited-blocks")}</strong>
                </p>
                <select
                  value={heading.tag}
                  className="ubl-block-select"
                  onChange={(e) => {
                    let value_ = e.target.value;
                    let font_ =
                      value_ == "h1"
                        ? 30
                        : value_ == "h2"
                        ? 25
                        : value_ == "h3"
                        ? 20
                        : 17;
                    let newHeading = { ...heading };
                    newHeading.tag = value_;
                    newHeading.fontSize = font_;
                    setAttributes({ heading: newHeading });
                  }}
                >
                  <option value="h1">{__("H1", "unlimited-blocks")}</option>
                  <option value="h2">{__("H2", "unlimited-blocks")}</option>
                  <option value="h3">{__("H3", "unlimited-blocks")}</option>
                  <option value="p">{__("P", "unlimited-blocks")}</option>
                </select>
                <p>
                  <strong>{__("Font Size", "unlimited-blocks")}</strong>
                </p>
                <RangeControl
                  value={heading.fontSize}
                  min={1}
                  max={50}
                  onChange={(e) =>
                    this.updateObj("heading", "fontSize", heading, e)
                  }
                />
                <p>
                  <strong>{__("Color", "unlimited-blocks")}</strong>
                </p>
                <ColorPalette
                  value={heading.color}
                  onChange={(color) =>
                    this.updateObj("heading", "color", heading, color)
                  }
                />
              </PanelBody>

              <PanelBody
                title={__("Excerpt", "unlimited-blocks")}
                initialOpen={false}
              >
                <ToggleControl
                  label={
                    excerpt.enable
                      ? __("Show", "unlimited-blocks")
                      : __("Hide", "unlimited-blocks")
                  }
                  checked={excerpt.enable}
                  onChange={(e) =>
                    this.updateObj("excerpt", "enable", excerpt, e)
                  }
                />
                {excerpt.enable && (
                  <>
                    <p>
                      <strong>
                        {__("Number of words", "unlimited-blocks")}
                      </strong>
                    </p>
                    <RangeControl
                      value={excerpt.words}
                      min={1}
                      max={200}
                      onChange={(e) =>
                        this.updateObj("excerpt", "words", excerpt, e)
                      }
                    />
                    <p>
                      <strong>{__("Font Size", "unlimited-blocks")}</strong>
                    </p>
                    <RangeControl
                      value={excerpt.fontSize}
                      min={1}
                      max={25}
                      onChange={(e) =>
                        this.updateObj("excerpt", "fontSize", excerpt, e)
                      }
                    />
                    <p>
                      <strong>{__("Color", "unlimited-blocks")}</strong>
                    </p>
                    <ColorPalette
                      value={excerpt.color}
                      onChange={(color) =>
                        this.updateObj("excerpt", "color", excerpt, color)
                      }
                    />
                  </>
                )}
              </PanelBody>

              <PanelBody
                title={__("Category", "unlimited-blocks")}
                initialOpen={false}
              >
                <p>
                  <strong>{__("Choose Category", "unlimited-blocks")}</strong>
                </p>
                {category && category.length > 0 ? (
                  <ProductCategory
                    value={postCategories.length ? postCategories : []}
                    category={category}
                    onMovement={(category) => {
                      setAttributes({ postCategories: category });
                      filterPostInit(this, {
                        postCategories: category,
                        featured_image: 1,
                      });
                    }}
                  />
                ) : (
                  <p className="category-blank">
                    {__("No Categories Found", "unlimited-blocks")}
                  </p>
                )}
              </PanelBody>
              <PanelBody
                title={__("Post Meta", "unlimited-blocks")}
                initialOpen={false}
              >
                {/* show author */}
                <ToggleControl
                  label={__("Author", "unlimited-blocks")}
                  checked={author.enable}
                  onChange={(e) =>
                    this.updateObj("author", "enable", author, e)
                  }
                />
                {/* show date */}
                <ToggleControl
                  label={__("Date", "unlimited-blocks")}
                  checked={date.enable}
                  onChange={(e) => this.updateObj("date", "enable", date, e)}
                />
                <ToggleControl
                  label={__("Categories", "unlimited-blocks")}
                  checked={showCate.enable}
                  onChange={(e) =>
                    this.updateObj("showCate", "enable", showCate, e)
                  }
                />
                {/* show last date */}
                <ToggleControl
                  label={__("Last Modified Date", "unlimited-blocks")}
                  checked={date.last_modified}
                  onChange={(e) =>
                    this.updateObj("date", "last_modified", date, e)
                  }
                />

                <ToggleControl
                  label={__("Tag", "unlimited-blocks")}
                  checked={showTag.enable}
                  onChange={(e) =>
                    this.updateObj("showTag", "enable", showTag, e)
                  }
                />
                <p class="block-inside">
                  {__("Meta Custom Style", "unlimited-blocks")}
                </p>
                <p>
                  <strong>
                    {__("Author/Dates Font Size", "unlimited-blocks")}
                  </strong>
                </p>
                <RangeControl
                  value={meta_style.fontSize}
                  min={1}
                  max={25}
                  onChange={(e) => {
                    this.updateObj("meta_style", "fontSize", meta_style, e);
                  }}
                />
                <p>
                  <strong>
                    {__("Author/Dates Color", "unlimited-blocks")}
                  </strong>
                </p>
                <ColorPalette
                  value={"color" in meta_style ? meta_style.color : ""}
                  onChange={(color) =>
                    this.updateObj("meta_style", "color", meta_style, color)
                  }
                />
                {showCate.enable && (
                  <>
                    <p class="block-inside">
                      {__("Category Custom Style", "unlimited-blocks")}
                    </p>
                    <p>
                      <strong>
                        {__("Number Category Per Post", "unlimited-blocks")}
                      </strong>
                    </p>
                    <RangeControl
                      value={showCate.count}
                      min={1}
                      max={10}
                      onChange={(e) => {
                        this.updateObj("showCate", "count", showCate, e);
                      }}
                    />
                    <p>
                      <strong>{__("Font Size", "unlimited-blocks")}</strong>
                    </p>
                    <RangeControl
                      value={showCate.fontSize}
                      min={1}
                      max={30}
                      onChange={(e) => {
                        this.updateObj("showCate", "fontSize", showCate, e);
                      }}
                    />
                    <ToggleControl
                      label={
                        showCate.customColor
                          ? __("Custom Style", "unlimited-blocks")
                          : __("Default Style", "unlimited-blocks")
                      }
                      checked={showCate.customColor}
                      onChange={(e) =>
                        this.updateObj("showCate", "customColor", showCate, e)
                      }
                    />
                    {showCate.customColor && (
                      <>
                        <p>
                          <strong>{__("Color", "unlimited-blocks")}</strong>
                        </p>
                        <ColorPalette
                          value={showCate.color}
                          onChange={(color) =>
                            this.updateObj("showCate", "color", showCate, color)
                          }
                        />
                        <p>
                          <strong>
                            {__("Background Color", "unlimited-blocks")}
                          </strong>
                        </p>
                        <ColorPalette
                          value={showCate.backgroundColor}
                          onChange={(color) => {
                            this.updateObj(
                              "showCate",
                              "backgroundColor",
                              showCate,
                              color
                            );
                          }}
                        />
                      </>
                    )}
                  </>
                )}
                {showTag.enable && (
                  <>
                    <p class="block-inside">
                      {__("Tags Custom Style", "unlimited-blocks")}
                    </p>
                    <p>
                      <strong>
                        {__("Number Tags Per Post", "unlimited-blocks")}
                      </strong>
                    </p>
                    <RangeControl
                      value={showTag.count}
                      min={1}
                      max={10}
                      onChange={(e) => {
                        this.updateObj("showTag", "count", showTag, e);
                      }}
                    />
                    <p>
                      <strong>{__("Font Size", "unlimited-blocks")}</strong>
                    </p>
                    <RangeControl
                      value={showTag.fontSize}
                      min={1}
                      max={30}
                      onChange={(e) => {
                        this.updateObj("showTag", "fontSize", showTag, e);
                      }}
                    />
                    <p>
                      <strong>{__("Color", "unlimited-blocks")}</strong>
                    </p>
                    <ColorPalette
                      value={showTag.color}
                      onChange={(color) =>
                        this.updateObj("showTag", "color", showTag, color)
                      }
                    />
                    <p>
                      <strong>
                        {__("Background Color", "unlimited-blocks")}
                      </strong>
                    </p>

                    <ColorPalette
                      value={showTag.backgroundColor}
                      onChange={(color) => {
                        this.updateObj(
                          "showTag",
                          "backgroundColor",
                          showTag,
                          color
                        );
                      }}
                    />
                  </>
                )}
              </PanelBody>
            </>
          ) : (
            <>
              <PanelBody
                title={__("Background & Alignment", "unlimited-blocks")}
                initialOpen={false}
              >
                <BackgroundColor
                  title="Image Overlay Color"
                  value={{
                    backgroundColorType: sliderSetting.overlayColor.type,
                    backgroundColor: sliderSetting.overlayColor.color,
                    backgroundImageGradient:
                      sliderSetting.overlayColor.gradient,
                  }}
                  changeme={(_properties) => {
                    console.log("backgroundColor->", _properties);
                    let getBgcolor = { ...sliderSetting.overlayColor };
                    getBgcolor["type"] = _properties.backgroundColorType;
                    getBgcolor["color"] = _properties.backgroundColor;
                    getBgcolor["gradient"] =
                      _properties.backgroundImageGradient;
                    this.updateGlobalSlide(getBgcolor, "overlayColor");
                  }}
                />
                <RangeControl
                  label={__("Opacity", "unlimited-blocks")}
                  value={sliderSetting.overlayColor.opacity}
                  min={0}
                  max={10}
                  step={1}
                  onChange={(e) => {
                    let getBgcolor = { ...sliderSetting.overlayColor };
                    getBgcolor["opacity"] = e;
                    this.updateGlobalSlide(getBgcolor, "overlayColor");
                  }}
                />
                {/* bg color  */}
                <p>
                  <strong>{__("Content Alignment", "unlimited-blocks")}</strong>
                </p>
                <div className="ubl-alignment">
                  <div>
                    <span
                      onClick={() => {
                        this.updateGlobalSlide("left", "contentAlign");
                      }}
                      className={`dashicons dashicons-editor-alignleft ${
                        sliderSetting.contentAlign == "left" && "active"
                      }`}
                    ></span>
                  </div>
                  <div>
                    <span
                      onClick={() => {
                        this.updateGlobalSlide("center", "contentAlign");
                      }}
                      className={`dashicons dashicons-editor-aligncenter ${
                        sliderSetting.contentAlign == "center" && "active"
                      }`}
                    ></span>
                  </div>
                  <div>
                    <span
                      onClick={() => {
                        this.updateGlobalSlide("right", "contentAlign");
                      }}
                      className={`dashicons dashicons-editor-alignright ${
                        sliderSetting.contentAlign == "right" && "active"
                      }`}
                    ></span>
                  </div>
                </div>
              </PanelBody>
              <PanelBody
                title={__("Slider Settings", "unlimited-blocks")}
                initialOpen={false}
              >
                <div className="ubl-panel-container ubl-slider-panel">
                  <div className="slides-settings">
                    <>
                      {/* height and width  */}
                      <div className="flex-section-slider">
                        <p>{__("Navigation", "unlimited-blocks")}</p>
                        <select
                          value={sliderSetting.triggerActive}
                          onChange={(e) => {
                            this.updateGlobalSlide(
                              e.target.value,
                              "triggerActive"
                            );
                          }}
                        >
                          <option value="both">
                            {__("Arrows and Dots", "unlimited-blocks")}
                          </option>
                          <option value="arrows">
                            {__("Arrows", "unlimited-blocks")}
                          </option>
                          <option value="dots">
                            {__("Dots", "unlimited-blocks")}
                          </option>
                          <option value="n">
                            {__("None", "unlimited-blocks")}
                          </option>
                        </select>
                      </div>
                      <div className="flex-section-slider">
                        <p>{__("Transition", "unlimited-blocks")}</p>
                        <select
                          value={sliderSetting.sliderEffect}
                          onChange={(e) => {
                            this.updateGlobalSlide(
                              e.target.value,
                              "sliderEffect"
                            );
                          }}
                        >
                          <option value="fadeEffect">
                            {__("Fade", "unlimited-blocks")}
                          </option>
                          <option value="slideEffect">
                            {__("Slide", "unlimited-blocks")}
                          </option>
                        </select>
                      </div>
                      <div className="flex-section-slider">
                        <p>{__("Autoplay", "unlimited-blocks")}</p>
                        <ToggleControl
                          checked={sliderSetting.autoTrigger}
                          onChange={(e) => {
                            this.updateGlobalSlide(e, "autoTrigger");
                          }}
                        />
                      </div>
                      {sliderSetting.autoTrigger && (
                        <RangeControl
                          label={__("Autoplay Speed", "unlimited-blocks")}
                          value={sliderSetting.autoTriggerDelay}
                          min={0}
                          max={12}
                          onChange={(e) => {
                            this.updateGlobalSlide(
                              e,
                              "sliderSetting",
                              "autoTriggerDelay"
                            );
                          }}
                        />
                      )}

                      {(sliderSetting.triggerActive == "both" ||
                        sliderSetting.triggerActive == "dots") && (
                        <div
                          className={`slide-panel-single ${
                            commonDropDown == "dots-style" ? "active" : ""
                          }`}
                        >
                          <div
                            class="slide-nav"
                            onClick={() => {
                              if (commonDropDown == "dots-style") {
                                this.setState({ commonDropDown: "" });
                              } else {
                                this.setState({ commonDropDown: "dots-style" });
                              }
                            }}
                          >
                            <span>
                              {__("Dotts Styles", "unlimited-blocks")}
                            </span>
                            <div class="caret">
                              <i class="fas fa-caret-down"></i>
                            </div>
                          </div>
                          <div className="slides-element">
                            <RangeControl
                              label={__("Size", "unlimited-blocks")}
                              value={sliderSetting.linearTrigger.fontSize}
                              min={0}
                              max={70}
                              onChange={(e) => {
                                this.updateGlobalSlide(
                                  e,
                                  "linearTrigger",
                                  "fontSize"
                                );
                              }}
                            />
                            <label className="normal-label">
                              {__("Color", "unlimited-blocks")}
                            </label>
                            <ColorPalette
                              value={sliderSetting.linearTrigger.color}
                              onChange={(color) => {
                                this.updateGlobalSlide(
                                  color,
                                  "linearTrigger",
                                  "color"
                                );
                              }}
                            />
                            <label className="normal-label">
                              {__("Active Color", "unlimited-blocks")}
                            </label>
                            <ColorPalette
                              value={sliderSetting.linearTrigger.activeColor}
                              onChange={(color) => {
                                this.updateGlobalSlide(
                                  color,
                                  "linearTrigger",
                                  "activeColor"
                                );
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {(sliderSetting.triggerActive == "both" ||
                        sliderSetting.triggerActive == "arrows") && (
                        <div
                          className={`slide-panel-single ${
                            commonDropDown == "arrow-style" ? "active" : ""
                          }`}
                        >
                          <div
                            class="slide-nav"
                            onClick={() => {
                              if (commonDropDown == "arrow-style") {
                                this.setState({ commonDropDown: "" });
                              } else {
                                this.setState({
                                  commonDropDown: "arrow-style",
                                });
                              }
                            }}
                          >
                            <span>
                              {__("Arrows Styles", "unlimited-blocks")}
                            </span>
                            <div class="caret">
                              <i class="fas fa-caret-down"></i>
                            </div>
                          </div>
                          <div className="slides-element">
                            <RangeControl
                              label={__("Font Size", "unlimited-blocks")}
                              value={sliderSetting.leftRightTrigger.fontSize}
                              min={0}
                              max={70}
                              onChange={(e) => {
                                this.updateGlobalSlide(
                                  e,
                                  "leftRightTrigger",
                                  "fontSize"
                                );
                              }}
                            />
                            <label className="normal-label">
                              {__("Color", "unlimited-blocks")}
                            </label>
                            <ColorPalette
                              value={sliderSetting.leftRightTrigger.color}
                              onChange={(color) => {
                                let getLeftRight = {
                                  ...sliderSetting.leftRightTrigger,
                                };
                                getLeftRight.color = color;
                                this.updateGlobalSlide(
                                  color,
                                  "leftRightTrigger",
                                  "color"
                                );
                              }}
                            />
                          </div>
                        </div>
                      )}
                      {/* arrows and dots */}
                    </>
                  </div>
                </div>
              </PanelBody>
            </>
          )}
        </InspectorControls>
        {posts && posts.length > 0 ? (
          <div className={WrapperClass}>{this.slides(posts)}</div>
        ) : (
          <div>{!posts ? <PostNotfound /> : <PostLoader />}</div>
        )}
      </>
    );
  }
  // fn start ---------------------------------------------------------------------------------------------------------------
  slides = (slides) => {
    const { attributes } = this.props;
    const {
      heading,
      author,
      date,
      showTag,
      showCate,
      excerpt,
      meta_style,
      sliderSetting,
    } = attributes;

    const slider_options_ = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
    };

    if (sliderSetting.sliderEffect != "slideEffect") {
      slider_options_["fade"] = true;
    }

    if (sliderSetting.autoTrigger) {
      slider_options_["autoplay"] = true;
      slider_options_["autoplaySpeed"] = sliderSetting.autoTriggerDelay * 1000;
    }
    // next and previous custom
    if (
      sliderSetting.triggerActive == "both" ||
      sliderSetting.triggerActive == "arrows"
    ) {
      slider_options_["arrows"] = true;
      const arrowStyle = {
        fontSize: sliderSetting.leftRightTrigger.fontSize + "px",
        color: sliderSetting.leftRightTrigger.color,
      };
      const ArrowLeft = (props) => {
        const { onClick } = props;
        return (
          <div
            className={`ubl-slick-slider-arrow next_`}
            style={arrowStyle}
            onClick={onClick}
          >
            {/* Next */}
            <i className="fas fa-chevron-circle-right"></i>
          </div>
        );
      };
      const ArrowRight = (props) => {
        const { onClick } = props;
        return (
          <div
            className={`ubl-slick-slider-arrow prev_`}
            style={arrowStyle}
            onClick={onClick}
          >
            <i className="fas fa-chevron-circle-left"></i>
          </div>
        );
      };
      slider_options_["nextArrow"] = <ArrowLeft />;
      slider_options_["prevArrow"] = <ArrowRight />;
    } else {
      slider_options_["arrows"] = false;
    }
    // dots functionality
    if (
      sliderSetting.triggerActive == "both" ||
      sliderSetting.triggerActive == "dots"
    ) {
      slider_options_["dots"] = true;
    } else {
      slider_options_["dots"] = false;
    }

    slider_options_["appendDots"] = (check) => {
      let dotsStyle = {
        height: sliderSetting.linearTrigger.fontSize + "px",
        width: sliderSetting.linearTrigger.fontSize + "px",
      };
      let normalStyleColor = {
        ...dotsStyle,
        backgroundColor: sliderSetting.linearTrigger.color,
      };
      let activeStyleColor = {
        ...dotsStyle,
        backgroundColor: sliderSetting.linearTrigger.activeColor,
      };

      return (
        <ul data-class="ubl-slick-slider-dots">
          {check.map((dotsChildren) => {
            return (
              <li
                className={`custonLi_ ${dotsChildren.props.className}`}
                onClick={dotsChildren.props.children.props.onClick}
              >
                <span
                  style={
                    dotsChildren.props.className
                      ? activeStyleColor
                      : normalStyleColor
                  }
                ></span>
              </li>
            );
          })}
        </ul>
      );
    };
    // slider width
    let sliderOverLayColor = {
      opacity: sliderSetting.overlayColor.opacity / 10,
    };
    if (sliderSetting.overlayColor.type == "color") {
      sliderOverLayColor["backgroundColor"] = sliderSetting.overlayColor.color;
    } else if (sliderSetting.overlayColor.type == "gradient") {
      sliderOverLayColor["backgroundImage"] =
        sliderSetting.overlayColor.gradient;
    }

    // number of column and row
    if (sliderSetting.numberOfcolumn > 1) {
      slider_options_.slidesToShow = sliderSetting.numberOfcolumn;
      slider_options_.slidesToScroll = sliderSetting.numberOfcolumn;
    }
    if (sliderSetting.numberOfRow > 1) {
      slider_options_.rows = sliderSetting.numberOfRow;
    }
    // numberOfcolumn
    // numberOfRow
    // columnGap
    // rowGap
    //   slidesToShow: 4,
    // slidesToScroll: 4,
    // console.log("sliderSetting->", slider_options_);
    return (
      <SlickSlider
        ref={this.SlickSliderRef}
        className="ubl-slick-slider-block"
        {...slider_options_}
      >
        {slides.map((post) => {
          return (
            <div class="ubl-slider-container">
              <div class="ubl-slider-content-wrapper">
                <div class="ubl-post-image-container">
                  {post.feature_image ? <img src={post.feature_image} /> : ""}
                </div>
                <div
                  class="ubl-post-overlay-color"
                  style={sliderOverLayColor}
                ></div>

                <div class="ubl-post-slider-text">
                  <div className="slider-post-content">
                    <div
                      className={`post-wrapper content-align-${sliderSetting.contentAlign}`}
                    >
                      <div className="post-content">
                        <RichText.Content
                          className="post-heading"
                          tagName={heading.tag}
                          value={post.postTitle}
                          style={{
                            fontSize: heading.fontSize,
                            color: heading.color,
                          }}
                        />
                        {showCate.enable && (
                          <p className="post-category">
                            {showCateFn(
                              this.props,
                              post.post_categories,
                              showCate
                            )}
                          </p>
                        )}
                        <div className="post-meta-all">
                          {author && (
                            <p
                              style={{
                                color: meta_style.color,
                                fontSize: meta_style.fontSize + "px",
                              }}
                              className="post-author"
                            >
                              {post.author}
                            </p>
                          )}
                          {date.enable && (
                            <>
                              <p
                                style={{
                                  color: meta_style.color,
                                  fontSize: meta_style.fontSize + "px",
                                }}
                                className="post-date"
                              >
                                <span>{post.post_date}</span>
                              </p>
                            </>
                          )}
                          {date.last_modified && (
                            <>
                              <p
                                style={{
                                  color: meta_style.color,
                                  fontSize: meta_style.fontSize + "px",
                                }}
                                className="post-date-last-modified"
                              >
                                <span>
                                  {__("Modified : ", "unlimited-blocks")}
                                </span>
                                <span>{post.post_modified_date}</span>
                              </p>
                            </>
                          )}
                        </div>
                        {excerpt.enable && (
                          <p
                            style={{
                              color: excerpt.color,
                              fontSize: excerpt.fontSize + "px",
                            }}
                            className="post-excerpt"
                          >
                            {excerptWords(excerpt.words, post.post_excerpt)}
                          </p>
                        )}
                        {showTag.enable && (
                          <p
                            style={{ color: meta_style.color }}
                            className="post-tags"
                          >
                            {showTagsFn(post.post_tag, showTag)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </SlickSlider>
    );
  };
  // class end
}
export default Edit;
