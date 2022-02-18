import {
  RichText,
  InspectorControls,
  __experimentalLinkControl as LinkControl,
  BlockControls,
  AlignmentToolbar,
} from "@wordpress/block-editor";
import {
  PanelBody,
  RangeControl,
  ColorPicker,
  ToggleControl,
  __experimentalGradientPicker as GradientPicker,
  __experimentalInputControl as InputControl,
  ColorPalette,
} from "@wordpress/components";
import { UBLGraDientColors } from "../block-assets/post-functions";
import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
// import OwlCarousel_custom from "./owl/slider";
// import OwlCarousel from "react-owl-carousel";
// import OwlCarousel from "react-owl-carousel";
import SlickSlider from "react-slick";
let bgImageWrapper = plugin_url.url + "assets/img/image2.jpg";
import BasicToggleNav from "../block-assets/utility-components/BasicToggleNav";
import Switcher from "../block-assets/utility-components/TwoSwitcher";
import BackgroundType from "../block-assets/utility-components/backgroundType/backgroundType";
class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlideIndex: 0,
      twoBtn: "buttoneOne",
      // trigger: "linear",
      // slideSetting: "slides",
      sideContentOpen: false,
      commonDropDown: "",
      slideBgButton: "",
      openPanel: "slides",
    };
    this.SlickSliderRef = React.createRef();
  }
  componentDidMount() {
    if (this.props.attributes.wrapper_id == "") {
      this.props.setAttributes({ wrapper_id: this.props.clientId });
    }
  }
  updateSlide = (
    index_,
    val,
    key_ = false,
    key2_ = false,
    multiple_ = false
  ) => {
    let { attributes, setAttributes } = this.props;
    if ((index_ === 0 && key_) || (index_ && key_)) {
      let slides_ = [...attributes.slides];
      if (multiple_) {
        let multiple_ = { ...slides_[index_] };
        multiple_[key_] = val;
        slides_[index_] = multiple_;
      } else {
        slides_[index_][key_][key2_] = val;
      }
      // console.log("slides->", slides);
      setAttributes({ slides: slides_ });
    }
  };
  updateAttr = (val, key_ = false, key2_ = false, multiple_ = false) => {
    const { attributes, setAttributes } = this.props;
    if (key_) {
      let copyAttr = { ...attributes[key_] };
      // console.log("copyAttr", attr_);
      // let copyAttr = attr_[key_];
      if (multiple_) {
        copyAttr = { ...copyAttr, ...multiple_ };
      } else {
        copyAttr[key2_] = val;
      }
      let saveAttr = {};
      saveAttr[key_] = copyAttr;
      setAttributes(saveAttr);
    }
  };

  changeSlideIndex = (index) => {
    // console.log("changeSlideIndex->", index);
    this.setState({
      currentSlideIndex: index,
    });
    if (this.SlickSliderRef.current) {
      this.SlickSliderRef.current.slickGoTo(index);
    }
  };
  slides = () => {
    const { attributes } = this.props;
    const slides = [...attributes.slides];
    const {
      wrapper,
      title: sliderTitle,
      text: description,
      buttoneOne,
      buttoneTwo,
      sliderSetting,
    } = attributes;
    let wrapperAlignment = wrapper.alignment;
    // let wrapperSpacing = {
    //   marginTop: sliderSetting.wrapper.spacing + "px",
    //   marginBottom: sliderSetting.wrapper.spacing + "px",
    //   textAlign: sliderSetting.wrapper.textAlign,
    // };
    let buttonOneStyle = {
      fontSize: buttoneOne.fontSize + "px",
      color: buttoneOne.color,
      paddingTop: buttoneOne.height + "px",
      paddingBottom: buttoneOne.height + "px",
      paddingLeft: buttoneOne.width + "px",
      paddingRight: buttoneOne.width + "px",
    };
    // buttonOneStyle = sliderSetting.buttoneOne.border
    //   ? {
    //       ...{
    //         borderColor: sliderSetting.buttoneOne.borderColor,
    //         borderWidth: sliderSetting.buttoneOne.borderWidth,
    //         borderRadius: sliderSetting.buttoneOne.borderRadius,
    //         borderStyle: "solid",
    //       },
    //       ...buttonOneStyle,
    //     }
    //   : buttonOneStyle;
    // // background color btn
    // if (sliderSetting.buttoneOne.backgroundColor.type == "color") {
    //   buttonOneStyle["backgroundColor"] =
    //     sliderSetting.buttoneOne.backgroundColor.color;
    // } else if (sliderSetting.buttoneOne.backgroundColor.type == "gradient") {
    //   buttonOneStyle["backgroundImage"] =
    //     sliderSetting.buttoneOne.backgroundColor.gradient;
    // }

    let buttonTwoStyle = {
      fontSize: buttoneTwo.fontSize + "px",
      color: buttoneTwo.color,
      paddingTop: buttoneTwo.height + "px",
      paddingBottom: buttoneTwo.height + "px",
      paddingLeft: buttoneTwo.width + "px",
      paddingRight: buttoneTwo.width + "px",
    };
    // buttonTwoStyle = sliderSetting.buttoneTwo.border
    //   ? {
    //       ...{
    //         borderColor: sliderSetting.buttoneTwo.borderColor,
    //         borderWidth: sliderSetting.buttoneTwo.borderWidth,
    //         borderRadius: sliderSetting.buttoneTwo.borderRadius,
    //         borderStyle: "solid",
    //       },
    //       ...buttonTwoStyle,
    //     }
    //   : buttonTwoStyle;
    // // background color btn
    // if (sliderSetting.buttoneTwo.backgroundColor.type == "color") {
    //   buttonTwoStyle["backgroundColor"] =
    //     sliderSetting.buttoneTwo.backgroundColor.color;
    // } else if (sliderSetting.buttoneTwo.backgroundColor.type == "gradient") {
    //   buttonTwoStyle["backgroundImage"] =
    //     sliderSetting.buttoneTwo.backgroundColor.gradient;
    // }

    // title style
    let TitleStyle = {
      fontSize: sliderTitle.fontSize + "px",
      color: sliderTitle.color,
    };
    // description style
    let descriptionStyle = {
      fontSize: description.fontSize + "px",
      color: description.color,
    };

    const slider_options_ = {
      // nav: true,
      // items: 1,
      // startPosition: currentSlideIndex,
      // dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    if (sliderSetting.sliderEffect != "slide") {
      slider_options_["fade"] = true;
    }
    if (
      sliderSetting.triggerActive == "both" ||
      sliderSetting.triggerActive == "dots"
    ) {
      slider_options_["dots"] = true;
    }
    if (
      sliderSetting.triggerActive == "both" ||
      sliderSetting.triggerActive == "arrows"
    ) {
      slider_options_["nav"] = true;
    }

    if (sliderSetting.autoTrigger) {
      slider_options_["autoplay"] = true;
      slider_options_["autoplaySpeed"] = sliderSetting.autoTriggerDelay * 1000;
    }
    console.log("slider_options_", slider_options_);
    if (slides.length) {
      const OwlCarousel_ = (
        <SlickSlider
          ref={this.SlickSliderRef}
          className="ubl-slick-slider-block"
          {...slider_options_}
        >
          {slides.map((val, slideIndex) => {
            let overLAyColor = null;
            const { container } = val;
            const { bg } = container;
            if (bg.backgroundType && bg.backgroundType != "none") {
              overLAyColor = {};
              if (bg.backgroundImage) {
                overLAyColor["opacity"] = bg.backgroundOpacity;
              }
              if (bg.backgroundColorType == "color") {
                overLAyColor["backgroundColor"] = bg.backgroundColor;
              } else if (bg.backgroundColorType == "gradient") {
                overLAyColor["backgroundImage"] = bg.backgroundImageGradient;
              }
            }
            return (
              <div className="ubl-slider-wrapper">
                <div className="ubl-slider-container">
                  <div className="ubl-slider-content-wrapper">
                    {overLAyColor && bg.backgroundImage && (
                      <div
                        className="ubl-slider-image-container"
                        style={{
                          backgroundSize: bg.backgroundImageSize,
                          backgroundImage: "url(" + bg.backgroundImage + ")",
                        }}
                      ></div>
                    )}
                    <div
                      className="ubl-slider-overlay-color"
                      style={overLAyColor}
                    ></div>
                    <div className={`ubl-slider-text ${wrapperAlignment}`}>
                      <div style={{ gridGap: wrapper.spacing + "px" }}>
                        <RichText
                          key="editable"
                          tagName="h1"
                          placeholder={__("Service Title", "unlimited-blocks")}
                          value={val.title.text}
                          allowedFormats={[]}
                          onChange={(e) => {
                            this.updateSlide(slideIndex, e, "title", "text");
                          }}
                          style={TitleStyle}
                        />
                        <RichText
                          key="editable"
                          tagName="h2"
                          placeholder={__("Service Title", "unlimited-blocks")}
                          allowedFormats={[]}
                          value={val.text.text}
                          onChange={(e) => {
                            this.updateSlide(slideIndex, e, "text", "text");
                          }}
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
                                onChange={(e) => {
                                  this.updateSlide(
                                    slideIndex,
                                    e,
                                    "buttoneOne",
                                    "text"
                                  );
                                }}
                                style={buttonOneStyle}
                              />
                            </>
                          )}
                          {val.buttoneTwo.enable && (
                            <>
                              <RichText
                                key="editable"
                                tagName="span"
                                allowedFormats={[]}
                                placeholder={__(
                                  "Button Two",
                                  "unlimited-blocks"
                                )}
                                value={val.buttoneTwo.text}
                                onChange={(e) => {
                                  this.updateSlide(
                                    slideIndex,
                                    e,
                                    "buttoneTwo",
                                    "text"
                                  );
                                }}
                                style={buttonTwoStyle}
                              />
                            </>
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
      return OwlCarousel_;
    }
  };
  singleSlideNav = (slides, slides_I, serial) => {
    const { currentSlideIndex, sideContentOpen } = this.state;
    return (
      <div
        className="slide-nav"
        onClick={() => {
          if (sideContentOpen && currentSlideIndex == slides_I) {
            this.setState({
              sideContentOpen: false,
            });
          } else {
            this.changeSlideIndex(slides_I);
            this.setState({
              sideContentOpen: true,
              slideBgButton: serial + "text",
            });
          }
        }}
      >
        <span>{__("Slide", "unlimited-blocks") + " " + serial}</span>
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
    );
  };
  singleSlideElement = (slides, index_, serial) => {
    // console.log("slides -> ", slides);
    const { currentSlideIndex, sideContentOpen, slideBgButton } = this.state;
    const textTab_ = serial + "text",
      buttonTab_ = serial + "button",
      backgroundTab_ = serial + "background";

    const textTab_Content = () => (
      <div className="text_">
        <label>{__("Title", "unlimited-blocks")}</label>
        <textarea
          onChange={(e) => {
            let val_ = e.target.value;
            // console.log("vale-", val_);
            this.updateSlide(index_, val_, "title", "text");
          }}
        >
          {slides.title.text}
        </textarea>
        <label>{__("Description", "unlimited-blocks")}</label>
        <textarea
          onChange={(e) => {
            let val_ = e.target.value;
            this.updateSlide(index_, val_, "text", "text");
          }}
        >
          {slides.text.text}
        </textarea>
      </div>
    );
    const buttonTab_Content = () => (
      <>
        {/* link  */}
        <p>
          <strong>{__("Button 1", "unlimited-blocks")}</strong>
        </p>
        <ToggleControl
          label={
            slides.buttoneOne.enable
              ? __("Disable", "unlimited-blocks")
              : __("Enable", "unlimited-blocks")
          }
          checked={slides.buttoneOne.enable}
          onChange={(e) => {
            this.updateSlide(index_, e, "buttoneOne", "enable");
          }}
        />
        {slides.buttoneOne.enable && (
          <>
            <div className="text_">
              <label>{__("Button Text", "unlimited-blocks")}</label>
              <textarea
                onChange={(e) => {
                  let val_ = e.target.value;
                  this.updateSlide(index_, val_, "buttoneOne", "text");
                }}
              >
                {slides.buttoneOne.text}
              </textarea>
            </div>
            <div className="ubl-blocks-linkbtn">
              <LinkControl
                value={{
                  url: slides.buttoneOne.link,
                  opensInNewTab: slides.buttoneOne.target,
                }}
                onChange={(vall) => {
                  if ("url" in vall) {
                    this.updateSlide(index_, vall.url, "buttoneOne", "link");
                  }
                  //target
                  if ("opensInNewTab" in vall) {
                    this.updateSlide(
                      index_,
                      vall.opensInNewTab,
                      "buttoneOne",
                      "target"
                    );
                  }
                }}
              />
            </div>
          </>
        )}
        <p>
          <strong>{__("Button 2", "unlimited-blocks")}</strong>
        </p>
        <ToggleControl
          label={
            slides.buttoneTwo.enable
              ? __("Disable", "unlimited-blocks")
              : __("Enable", "unlimited-blocks")
          }
          checked={slides.buttoneTwo.enable}
          onChange={(e) => {
            this.updateSlide(index_, e, "buttoneTwo", "enable");
          }}
        />
        {slides.buttoneTwo.enable && (
          <>
            <div className="text_">
              <label>{__("Button Text", "unlimited-blocks")}</label>
              <textarea
                onChange={(e) => {
                  let val_ = e.target.value;
                  this.updateSlide(index_, val_, "buttoneTwo", "text");
                }}
              >
                {slides.buttoneTwo.text}
              </textarea>
            </div>
            <div className="ubl-blocks-linkbtn">
              <LinkControl
                value={{
                  url: slides.buttoneTwo.link,
                  opensInNewTab: slides.buttoneTwo.target,
                }}
                onChange={(vall) => {
                  if ("url" in vall) {
                    this.updateSlide(index_, vall.url, "buttoneTwo", "link");
                  }
                  //target
                  if ("opensInNewTab" in vall) {
                    this.updateSlide(
                      index_,
                      vall.opensInNewTab,
                      "buttoneTwo",
                      "target"
                    );
                  }
                }}
              />
            </div>
          </>
        )}
        {/* link  */}
      </>
    );
    const backgroundTab_Content = () => (
      <BackgroundType
        value={{
          backgroundType: slides.container.bg.backgroundType,
          backgroundImage: slides.container.bg.backgroundImage,
          backgroundImageSize: slides.container.bg.backgroundImageSize,
          backgroundColorType: slides.container.bg.backgroundColorType,
          backgroundColor: slides.container.bg.backgroundColor,
          backgroundImageGradient: slides.container.bg.backgroundImageGradient,
          backgroundOpacity: slides.container.bg.backgroundOpacity,
        }}
        changeme={(getProperty) => {
          this.updateSlide(index_, getProperty, "container", "bg");
        }}
      />
    );

    return (
      <div className="slides-element">
        {/* background and link url  */}
        <Switcher
          value={slideBgButton}
          navItem={[
            {
              name: textTab_,
              title: "Content",
            },
            {
              name: buttonTab_,
              title: "Button",
            },
            {
              name: backgroundTab_,
              title: "Style",
            },
          ]}
          clickme={(value_) => {
            this.setState({ slideBgButton: value_ });
          }}
        />
        {/* background and link url  */}
        {slideBgButton == textTab_
          ? textTab_Content()
          : slideBgButton == buttonTab_
          ? buttonTab_Content()
          : backgroundTab_Content()}
      </div>
    );
  };
  inspectorSlidesPanel = () => {
    const slides = [...this.props.attributes.slides];
    const { currentSlideIndex, sideContentOpen } = this.state;
    return (
      <PanelBody initialOpen={true}>
        <div className="slides-option">
          {slides.map((slides_, slides_I) => {
            let serial = slides_I + 1;
            return (
              <div
                className={`slide-panel-single ${
                  currentSlideIndex == slides_I && sideContentOpen
                    ? "active"
                    : ""
                }`}
              >
                {this.singleSlideNav(slides, slides_I, serial)}
                {this.singleSlideElement(slides_, slides_I, serial)}
              </div>
            );
          })}
        </div>
        {this.addNewSlideHtml()}
      </PanelBody>
    );
  };
  addNewSlide = () => {
    const defaultSlide = {
      container: {
        bg: {
          backgroundType: "color",
          backgroundImage: "",
          backgroundImageSize: "cover",
          backgroundColorType: "color",
          backgroundColor: "rgb(68 132 173)",
          backgroundImageGradient:
            "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
          backgroundOpacity: 0.6,
        },
      },
      title: {
        text: __("This Is Title text", "unlimited-blocks"),
      },
      text: {
        text: __("Add Description", "unlimited-blocks"),
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
    let slides_ = [...this.props.attributes.slides];
    slides_.push(defaultSlide);
    this.props.setAttributes({ slides: slides_ });
    setTimeout(() => {
      this.changeSlideIndex(slides_.length - 1);
      this.setState({
        sideContentOpen: true,
        slideBgButton: slides_.length + "text",
      });
    }, 10);
  };
  addNewSlideHtml = () => {
    return (
      <div className="add-new-slide">
        <span
          onClick={() => {
            this.addNewSlide();
          }}
        >
          <i class="fas fa-plus"></i>Add New
        </span>
      </div>
    );
  };
  removeSlide = (index) => {
    let realIndex = index + 1;
    let putSlide_ = index - 1 >= 0 ? index - 1 : index;
    this.changeSlideIndex(putSlide_);

    this.setState({
      sideContentOpen: true,
      slideBgButton: realIndex + "text",
    });

    let slides_ = [...this.props.attributes.slides];
    slides_.splice(index, 1);
    this.props.setAttributes({ slides: slides_ });
  };
  render() {
    console.log("render slider->", this.props);
    const { attributes } = this.props;
    // const slides = [...attributes.slides];
    const { openPanel, commonDropDown, twoBtn } = this.state;
    // console.log("selected slide", currentSlideIndex);
    return (
      <>
        <BlockControls key="controls">
          <AlignmentToolbar
            value={attributes.wrapper.alignment}
            onChange={(align) => {
              this.updateAttr(align, "wrapper", "alignment");
            }}
          />
        </BlockControls>
        <InspectorControls>
          <PanelBody initialOpen={true}>
            <BasicToggleNav
              value={openPanel}
              navItem={[
                {
                  name: "slides",
                  title: "Slides",
                  icon: "dashicons dashicons-slides",
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
          {openPanel == "slides" ? (
            this.inspectorSlidesPanel()
          ) : (
            <>
              <PanelBody
                title={__("Content Settings", "unlimited-blocks")}
                initialOpen={false}
              >
                {/* -----------------------------------------============================================================== */}
                <div className="ubl-slider-panel">
                  {/* <p>
                    <strong>
                      {__("Content Alignment", "unlimited-blocks")}
                    </strong>
                  </p> */}
                  {/* <div className="ubl-alignment">
                    <div>
                      <span
                        onClick={() => {
                          this.updateGlobalSlide(
                            "left",
                            "wrapper",
                            "alignment"
                          );
                        }}
                        className={`dashicons dashicons-editor-alignleft ${
                          sliderSetting.wrapper.alignment == "left"
                            ? "active"
                            : ""
                        }`}
                      ></span>
                    </div>
                    <div>
                      <span
                        onClick={() => {
                          this.updateGlobalSlide(
                            "center",
                            "wrapper",
                            "alignment"
                          );
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
                          this.updateGlobalSlide(
                            "right",
                            "wrapper",
                            "alignment"
                          );
                        }}
                        className={`dashicons dashicons-editor-alignright ${
                          sliderSetting.wrapper.alignment == "right"
                            ? "active"
                            : ""
                        }`}
                      ></span>
                    </div>
                  </div> */}
                  {/* <p>
                    <strong>{__("Text Alignment", "unlimited-blocks")}</strong>
                  </p> */}
                  {/* <div className="ubl-alignment">
                    <div>
                      <span
                        onClick={() => {
                          this.updateGlobalSlide(
                            "left",
                            "wrapper",
                            "textAlign"
                          );
                        }}
                        className={`dashicons dashicons-editor-alignleft ${
                          sliderSetting.wrapper.textAlign == "left"
                            ? "active"
                            : ""
                        }`}
                      ></span>
                    </div>
                    <div>
                      <span
                        onClick={() => {
                          this.updateGlobalSlide(
                            "center",
                            "wrapper",
                            "textAlign"
                          );
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
                          this.updateGlobalSlide(
                            "right",
                            "wrapper",
                            "textAlign"
                          );
                        }}
                        className={`dashicons dashicons-editor-alignright ${
                          sliderSetting.wrapper.textAlign == "right"
                            ? "active"
                            : ""
                        }`}
                      ></span>
                    </div>
                  </div> */}
                  {/* --------------heading style---------------- */}
                  <p>
                    <strong>{__("Content Spacing", "unlimited-blocks")}</strong>
                  </p>
                  <RangeControl
                    value={attributes.wrapper.spacing}
                    min={0}
                    max={100}
                    onChange={(e) => {
                      this.updateAttr(e, "wrapper", "spacing");
                    }}
                  />
                  <div
                    className={`slide-panel-single ${
                      commonDropDown == "heading-style" ? "active" : ""
                    }`}
                  >
                    <div
                      class="slide-nav"
                      onClick={() => {
                        if (commonDropDown == "heading-style") {
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
                        value={attributes.title.fontSize}
                        min={0}
                        max={100}
                        onChange={(e) => {
                          this.updateAttr(e, "title", "fontSize");
                        }}
                      />
                      <p>
                        <strong>{__("Color", "unlimited-blocks")}</strong>
                      </p>
                      <ColorPalette
                        value={attributes.title.color}
                        onChange={(color) => {
                          this.updateAttr(color, "title", "color");
                        }}
                      />
                    </div>
                  </div>
                  {/* --------------description style---------------- */}
                  <div
                    className={`slide-panel-single ${
                      commonDropDown == "description-style" ? "active" : ""
                    }`}
                  >
                    <div
                      class="slide-nav"
                      onClick={() => {
                        if (commonDropDown == "description-style") {
                          this.setState({ commonDropDown: "" });
                        } else {
                          this.setState({
                            commonDropDown: "description-style",
                          });
                        }
                      }}
                    >
                      <span>
                        {__("Description Setting", "unlimited-blocks")}
                      </span>
                      <div class="caret">
                        <i class="fas fa-caret-down"></i>
                      </div>
                    </div>
                    <div className="slides-element">
                      <p>
                        <strong>{__("Font Size", "unlimited-blocks")}</strong>
                      </p>
                      <RangeControl
                        value={attributes.text.fontSize}
                        min={0}
                        max={100}
                        onChange={(e) => {
                          this.updateAttr(e, "text", "fontSize");
                        }}
                      />
                      <p>
                        <strong>{__("Color", "unlimited-blocks")}</strong>
                      </p>
                      <ColorPalette
                        value={attributes.text.color}
                        onChange={(color) => {
                          this.updateAttr(color, "text", "color");
                        }}
                      />
                    </div>
                  </div>
                  {/* --------------button style---------------- */}
                  <div
                    className={`slide-panel-single ${
                      commonDropDown == "button-style" ? "active" : ""
                    }`}
                  >
                    <div
                      class="slide-nav"
                      onClick={() => {
                        if (commonDropDown == "button-style") {
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
                      <Switcher
                        value={twoBtn}
                        navItem={[
                          {
                            name: "buttoneOne",
                            title: "Button 1",
                          },
                          {
                            name: "buttoneTwo",
                            title: "Button 2",
                          },
                        ]}
                        clickme={(value_) => {
                          this.setState({ twoBtn: value_ });
                        }}
                      />

                      <RangeControl
                        label={__("Font Size", "unlimited-blocks")}
                        value={attributes[twoBtn].fontSize}
                        min={0}
                        max={70}
                        onChange={(e) => {
                          this.updateAttr(e, twoBtn, "fontSize");
                        }}
                      />
                      <p>{__("Color", "unlimited-blocks")}</p>
                      <ColorPalette
                        value={attributes[twoBtn].color}
                        onChange={(color) => {
                          this.updateAttr(color, twoBtn, "color");
                        }}
                      />
                      <p>{__("Background Color", "unlimited-blocks")}</p>
                      {/* bg color  */}
                      {/* <div class="ubl-switcher-button-section sub">
                        <span
                          onClick={() => {
                            let getBgcolor = {
                              ...sliderSetting[activeTwoBtnState]
                                .backgroundColor,
                            };
                            getBgcolor["type"] = "color";
                            this.updateGlobalSlide(
                              getBgcolor,
                              activeTwoBtnState,
                              "backgroundColor"
                            );
                          }}
                          className={
                            sliderSetting[activeTwoBtnState].backgroundColor
                              .type == "color"
                              ? "selected"
                              : ""
                          }
                        >
                          {__("Solid", "unlimited-blocks")}
                        </span>
                        <span
                          onClick={() => {
                            let getBgcolor = {
                              ...sliderSetting[activeTwoBtnState]
                                .backgroundColor,
                            };
                            getBgcolor["type"] = "gradient";
                            this.updateGlobalSlide(
                              getBgcolor,
                              activeTwoBtnState,
                              "backgroundColor"
                            );
                          }}
                          className={
                            sliderSetting[activeTwoBtnState].backgroundColor
                              .type == "gradient"
                              ? "selected"
                              : ""
                          }
                        >
                          {__("Gradient", "unlimited-blocks")}
                        </span>
                      </div> */}
                      {/* {"color" ==
                      sliderSetting[activeTwoBtnState].backgroundColor.type ? (
                        <ColorPicker
                          color={
                            sliderSetting[activeTwoBtnState].backgroundColor
                              .color
                          }
                          onChangeComplete={(colorBg) => {
                            let color = `rgba(${colorBg.rgb.r},${colorBg.rgb.g},${colorBg.rgb.b},${colorBg.rgb.a})`;
                            let getBgcolor = {
                              ...sliderSetting[activeTwoBtnState]
                                .backgroundColor,
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
                              ...sliderSetting[activeTwoBtnState]
                                .backgroundColor,
                            };
                            getBgcolor["gradient"] = newGradient;
                            this.updateGlobalSlide(
                              getBgcolor,
                              activeTwoBtnState,
                              "backgroundColor"
                            );
                          }}
                        />
                      )} */}
                      {/* bg color  */}
                      <RangeControl
                        label={__("Height", "unlimited-blocks")}
                        value={attributes[twoBtn].height}
                        min={0}
                        max={50}
                        onChange={(e) => {
                          this.updateAttr(e, twoBtn, "height");
                        }}
                      />
                      <RangeControl
                        label={__("Width", "unlimited-blocks")}
                        value={attributes[twoBtn].width}
                        min={0}
                        max={50}
                        onChange={(e) => {
                          this.updateAttr(e, twoBtn, "width");
                        }}
                      />
                      <p>
                        <strong>{__("Border", "unlimited-blocks")}</strong>
                      </p>
                      {/* <ToggleControl
                        label={
                          sliderSetting[activeTwoBtnState].border
                            ? __("Disable", "unlimited-blocks")
                            : __("Enable", "unlimited-blocks")
                        }
                        checked={sliderSetting[activeTwoBtnState].border}
                        onChange={(e) =>
                          this.updateGlobalSlide(e, activeTwoBtnState, "border")
                        }
                      /> */}
                      {/* {sliderSetting[activeTwoBtnState].border && (
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
                            value={
                              sliderSetting[activeTwoBtnState].borderRadius
                            }
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
                      )} */}
                    </div>
                  </div>
                  {/* --------------button style---------------- */}
                </div>
                {/* -----------------------------------------============================================================== */}
              </PanelBody>
              <PanelBody
                title={__("Slider Settings", "unlimited-blocks")}
                initialOpen={false}
              >
                <div className="slides-settings">
                  <>
                    <div className="flex-section-slider">
                      <p>{__("Navigation", "unlimited-blocks")}</p>
                      <select
                        value={attributes.sliderSetting.triggerActive}
                        onChange={(e) => {
                          this.updateAttr(
                            e.target.value,
                            "sliderSetting",
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
                        value={attributes.sliderSetting.sliderEffect}
                        onChange={(e) => {
                          this.updateAttr(
                            e.target.value,
                            "sliderSetting",
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
                        checked={attributes.sliderSetting.autoTrigger}
                        onChange={(e) => {
                          this.updateAttr(e, "sliderSetting", "autoTrigger");
                        }}
                      />
                    </div>
                    {attributes.sliderSetting.autoTrigger && (
                      <RangeControl
                        label={__("Autoplay Speed", "unlimited-blocks")}
                        value={attributes.sliderSetting.autoTriggerDelay}
                        min={0}
                        max={12}
                        onChange={(e) => {
                          this.updateAttr(
                            e,
                            "sliderSetting",
                            "autoTriggerDelay"
                          );
                        }}
                      />
                    )}
                    {/* {(attributes.sliderSetting.triggerActive == "both" ||
                      attributes.sliderSetting.triggerActive == "dots") && (
                      <div
                        className={`slide-panel-single ${
                          commonDropDown == "dots-style"
                            ? "active"
                            : ""
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
                          <span>{__("Dotts Styles", "unlimited-blocks")}</span>
                          <div class="caret">
                            <i class="fas fa-caret-down"></i>
                          </div>
                        </div>
                        <div className="slides-element">
                          <RangeControl
                            label={__("Size", "unlimited-blocks")}
                            value={attributes.sliderSetting.linearTrigger.fontSize}
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
                            color={attributes.sliderSetting.linearTrigger.color}
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
                            color={attributes.sliderSetting.linearTrigger.activeColor}
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
                    )} */}

                    {(attributes.sliderSetting.triggerActive == "both" ||
                      attributes.sliderSetting.triggerActive == "arrows") && (
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
                            value={
                              attributes.sliderSetting.leftRightTrigger.fontSize
                            }
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
                            value={
                              attributes.sliderSetting.leftRightTrigger.color
                            }
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
              </PanelBody>
            </>
          )}
        </InspectorControls>
        <div className="ubl-owl-slider-block">{this.slides()}</div>
      </>
    );
    // description style
  }
}
export default Edit;
