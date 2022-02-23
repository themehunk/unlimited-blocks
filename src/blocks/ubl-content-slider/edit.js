import {
  RichText,
  InspectorControls,
  __experimentalLinkControl as LinkControl,
  BlockControls,
  AlignmentToolbar,
  BlockAlignmentToolbar,
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
// let bgImageWrapper = plugin_url.url + "assets/img/image2.jpg";
import UblStyler from "../block-assets/Styler";

import BasicToggleNav from "../block-assets/utility-components/BasicToggleNav";
import Switcher from "../block-assets/utility-components/TwoSwitcher";
import BackgroundType from "../block-assets/utility-components/backgroundType/backgroundType";
import BackgroundColor from "../block-assets/utility-components/backgroundType/backgroundColor";
import cloneDeep from "clone-deep";

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
      this.props.setAttributes({
        wrapper_id: "wrapper-" + this.props.clientId,
      });
    }
    this.styleAdd();
  }

  styleAdd = () => {
    let { attributes } = this.props;
    let { wrapper_id, sliderSetting } = attributes;
    // --------------------------------box style--------------------------------
    if (wrapper_id) {
      UblStyler(
        `${wrapper_id}-wrapper-height`,
        `.${wrapper_id} .ubl-slider-wrapper`,
        `height:${sliderSetting.dimension.custom_height}px`
      );
    }
  };

  updateSlide = (
    index_,
    val,
    key_ = false,
    key2_ = false,
    multiple_ = false
  ) => {
    let { attributes, setAttributes } = this.props;
    if ((index_ === 0 && key_) || (index_ && key_)) {
      // let slides_ = [...attributes.slides];
      // let slides_ = _.map(attributes.slides, _.clone);
      let slides_ = cloneDeep(attributes.slides);
      // console.log("slides maped", slides_);

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
      let copyAttr = cloneDeep(...attributes[key_]);

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
    if (slides.length) {
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
      // background color btn
      if (buttoneOne.bg.backgroundColorType == "color") {
        buttonOneStyle["backgroundColor"] = buttoneOne.bg.backgroundColor;
      } else if (buttoneOne.bg.backgroundColorType == "gradient") {
        buttonOneStyle["backgroundImage"] =
          buttoneOne.bg.backgroundImageGradient;
      }

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
      if (buttoneTwo.bg.backgroundColorType == "color") {
        buttonTwoStyle["backgroundColor"] = buttoneTwo.bg.backgroundColor;
      } else if (buttoneTwo.bg.backgroundColorType == "gradient") {
        buttonTwoStyle["backgroundImage"] =
          buttoneTwo.bg.backgroundImageGradient;
      }
      // console.log("buttonOneStyle->", buttonOneStyle);
      // console.log("buttoneTwo->", buttoneTwo);
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
        slider_options_["autoplaySpeed"] =
          sliderSetting.autoTriggerDelay * 1000;
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
          color: sliderSetting.linearTrigger.color,
        };

        return (
          <ul data-class="ubl-slick-slider-dots">
            {check.map((dotsChildren) => {
              if (dotsChildren.props.className == "slick-active") {
                dotsStyle.color = sliderSetting.linearTrigger.activeColor;
              }
              return (
                <li
                  className={`custonLi_ ${dotsChildren.props.className}`}
                  onClick={dotsChildren.props.children.props.onClick}
                >
                  <span style={dotsStyle}></span>
                </li>
              );
            })}
          </ul>
        );
      };
      // console.log("slider_options_", slider_options_);

      // slider width
      const sliderWidth = { width: sliderSetting.dimension.custom_width + "%" };
      // const sliderWidth = { width: 100 + "%" };
      // if (sliderSetting.dimension.width) {
      //   sliderWidth["width"] = sliderSetting.dimension.custom_width + "%";
      // }
      const OwlCarousel_ = (
        <SlickSlider
          ref={this.SlickSliderRef}
          style={sliderWidth}
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
        {slides.length > 1 ? (
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
        typeNone={false}
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
          backgroundColor: "#20202e",
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
        link: "https://example.com/",
        target: false,
      },
      buttoneTwo: {
        enable: true,
        text: __("Button Two", "unlimited-blocks"),
        link: "https://example.com/",
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
    const { wrapper_id } = attributes;

    let WrapperClass = wrapper_id ? wrapper_id : this.props.clientId;

    WrapperClass = `ubl-slick-slider-block-wrap ${WrapperClass}`;

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
                  title: "Style & Settings",
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
                title={__("Setting", "unlimited-blocks")}
                initialOpen={false}
              >
                {/* -----------------------------------------============================================================== */}
                <div className="ubl-slider-panel">
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
                  {/* height and width  */}
                  <p>
                    <strong>{__("Width", "unlimited-blocks")}</strong>
                  </p>
                  <RangeControl
                    label={__("Width", "unlimited-blocks")}
                    value={attributes.sliderSetting.dimension.custom_width}
                    min={10}
                    max={100}
                    onChange={(e) => {
                      let dimension = {
                        ...attributes.sliderSetting.dimension,
                      };
                      dimension.custom_width = e;
                      this.updateAttr(dimension, "sliderSetting", "dimension");
                    }}
                  />
                  {/* <ToggleControl
                        label={
                          attributes.sliderSetting.dimension.width
                            ? __("Full Width", "unlimited-blocks")
                            : __("Custom Width", "unlimited-blocks")
                        }
                        checked={attributes.sliderSetting.dimension.width}
                        onChange={(e) => {
                          let dimension = {
                            ...attributes.sliderSetting.dimension,
                          };
                          dimension.width = e;
                          this.updateAttr(
                            dimension,
                            "sliderSetting",
                            "dimension"
                          );
                        }}
                      />
                      {attributes.sliderSetting.dimension.width && (
                        <RangeControl
                          label={__("Width %", "unlimited-blocks")}
                          value={
                            attributes.sliderSetting.dimension.custom_width
                          }
                          min={10}
                          max={100}
                          onChange={(e) => {
                            let dimension = {
                              ...attributes.sliderSetting.dimension,
                            };
                            dimension.custom_width = e;
                            this.updateAttr(
                              dimension,
                              "sliderSetting",
                              "dimension"
                            );
                          }}
                        />
                      )} */}
                  <p>
                    <strong>{__("Height", "unlimited-blocks")}</strong>
                  </p>
                  {/* <ToggleControl
                        label={
                          attributes.sliderSetting.dimension.width
                            ? __("Auto", "unlimited-blocks")
                            : __("Custom Height", "unlimited-blocks")
                        }
                        checked={attributes.sliderSetting.dimension.height}
                        onChange={(e) => {
                          let dimension = {
                            ...attributes.sliderSetting.dimension,
                          };
                          dimension.height = e;
                          this.updateAttr(
                            dimension,
                            "sliderSetting",
                            "dimension"
                          );
                        }}
                      />
                      {attributes.sliderSetting.dimension.height && (
                        <RangeControl
                          label={__("Height px", "unlimited-blocks")}
                          value={
                            attributes.sliderSetting.dimension.custom_height
                          }
                          min={300}
                          max={1000}
                          onChange={(e) => {
                            /////////////////
                            UblStyler(
                              `${wrapper_id}-wrapper-height`,
                              `.${wrapper_id} .ubl-slider-wrapper`,
                              `height:${e}px`
                            );

                            let dimension = {
                              ...attributes.sliderSetting.dimension,
                            };
                            dimension.custom_height = e;
                            this.updateAttr(
                              dimension,
                              "sliderSetting",
                              "dimension"
                            );
                          }}
                        />
                      )} */}

                  <RangeControl
                    label={__("Height", "unlimited-blocks")}
                    value={attributes.sliderSetting.dimension.custom_height}
                    min={200}
                    max={1000}
                    onChange={(e) => {
                      /////////////////
                      UblStyler(
                        `${wrapper_id}-wrapper-height`,
                        `.${wrapper_id} .ubl-slider-wrapper`,
                        `height:${e}px`
                      );

                      let dimension = {
                        ...attributes.sliderSetting.dimension,
                      };
                      dimension.custom_height = e;
                      this.updateAttr(dimension, "sliderSetting", "dimension");
                    }}
                  />
                  {/* height and width  */}
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
                      <span>{__("Heading Style", "unlimited-blocks")}</span>
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
                      <span>{__("Description Style", "unlimited-blocks")}</span>
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
                      <span>{__("Button Style", "unlimited-blocks")}</span>
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
                      <BackgroundColor
                        value={{
                          backgroundColorType:
                            attributes[twoBtn].bg.backgroundColorType,
                          backgroundColor:
                            attributes[twoBtn].bg.backgroundColor,
                          backgroundImageGradient:
                            attributes[twoBtn].bg.backgroundImageGradient,
                        }}
                        changeme={(_properties) => {
                          let saveObj = {
                            backgroundColorType:
                              _properties.backgroundColorType,
                            backgroundColor: _properties.backgroundColor,
                            backgroundImageGradient:
                              _properties.backgroundImageGradient,
                          };
                          this.updateAttr(saveObj, twoBtn, "bg");
                        }}
                      />
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
                <div className="ubl-panel-container ubl-slider-panel">
                  <div className="slides-settings">
                    <>
                      {/* height and width  */}
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
                      {(attributes.sliderSetting.triggerActive == "both" ||
                        attributes.sliderSetting.triggerActive == "dots") && (
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
                              value={
                                attributes.sliderSetting.linearTrigger.fontSize
                              }
                              min={0}
                              max={70}
                              onChange={(e) => {
                                let getLinearTrigger = {
                                  ...attributes.sliderSetting.linearTrigger,
                                };
                                getLinearTrigger.fontSize = e;
                                this.updateAttr(
                                  getLinearTrigger,
                                  "sliderSetting",
                                  "linearTrigger"
                                );
                              }}
                            />
                            <label className="normal-label">
                              {__("Color", "unlimited-blocks")}
                            </label>
                            <ColorPalette
                              value={
                                attributes.sliderSetting.linearTrigger.color
                              }
                              onChange={(color) => {
                                let getLinearTrigger = {
                                  ...attributes.sliderSetting.linearTrigger,
                                };
                                getLinearTrigger.color = color;
                                this.updateAttr(
                                  getLinearTrigger,
                                  "sliderSetting",
                                  "linearTrigger"
                                );
                              }}
                            />
                            <label className="normal-label">
                              {__("Active Color", "unlimited-blocks")}
                            </label>
                            <ColorPalette
                              value={
                                attributes.sliderSetting.linearTrigger
                                  .activeColor
                              }
                              onChange={(color) => {
                                let getLinearTrigger = {
                                  ...attributes.sliderSetting.linearTrigger,
                                };
                                getLinearTrigger.activeColor = color;
                                this.updateAttr(
                                  getLinearTrigger,
                                  "sliderSetting",
                                  "linearTrigger"
                                );
                              }}
                            />
                          </div>
                        </div>
                      )}

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
                              value={
                                attributes.sliderSetting.leftRightTrigger
                                  .fontSize
                              }
                              min={0}
                              max={70}
                              onChange={(e) => {
                                let getLeftRight = {
                                  ...attributes.sliderSetting.leftRightTrigger,
                                };
                                getLeftRight.fontSize = e;
                                this.updateAttr(
                                  getLeftRight,
                                  "sliderSetting",
                                  "leftRightTrigger"
                                );
                              }}
                            />
                            <label className="normal-label">
                              {__("Color", "unlimited-blocks")}
                            </label>
                            <ColorPalette
                              value={
                                attributes.sliderSetting.leftRightTrigger.color
                              }
                              onChange={(color) => {
                                let getLeftRight = {
                                  ...attributes.sliderSetting.leftRightTrigger,
                                };
                                getLeftRight.color = color;
                                this.updateAttr(
                                  getLeftRight,
                                  "sliderSetting",
                                  "leftRightTrigger"
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
        <div className={WrapperClass}>{this.slides()}</div>
      </>
    );
    // description style
  }
}
export default Edit;
