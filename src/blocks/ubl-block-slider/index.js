// import "./editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
let bgImageWrapper = plugin_url.url + "assets/img/image2.jpg";
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/block-editor";
let attrSave = {
  sliderSetting: {
    type: "array",
    default: [
      {
        dimension: {
          width: false,
          custom_width: 580,
          height: false,
          custom_height: 360,
        },
        sliderEffect: "slideEffect",
        triggerActive: "both",
        linearTrigger: {
          fontSize: 20,
          color: "rgba(231,192,192,1)",
          activeColor: "rgba(68,222,68,1)",
        },
        leftRightTrigger: {
          fontSize: 20,
          color: "rgba(231,192,192,1)",
          // backgroundColor: "",
        },
        autoTrigger: {
          enable: true,
          delay: 4,
        },
        wrapper: {
          alignment: "center",
          spacing: 2,
          textAlign: "center",
        },
        title: {
          fontSize: 17,
          color: "red",
        },
        text: {
          fontSize: 17,
          color: "red",
        },
        buttoneOne: {
          fontSize: "",
          color: "",
          backgroundColor: {
            type: "color",
            color: "#ffbf00",
            gradient:
              "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
          },
          height: "",
          width: "",
          border: false,
          borderColor: "",
          borderWidth: "",
          borderRadius: "",
        },
        buttoneTwo: {
          fontSize: "",
          color: "",
          backgroundColor: {
            type: "color",
            color: "#ffbf00",
            gradient:
              "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
          },
          height: "",
          width: "",
          border: false,
          borderColor: "",
          borderWidth: "",
          borderRadius: "",
        },
      },
    ],
  },
  slides: {
    type: "array",
    default: [
      {
        container: {
          bgImage: "",
          overlayColor: {
            type: "color",
            color: "rgb(68 132 173)",
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
        //   spacing: 2,
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
          // fontSize: "",
          // color: "",
          // backgroundColor: {
          //   type: "color",
          //   color: "#ffbf00",
          //   gradient:
          //     "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
          // },
          // height: "",
          // width: "",
          // border: false,
          // borderColor: "",
          // borderWidth: "",
          // borderRadius: "",
        },
        buttoneTwo: {
          enable: true,
          text: __("Button Two", "unlimited-blocks"),
          link: "#",
          target: false,
          // fontSize: "",
          // color: "",
          // backgroundColor: {
          //   type: "color",
          //   color: "#ffbf00",
          //   gradient:
          //     "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
          // },
          // height: "",
          // width: "",
          // border: false,
          // borderColor: "",
          // borderWidth: "",
          // borderRadius: "",
        },
      },
      {
        container: {
          bgImage: "",
          overlayColor: {
            type: "color",
            color: "rgb(32 189 131)",
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
        //   spacing: 2,
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
          // fontSize: "",
          // color: "",
          // backgroundColor: {
          //   type: "color",
          //   color: "#ffbf00",
          //   gradient:
          //     "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
          // },
          // height: "",
          // width: "",
          // border: false,
          // borderColor: "",
          // borderWidth: "",
          // borderRadius: "",
        },
        buttoneTwo: {
          enable: true,
          text: __("Button Two", "unlimited-blocks"),
          link: "#",
          target: false,
          // fontSize: "",
          // color: "",
          // backgroundColor: {
          //   type: "color",
          //   color: "#ffbf00",
          //   gradient:
          //     "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
          // },
          // height: "",
          // width: "",
          // border: false,
          // borderColor: "",
          // borderWidth: "",
          // borderRadius: "",
        },
      },
      {
        container: {
          bgImage: "",
          overlayColor: {
            type: "color",
            color: "rgb(189 90 32)",
            gradient:
              "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
            opacity: 0.6,
          },
          bgSize: "cover",
        },
        wrapper: {
          bgcolor: "",
          border: "",
          alignment: "center",
          spacing: 2,
        },
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
          // fontSize: "",
          // color: "",
          // backgroundColor: {
          //   type: "color",
          //   color: "#ffbf00",
          //   gradient:
          //     "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
          // },
          // height: "",
          // width: "",
          // border: false,
          // borderColor: "",
          // borderWidth: "",
          // borderRadius: "",
        },
        buttoneTwo: {
          enable: true,
          text: __("Button Two", "unlimited-blocks"),
          link: "#",
          target: false,
          // fontSize: "",
          // color: "",
          // backgroundColor: {
          //   type: "color",
          //   color: "#ffbf00",
          //   gradient:
          //     "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
          // },
          // height: "",
          // width: "",
          // border: false,
          // borderColor: "",
          // borderWidth: "",
          // borderRadius: "",
        },
      },
    ],
  },
};
let elementLiSlide = (val, index_, sliderSetting) => {
  let buttonOneStyle = {};
  if (sliderSetting.buttoneOne.fontSize)
    buttonOneStyle.fontSize = sliderSetting.buttoneOne.fontSize;
  if (sliderSetting.buttoneOne.color)
    buttonOneStyle.color = sliderSetting.buttoneOne.color;

  if (sliderSetting.buttoneOne.height) {
    buttonOneStyle.paddingBottom = sliderSetting.buttoneOne.height;
    buttonOneStyle.paddingTop = sliderSetting.buttoneOne.height;
  }
  if (sliderSetting.buttoneOne.width) {
    buttonOneStyle.paddingLeft = sliderSetting.buttoneOne.width;
    buttonOneStyle.paddingRight = sliderSetting.buttoneOne.width;
  }

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

  let buttonTwoStyle = {};
  if (sliderSetting.buttoneTwo.fontSize)
    buttonTwoStyle.fontSize = sliderSetting.buttoneTwo.fontSize;
  if (sliderSetting.buttoneTwo.color)
    buttonTwoStyle.color = sliderSetting.buttoneTwo.color;
  if (sliderSetting.buttoneTwo.height) {
    buttonTwoStyle.paddingBottom = sliderSetting.buttoneTwo.height;
    buttonTwoStyle.paddingTop = sliderSetting.buttoneTwo.height;
  }
  if (sliderSetting.buttoneTwo.width) {
    buttonTwoStyle.paddingLeft = sliderSetting.buttoneTwo.width;
    buttonTwoStyle.paddingRight = sliderSetting.buttoneTwo.width;
  }

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
  // overlay color
  let overLAyColor = {};
  if (val.container.bgImage) {
    overLAyColor["opacity"] = val.container.overlayColor.opacity;
  }
  if (val.container.overlayColor.type == "color") {
    overLAyColor["backgroundColor"] = val.container.overlayColor.color;
  } else if (val.container.overlayColor.type == "gradient") {
    overLAyColor["backgroundImage"] = val.container.overlayColor.gradient;
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
    <li key={index_} className={`slides ${index_ == 0 ? "selected_" : ""}`}>
      <div className="ubl-slider-wrapper">
        <div className="ubl-slider-container">
          <div className="ubl-slider-content-wrapper">
            {val.container.bgImage && (
              <div
                className="ubl-slider-image-container"
                style={{
                  backgroundSize: "cover",
                  backgroundImage: "url(" + val.container.bgImage + ")",
                }}
              ></div>
            )}
            <div
              className="ubl-slider-overlay-color"
              style={overLAyColor}
            ></div>
            <div className={`ubl-slider-text ${wrapperAlignment}`}>
              <div style={wrapperSpacing}>
                <RichText.Content
                  tagName="h1"
                  value={__(val.title.text, "unlimited-blocks")}
                  style={TitleStyle}
                />
                <RichText.Content
                  tagName="h2"
                  value={__(val.text.text, "unlimited-blocks")}
                  style={descriptionStyle}
                />
                <div className="button-container">
                  {val.buttoneOne.enable && (
                    <>
                      <a
                        target={val.buttoneOne.target ? "_blank" : null}
                        rel={
                          val.buttoneOne.target ? "noopener noreferrer" : null
                        }
                        href={val.buttoneOne.link}
                        style={buttonOneStyle}
                      >
                        <RichText.Content
                          tagName="span"
                          value={val.buttoneOne.text}
                        />
                      </a>
                    </>
                  )}
                  {val.buttoneTwo.enable && (
                    <a
                      target={val.buttoneTwo.target ? "_blank" : null}
                      rel={val.buttoneTwo.target ? "noopener noreferrer" : null}
                      href={val.buttoneTwo.link}
                      style={buttonTwoStyle}
                    >
                      <RichText.Content
                        tagName="span"
                        value={val.buttoneTwo.text}
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
import { blocksDetail } from "../block-assets/blocks-detail";
const { ubl_block_slider } = blocksDetail;
registerBlockType("unlimited-blocks/slide", {
  title: ubl_block_slider.title,
  description: ubl_block_slider.description,
  icon: ubl_block_slider.icon,
  keywords: ubl_block_slider.keywords,
  category: "unlimited-blocks-category",
  getEditWrapperProps(attributes) {
    let { sliderSetting } = attributes;
    let sliderWidth = sliderSetting[0].dimension;
    let attr_ = { "data-align": "full" };
    if (sliderWidth.width && sliderWidth.custom_width) {
      attr_ = {
        ...attr_,
        ...{
          style: { maxWidth: sliderWidth.custom_width + "px" },
        },
      };
    }
    return attr_;
  },
  attributes: { ...attrSave },
  example: () => {},
  edit: (props) => {
    return <Edit {...props} />;
  },
  save: (props) => {
    // console.log("props", props);
    let { slides, sliderSetting } = props.attributes;
    sliderSetting = sliderSetting[0];
    let leftRightStyle = {
      color: sliderSetting.leftRightTrigger.color,
      // backgroundColor: sliderSetting.leftRightTrigger.backgroundColor,
      fontSize: sliderSetting.leftRightTrigger.fontSize,
    };
    let trigStyle = `height: ${sliderSetting.linearTrigger.fontSize}px;width:${sliderSetting.linearTrigger.fontSize}px;background-color: ${sliderSetting.linearTrigger.color};`;
    let trigStyleObj = {
      height: sliderSetting.linearTrigger.fontSize + "px",
      width: sliderSetting.linearTrigger.fontSize + "px",
      backgroundColor: sliderSetting.linearTrigger.color,
    };

    let sliderSettingJson = {};
    if (sliderSetting.dimension.width)
      sliderSettingJson = {
        ...sliderSettingJson,
        ...{ width: sliderSetting.dimension.custom_width },
      };
    if (sliderSetting.dimension.height)
      sliderSettingJson = {
        ...sliderSettingJson,
        ...{ height: sliderSetting.dimension.custom_height },
      };
    sliderSettingJson = JSON.stringify(sliderSettingJson);
    return (
      <div className="ubl-block-slide-wrapper">
        <div
          className="ubl-slider-container"
          sliderDelay={
            sliderSetting.autoTrigger.delay > 0 &&
            sliderSetting.autoTrigger.enable
              ? sliderSetting.autoTrigger.delay
              : 0
          }
        >
          {(sliderSetting.triggerActive == "both" ||
            sliderSetting.triggerActive == "dots") && (
            <ul
              className="ubl-slider-bullet-trigger"
              active-color={sliderSetting.linearTrigger.activeColor}
              childStyle={trigStyle}
            >
              {slides.map((val, index_) => {
                return (
                  <li className={`${index_ == 0 ? "selected_" : ""}`}>
                    <span style={trigStyleObj}></span>
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
          {/* slider main slides */}
          <ul
            className={`ubl-slider-ul-slides ${sliderSetting.sliderEffect}`}
            sliderSetting={sliderSettingJson}
          >
            {slides.map((val, index_) => {
              return elementLiSlide(val, index_, sliderSetting);
            })}
          </ul>
        </div>
      </div>
    );
  },
});
