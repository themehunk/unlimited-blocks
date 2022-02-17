import {
  RichText,
  InspectorControls,
  ColorPalette,
  MediaUpload,
  __experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import {
  PanelBody,
  RangeControl,
  ColorPicker,
  ToggleControl,
  __experimentalGradientPicker as GradientPicker,
  __experimentalInputControl as InputControl,
} from "@wordpress/components";

import { UBLGraDientColors } from "../block-assets/post-functions";
import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
let bgImageWrapper = plugin_url.url + "assets/img/image2.jpg";
class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSlide: 0,
      twoBtn: "buttoneOne",
      trigger: "linear",
      slideSetting: "slides",
      sideContentOpen: false,
      commonDropDown: "",
      slideBgButton: "",
    };
  }

  addSlide = () => {
    let defaultArray = {
      container: {
        bgImage: "",
        overlayColor: {
          type: "color",
          color: "rgb(10 10 10)",
          gradient:
            "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
          opacity: 0.6,
        },
        bgSize: "cover",
      },
      // wrapper: {
      //   bgcolor: "",
      //   border: "",
      //   alignment: "center",
      //   spacing: "2",
      // },
      title: {
        text: __("This Is Title text", "unlimited-blocks"),
        // fontSize: 17,
        // color: "red",
      },
      text: {
        text: __("Add Description", "unlimited-blocks"),
        // fontSize: 17,
        // color: "red",
      },
      buttoneOne: {
        enable: true,
        text: __("Button One", "unlimited-blocks"),
        link: "#",
        target: false,
      },
      buttoneTwo: {
        enable: true,
        text: __("Button Two", "unlimited-blocks"),
        link: "#",
        target: false,
      },
    };
    let slides_ = this.props.attributes.slides;
    this.props.setAttributes({ slides: [...slides_, ...defaultArray] });
    this.setState({ selectedSlide: slides_.length, sideContentOpen: false });
  };
  removeSlide(slideINdex = false) {
    let slides_ = [...this.props.attributes.slides];
    let removeItem = slideINdex ? slideINdex : this.state.selectedSlide;
    let afterRemove = [
      ...slides_.slice(0, removeItem),
      ...slides_.slice(removeItem + 1),
    ];
    let putSlide_ = removeItem - 1 >= 0 ? removeItem - 1 : removeItem;
    this.setState({
      selectedSlide: putSlide_,
      sideContentOpen: false,
    });
    this.props.setAttributes({ slides: afterRemove });
  }
  updateSlides = (value, for_, type) => {
    let slides_ = this.props.attributes.slides;
    let newSlide = [...slides_];
    newSlide[this.state.selectedSlide][for_][type] = value;
    this.props.setAttributes({ slides: newSlide });
  };
  // this.updateGlobalSlide("left", "wrapper", "alignment");
  updateGlobalSlide = (value, for_, type) => {
    let sliderSetting = this.props.attributes.sliderSetting;
    let newSetting = [...sliderSetting];
    if (type) {
      newSetting[0][for_][type] = value;
    } else {
      newSetting[0][for_] = value;
    }
    this.props.setAttributes({ sliderSetting: newSetting });
  };

  render() {
    // console.log("slider->", this.props);
    let { slides, sliderSetting } = this.props.attributes;
    const thisState = this.state;
    const stateIndex = thisState.selectedSlide;
    // console.log("stateIndex->", stateIndex);

    const currentSlide = slides[stateIndex];
    // console.log("currentSlide", currentSlide);
    // // undefined check
    // if (currentSlide) {
    sliderSetting = sliderSetting[0];
    const activeTwoBtnState = thisState.twoBtn;
    let triggerActive = thisState.trigger;
    let buttonOneStyle = {
      fontSize: sliderSetting.buttoneOne.fontSize,
      color: sliderSetting.buttoneOne.color,
      paddingTop: sliderSetting.buttoneOne.height,
      paddingBottom: sliderSetting.buttoneOne.height,
      paddingLeft: sliderSetting.buttoneOne.width,
      paddingRight: sliderSetting.buttoneOne.width,
    };
    buttonOneStyle = sliderSetting.buttoneOne.border
      ? {
          ...{
            borderColor: sliderSetting.buttoneOne.borderColor,
            borderWidth: sliderSetting.buttoneOne.borderWidth,
            borderRadius: sliderSetting.buttoneOne.borderRadius,
            borderStyle: "solid",
          },
          ...buttonOneStyle,
        }
      : buttonOneStyle;
    // background color btn
    if (sliderSetting.buttoneOne.backgroundColor.type == "color") {
      buttonOneStyle["backgroundColor"] =
        sliderSetting.buttoneOne.backgroundColor.color;
    } else if (sliderSetting.buttoneOne.backgroundColor.type == "gradient") {
      buttonOneStyle["backgroundImage"] =
        sliderSetting.buttoneOne.backgroundColor.gradient;
    }

    let buttonTwoStyle = {
      fontSize: sliderSetting.buttoneTwo.fontSize,
      color: sliderSetting.buttoneTwo.color,
      paddingTop: sliderSetting.buttoneTwo.height,
      paddingBottom: sliderSetting.buttoneTwo.height,
      paddingLeft: sliderSetting.buttoneTwo.width,
      paddingRight: sliderSetting.buttoneTwo.width,
    };
    buttonTwoStyle = sliderSetting.buttoneTwo.border
      ? {
          ...{
            borderColor: sliderSetting.buttoneTwo.borderColor,
            borderWidth: sliderSetting.buttoneTwo.borderWidth,
            borderRadius: sliderSetting.buttoneTwo.borderRadius,
            borderStyle: "solid",
          },
          ...buttonTwoStyle,
        }
      : buttonTwoStyle;
    // background color btn
    if (sliderSetting.buttoneTwo.backgroundColor.type == "color") {
      buttonTwoStyle["backgroundColor"] =
        sliderSetting.buttoneTwo.backgroundColor.color;
    } else if (sliderSetting.buttoneTwo.backgroundColor.type == "gradient") {
      buttonTwoStyle["backgroundImage"] =
        sliderSetting.buttoneTwo.backgroundColor.gradient;
    }
    let leftRightStyle = {
      color: sliderSetting.leftRightTrigger.color,
      // backgroundColor: sliderSetting.leftRightTrigger.backgroundColor,
      fontSize: sliderSetting.leftRightTrigger.fontSize,
    };
    let SlideulStyle = null;
    if (sliderSetting.dimension.height) {
      SlideulStyle = { minHeight: sliderSetting.dimension.custom_height };
    }
    // wrapper style
    let wrapperAlignment = sliderSetting.wrapper.alignment;
    let wrapperSpacing = {
      marginTop: sliderSetting.wrapper.spacing + "px",
      marginBottom: sliderSetting.wrapper.spacing + "px",
      textAlign: sliderSetting.wrapper.textAlign,
    };
    // wrapper style
    // title style
    let TitleStyle = {
      fontSize: sliderSetting.title.fontSize + "px",
      color: sliderSetting.title.color,
    };
    // title style
    // description style
    let descriptionStyle = {
      fontSize: sliderSetting.text.fontSize + "px",
      color: sliderSetting.text.color,
    };
    // description style
    return (
      <>
        <InspectorControls>
          <PanelBody
            title={__("Slider Settings", "unlimited-blocks")}
            initialOpen={false}
          >
            {/* top nav  */}
            <div class="ubl-switcher-button-section">
              <span
                onClick={() => {
                  this.setState({ slideSetting: "slides" });
                }}
                className={thisState.slideSetting == "slides" ? "selected" : ""}
              >
                {__("Slides", "unlimited-blocks")}
              </span>
              <span
                onClick={() => {
                  this.setState({ slideSetting: "option" });
                }}
                className={thisState.slideSetting == "option" ? "selected" : ""}
              >
                {__("Slider Options", "unlimited-blocks")}
              </span>
            </div>
            {/* top nav  */}
            <div className="ubl-panel-container ubl-slider-panel">
              {thisState.slideSetting == "slides" ? (
                <>
                  <div className="slides-option">
                    {slides.map((slides_, slides_I) => {
                      let serial = slides_I + 1;
                      return (
                        <div
                          className={`slide-panel-single ${
                            thisState.selectedSlide == slides_I &&
                            thisState.sideContentOpen
                              ? "active"
                              : ""
                          }`}
                        >
                          <div
                            className="slide-nav"
                            onClick={() => {
                              if (
                                thisState.sideContentOpen &&
                                thisState.selectedSlide == slides_I
                              ) {
                                this.setState({
                                  sideContentOpen: false,
                                });
                              } else {
                                this.setState({
                                  selectedSlide: slides_I,
                                  sideContentOpen: true,
                                  slideBgButton: serial + "background",
                                });
                              }
                            }}
                          >
                            <span>
                              {__("Slide", "unlimited-blocks") + " " + serial}
                            </span>
                            {serial !== slides.length && slides.length > 1 ? (
                              <div className="controlls">
                                <span
                                  onClick={() => {
                                    this.removeSlide(slides_I);
                                  }}
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </span>
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="caret">
                              <i className="fas fa-caret-down"></i>
                            </div>
                          </div>
                          <div className="slides-element">
                            {/* background and link url  */}
                            <div class="ubl-switcher-button-section sub">
                              <span
                                onClick={() => {
                                  this.setState({
                                    slideBgButton: serial + "background",
                                  });
                                }}
                                className={
                                  thisState.slideBgButton ==
                                  serial + "background"
                                    ? "selected"
                                    : ""
                                }
                              >
                                {__("Background", "unlimited-blocks")}
                              </span>
                              <span
                                onClick={() => {
                                  this.setState({
                                    slideBgButton: serial + "button",
                                  });
                                }}
                                className={
                                  thisState.slideBgButton == serial + "button"
                                    ? "selected"
                                    : ""
                                }
                              >
                                {__("Button Links", "unlimited-blocks")}
                              </span>
                            </div>
                            {/* background and link url  */}
                            {thisState.slideBgButton ==
                            serial + "background" ? (
                              <>
                                {/* background  */}
                                <p>
                                  <strong>
                                    {__("Background image", "unlimited-blocks")}
                                  </strong>
                                </p>
                                <MediaUpload
                                  allowedType="image"
                                  onSelect={(newImage) =>
                                    this.updateSlides(
                                      newImage.sizes.full.url,
                                      "container",
                                      "bgImage"
                                    )
                                  }
                                  value={slides_.container.bgImage}
                                  render={({ open }) => (
                                    <div
                                      onClick={open}
                                      className={`ubl-block-image-uploader ${
                                        !slides_.container.bgImage
                                          ? "blank"
                                          : ""
                                      }`}
                                    >
                                      <div>
                                        <i className="fas fa-plus"></i>
                                      </div>
                                      {slides_.container.bgImage ? (
                                        <img src={slides_.container.bgImage} />
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  )}
                                />
                                {slides_.container.bgImage && (
                                  <>
                                    <div className="remove-image">
                                      <span
                                        onClick={() => {
                                          this.updateSlides(
                                            "",
                                            "container",
                                            "bgImage"
                                          );
                                        }}
                                      >
                                        {__("Remove", "unlimited-blocks")}
                                      </span>
                                    </div>
                                    <div className="flex-section-slider">
                                      <p>
                                        {__(
                                          "Background Size",
                                          "unlimited-blocks"
                                        )}
                                      </p>
                                      <select
                                        value={currentSlide.container.bgSize}
                                        onChange={(e) => {
                                          this.updateSlides(
                                            e.target.value,
                                            "container",
                                            "bgSize"
                                          );
                                        }}
                                      >
                                        <option value="auto">
                                          {__("Auto", "unlimited-blocks")}
                                        </option>
                                        <option value="cover">
                                          {__("Cover", "unlimited-blocks")}
                                        </option>
                                        <option value="contain">
                                          {__("Contain", "unlimited-blocks")}
                                        </option>
                                      </select>
                                    </div>
                                  </>
                                )}
                                <p>
                                  <strong>
                                    {__(
                                      "Overlay / Background Color",
                                      "unlimited-blocks"
                                    )}
                                  </strong>
                                </p>
                                <div class="ubl-switcher-button-section sub">
                                  <span
                                    onClick={() => {
                                      let getBgcolor = {
                                        ...slides_.container.overlayColor,
                                      };
                                      getBgcolor["type"] = "color";
                                      this.updateSlides(
                                        getBgcolor,
                                        "container",
                                        "overlayColor"
                                      );
                                    }}
                                    className={
                                      slides_.container.overlayColor.type ==
                                      "color"
                                        ? "selected"
                                        : ""
                                    }
                                  >
                                    {__("Solid", "unlimited-blocks")}
                                  </span>
                                  <span
                                    onClick={() => {
                                      let getBgcolor = {
                                        ...slides_.container.overlayColor,
                                      };
                                      getBgcolor["type"] = "gradient";
                                      this.updateSlides(
                                        getBgcolor,
                                        "container",
                                        "overlayColor"
                                      );
                                    }}
                                    className={
                                      slides_.container.overlayColor.type ==
                                      "gradient"
                                        ? "selected"
                                        : ""
                                    }
                                  >
                                    {__("Gradient", "unlimited-blocks")}
                                  </span>
                                </div>
                                {"color" ==
                                slides_.container.overlayColor.type ? (
                                  <ColorPalette
                                    value={slides_.container.overlayColor.color}
                                    onChange={(color) => {
                                      let getBgcolor = {
                                        ...slides_.container.overlayColor,
                                      };
                                      getBgcolor["color"] = color;
                                      this.updateSlides(
                                        getBgcolor,
                                        "container",
                                        "overlayColor"
                                      );
                                    }}
                                  />
                                ) : (
                                  <GradientPicker
                                    disableCustomGradients={false}
                                    value={
                                      slides_.container.overlayColor.gradient
                                    }
                                    gradients={UBLGraDientColors}
                                    onChange={(newGradient) => {
                                      let getBgcolor = {
                                        ...slides_.container.overlayColor,
                                      };
                                      getBgcolor["gradient"] = newGradient;
                                      this.updateSlides(
                                        getBgcolor,
                                        "container",
                                        "overlayColor"
                                      );
                                    }}
                                  />
                                )}
                                <RangeControl
                                  label={__("Opacity", "unlimited-blocks")}
                                  value={slides_.container.overlayColor.opacity}
                                  min={0}
                                  max={1}
                                  step={0.1}
                                  onChange={(e) => {
                                    let getBgcolor = {
                                      ...slides_.container.overlayColor,
                                    };
                                    getBgcolor["opacity"] = e;
                                    this.updateSlides(
                                      getBgcolor,
                                      "container",
                                      "overlayColor"
                                    );
                                  }}
                                />
                                {/* bg color  */}
                                {/* background  */}
                              </>
                            ) : (
                              <>
                                {/* link  */}
                                <p>
                                  <strong>
                                    {__("Button 1", "unlimited-blocks")}
                                  </strong>
                                </p>
                                <ToggleControl
                                  label={
                                    slides_.buttoneOne.enable
                                      ? __("Disable", "unlimited-blocks")
                                      : __("Enable", "unlimited-blocks")
                                  }
                                  checked={slides_.buttoneOne.enable}
                                  onChange={(e) => {
                                    this.updateSlides(
                                      e,
                                      "buttoneOne",
                                      "enable"
                                    );
                                  }}
                                />
                                {slides_.buttoneOne.enable && (
                                  <div className="ubl-blocks-linkbtn">
                                    <LinkControl
                                      value={{
                                        url: slides_.buttoneOne.link,
                                        opensInNewTab:
                                          slides_.buttoneOne.target,
                                      }}
                                      onChange={(vall) => {
                                        if ("url" in vall) {
                                          this.updateSlides(
                                            vall.url,
                                            "buttoneOne",
                                            "link"
                                          );
                                        }
                                        //target
                                        if ("opensInNewTab" in vall) {
                                          this.updateSlides(
                                            vall.opensInNewTab,
                                            "buttoneOne",
                                            "target"
                                          );
                                        }
                                      }}
                                    />
                                  </div>
                                )}
                                <p>
                                  <strong>
                                    {__("Button 2", "unlimited-blocks")}
                                  </strong>
                                </p>
                                <ToggleControl
                                  label={
                                    slides_.buttoneTwo.enable
                                      ? __("Disable", "unlimited-blocks")
                                      : __("Enable", "unlimited-blocks")
                                  }
                                  checked={slides_.buttoneTwo.enable}
                                  onChange={(e) => {
                                    this.updateSlides(
                                      e,
                                      "buttoneTwo",
                                      "enable"
                                    );
                                  }}
                                />
                                {slides_.buttoneTwo.enable && (
                                  <div className="ubl-blocks-linkbtn">
                                    <LinkControl
                                      value={{
                                        url: slides_.buttoneTwo.link,
                                        opensInNewTab:
                                          slides_.buttoneTwo.target,
                                      }}
                                      onChange={(vall) => {
                                        if ("url" in vall) {
                                          this.updateSlides(
                                            vall.url,
                                            "buttoneTwo",
                                            "link"
                                          );
                                        }
                                        //target
                                        if ("opensInNewTab" in vall) {
                                          this.updateSlides(
                                            vall.opensInNewTab,
                                            "buttoneTwo",
                                            "target"
                                          );
                                        }
                                      }}
                                    />
                                  </div>
                                )}
                                {/* link  */}
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="add-new-slide">
                    <span
                      onClick={() => {
                        this.addSlide();
                      }}
                    >
                      <i class="fas fa-plus"></i>Add New
                    </span>
                  </div>
                  <p>
                    <strong>{__("Width", "unlimited-blocks")}</strong>
                  </p>
                  <ToggleControl
                    label={
                      sliderSetting.dimension.width
                        ? __("Full Width", "unlimited-blocks")
                        : __("Custom Width", "unlimited-blocks")
                    }
                    checked={sliderSetting.dimension.width}
                    onChange={(e) => {
                      this.updateGlobalSlide(e, "dimension", "width");
                    }}
                  />
                  {sliderSetting.dimension.width && (
                    <RangeControl
                      label={__("Width", "unlimited-blocks")}
                      value={sliderSetting.dimension.custom_width}
                      min={200}
                      max={1400}
                      onChange={(e) =>
                        this.updateGlobalSlide(e, "dimension", "custom_width")
                      }
                    />
                  )}
                  <p>
                    <strong>{__("Height", "unlimited-blocks")}</strong>
                  </p>
                  <ToggleControl
                    label={
                      sliderSetting.dimension.width
                        ? __("Auto", "unlimited-blocks")
                        : __("Custom Height", "unlimited-blocks")
                    }
                    checked={sliderSetting.dimension.height}
                    onChange={(e) => {
                      this.updateGlobalSlide(e, "dimension", "height");
                    }}
                  />
                  {sliderSetting.dimension.height && (
                    <RangeControl
                      label={__("Height", "unlimited-blocks")}
                      value={sliderSetting.dimension.custom_height}
                      min={360}
                      max={1000}
                      onChange={(e) =>
                        this.updateGlobalSlide(e, "dimension", "custom_height")
                      }
                    />
                  )}
                </>
              ) : (
                <div className="slides-settings">
                  <>
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
                        checked={sliderSetting.autoTrigger.enable}
                        onChange={(e) =>
                          this.updateGlobalSlide(e, "autoTrigger", "enable")
                        }
                      />
                    </div>
                    {sliderSetting.autoTrigger.enable && (
                      <RangeControl
                        label={__("Autoplay Speed", "unlimited-blocks")}
                        value={sliderSetting.autoTrigger.delay}
                        min={0}
                        max={12}
                        onChange={(e) =>
                          this.updateGlobalSlide(e, "autoTrigger", "delay")
                        }
                      />
                    )}
                    {(sliderSetting.triggerActive == "both" ||
                      sliderSetting.triggerActive == "dots") && (
                      <div
                        className={`slide-panel-single ${
                          thisState.commonDropDown == "dots-style"
                            ? "active"
                            : ""
                        }`}
                      >
                        <div
                          class="slide-nav"
                          onClick={() => {
                            if (thisState.commonDropDown == "dots-style") {
                              this.setState({ commonDropDown: "" });
                            } else {
                              this.setState({ commonDropDown: "dots-style" });
                            }
                          }}
                        >
                          <span>{__("Dotts Styles", "unlimited-blocks")}</span>
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
                            onChange={(e) =>
                              this.updateGlobalSlide(
                                e,
                                "linearTrigger",
                                "fontSize"
                              )
                            }
                          />
                          <label className="normal-label">
                            {__("Color", "unlimited-blocks")}
                          </label>
                          <ColorPicker
                            color={sliderSetting.linearTrigger.color}
                            onChangeComplete={(colorBg) => {
                              let color = `rgba(${colorBg.rgb.r},${colorBg.rgb.g},${colorBg.rgb.b},${colorBg.rgb.a})`;
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
                          <ColorPicker
                            color={sliderSetting.linearTrigger.activeColor}
                            onChangeComplete={(colorBg) => {
                              let color = `rgba(${colorBg.rgb.r},${colorBg.rgb.g},${colorBg.rgb.b},${colorBg.rgb.a})`;
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
                          thisState.commonDropDown == "arrow-style"
                            ? "active"
                            : ""
                        }`}
                      >
                        <div
                          class="slide-nav"
                          onClick={() => {
                            if (thisState.commonDropDown == "arrow-style") {
                              this.setState({ commonDropDown: "" });
                            } else {
                              this.setState({ commonDropDown: "arrow-style" });
                            }
                          }}
                        >
                          <span>{__("Arrows Styles", "unlimited-blocks")}</span>
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
                            onChange={(e) =>
                              this.updateGlobalSlide(
                                e,
                                "leftRightTrigger",
                                "fontSize"
                              )
                            }
                          />
                          <label className="normal-label">
                            {__("Color", "unlimited-blocks")}
                          </label>
                          <ColorPalette
                            value={sliderSetting.leftRightTrigger.color}
                            onChange={(color) =>
                              this.updateGlobalSlide(
                                color,
                                "leftRightTrigger",
                                "color"
                              )
                            }
                          />
                        </div>
                      </div>
                    )}
                    {/* arrows and dots */}
                  </>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelBody
            title={__("Content Settings", "unlimited-blocks")}
            initialOpen={false}
          >
            <div className="ubl-slider-panel">
              <p>
                <strong>{__("Content Alignment", "unlimited-blocks")}</strong>
              </p>
              <div className="ubl-alignment">
                <div>
                  <span
                    onClick={() => {
                      this.updateGlobalSlide("left", "wrapper", "alignment");
                    }}
                    className={`dashicons dashicons-editor-alignleft ${
                      sliderSetting.wrapper.alignment == "left" ? "active" : ""
                    }`}
                  ></span>
                </div>
                <div>
                  <span
                    onClick={() => {
                      this.updateGlobalSlide("center", "wrapper", "alignment");
                    }}
                    className={`dashicons dashicons-editor-aligncenter ${
                      sliderSetting.wrapper.alignment == "center"
                        ? "active"
                        : ""
                    }`}
                  ></span>
                </div>
                <div>
                  <span
                    onClick={() => {
                      this.updateGlobalSlide("right", "wrapper", "alignment");
                    }}
                    className={`dashicons dashicons-editor-alignright ${
                      sliderSetting.wrapper.alignment == "right" ? "active" : ""
                    }`}
                  ></span>
                </div>
              </div>
              <p>
                <strong>{__("Text Alignment", "unlimited-blocks")}</strong>
              </p>
              <div className="ubl-alignment">
                <div>
                  <span
                    onClick={() => {
                      this.updateGlobalSlide("left", "wrapper", "textAlign");
                    }}
                    className={`dashicons dashicons-editor-alignleft ${
                      sliderSetting.wrapper.textAlign == "left" ? "active" : ""
                    }`}
                  ></span>
                </div>
                <div>
                  <span
                    onClick={() => {
                      this.updateGlobalSlide("center", "wrapper", "textAlign");
                    }}
                    className={`dashicons dashicons-editor-aligncenter ${
                      sliderSetting.wrapper.textAlign == "center"
                        ? "active"
                        : ""
                    }`}
                  ></span>
                </div>
                <div>
                  <span
                    onClick={() => {
                      this.updateGlobalSlide("right", "wrapper", "textAlign");
                    }}
                    className={`dashicons dashicons-editor-alignright ${
                      sliderSetting.wrapper.textAlign == "right" ? "active" : ""
                    }`}
                  ></span>
                </div>
              </div>

              <p>
                <strong>{__("Text Vertical Space", "unlimited-blocks")}</strong>
              </p>
              <RangeControl
                value={sliderSetting.wrapper.spacing}
                min={0}
                max={30}
                onChange={(e) => {
                  this.updateGlobalSlide(e, "wrapper", "spacing");
                }}
              />
              {/* --------------heading style---------------- */}
              <div
                className={`slide-panel-single ${
                  thisState.commonDropDown == "heading-style" ? "active" : ""
                }`}
              >
                <div
                  class="slide-nav"
                  onClick={() => {
                    if (thisState.commonDropDown == "heading-style") {
                      this.setState({ commonDropDown: "" });
                    } else {
                      this.setState({ commonDropDown: "heading-style" });
                    }
                  }}
                >
                  <span>{__("Heading Styles", "unlimited-blocks")}</span>
                  <div class="caret">
                    <i class="fas fa-caret-down"></i>
                  </div>
                </div>
                <div className="slides-element">
                  <p>
                    <strong>{__("Font Size", "unlimited-blocks")}</strong>
                  </p>
                  <RangeControl
                    value={sliderSetting.title.fontSize}
                    min={0}
                    max={100}
                    onChange={(e) => {
                      this.updateGlobalSlide(e, "title", "fontSize");
                    }}
                  />
                  <p>
                    <strong>{__("Color", "unlimited-blocks")}</strong>
                  </p>
                  <ColorPalette
                    value={sliderSetting.title.color}
                    onChange={(color) =>
                      this.updateGlobalSlide(color, "title", "color")
                    }
                  />
                </div>
              </div>
              {/* --------------description style---------------- */}
              <div
                className={`slide-panel-single ${
                  thisState.commonDropDown == "description-style"
                    ? "active"
                    : ""
                }`}
              >
                <div
                  class="slide-nav"
                  onClick={() => {
                    if (thisState.commonDropDown == "description-style") {
                      this.setState({ commonDropDown: "" });
                    } else {
                      this.setState({ commonDropDown: "description-style" });
                    }
                  }}
                >
                  <span>{__("Description Setting", "unlimited-blocks")}</span>
                  <div class="caret">
                    <i class="fas fa-caret-down"></i>
                  </div>
                </div>
                <div className="slides-element">
                  <p>
                    <strong>{__("Font Size", "unlimited-blocks")}</strong>
                  </p>
                  <RangeControl
                    value={sliderSetting.text.fontSize}
                    min={0}
                    max={100}
                    onChange={(e) =>
                      this.updateGlobalSlide(e, "text", "fontSize")
                    }
                  />
                  <p>
                    <strong>{__("Color", "unlimited-blocks")}</strong>
                  </p>
                  <ColorPalette
                    value={sliderSetting.text.color}
                    onChange={(color) =>
                      this.updateGlobalSlide(color, "text", "color")
                    }
                  />
                </div>
              </div>
              {/* --------------button style---------------- */}
              <div
                className={`slide-panel-single ${
                  thisState.commonDropDown == "button-style" ? "active" : ""
                }`}
              >
                <div
                  class="slide-nav"
                  onClick={() => {
                    if (thisState.commonDropDown == "button-style") {
                      this.setState({ commonDropDown: "" });
                    } else {
                      this.setState({ commonDropDown: "button-style" });
                    }
                  }}
                >
                  <span>{__("Button Setting", "unlimited-blocks")}</span>
                  <div class="caret">
                    <i class="fas fa-caret-down"></i>
                  </div>
                </div>
                <div className="slides-element">
                  <div className="ubl-switcher-button-section">
                    <span
                      className={
                        activeTwoBtnState == "buttoneOne" ? "selected" : ""
                      }
                      onClick={() => {
                        this.setState({ twoBtn: "buttoneOne" });
                      }}
                    >
                      {__("Button 1", "unlimited-blocks")}
                    </span>
                    <span
                      className={
                        activeTwoBtnState == "buttoneTwo" ? "selected" : ""
                      }
                      onClick={() => {
                        this.setState({ twoBtn: "buttoneTwo" });
                      }}
                    >
                      {__("Button 2", "unlimited-blocks")}
                    </span>
                  </div>
                  <RangeControl
                    label={__("Font Size", "unlimited-blocks")}
                    value={sliderSetting[activeTwoBtnState].fontSize}
                    min={0}
                    max={70}
                    onChange={(e) =>
                      this.updateGlobalSlide(e, activeTwoBtnState, "fontSize")
                    }
                  />
                  <p>{__("Color", "unlimited-blocks")}</p>
                  <ColorPalette
                    value={sliderSetting[activeTwoBtnState].color}
                    onChange={(color) =>
                      this.updateGlobalSlide(color, activeTwoBtnState, "color")
                    }
                  />
                  <p>{__("Background Color", "unlimited-blocks")}</p>
                  {/* bg color  */}
                  <div class="ubl-switcher-button-section sub">
                    <span
                      onClick={() => {
                        let getBgcolor = {
                          ...sliderSetting[activeTwoBtnState].backgroundColor,
                        };
                        getBgcolor["type"] = "color";
                        this.updateGlobalSlide(
                          getBgcolor,
                          activeTwoBtnState,
                          "backgroundColor"
                        );
                      }}
                      className={
                        sliderSetting[activeTwoBtnState].backgroundColor.type ==
                        "color"
                          ? "selected"
                          : ""
                      }
                    >
                      {__("Solid", "unlimited-blocks")}
                    </span>
                    <span
                      onClick={() => {
                        let getBgcolor = {
                          ...sliderSetting[activeTwoBtnState].backgroundColor,
                        };
                        getBgcolor["type"] = "gradient";
                        this.updateGlobalSlide(
                          getBgcolor,
                          activeTwoBtnState,
                          "backgroundColor"
                        );
                      }}
                      className={
                        sliderSetting[activeTwoBtnState].backgroundColor.type ==
                        "gradient"
                          ? "selected"
                          : ""
                      }
                    >
                      {__("Gradient", "unlimited-blocks")}
                    </span>
                  </div>
                  {"color" ==
                  sliderSetting[activeTwoBtnState].backgroundColor.type ? (
                    <ColorPicker
                      color={
                        sliderSetting[activeTwoBtnState].backgroundColor.color
                      }
                      onChangeComplete={(colorBg) => {
                        let color = `rgba(${colorBg.rgb.r},${colorBg.rgb.g},${colorBg.rgb.b},${colorBg.rgb.a})`;
                        let getBgcolor = {
                          ...sliderSetting[activeTwoBtnState].backgroundColor,
                        };
                        getBgcolor["color"] = color;
                        this.updateGlobalSlide(
                          getBgcolor,
                          activeTwoBtnState,
                          "backgroundColor"
                        );
                      }}
                    />
                  ) : (
                    <GradientPicker
                      disableCustomGradients={false}
                      value={
                        sliderSetting[activeTwoBtnState].backgroundColor
                          .gradient
                      }
                      gradients={UBLGraDientColors}
                      onChange={(newGradient) => {
                        let getBgcolor = {
                          ...sliderSetting[activeTwoBtnState].backgroundColor,
                        };
                        getBgcolor["gradient"] = newGradient;
                        this.updateGlobalSlide(
                          getBgcolor,
                          activeTwoBtnState,
                          "backgroundColor"
                        );
                      }}
                    />
                  )}
                  {/* bg color  */}
                  <RangeControl
                    label={__("Height", "unlimited-blocks")}
                    value={sliderSetting[activeTwoBtnState].height}
                    min={0}
                    max={30}
                    onChange={(e) =>
                      this.updateGlobalSlide(e, activeTwoBtnState, "height")
                    }
                  />
                  <RangeControl
                    label={__("Width", "unlimited-blocks")}
                    value={sliderSetting[activeTwoBtnState].width}
                    min={0}
                    max={30}
                    onChange={(e) =>
                      this.updateGlobalSlide(e, activeTwoBtnState, "width")
                    }
                  />
                  <p>
                    <strong>{__("Border", "unlimited-blocks")}</strong>
                  </p>
                  <ToggleControl
                    label={
                      sliderSetting[activeTwoBtnState].border
                        ? __("Disable", "unlimited-blocks")
                        : __("Enable", "unlimited-blocks")
                    }
                    checked={sliderSetting[activeTwoBtnState].border}
                    onChange={(e) =>
                      this.updateGlobalSlide(e, activeTwoBtnState, "border")
                    }
                  />
                  {sliderSetting[activeTwoBtnState].border && (
                    <div className="icon-border-setting">
                      <RangeControl
                        label={__("Border Width", "unlimited-blocks")}
                        value={sliderSetting[activeTwoBtnState].borderWidth}
                        min={0}
                        max={100}
                        onChange={(e) =>
                          this.updateGlobalSlide(
                            e,
                            activeTwoBtnState,
                            "borderWidth"
                          )
                        }
                      />
                      <RangeControl
                        label={__("Border Radius", "unlimited-blocks")}
                        value={sliderSetting[activeTwoBtnState].borderRadius}
                        min={0}
                        max={50}
                        onChange={(e) =>
                          this.updateGlobalSlide(
                            e,
                            activeTwoBtnState,
                            "borderRadius"
                          )
                        }
                      />
                      <p>{__("Border Color", "unlimited-blocks")}</p>
                      <ColorPalette
                        value={sliderSetting[activeTwoBtnState].borderColor}
                        onChange={(color) =>
                          this.updateGlobalSlide(
                            color,
                            activeTwoBtnState,
                            "borderColor"
                          )
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* --------------button style---------------- */}
            </div>
          </PanelBody>
        </InspectorControls>
        <div className="ubl-block-slide-wrapper">
          <div className="ubl-slider-bullet">
            <ul className="ubl-slider-ul-bullet">
              {slides.map((val, index_) => {
                return (
                  <li
                    key={index_}
                    className={stateIndex == index_ ? "selected_" : null}
                  >
                    <span
                      onClick={(e) => {
                        this.setState({
                          selectedSlide: index_,
                          sideContentOpen: false,
                        });
                      }}
                    ></span>
                  </li>
                );
              })}
              {slides.length < 8 && (
                <li className="add-item">
                  <span
                    onClick={() => {
                      this.addSlide();
                    }}
                  >
                    <i className="fas fa-plus"></i>
                  </span>
                </li>
              )}
            </ul>
          </div>
          <div className="ubl-slider-container">
            {/* slider trigger */}
            {(sliderSetting.triggerActive == "both" ||
              sliderSetting.triggerActive == "dots") && (
              <ul className="ubl-slider-bullet-trigger">
                {slides.map((val, index_) => {
                  let trigStyle = {
                    height: sliderSetting.linearTrigger.fontSize + "px",
                    width: sliderSetting.linearTrigger.fontSize + "px",
                  };
                  trigStyle =
                    index_ != stateIndex
                      ? {
                          ...trigStyle,
                          ...{
                            backgroundColor: sliderSetting.linearTrigger.color,
                          },
                        }
                      : {
                          ...trigStyle,
                          ...{
                            backgroundColor:
                              sliderSetting.linearTrigger.activeColor,
                          },
                        };
                  return (
                    <li
                      className={`${index_ == stateIndex ? "selected_" : ""}`}
                    >
                      <span style={trigStyle}></span>
                    </li>
                  );
                })}
              </ul>
            )}
            {/* next prev btn */}
            {(sliderSetting.triggerActive == "both" ||
              sliderSetting.triggerActive == "arrows") && (
              <>
                <div className="ubl-slider-bullet-next-prev next">
                  <span style={leftRightStyle}>
                    <i class="fas fa-arrow-right"></i>
                  </span>
                </div>
                <div className="ubl-slider-bullet-next-prev prev">
                  <span style={leftRightStyle}>
                    <i class="fas fa-arrow-left"></i>
                  </span>
                </div>
              </>
            )}
            {/* next prev btn */}
            {/* slider trigger */}
            {slides.length > 1 && (
              <span
                className="ubl-remove-slide"
                onClick={(e) => {
                  this.removeSlide();
                }}
              >
                <i className="fas fa-trash-alt"></i>
              </span>
            )}
            <ul className="ubl-slider-ul-slides" style={SlideulStyle}>
              {slides.map((val, index_) => {
                let overLAyColor = {};
                if (val.container.bgImage) {
                  overLAyColor["opacity"] = val.container.overlayColor.opacity;
                }
                if (val.container.overlayColor.type == "color") {
                  overLAyColor["backgroundColor"] =
                    val.container.overlayColor.color;
                } else if (val.container.overlayColor.type == "gradient") {
                  overLAyColor["backgroundImage"] =
                    val.container.overlayColor.gradient;
                }
                return (
                  <li
                    onClick={(e) => {
                      this.setState({ selectedSlide: index_ });
                    }}
                    key={index_}
                    className={stateIndex == index_ ? "selected_" : null}
                  >
                    <div className="ubl-slider-wrapper">
                      <div className="ubl-slider-container">
                        <div className="ubl-slider-content-wrapper">
                          {val.container.bgImage && (
                            <div
                              className="ubl-slider-image-container"
                              style={{
                                backgroundSize: val.container.bgSize,
                                backgroundImage:
                                  "url(" + val.container.bgImage + ")",
                              }}
                            ></div>
                          )}
                          <div
                            className="ubl-slider-overlay-color"
                            style={overLAyColor}
                          ></div>
                          <div
                            className={`ubl-slider-text ${wrapperAlignment}`}
                          >
                            <div style={wrapperSpacing}>
                              <RichText
                                key="editable"
                                tagName="h1"
                                placeholder={__(
                                  "Service Title",
                                  "unlimited-blocks"
                                )}
                                value={val.title.text}
                                allowedFormats={[]}
                                onChange={(e) =>
                                  this.updateSlides(e, "title", "text")
                                }
                                style={TitleStyle}
                              />
                              <RichText
                                key="editable"
                                tagName="h2"
                                placeholder={__(
                                  "Service Title",
                                  "unlimited-blocks"
                                )}
                                allowedFormats={[]}
                                value={val.text.text}
                                onChange={(e) =>
                                  this.updateSlides(e, "text", "text")
                                }
                                style={descriptionStyle}
                              />
                              <div className="button-container">
                                {val.buttoneOne.enable && (
                                  <>
                                    <RichText
                                      key="editable"
                                      tagName="span"
                                      allowedFormats={[]}
                                      placeholder={__(
                                        "Button One",
                                        "unlimited-blocks"
                                      )}
                                      value={val.buttoneOne.text}
                                      onChange={(e) =>
                                        this.updateSlides(
                                          e,
                                          "buttoneOne",
                                          "text"
                                        )
                                      }
                                      style={buttonOneStyle}
                                    />
                                  </>
                                )}
                                {val.buttoneTwo.enable && (
                                  <RichText
                                    key="editable"
                                    tagName="span"
                                    allowedFormats={[]}
                                    placeholder={__(
                                      "Button Two",
                                      "unlimited-blocks"
                                    )}
                                    value={val.buttoneTwo.text}
                                    onChange={(e) =>
                                      this.updateSlides(e, "buttoneTwo", "text")
                                    }
                                    style={buttonTwoStyle}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </>
    );
    // }
    // undefined check
  }
}
export default Edit;
