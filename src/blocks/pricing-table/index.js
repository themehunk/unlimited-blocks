// import "./parent";
import "./editor.scss";
import fontFamily from "../block-assets/font-family";
import { registerBlockType } from "@wordpress/blocks";
import {
  RichText,
  InspectorControls,
  ColorPalette,
  __experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { useState, useRef, useEffect } from "@wordpress/element";
import {
  PanelBody,
  RangeControl,
  ColorPicker,
  ToggleControl,
  SelectControl,
  __experimentalInputControl as InputControl,
  __experimentalGradientPicker as GradientPicker,
} from "@wordpress/components";
import Switcher from "../block-assets/utility-components/TwoSwitcher";
import icons_ from "../block-assets/icons";
import { UBLGraDientColors } from "../block-assets/post-functions";
import BackgroundColor from "../block-assets/utility-components/backgroundType/backgroundColor";
const attrS = {
  headingTxt: {
    type: "string",
    default: __("Basic", "unlimited-blocks"),
  },
  headingTag: {
    type: "string",
    default: "h3",
  },
  headingFontSize: {
    type: "number",
    default: 29,
  },
  headingColor: {
    type: "string",
    default: "#ffffff",
  },
  headingFF: {
    type: "string",
  },
  headingDescription: {
    type: "string",
    default: "Short Description",
  },
  headerBackground: {
    type: "object",
    default: {
      type: "color",
      color: "#5f5f5f",
      gradient: "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
    },
  },
  descriptionColor: {
    type: "string",
    default: "grey",
  },
  descriptionFontSize: {
    type: "number",
  },
  descriptionFF: {
    type: "string",
  },
  middleSection: {
    type: "object",
    default: {
      iconCommonStyle: {
        fontSize: 16,
      },
      textCommonStyle: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
        fontFamily: "",
        margin: "",
        backgroundColor: {
          type: "color",
          color: "#2B2B2B",
          gradient:
            "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
        },
        underLine: {
          enable: true,
          height: 3,
          width: 60,
          topBottomSpace: 10,
          color: "grey",
        },
      },
      sections: [
        {
          icon: "far fa-envelope",
          text: "Email Marketing",
          iconStyle: { color: "rgb(6, 147, 227)" },
        },
        {
          icon: "far fa-envelope",
          text: "Email Builder",
          iconStyle: { color: "rgb(6, 147, 227)" },
        },
        {
          icon: "far fa-envelope",
          text: "Client Testing",
          iconStyle: { color: "rgb(6, 147, 227)" },
        },
        {
          icon: "far fa-envelope",
          text: "2 User Free",
          iconStyle: { color: "rgb(6, 147, 227)" },
        },
        {
          icon: "far fa-envelope",
          text: "Multiple Email Support",
          iconStyle: { color: "rgb(6, 147, 227)" },
        },
      ],
    },
  },
  currencyC: { type: "string", default: "$" },
  // currencyColor: { type: "string" },
  currencyFs: { type: "number", default: 16 },
  priceMonth: {
    type: "string",
    default: "99",
  },
  currencyFormate: {
    type: "number",
    default: 1,
  },
  currencyFontWeight: { type: "string" },
  priceMonthPrice: {
    type: "string",
    default: "/ month",
  },
  priceMonthPriceFs: {
    type: "number",
    default: 20,
  },
  priceMonthPriceColor: {
    type: "string",
    default: "#c2c4c4",
  },
  pricePosition: {
    type: "string",
    default: "top",
  },
  priceFontSize: {
    type: "number",
    default: 50,
  },
  priceColor: {
    type: "string",
    default: "#ffffff",
  },
  priceBgColor: {
    type: "object",
    default: {
      type: "color",
      color: "#5f5f5f",
      gradient: "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
    },
  },
  priceFF: {
    type: "string",
  },
  priceInline: { type: "boolean", default: true },
  pricePadding: { type: "number", default: 0 },
  priceBorder: { type: "boolean", default: false },
  priceBorderWidth: {
    type: "number",
    default: 2,
  },
  priceBorderRadius: {
    type: "number",
    default: 50,
  },
  priceBorderColor: {
    type: "string",
    default: "#ffa600",
  },
  priceSpace: {
    type: "number",
    default: 150,
  },
  linkContent: {
    type: "object",
    default: {
      text: __("ORDER NOW", "unlimited-blocks"),
      color: "",
      fontSize: 16,
      fontWeight: 400,
      spaceV: 50,
      spaceH: 45,
      border: {
        enable: false,
        width: 1,
        color: "",
        radius: 2,
      },
      backgroundColor: {
        type: "color",
        color: "#f1b426",
        gradient:
          "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
      },
      linkUrl: {
        keepUrl: true,
        link: "#",
        target: false,
      },
    },
  },
  shortDescription: {
    type: "object",
    default: {
      text: __("Terms & Conditions", "unlimited-blocks"),
      color: "white",
      fontSize: 12,
      fontFamily: "",
      topBottomSpace: 18,
    },
  },
  footerBgColor: {
    type: "object",
    default: {
      type: "color",
      color: "#2B2B2B",
      gradient: "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
    },
  },
  containerBorder: {
    type: "boolean",
    default: false,
  },
  containerBorderWidth: {
    type: "number",
  },
  containerBorderRadius: {
    type: "number",
  },
  containerBorderColor: {
    type: "string",
  },
};
import { blocksDetail } from "../block-assets/blocks-detail";
const { pricing_table } = blocksDetail;
registerBlockType("unlimited-blocks/pricing-table-table", {
  title: pricing_table.title,
  description: pricing_table.description,
  icon: pricing_table.icon,
  keywords: pricing_table.keywords,
  category: "unlimited-blocks-category",
  attributes: attrS,
  example: () => {},
  edit: (props) => {
    // console.log("props", props);

    const { attributes, setAttributes } = props;
    const {
      headerBackground,
      headingTxt,
      headingTag,
      headingFontSize,
      headingColor,
      headingFF,
      headingDescription,
      descriptionColor,
      descriptionFontSize,
      descriptionFF,
      middleSection,
      priceMonth,
      priceMonthPrice,
      priceMonthPriceFs,
      priceMonthPriceColor,
      pricePosition,
      priceFontSize,
      priceColor,
      priceBgColor,
      priceFF,
      priceInline,
      currencyFontWeight,
      priceBorder,
      priceBorderWidth,
      priceBorderRadius,
      priceBorderColor,
      priceSpace,
      priceSpaceV,
      priceSpaceH,
      currencyC,
      currencyFs,
      currencyFormate,
      linkContent,
      shortDescription,
      footerBgColor,
      containerBorder,
      containerBorderWidth,
      containerBorderRadius,
      containerBorderColor,
    } = attributes;
    let containerBorderStyle = containerBorder
      ? {
          borderWidth: containerBorderWidth + "px",
          borderStyle: "solid",
          borderColor: containerBorderColor,
          borderRadius: containerBorderRadius + "px",
        }
      : {};
    let priceStyle = {
      fontFamily: priceFF,
      fontWeight: currencyFontWeight,
    };
    // pricing bg color
    if (priceBgColor.type == "color") {
      priceStyle["backgroundColor"] = priceBgColor.color;
    } else if (priceBgColor.type == "gradient") {
      priceStyle["backgroundImage"] = priceBgColor.gradient;
    }

    if (priceBorder)
      priceStyle = {
        ...priceStyle,
        ...{
          borderWidth: priceBorderWidth + "px",
          borderRadius: priceBorderRadius + (!priceInline ? "%" : "px"),
          borderColor: priceBorderColor,
          borderStyle: "solid",
        },
      };
    if (!priceInline) {
      priceStyle = {
        ...priceStyle,
        ...{
          height: priceSpace + "px",
          width: priceSpace + "px",
        },
      };
    } else {
      priceStyle = {
        ...priceStyle,
        ...{
          paddingTop: priceSpaceV + "px",
          paddingBottom: priceSpaceV + "px",
          paddingLeft: priceSpaceH + "px",
          paddingRight: priceSpaceH + "px",
        },
      };
    }

    let link_style = {
      color: linkContent.color,
      fontSize: linkContent.fontSize + "px",
      width: linkContent.spaceH + "%",
      minHeight: linkContent.spaceV + "px",
      fontWeight: linkContent.fontWeight,
    };
    link_style = linkContent.border.enable
      ? {
          ...{
            borderWidth: linkContent.border.width + "px",
            borderRadius: linkContent.border.radius + "px",
            borderStyle: "solid",
            borderColor: linkContent.border.color,
          },
          ...link_style,
        }
      : link_style;
    //link bg style
    if (linkContent.backgroundColor.type == "color") {
      link_style["backgroundColor"] = linkContent.backgroundColor.color;
    } else if (linkContent.backgroundColor.type == "gradient") {
      link_style["backgroundImage"] = linkContent.backgroundColor.gradient;
    }

    //header bg style
    let headerBgStyle = null;
    if (headerBackground.type == "color") {
      headerBgStyle = { backgroundColor: headerBackground.color };
    } else if (headerBackground.type == "gradient") {
      headerBgStyle = { backgroundImage: headerBackground.gradient };
    }
    //middle
    let middleBgColorStyle = null;
    if (middleSection.textCommonStyle.backgroundColor.type == "color") {
      middleBgColorStyle = {
        backgroundColor: middleSection.textCommonStyle.backgroundColor.color,
      };
    } else if (
      middleSection.textCommonStyle.backgroundColor.type == "gradient"
    ) {
      middleBgColorStyle = {
        backgroundImage: middleSection.textCommonStyle.backgroundColor.gradient,
      };
    }
    // footer style
    let footerBgColorStyle = null;
    if (footerBgColor.type == "color") {
      footerBgColorStyle = { backgroundColor: footerBgColor.color };
    } else if (footerBgColor.type == "gradient") {
      footerBgColorStyle = { backgroundImage: footerBgColor.gradient };
    }
    // one
    const [activeFamilyContainer, activeFamilyDrop] = useState(false);
    const [headerSection, setheaderSection] = useState("content");
    const [pricingSection, setpricingSection] = useState("content");
    const [activeFamilyContainer2, activeFamilyDrop2] = useState(false);
    const [commonDropDown, setcommonDropDown] = useState(false);
    const [selectedMiddleSection, setselectedMiddleSection] = useState(false);
    const [middleSecNav, setmiddleSecNav] = useState("content");
    const [middleSecOpen, setmiddleSecOpen] = useState(false);
    const [footerButtonSec, setfooterButtonSec] = useState("content");
    // const [footerButtonSec,setfooterButtonSec] = useState('');

    const [activeIconContainer, activeIconContainerSet] = useState(false);
    const [iconList, setIconList] = useState(icons_);
    let iconReff = useRef();
    useEffect(() => {
      let handler = (event) => {
        if (!iconReff.current.contains(event.target)) {
          activeIconContainerSet(false);
        }
      };

      if (activeIconContainer) document.addEventListener("mousedown", handler);
      return () => {
        document.removeEventListener("mousedown", handler);
      };
    });

    let familyRef = useRef();
    useEffect(() => {
      let handler = (event) => {
        if (!familyRef.current.contains(event.target)) {
          activeFamilyDrop(false);
        }
      };

      if (activeFamilyContainer) document.addEventListener("mouseup", handler);
      return () => {
        document.removeEventListener("mouseup", handler);
      };
    });
    // two

    let familyRef2 = useRef();
    useEffect(() => {
      let handler = (event) => {
        if (!familyRef2.current.contains(event.target)) {
          activeFamilyDrop2(false);
        }
      };

      if (activeFamilyContainer2) document.addEventListener("mouseup", handler);
      return () => {
        document.removeEventListener("mouseup", handler);
      };
    });
    const updateSlides = (index, value, for_, global_ = false) => {
      let slides_ = attributes.middleSection;
      let newSlide = { ...slides_ };
      if (!global_) {
        newSlide["sections"][index][for_] = value;
      } else {
        newSlide[index][for_] = value;
      }
      setAttributes({ middleSection: newSlide });
    };
    const removeDescription = (slideINdex) => {
      let slides_ = { ...props.attributes.middleSection };
      let removeItem = slideINdex;
      let afterRemove = [
        ...slides_.sections.slice(0, removeItem),
        ...slides_.sections.slice(removeItem + 1),
      ];
      slides_["sections"] = afterRemove;
      setAttributes({ middleSection: slides_ });
    };

    const addDescription = () => {
      let DefaultItem = {
        icon: "far fa-envelope",
        text: "Add Some Text",
        iconStyle: { color: "rgb(6, 147, 227)" },
      };
      let slides_ = { ...props.attributes.middleSection };
      slides_.sections.push(DefaultItem);
      setAttributes({ middleSection: slides_ });
    };

    return [
      <InspectorControls>
        <PanelBody
          title={__("Header Section", "unlimited-blocks")}
          initialOpen={false}
        >
          {/* content or styles  */}
          <Switcher
            value={headerSection}
            navItem={[
              {
                name: "content",
                title: "Content",
              },
              {
                name: "style",
                title: "Style",
              },
            ]}
            clickme={(value_) => {
              setheaderSection(value_);
            }}
          />
          {/* content or styles  */}
          {headerSection == "content" ? (
            <>
              <div className="ubl-panel-custom">
                <label className="normal-label">
                  {__("Heading Text", "unlimited-blocks")}
                </label>
                <InputControl
                  value={headingTxt}
                  onChange={(e) => {
                    setAttributes({ headingTxt: e });
                  }}
                />
              </div>
              <div className="ubl-panel-custom">
                <label className="normal-label">
                  {__("Heading Tag", "unlimited-blocks")}
                </label>
                <SelectControl
                  value={headingTag}
                  onChange={(e) => setAttributes({ headingTag: e })}
                  options={[
                    {
                      value: null,
                      label: __("Choose Tag", "unlimited-blocks"),
                      disabled: true,
                    },
                    { value: "h1", label: "h1" },
                    { value: "h2", label: "h2" },
                    { value: "h3", label: "h3" },
                    { value: "h4", label: "h4" },
                    { value: "h5", label: "h5" },
                    { value: "h6", label: "h6" },
                    { value: "p", label: "p" },
                  ]}
                />
              </div>
              <div className="ubl-panel-custom">
                <label className="normal-label">
                  {__("Description Text", "unlimited-blocks")}
                </label>
                <InputControl
                  value={headingDescription}
                  onChange={(e) => {
                    setAttributes({ headingDescription: e });
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <BackgroundColor
                value={{
                  backgroundColorType: headerBackground.type,
                  backgroundColor: headerBackground.color,
                  backgroundImageGradient: headerBackground.gradient,
                }}
                changeme={(_properties) => {
                  // console.log("_properties", _properties);
                  let saveObj = {
                    type: _properties.backgroundColorType,
                    color: _properties.backgroundColor,
                    gradient: _properties.backgroundImageGradient,
                  };
                  setAttributes({ headerBackground: saveObj });
                }}
              />
              {/* heading style  */}
              <div
                className={`slide-panel-single ${
                  commonDropDown == "heading-style" ? "active" : ""
                }`}
              >
                <div
                  class="slide-nav"
                  onClick={() => {
                    if (commonDropDown == "heading-style") {
                      setcommonDropDown("");
                    } else {
                      setcommonDropDown("heading-style");
                    }
                  }}
                >
                  <span>{__("Heading Styles", "unlimited-blocks")}</span>
                  <div class="caret">
                    <i class="fas fa-caret-down"></i>
                  </div>
                </div>
                <div className="slides-element">
                  {/* element  */}
                  {/* font family */}
                  <div className="THK-font-family-wrapper">
                    <label className="normal-label">
                      {__("Font Family", "unlimited-blocks")}
                    </label>
                    <div
                      ref={familyRef}
                      className={`font-family-drop-down ${
                        activeFamilyContainer ? "active" : ""
                      }`}
                    >
                      <div
                        onClick={() => {
                          let applyActive = !activeFamilyContainer;
                          activeFamilyDrop(applyActive);
                        }}
                        className="font-family-show"
                      >
                        <span style={{ fontFamily: headingFF }}>
                          {headingFF ? headingFF : "Choose Family"}
                        </span>
                      </div>
                      <div className="family-items">
                        {fontFamily.map((family, key_) => {
                          return (
                            <span
                              onClick={() =>
                                setAttributes({ headingFF: family })
                              }
                              style={{ fontFamily: family }}
                            >
                              {family}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {/* font family */}
                  <label className="normal-label">
                    {__("Color", "unlimited-blocks")}
                  </label>
                  <ColorPalette
                    value={headingColor}
                    onChange={(color) => setAttributes({ headingColor: color })}
                  />
                  <RangeControl
                    label={__("Font Size", "unlimited-blocks")}
                    value={headingFontSize}
                    min={0}
                    max={60}
                    onChange={(e) => setAttributes({ headingFontSize: e })}
                  />
                  {/* element  */}
                </div>
              </div>
              {/* heading style  */}
              {/* description style  */}
              <div
                className={`slide-panel-single ${
                  commonDropDown == "description-style" ? "active" : ""
                }`}
              >
                <div
                  class="slide-nav"
                  onClick={() => {
                    if (commonDropDown == "description-style") {
                      setcommonDropDown("");
                    } else {
                      setcommonDropDown("description-style");
                    }
                  }}
                >
                  <span>{__("Description Styles", "unlimited-blocks")}</span>
                  <div class="caret">
                    <i class="fas fa-caret-down"></i>
                  </div>
                </div>
                <div className="slides-element">
                  {/* element  */}
                  {/* font family */}
                  <div className="THK-font-family-wrapper">
                    <p>
                      <strong>{__("Font Family", "unlimited-blocks")}</strong>
                    </p>
                    <div
                      ref={familyRef2}
                      className={`font-family-drop-down ${
                        activeFamilyContainer2 ? "active" : ""
                      }`}
                    >
                      <div
                        onClick={() => {
                          let applyActive = !activeFamilyContainer2;
                          activeFamilyDrop2(applyActive);
                        }}
                        className="font-family-show"
                      >
                        <span style={{ fontFamily: descriptionFF }}>
                          {descriptionFF ? descriptionFF : "Choose Family"}
                        </span>
                      </div>
                      <div className="family-items">
                        {fontFamily.map((family, key_) => {
                          return (
                            <span
                              onClick={() =>
                                setAttributes({ descriptionFF: family })
                              }
                              style={{ fontFamily: family }}
                            >
                              {family}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {/* font family */}

                  <RangeControl
                    label={__("Font Size", "unlimited-blocks")}
                    value={descriptionFontSize}
                    min={0}
                    max={60}
                    onChange={(e) => setAttributes({ descriptionFontSize: e })}
                  />
                  <p>
                    <strong>{__("Color", "unlimited-blocks")}</strong>
                  </p>
                  <ColorPalette
                    value={descriptionColor}
                    onChange={(color) =>
                      setAttributes({ descriptionColor: color })
                    }
                  />
                  {/* element  */}
                </div>
              </div>
              {/* description style  */}
            </>
          )}
        </PanelBody>
        <PanelBody title={"Price"} initialOpen={false}>
          <Switcher
            value={pricingSection}
            navItem={[
              {
                name: "content",
                title: "Content",
              },
              {
                name: "style",
                title: "Style",
              },
            ]}
            clickme={(value_) => {
              setpricingSection(value_);
            }}
          />
          {/* content or styles  */}
          {pricingSection == "content" ? (
            <>
              <div className="flex-section sec-50-40">
                <p>{__("Currency", "unlimited-blocks")}</p>
                <select
                  value={currencyC}
                  onChange={(e) => {
                    setAttributes({ currencyC: e.target.value });
                  }}
                >
                  {[
                    ["$", "Dollar"],
                    ["€", "Euro"],
                    ["฿", "Baht"],
                    ["₣", "Franc"],
                    ["ƒ", "Guilder"],
                    ["kr", "Krona"],
                    ["₤", "Lira"],
                    ["₹", "Rupee (Indian)"],
                    ["₧", "Peseta"],
                    ["₱", "Peso"],
                    ["£", "Pound Sterling"],
                    ["R$", "Real"],
                    ["₽", "Ruble"],
                    ["₨", "Rupee"],
                    ["₪", "Shekel"],
                    ["¥", "Yen/Yuan"],
                    ["₩", "Won"],
                    ["", "Custom"],
                  ].map((v) => (
                    <option value={v[0]}>{v[0] + " " + v[1]}</option>
                  ))}
                </select>
              </div>
              <div className="flex-section sec-50-40">
                <p>{__("Price", "unlimited-blocks")}</p>
                <input
                  type="number"
                  value={priceMonth}
                  onChange={(e) => {
                    setAttributes({ priceMonth: e.target.value });
                  }}
                />
              </div>
              <div className="flex-section sec-50-40">
                <p>{__("Formate", "unlimited-blocks")}</p>
                <select
                  value={currencyFormate}
                  onChange={(e) => {
                    setAttributes({ currencyFormate: e.target.value });
                    if (e.target.value == "1") setAttributes({ currencyFs: 8 });
                  }}
                >
                  <option value="0">{__("Normal", "unlimited-blocks")}</option>
                  <option value="1">{__("Rasied", "unlimited-blocks")}</option>
                </select>
              </div>
              <div className="flex-section sec-50-40">
                <p>{__("Period", "unlimited-blocks")}</p>
                <input
                  type="text"
                  value={priceMonthPrice}
                  onChange={(e) => {
                    setAttributes({ priceMonthPrice: e.target.value });
                  }}
                />
              </div>
            </>
          ) : (
            <>
              {/* common setting  */}
              <BackgroundColor
                value={{
                  title: "Background Color",
                  backgroundColorType: priceBgColor.type,
                  backgroundColor: priceBgColor.color,
                  backgroundImageGradient: priceBgColor.gradient,
                }}
                changeme={(_properties) => {
                  // console.log("_properties", _properties);
                  let saveObj = {
                    type: _properties.backgroundColorType,
                    color: _properties.backgroundColor,
                    gradient: _properties.backgroundImageGradient,
                  };
                  setAttributes({ priceBgColor: saveObj });
                }}
              />
              {/* bg color  */}
              <div className="ubl-panel-custom">
                <label className="normal-label">
                  {__("Position", "unlimited-blocks")}
                </label>
                <SelectControl
                  value={pricePosition}
                  onChange={(e) => setAttributes({ pricePosition: e })}
                  options={[
                    {
                      value: null,
                      label: __("Choose Position", "unlimited-blocks"),
                      disabled: true,
                    },
                    { value: "top", label: "Top" },
                    { value: "middle", label: "Middle" },
                    { value: "bottom", label: "Bottom" },
                  ]}
                />
              </div>
              {/* layout style  */}
              <div
                className={`slide-panel-single ${
                  commonDropDown == "layout-style" ? "active" : ""
                }`}
              >
                <div
                  class="slide-nav"
                  onClick={() => {
                    if (commonDropDown == "layout-style") {
                      setcommonDropDown("");
                    } else {
                      setcommonDropDown("layout-style");
                    }
                  }}
                >
                  <span>{__("Layout", "unlimited-blocks")}</span>
                  <div class="caret">
                    <i class="fas fa-caret-down"></i>
                  </div>
                </div>
                <div className="slides-element">
                  {/* element  */}

                  <div className="ubl-panel-custom">
                    <label className="normal-label">
                      {__("Layout", "unlimited-blocks")}
                    </label>
                    <SelectControl
                      value={priceInline ? "box" : "round"}
                      onChange={(e) => {
                        // console.log("ee", e);
                        let setPrice = e == "round" ? false : true;
                        setAttributes({ priceInline: setPrice });
                        if (!setPrice) {
                          setAttributes({ priceBorderRadius: 50 });
                        }
                      }}
                      options={[
                        {
                          value: null,
                          label: __("Choose Layout", "unlimited-blocks"),
                          disabled: true,
                        },
                        { value: "box", label: "Boxed" },
                        { value: "round", label: "Rounded" },
                      ]}
                    />
                  </div>
                  {!priceInline && (
                    <RangeControl
                      label={__("Price Space", "unlimited-blocks")}
                      value={priceSpace}
                      min={0}
                      max={250}
                      onChange={(e) => setAttributes({ priceSpace: e })}
                    />
                  )}
                  {priceInline && (
                    <>
                      <RangeControl
                        label={__("Top/Bottom", "unlimited-blocks")}
                        value={priceSpaceV}
                        min={0}
                        max={200}
                        onChange={(e) => setAttributes({ priceSpaceV: e })}
                      />
                      <RangeControl
                        label={__("Left/Right", "unlimited-blocks")}
                        value={priceSpaceH}
                        min={0}
                        max={200}
                        onChange={(e) => setAttributes({ priceSpaceH: e })}
                      />
                    </>
                  )}
                  <p>
                    <strong>{__("Border", "unlimited-blocks")}</strong>
                  </p>
                  <ToggleControl
                    label={
                      priceBorder
                        ? __("Disable", "unlimited-blocks")
                        : __("Enable", "unlimited-blocks")
                    }
                    checked={priceBorder}
                    onChange={(e) => setAttributes({ priceBorder: e })}
                  />
                  {priceBorder && (
                    <div className="icon-border-setting">
                      <RangeControl
                        label={__("Border Width", "unlimited-blocks")}
                        value={priceBorderWidth}
                        min={0}
                        max={20}
                        onChange={(e) => setAttributes({ priceBorderWidth: e })}
                      />
                      <RangeControl
                        label={__("Border Radius", "unlimited-blocks")}
                        value={priceBorderRadius}
                        min={0}
                        max={50}
                        onChange={(e) =>
                          setAttributes({ priceBorderRadius: e })
                        }
                      />
                      <label className="normal-label">
                        {__("Border Color", "unlimited-blocks")}
                      </label>
                      <ColorPalette
                        value={priceBorderColor}
                        onChange={(color) =>
                          setAttributes({ priceBorderColor: color })
                        }
                      />
                    </div>
                  )}
                  {/* element  */}
                </div>
              </div>
              {/* layout style  */}
              <div
                className={`slide-panel-single ${
                  commonDropDown == "pricing-common-style" ? "active" : ""
                }`}
              >
                <div
                  class="slide-nav"
                  onClick={() => {
                    if (commonDropDown == "pricing-common-style") {
                      setcommonDropDown("");
                    } else {
                      setcommonDropDown("pricing-common-style");
                    }
                  }}
                >
                  <span>{__("Price Style", "unlimited-blocks")}</span>
                  <div class="caret">
                    <i class="fas fa-caret-down"></i>
                  </div>
                </div>
                <div className="slides-element">
                  {/* element  */}

                  {/* font family */}
                  <div className="THK-font-family-wrapper">
                    <label className="normal-label">
                      {__("Font Family", "unlimited-blocks")}
                    </label>
                    <div
                      ref={familyRef}
                      className={`font-family-drop-down ${
                        activeFamilyContainer ? "active" : ""
                      }`}
                    >
                      <div
                        ref={familyRef}
                        onClick={() => {
                          let applyActive = !activeFamilyContainer;
                          activeFamilyDrop(applyActive);
                        }}
                        className="font-family-show"
                      >
                        <span style={{ fontFamily: priceFF }}>
                          {priceFF
                            ? priceFF
                            : __("Choose Family", "unlimited-blocks")}
                        </span>
                      </div>
                      <div className="family-items">
                        {fontFamily.map((family, key_) => {
                          return (
                            <span
                              onClick={() => setAttributes({ priceFF: family })}
                              style={{ fontFamily: family }}
                            >
                              {family}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {/* font family */}
                  {/* font weight */}
                  <div className="flex-section sec-50-40">
                    <p>{__("Font Weight", "unlimited-blocks")}</p>
                    <select
                      value={currencyFontWeight}
                      onChange={(e) => {
                        setAttributes({ currencyFontWeight: e.target.value });
                      }}
                    >
                      <option value="400">400</option>
                      <option value="500">500</option>
                      <option value="700">700</option>
                      <option value="900">900</option>
                      <option value="bold">Bold</option>
                      <option value="bolder">Bolder</option>
                    </select>
                  </div>
                  {/* font weight */}
                  <p>
                    <strong>{__("Price", "unlimited-blocks")}</strong>
                  </p>
                  <label className="normal-label">
                    {__("Color", "unlimited-blocks")}
                  </label>
                  <ColorPalette
                    value={priceColor}
                    onChange={(color) => setAttributes({ priceColor: color })}
                  />
                  <RangeControl
                    label={__("Font Size", "unlimited-blocks")}
                    value={priceFontSize}
                    min={0}
                    max={100}
                    onChange={(e) => setAttributes({ priceFontSize: e })}
                  />
                  {/* currency  */}
                  <p>
                    <strong>{__("Currency", "unlimited-blocks")}</strong>
                  </p>
                  <RangeControl
                    label={__("Font Size", "unlimited-blocks")}
                    value={currencyFs}
                    min={0}
                    max={60}
                    onChange={(e) => setAttributes({ currencyFs: e })}
                  />
                  <p>
                    <strong>{__("Text", "unlimited-blocks")}</strong>
                  </p>
                  <label className="normal-label">
                    {__("Color", "unlimited-blocks")}
                  </label>
                  <ColorPalette
                    value={priceMonthPriceColor}
                    onChange={(color) =>
                      setAttributes({ priceMonthPriceColor: color })
                    }
                  />
                  <RangeControl
                    label={__("Font Size", "unlimited-blocks")}
                    value={priceMonthPriceFs}
                    min={0}
                    max={100}
                    onChange={(e) => setAttributes({ priceMonthPriceFs: e })}
                  />
                  {/* element  */}
                </div>
              </div>
              {/* common setting  */}
            </>
          )}
        </PanelBody>
        <PanelBody title={"List Section"} initialOpen={false}>
          <Switcher
            value={middleSecNav}
            navItem={[
              {
                name: "content",
                title: "Content",
              },
              {
                name: "style",
                title: "Style",
              },
            ]}
            clickme={(value_) => {
              setmiddleSecNav(value_);
            }}
          />
          {/* top nav  */}

          {middleSecNav == "content" ? (
            <>
              {/* ------------------------------ */}
              <div className="slides-option">
                {middleSection.sections.map((section, index_) => {
                  return (
                    <div
                      className={`slide-panel-single ${
                        index_ == selectedMiddleSection && middleSecOpen
                          ? "active"
                          : ""
                      }`}
                    >
                      <div
                        className="slide-nav"
                        onClick={() => {
                          if (
                            index_ == selectedMiddleSection &&
                            middleSecOpen
                          ) {
                            setmiddleSecOpen(false);
                          } else {
                            setselectedMiddleSection(index_);
                            setmiddleSecOpen(true);
                          }
                        }}
                      >
                        <span>
                          {section.text.length >= 21
                            ? section.text.slice(0, 20) + "..."
                            : section.text}
                        </span>
                        {index_ + 1 !== middleSection.sections.length &&
                        middleSection.sections.length > 1 ? (
                          <div className="controlls">
                            <span onClick={() => removeDescription(index_)}>
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
                        {/* element  */}
                        {/* for icon  */}
                        {index_ == selectedMiddleSection && middleSecOpen ? (
                          <>
                            <div className="ubl-panel-custom">
                              <p>
                                <strong>
                                  {__("Text", "unlimited-blocks")}
                                </strong>
                              </p>
                              <InputControl
                                value={section.text}
                                onChange={(e) => {
                                  updateSlides(index_, e, "text");
                                }}
                              />
                            </div>
                            <p>
                              <strong>
                                {__("Choose Icon", "unlimited-blocks")}
                              </strong>
                            </p>

                            <div
                              ref={iconReff}
                              className={`wpgt-radio-wrap ${
                                activeIconContainer ? "active" : ""
                              }`}
                            >
                              <div
                                className="selected-icon"
                                onClick={(e) => {
                                  activeIconContainerSet(true);
                                }}
                              >
                                <i className={section.icon}></i>
                                <div className="search-container">
                                  <i className="fas fa-search"></i>
                                  <input
                                    type="text"
                                    onChange={(e) => {
                                      let value_ = e.target.value;
                                      if (value_ != "") {
                                        let newAr = icons_.filter(
                                          (checkStr) =>
                                            checkStr.search(value_) != -1
                                        );
                                        if (newAr.length) {
                                          setIconList(newAr);
                                        }
                                      } else {
                                        setIconList(icons_);
                                      }
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                className="wpgt-radio-container"
                                onChange={(e) => {
                                  updateSlides(index_, e.target.value, "icon");
                                }}
                              >
                                {iconList.map((iconValue) => {
                                  let string_ = `wpgt-Radio-${
                                    iconValue + index_
                                  }`;
                                  let uinqIdWrap = string_.replace(" ", "--");
                                  return (
                                    <div className="wpgt-radio-wrapper">
                                      <input
                                        id={uinqIdWrap}
                                        type="radio"
                                        name={`wpgt-choose-icon-${index_}`}
                                        className="radio-input"
                                        value={iconValue}
                                      />
                                      <label htmlFor={uinqIdWrap}>
                                        <i className={iconValue}></i>
                                      </label>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                        {/* for icon  */}
                        <p>
                          <strong>{__("Color", "unlimited-blocks")}</strong>
                        </p>
                        <ColorPalette
                          value={section.iconStyle.color}
                          onChange={(color) => {
                            let color_ = { ...section.iconStyle };
                            color_["color"] = color;
                            updateSlides(index_, color_, "iconStyle");
                          }}
                        />
                        {/* element  */}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="add-new-slide">
                <span onClick={() => addDescription()}>
                  <i class="fas fa-plus"></i>
                  {__("Add New", "unlimited-blocks")}
                </span>
              </div>

              {/* ------------------------------ */}
            </>
          ) : (
            <>
              <p>
                <strong>{__("Background Color", "unlimited-blocks")}</strong>
              </p>

              <div class="ubl-switcher-button-section sub">
                <span
                  onClick={() => {
                    let getBgcolor = {
                      ...middleSection.textCommonStyle.backgroundColor,
                    };
                    getBgcolor["type"] = "color";
                    updateSlides(
                      "textCommonStyle",
                      getBgcolor,
                      "backgroundColor",
                      true
                    );
                  }}
                  className={
                    middleSection.textCommonStyle.backgroundColor.type ==
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
                      ...middleSection.textCommonStyle.backgroundColor,
                    };
                    getBgcolor["type"] = "gradient";
                    updateSlides(
                      "textCommonStyle",
                      getBgcolor,
                      "backgroundColor",
                      true
                    );
                  }}
                  className={
                    middleSection.textCommonStyle.backgroundColor.type ==
                    "gradient"
                      ? "selected"
                      : ""
                  }
                >
                  {__("Gradient", "unlimited-blocks")}
                </span>
              </div>
              {"color" == middleSection.textCommonStyle.backgroundColor.type ? (
                <ColorPicker
                  color={middleSection.textCommonStyle.backgroundColor.color}
                  onChangeComplete={(colorBg) => {
                    let color = `rgba(${colorBg.rgb.r},${colorBg.rgb.g},${colorBg.rgb.b},${colorBg.rgb.a})`;
                    let getBgcolor = {
                      ...middleSection.textCommonStyle.backgroundColor,
                    };
                    getBgcolor["color"] = color;
                    updateSlides(
                      "textCommonStyle",
                      getBgcolor,
                      "backgroundColor",
                      true
                    );
                  }}
                />
              ) : (
                <GradientPicker
                  disableCustomGradients={false}
                  value={middleSection.textCommonStyle.backgroundColor.gradient}
                  gradients={UBLGraDientColors}
                  onChange={(newGradient) => {
                    let getBgcolor = {
                      ...middleSection.textCommonStyle.backgroundColor,
                    };
                    getBgcolor["gradient"] = newGradient;
                    updateSlides(
                      "textCommonStyle",
                      getBgcolor,
                      "backgroundColor",
                      true
                    );
                  }}
                />
              )}
              {/* bg color  */}
              {/* text allign  */}
              <p>
                <strong>{__("Text Align", "unlimited-blocks")}</strong>
              </p>
              <div className="ubl-alignment">
                <div>
                  <span
                    onClick={() => {
                      updateSlides(
                        "textCommonStyle",
                        "left",
                        "textAlign",
                        true
                      );
                    }}
                    className={`dashicons dashicons-editor-alignleft ${
                      middleSection.textCommonStyle.textAlign == "left"
                        ? "active"
                        : ""
                    }`}
                  ></span>
                </div>
                <div>
                  <span
                    onClick={() => {
                      updateSlides(
                        "textCommonStyle",
                        "center",
                        "textAlign",
                        true
                      );
                    }}
                    className={`dashicons dashicons-editor-aligncenter ${
                      middleSection.textCommonStyle.textAlign == "center"
                        ? "active"
                        : ""
                    }`}
                  ></span>
                </div>
              </div>
              {/* text allign  */}
              {/* font family */}
              <div className="THK-font-family-wrapper">
                <p>
                  <strong>{__("Font Family", "unlimited-blocks")}</strong>
                </p>
                <div
                  ref={familyRef}
                  className={`font-family-drop-down ${
                    activeFamilyContainer ? "active" : ""
                  }`}
                >
                  <div
                    ref={familyRef}
                    onClick={() => {
                      let applyActive = !activeFamilyContainer;
                      activeFamilyDrop(applyActive);
                    }}
                    className="font-family-show"
                  >
                    <span
                      style={{
                        fontFamily: middleSection.textCommonStyle.fontFamily,
                      }}
                    >
                      {middleSection.textCommonStyle.fontFamily
                        ? middleSection.textCommonStyle.fontFamily
                        : __("Choose Family", "unlimited-blocks")}
                    </span>
                  </div>
                  <div className="family-items">
                    {fontFamily.map((family, key_) => {
                      return (
                        <span
                          onClick={() => {
                            updateSlides(
                              "textCommonStyle",
                              family,
                              "fontFamily",
                              true
                            );
                          }}
                          style={{ fontFamily: family }}
                        >
                          {family}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* font family */}
              <RangeControl
                label={__("Text Font Size", "unlimited-blocks")}
                value={middleSection.textCommonStyle.fontSize}
                min={0}
                max={60}
                onChange={(e) => {
                  updateSlides("textCommonStyle", e, "fontSize", true);
                }}
              />
              <RangeControl
                label={__("Icon Font Size", "unlimited-blocks")}
                value={middleSection.iconCommonStyle.fontSize}
                min={0}
                max={60}
                onChange={(e) => {
                  updateSlides("iconCommonStyle", e, "fontSize", true);
                }}
              />
              <RangeControl
                label={__("Space Between Text", "unlimited-blocks")}
                value={middleSection.textCommonStyle.margin}
                min={0}
                max={60}
                onChange={(e) => {
                  updateSlides("textCommonStyle", e, "margin", true);
                }}
              />

              <p>
                <strong>{__("Color", "unlimited-blocks")}</strong>
              </p>
              <ColorPalette
                value={middleSection.textCommonStyle.color}
                onChange={(color) => {
                  updateSlides("textCommonStyle", color, "color", true);
                }}
              />
              <p>
                <strong>{__("Underline", "unlimited-blocks")}</strong>
              </p>
              <ToggleControl
                label={
                  middleSection.textCommonStyle.underLine.enable
                    ? __("Disable", "unlimited-blocks")
                    : __("Enable", "unlimited-blocks")
                }
                checked={middleSection.textCommonStyle.underLine.enable}
                onChange={(e) => {
                  let middleSection_ = { ...middleSection };
                  middleSection_.textCommonStyle.underLine.enable = e;
                  setAttributes({ middleSection: middleSection_ });
                }}
              />
              {middleSection.textCommonStyle.underLine.enable && (
                <>
                  <RangeControl
                    label={__("Height", "unlimited-blocks")}
                    value={middleSection.textCommonStyle.underLine.height}
                    min={0}
                    max={20}
                    onChange={(e) => {
                      let middleSection_ = { ...middleSection };
                      middleSection_.textCommonStyle.underLine.height = e;
                      setAttributes({ middleSection: middleSection_ });
                    }}
                  />
                  <RangeControl
                    label={__("Width", "unlimited-blocks")}
                    value={middleSection.textCommonStyle.underLine.width}
                    min={0}
                    max={100}
                    onChange={(e) => {
                      let middleSection_ = { ...middleSection };
                      middleSection_.textCommonStyle.underLine.width = e;
                      setAttributes({ middleSection: middleSection_ });
                    }}
                  />
                  <p>
                    <strong>{__("Color", "unlimited-blocks")}</strong>
                  </p>
                  <ColorPalette
                    value={middleSection.textCommonStyle.underLine.color}
                    onChange={(color) => {
                      let middleSection_ = { ...middleSection };
                      middleSection_.textCommonStyle.underLine.color = color;
                      setAttributes({ middleSection: middleSection_ });
                    }}
                  />
                </>
              )}
            </>
          )}
        </PanelBody>
        <PanelBody
          title={__("Button Section", "unlimited-blocks")}
          initialOpen={false}
        >
          {/* button section  */}
          <div class="ubl-switcher-button-section sub">
            <span
              onClick={() => setfooterButtonSec("content")}
              className={footerButtonSec == "content" ? "selected" : ""}
            >
              {__("Content", "unlimited-blocks")}
            </span>
            <span
              onClick={() => setfooterButtonSec("style")}
              className={footerButtonSec == "style" ? "selected" : ""}
            >
              {__("Style", "unlimited-blocks")}
            </span>
          </div>

          {footerButtonSec == "content" ? (
            <>
              <div className="ubl-panel-custom">
                <label className="normal-label">
                  {__("Button Text", "unlimited-blocks")}
                </label>
                <InputControl
                  value={linkContent.text}
                  onChange={(e) => {
                    let link = { ...linkContent };
                    link["text"] = e;
                    setAttributes({ linkContent: link });
                  }}
                />
              </div>
              <p>
                <strong>{__("Button Link", "unlimited-blocks")}</strong>
              </p>
              <div className="ubl-blocks-linkbtn">
                <LinkControl
                  value={{
                    url: linkContent.linkUrl.link,
                    opensInNewTab: linkContent.linkUrl.target,
                  }}
                  onChange={(vall) => {
                    let link = { ...linkContent };
                    if ("url" in vall) {
                      link.linkUrl.link = vall.url;
                    }
                    if ("opensInNewTab" in vall) {
                      link.linkUrl.target = vall.opensInNewTab;
                    }
                    setAttributes({ linkContent: link });
                  }}
                />
              </div>
              <div className="ubl-panel-custom">
                <label className="normal-label">
                  {__("Short Description", "unlimited-blocks")}
                </label>
                <InputControl
                  value={shortDescription.text}
                  onChange={(e) => {
                    let shortDesc = { ...shortDescription };
                    shortDesc["text"] = e;
                    setAttributes({ shortDescription: shortDesc });
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <p>
                <strong>{__("Background Color", "unlimited-blocks")}</strong>
              </p>
              <div class="ubl-switcher-button-section sub">
                <span
                  onClick={() => {
                    let getBgcolor = { ...footerBgColor };
                    getBgcolor["type"] = "color";
                    setAttributes({ footerBgColor: getBgcolor });
                  }}
                  className={footerBgColor.type == "color" ? "selected" : ""}
                >
                  {__("Solid", "unlimited-blocks")}
                </span>
                <span
                  onClick={() => {
                    let getBgcolor = { ...footerBgColor };
                    getBgcolor["type"] = "gradient";
                    setAttributes({ footerBgColor: getBgcolor });
                  }}
                  className={footerBgColor.type == "gradient" ? "selected" : ""}
                >
                  {__("Gradient", "unlimited-blocks")}
                </span>
              </div>
              {"color" == footerBgColor.type ? (
                <ColorPicker
                  color={footerBgColor.color}
                  onChangeComplete={(colorBg) => {
                    let color = `rgba(${colorBg.rgb.r},${colorBg.rgb.g},${colorBg.rgb.b},${colorBg.rgb.a})`;
                    let getBgcolor = { ...footerBgColor };
                    getBgcolor["color"] = color;
                    setAttributes({ footerBgColor: getBgcolor });
                  }}
                />
              ) : (
                <GradientPicker
                  disableCustomGradients={false}
                  value={footerBgColor.gradient}
                  gradients={UBLGraDientColors}
                  onChange={(newGradient) => {
                    let getBgcolor = { ...footerBgColor };
                    getBgcolor["gradient"] = newGradient;
                    setAttributes({ footerBgColor: getBgcolor });
                  }}
                />
              )}
              {/* bg color  */}
              <div
                className={`slide-panel-single ${
                  commonDropDown == "footer-button-style" ? "active" : ""
                }`}
              >
                <div
                  class="slide-nav"
                  onClick={() => {
                    if (commonDropDown == "footer-button-style") {
                      setcommonDropDown("");
                    } else {
                      setcommonDropDown("footer-button-style");
                    }
                  }}
                >
                  <span>{__("Button Style", "unlimited-blocks")}</span>
                  <div class="caret">
                    <i class="fas fa-caret-down"></i>
                  </div>
                </div>
                <div className="slides-element">
                  {/* element  */}
                  <RangeControl
                    label={__("Font Size", "unlimited-blocks")}
                    value={linkContent.fontSize}
                    min={0}
                    max={70}
                    onChange={(e) => {
                      let link = { ...linkContent };
                      link["fontSize"] = e;
                      setAttributes({ linkContent: link });
                    }}
                  />
                  <label className="normal-label">
                    {__("Color", "unlimited-blocks")}
                  </label>
                  <ColorPalette
                    value={linkContent.color}
                    onChange={(color) => {
                      let link = { ...linkContent };
                      link["color"] = color;
                      setAttributes({ linkContent: link });
                    }}
                  />
                  {/* font weight */}
                  <div className="flex-section">
                    <p>{__("Font Weight", "unlimited-blocks")}</p>
                    <select
                      value={linkContent.fontWeight}
                      onChange={(e) => {
                        let link = { ...linkContent };
                        link["fontWeight"] = e.target.value;
                        setAttributes({ linkContent: link });
                      }}
                    >
                      <option value="400">400</option>
                      <option value="500">500</option>
                      <option value="700">700</option>
                      <option value="900">900</option>
                      <option value="bold">Bold</option>
                      <option value="bolder">Bolder</option>
                    </select>
                  </div>
                  {/* font weight */}
                  <p>
                    <strong>
                      {__("Background Color", "unlimited-blocks")}
                    </strong>
                  </p>

                  <div class="ubl-switcher-button-section sub">
                    <span
                      onClick={() => {
                        let link = { ...linkContent };
                        link.backgroundColor["type"] = "color";
                        setAttributes({ linkContent: link });
                      }}
                      className={
                        linkContent.backgroundColor.type == "color"
                          ? "selected"
                          : ""
                      }
                    >
                      {__("Solid", "unlimited-blocks")}
                    </span>
                    <span
                      onClick={() => {
                        let link = { ...linkContent };
                        link.backgroundColor["type"] = "gradient";
                        setAttributes({ linkContent: link });
                      }}
                      className={
                        linkContent.backgroundColor.type == "gradient"
                          ? "selected"
                          : ""
                      }
                    >
                      {__("Gradient", "unlimited-blocks")}
                    </span>
                  </div>

                  {"color" == linkContent.backgroundColor.type ? (
                    <ColorPicker
                      color={linkContent.backgroundColor.color}
                      onChangeComplete={(colorBg) => {
                        let color = `rgba(${colorBg.rgb.r},${colorBg.rgb.g},${colorBg.rgb.b},${colorBg.rgb.a})`;
                        let link = { ...linkContent };
                        link.backgroundColor["color"] = color;
                        setAttributes({ linkContent: link });
                      }}
                    />
                  ) : (
                    <GradientPicker
                      disableCustomGradients={false}
                      value={linkContent.backgroundColor.gradient}
                      gradients={UBLGraDientColors}
                      onChange={(newGradient) => {
                        let link = { ...linkContent };
                        link.backgroundColor["gradient"] = newGradient;
                        setAttributes({ linkContent: link });
                      }}
                    />
                  )}

                  {/* bg color  */}
                  <RangeControl
                    label={__("Padding Top & Bottom", "unlimited-blocks")}
                    value={linkContent.spaceV}
                    min={0}
                    max={300}
                    onChange={(e) => {
                      let link = { ...linkContent };
                      link.spaceV = e;
                      setAttributes({ linkContent: link });
                    }}
                  />
                  <RangeControl
                    label={__("Padding Left & Right", "unlimited-blocks")}
                    value={linkContent.spaceH}
                    min={5}
                    max={100}
                    onChange={(e) => {
                      let link = { ...linkContent };
                      link.spaceH = e;
                      setAttributes({ linkContent: link });
                    }}
                  />
                  <p>
                    <strong>{__("Border", "unlimited-blocks")}</strong>
                  </p>

                  <ToggleControl
                    label={
                      linkContent.border.enable
                        ? __("Disable", "unlimited-blocks")
                        : __("Enable", "unlimited-blocks")
                    }
                    checked={linkContent.border.enable}
                    onChange={(e) => {
                      let link = { ...linkContent };
                      link.border.enable = e;
                      setAttributes({ linkContent: link });
                    }}
                  />
                  {linkContent.border.enable && (
                    <div className="icon-border-setting">
                      <RangeControl
                        label={__("Border Width", "unlimited-blocks")}
                        value={linkContent.border.width}
                        min={0}
                        max={100}
                        onChange={(e) => {
                          let link = { ...linkContent };
                          link.border.width = e;
                          setAttributes({ linkContent: link });
                        }}
                      />
                      <RangeControl
                        label={__("Border Radius", "unlimited-blocks")}
                        value={linkContent.border.radius}
                        min={0}
                        max={50}
                        onChange={(e) => {
                          let link = { ...linkContent };
                          link.border.radius = e;
                          setAttributes({ linkContent: link });
                        }}
                      />
                      <label className="normal-label">
                        {__("Border Color", "unlimited-blocks")}
                      </label>
                      <ColorPalette
                        value={linkContent.border.color}
                        onChange={(color) => {
                          let link = { ...linkContent };
                          link.border.color = color;
                          setAttributes({ linkContent: link });
                        }}
                      />
                    </div>
                  )}
                  {/* element  */}
                </div>
              </div>
              {/* button section  */}
              <div
                className={`slide-panel-single ${
                  commonDropDown == "footer-description-style" ? "active" : ""
                }`}
              >
                <div
                  class="slide-nav"
                  onClick={() => {
                    if (commonDropDown == "footer-description-style") {
                      setcommonDropDown("");
                    } else {
                      setcommonDropDown("footer-description-style");
                    }
                  }}
                >
                  <span>{__("Description Style", "unlimited-blocks")}</span>
                  <div class="caret">
                    <i class="fas fa-caret-down"></i>
                  </div>
                </div>
                <div className="slides-element">
                  {/* element  */}
                  {/* font family */}
                  <div className="THK-font-family-wrapper">
                    <label className="normal-label">
                      {__("Font Family", "unlimited-blocks")}
                    </label>
                    <div
                      ref={familyRef}
                      className={`font-family-drop-down ${
                        activeFamilyContainer ? "active" : ""
                      }`}
                    >
                      <div
                        ref={familyRef}
                        onClick={() => {
                          let applyActive = !activeFamilyContainer;
                          activeFamilyDrop(applyActive);
                        }}
                        className="font-family-show"
                      >
                        <span
                          style={{ fontFamily: shortDescription.fontFamily }}
                        >
                          {shortDescription.fontFamily
                            ? shortDescription.fontFamily
                            : __("Choose Family", "unlimited-blocks")}
                        </span>
                      </div>
                      <div className="family-items">
                        {fontFamily.map((family, key_) => {
                          return (
                            <span
                              onClick={() => {
                                let descrip = { ...shortDescription };
                                descrip.fontFamily = family;
                                setAttributes({ shortDescription: descrip });
                              }}
                              style={{ fontFamily: family }}
                            >
                              {family}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <RangeControl
                    label={__("Font Size", "unlimited-blocks")}
                    value={shortDescription.fontSize}
                    min={0}
                    max={70}
                    onChange={(e) => {
                      let descrip = { ...shortDescription };
                      descrip.fontSize = e;
                      setAttributes({ shortDescription: descrip });
                    }}
                  />
                  <label className="normal-label">
                    {__("Color", "unlimited-blocks")}
                  </label>
                  <ColorPalette
                    value={shortDescription.color}
                    onChange={(color) => {
                      let descrip = { ...shortDescription };
                      descrip.color = color;
                      setAttributes({ shortDescription: descrip });
                    }}
                  />
                  <RangeControl
                    label={__("Font Size", "unlimited-blocks")}
                    value={shortDescription.fontSize}
                    min={0}
                    max={70}
                    onChange={(e) => {
                      let descrip = { ...shortDescription };
                      descrip.fontSize = e;
                      setAttributes({ shortDescription: descrip });
                    }}
                  />
                  <RangeControl
                    label={__("Top & Bottom Spacing", "unlimited-blocks")}
                    value={shortDescription.topBottomSpace}
                    min={0}
                    max={70}
                    onChange={(e) => {
                      let descrip = { ...shortDescription };
                      descrip.topBottomSpace = e;
                      setAttributes({ shortDescription: descrip });
                    }}
                  />

                  {/* element  */}
                </div>
              </div>
            </>
          )}
        </PanelBody>
        <PanelBody
          title={__("Container Settings", "unlimited-blocks")}
          initialOpen={false}
        >
          <p>
            <strong>{__("Border", "unlimited-blocks")}</strong>
          </p>
          <ToggleControl
            label={
              containerBorder
                ? __("Disable", "unlimited-blocks")
                : __("Enable", "unlimited-blocks")
            }
            checked={containerBorder}
            onChange={(e) => setAttributes({ containerBorder: e })}
          />
          {containerBorder && (
            <div className="icon-border-setting">
              <RangeControl
                label={__("Border Width", "unlimited-blocks")}
                value={containerBorderWidth}
                min={0}
                max={100}
                onChange={(e) => setAttributes({ containerBorderWidth: e })}
              />
              <RangeControl
                label={__("Border Radius", "unlimited-blocks")}
                value={containerBorderRadius}
                min={0}
                max={50}
                onChange={(e) => setAttributes({ containerBorderRadius: e })}
              />
              <p>{__("Border Color", "unlimited-blocks")}</p>
              <ColorPalette
                value={containerBorderColor}
                onChange={(color) =>
                  setAttributes({ containerBorderColor: color })
                }
              />
            </div>
          )}
        </PanelBody>
      </InspectorControls>,
      <div className="pricing-table-wrapper" style={containerBorderStyle}>
        <div className="pricing-table-top" style={headerBgStyle}>
          <RichText
            allowedFormats={[]}
            key="editable"
            tagName={headingTag}
            placeholder={__("Pricing Table", "unlimited-blocks")}
            value={headingTxt}
            style={{
              fontSize: headingFontSize + "px",
              color: headingColor,
              fontFamily: headingFF,
            }}
            onChange={(e) => setAttributes({ headingTxt: e })}
          />
          {pricePosition == "top" && (
            <div
              className={`price_ ${priceInline ? "inline_" : "box_"}`}
              style={priceStyle}
            >
              <div
                style={{ color: priceColor }}
                className={currencyFormate == "1" ? "rasied" : ""}
              >
                <p style={{ fontSize: currencyFs }}>{currencyC}</p>
                <p style={{ fontSize: priceFontSize + "px" }}>{priceMonth}</p>
              </div>
              <p
                style={{
                  fontSize: priceMonthPriceFs + "px",
                  color: priceMonthPriceColor,
                }}
              >
                {priceMonthPrice}
              </p>
            </div>
          )}
          <RichText
            allowedFormats={[]}
            key="editable"
            tagName="p"
            style={{
              fontSize: descriptionFontSize + "px",
              color: descriptionColor,
              fontFamily: descriptionFF,
            }}
            value={headingDescription}
            onChange={(e) => setAttributes({ headingDescription: e })}
          />
        </div>
        <div className="pricing-table-middle" style={middleBgColorStyle}>
          {pricePosition == "middle" && (
            <div
              className={`price_ ${priceInline ? "inline_" : "box_"}`}
              style={priceStyle}
            >
              <div
                style={{ color: priceColor }}
                className={currencyFormate == "1" ? "rasied" : ""}
              >
                <p style={{ fontSize: currencyFs }}>{currencyC}</p>
                <p style={{ fontSize: priceFontSize + "px" }}>{priceMonth}</p>
              </div>
              <p
                style={{
                  fontSize: priceMonthPriceFs + "px",
                  color: priceMonthPriceColor,
                }}
              >
                {priceMonthPrice}
              </p>
            </div>
          )}
          <div className="middle-sections">
            {middleSection.sections.map((section, index_) => {
              return (
                <>
                  <div
                    className={
                      index_ == selectedMiddleSection ? "selected" : null
                    }
                    onClick={() => setselectedMiddleSection(index_)}
                    style={{
                      fontSize: middleSection.textCommonStyle.fontSize,
                      color: middleSection.textCommonStyle.color,
                      fontFamily: middleSection.textCommonStyle.fontFamily,
                      margin: `${middleSection.textCommonStyle.margin}px 0`,
                      justifyContent: middleSection.textCommonStyle.textAlign,
                    }}
                  >
                    <div className="icon">
                      <i
                        className={section.icon}
                        style={{
                          ...section.iconStyle,
                          ...{
                            fontSize:
                              middleSection.iconCommonStyle.fontSize + "px",
                          },
                        }}
                      ></i>
                    </div>
                    <div className="text">
                      <RichText
                        allowedFormats={[]}
                        key="editable"
                        tagName="span"
                        placeholder={__("Add Some Text", "unlimited-blocks")}
                        value={section.text}
                        onChange={(e) => {
                          updateSlides(index_, e, "text");
                        }}
                      />
                    </div>
                  </div>
                  {middleSection.textCommonStyle.underLine.enable && (
                    <div
                      className="underline"
                      style={{
                        ...{
                          height:
                            middleSection.textCommonStyle.underLine.height +
                            "px",
                          width:
                            middleSection.textCommonStyle.underLine.width + "%",
                          backgroundColor:
                            middleSection.textCommonStyle.underLine.color,
                        },
                        ...{
                          margin:
                            middleSection.textCommonStyle.textAlign == "center"
                              ? "auto"
                              : null,
                        },
                      }}
                    ></div>
                  )}
                </>
              );
            })}
          </div>
        </div>
        <div className="pricing-table-bottom" style={footerBgColorStyle}>
          {pricePosition == "bottom" && (
            <div
              className={`price_ ${priceInline ? "inline_" : "box_"}`}
              style={priceStyle}
            >
              <div
                style={{ color: priceColor }}
                className={currencyFormate == "1" ? "rasied" : ""}
              >
                <p style={{ fontSize: currencyFs }}>{currencyC}</p>
                <p style={{ fontSize: priceFontSize + "px" }}>{priceMonth}</p>
              </div>
              <p
                style={{
                  fontSize: priceMonthPriceFs + "px",
                  color: priceMonthPriceColor,
                }}
              >
                {priceMonthPrice}
              </p>
            </div>
          )}
          <div className="link_button">
            <RichText
              allowedFormats={[]}
              key="editable"
              tagName="p"
              placeholder={__("Click Me", "unlimited-blocks")}
              value={linkContent.text}
              onChange={(e) => {
                let link = { ...linkContent };
                link["text"] = e;
                setAttributes({ linkContent: link });
              }}
              style={link_style}
            />
          </div>

          <RichText
            allowedFormats={[]}
            className="bottom-text"
            key="editable"
            tagName="p"
            placeholder={__("Price", "unlimited-blocks")}
            value={shortDescription.text}
            onChange={(e) => {
              let shortDesc = { ...shortDescription };
              shortDesc["text"] = e;
              setAttributes({ shortDescription: shortDesc });
            }}
            style={{
              color: shortDescription.color,
              fontSize: shortDescription.fontSize + "px",
              fontFamily: shortDescription.fontFamily,
              margin: `${shortDescription.topBottomSpace}px 0`,
            }}
          />
        </div>
      </div>,
    ];
  },
  save: (props) => {
    const {
      headerBackground,
      headingTxt,
      headingTag,
      headingFontSize,
      headingColor,
      headingFF,
      headingDescription,
      descriptionColor,
      descriptionFontSize,
      descriptionFF,
      middleSection,
      priceMonth,
      priceMonthPrice,
      priceMonthPriceFs,
      priceMonthPriceColor,
      pricePosition,
      priceFontSize,
      priceColor,
      priceBgColor,
      priceFF,
      priceInline,
      currencyFontWeight,
      priceBorder,
      priceBorderWidth,
      priceBorderRadius,
      priceBorderColor,
      priceSpace,
      priceSpaceV,
      priceSpaceH,
      currencyC,
      // currencyColor,
      currencyFs,
      currencyFormate,
      linkContent,
      shortDescription,
      footerBgColor,
      // container
      // containerBgColor,
      containerBorder,
      containerBorderWidth,
      containerBorderRadius,
      containerBorderColor,
    } = props.attributes;

    let containerBorderStyle = containerBorder
      ? {
          borderWidth: containerBorderWidth + "px",
          borderStyle: "solid",
          borderColor: containerBorderColor,
          borderRadius: containerBorderRadius + "px",
        }
      : {};
    // price style
    let priceStyle = {
      fontFamily: priceFF,
      fontWeight: currencyFontWeight,
    };
    // pricing bg color
    if (priceBgColor.type == "color") {
      priceStyle["backgroundColor"] = priceBgColor.color;
    } else if (priceBgColor.type == "gradient") {
      priceStyle["backgroundImage"] = priceBgColor.gradient;
    }
    if (priceBorder)
      priceStyle = {
        ...priceStyle,
        ...{
          borderWidth: priceBorderWidth + "px",
          borderRadius: priceBorderRadius + (!priceInline ? "%" : "px"),
          borderColor: priceBorderColor,
          borderStyle: "solid",
        },
      };
    if (!priceInline) {
      priceStyle = {
        ...priceStyle,
        ...{
          height: priceSpace + "px",
          width: priceSpace + "px",
        },
      };
    } else {
      priceStyle = {
        ...priceStyle,
        ...{
          paddingTop: priceSpaceV + "px",
          paddingBottom: priceSpaceV + "px",
          paddingLeft: priceSpaceH + "px",
          paddingRight: priceSpaceH + "px",
        },
      };
    }
    let link_style = {
      color: linkContent.color,
      fontSize: linkContent.fontSize + "px",
      width: linkContent.spaceH + "%",
      minHeight: linkContent.spaceV + "px",
    };
    link_style = linkContent.border.enable
      ? {
          ...{
            borderWidth: linkContent.border.width + "px",
            borderRadius: linkContent.border.radius + "px",
            borderStyle: "solid",
            borderColor: linkContent.border.color,
          },
          ...link_style,
        }
      : link_style;
    //link bg style
    if (linkContent.backgroundColor.type == "color") {
      link_style["backgroundColor"] = linkContent.backgroundColor.color;
    } else if (linkContent.backgroundColor.type == "gradient") {
      link_style["backgroundImage"] = linkContent.backgroundColor.gradient;
    }
    //header bg style
    let headerBgStyle = null;
    if (headerBackground.type == "color") {
      headerBgStyle = { backgroundColor: headerBackground.color };
    } else if (headerBackground.type == "gradient") {
      headerBgStyle = { backgroundImage: headerBackground.gradient };
    }
    //middle
    let middleBgColorStyle = null;
    if (middleSection.textCommonStyle.backgroundColor.type == "color") {
      middleBgColorStyle = {
        backgroundColor: middleSection.textCommonStyle.backgroundColor.color,
      };
    } else if (
      middleSection.textCommonStyle.backgroundColor.type == "gradient"
    ) {
      middleBgColorStyle = {
        backgroundImage: middleSection.textCommonStyle.backgroundColor.gradient,
      };
    }
    // footer style
    let footerBgColorStyle = null;
    if (footerBgColor.type == "color") {
      footerBgColorStyle = { backgroundColor: footerBgColor.color };
    } else if (footerBgColor.type == "gradient") {
      footerBgColorStyle = { backgroundImage: footerBgColor.gradient };
    }
    return (
      <div className="pricing-table-wrapper" style={containerBorderStyle}>
        <div className="pricing-table-top" style={headerBgStyle}>
          <RichText.Content
            tagName={headingTag}
            value={headingTxt}
            style={{
              fontSize: headingFontSize + "px",
              color: headingColor,
              fontFamily: headingFF,
            }}
          />
          {pricePosition == "top" && (
            <div
              className={`price_ ${priceInline ? "inline_" : "box_"}`}
              style={priceStyle}
            >
              <div
                style={{ color: priceColor }}
                className={currencyFormate == "1" ? "rasied" : ""}
              >
                <p style={{ fontSize: currencyFs }}>{currencyC}</p>
                <p style={{ fontSize: priceFontSize + "px" }}>{priceMonth}</p>
              </div>
              <p
                style={{
                  fontSize: priceMonthPriceFs + "px",
                  color: priceMonthPriceColor,
                }}
              >
                {priceMonthPrice}
              </p>
            </div>
          )}
          <RichText.Content
            tagName="p"
            style={{
              fontSize: descriptionFontSize + "px",
              color: descriptionColor,
              fontFamily: descriptionFF,
            }}
            value={headingDescription}
          />
        </div>
        <div className="pricing-table-middle" style={middleBgColorStyle}>
          {pricePosition == "middle" && (
            <div
              className={`price_ ${priceInline ? "inline_" : "box_"}`}
              style={priceStyle}
            >
              <div
                style={{ color: priceColor }}
                className={currencyFormate == "1" ? "rasied" : ""}
              >
                <p style={{ fontSize: currencyFs }}>{currencyC}</p>
                <p style={{ fontSize: priceFontSize + "px" }}>{priceMonth}</p>
              </div>
              <p
                style={{
                  fontSize: priceMonthPriceFs + "px",
                  color: priceMonthPriceColor,
                }}
              >
                {priceMonthPrice}
              </p>
            </div>
          )}
          <div className="middle-sections">
            {middleSection.sections.map((section, index_) => {
              return (
                <>
                  <div
                    style={{
                      fontSize: middleSection.textCommonStyle.fontSize,
                      color: middleSection.textCommonStyle.color,
                      fontFamily: middleSection.textCommonStyle.fontFamily,
                      margin: `${middleSection.textCommonStyle.margin}px 0`,
                      justifyContent: middleSection.textCommonStyle.textAlign,
                    }}
                  >
                    <div className="icon">
                      <i
                        className={section.icon}
                        style={{
                          ...section.iconStyle,
                          ...{
                            fontSize:
                              middleSection.iconCommonStyle.fontSize + "px",
                          },
                        }}
                      ></i>
                    </div>
                    <div className="text">
                      <RichText.Content tagName="span" value={section.text} />
                    </div>
                  </div>
                  {middleSection.textCommonStyle.underLine.enable && (
                    <div
                      className="underline"
                      style={{
                        ...{
                          height:
                            middleSection.textCommonStyle.underLine.height +
                            "px",
                          width:
                            middleSection.textCommonStyle.underLine.width + "%",
                          backgroundColor:
                            middleSection.textCommonStyle.underLine.color,
                        },
                        ...{
                          margin:
                            middleSection.textCommonStyle.textAlign == "center"
                              ? "auto"
                              : null,
                        },
                      }}
                    ></div>
                  )}
                </>
              );
            })}
          </div>
        </div>
        <div className="pricing-table-bottom" style={footerBgColorStyle}>
          {pricePosition == "bottom" && (
            <div
              className={`price_ ${priceInline ? "inline_" : "box_"}`}
              style={priceStyle}
            >
              <div
                style={{ color: priceColor }}
                className={currencyFormate == "1" ? "rasied" : ""}
              >
                <p style={{ fontSize: currencyFs }}>{currencyC}</p>
                <p style={{ fontSize: priceFontSize + "px" }}>{priceMonth}</p>
              </div>
              <p
                style={{
                  fontSize: priceMonthPriceFs + "px",
                  color: priceMonthPriceColor,
                }}
              >
                {priceMonthPrice}
              </p>
            </div>
          )}
          <div className="link_button">
            <a
              target={linkContent.linkUrl.target ? "_blank" : null}
              rel={linkContent.linkUrl.target ? "noopener noreferrer" : null}
              href={linkContent.linkUrl.link}
            >
              <RichText.Content
                tagName="p"
                value={linkContent.text}
                style={link_style}
              />
            </a>
          </div>
          <RichText.Content
            className="bottom-text"
            tagName="p"
            value={shortDescription.text}
            style={{
              color: shortDescription.color,
              fontSize: shortDescription.fontSize + "px",
              fontFamily: shortDescription.fontFamily,
              margin: `${shortDescription.topBottomSpace}px 0`,
            }}
          />
        </div>
      </div>
    );
  },
});
