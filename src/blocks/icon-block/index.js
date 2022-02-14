import "./editor.scss";
import icons_ from "../block-assets/icons";
import { registerBlockType } from "@wordpress/blocks";
import {
  RichText,
  InspectorControls,
  ColorPalette,
  AlignmentToolbar,
  BlockControls,
} from "@wordpress/block-editor";
import { useState, useRef, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  RangeControl,
  ToggleControl,
  SelectControl,
  // Toolbar,
  // ToolbarItem,
  // Button,
  // ResizableBox,
  // ResponsiveWrapper
} from "@wordpress/components";
import fontFamily from "../block-assets/font-family";
import BackgroundColor from "../block-assets/utility-components/backgroundType/backgroundColor";

import { blocksDetail } from "../block-assets/blocks-detail";
const { icon_block } = blocksDetail;
registerBlockType("unlimited-blocks/icon-block", {
  title: icon_block.title,
  description: icon_block.description,
  icon: icon_block.icon,
  keywords: icon_block.keywords,
  category: "unlimited-blocks-category",
  attributes: {
    iconClass: {
      type: "string",
      default: "fab fa-wordpress-simple",
    },
    iconColor: {
      type: "string",
      default: "#0693e3",
    },
    iconBgColor: {
      type: "object",
      default: {
        type: "color",
        color: "#EEF6F9",
        gradient:
          "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
      },
    },
    titleColor: {
      type: "string",
      default: "#0693e3",
    },
    iconFontsize: {
      type: "number",
      default: 55,
    },
    titleFontsize: {
      type: "number",
      default: 24,
    },
    titleTxt: {
      type: "string",
      default: __("Icon Title", "unlimited-blocks"),
    },
    titleArrenge: {
      type: "string",
      default: "column",
    },
    itemAlign: {
      type: "text",
      default: "center",
    },
    titleMarginTop: {
      type: "number",
      defalut: 18,
    },
    titleMarginRight: {
      type: "number",
      default: 0,
    },
    titleMarginBottom: {
      type: "number",
      default: 0,
    },
    titleMarginLeft: {
      type: "number",
      default: 11,
    },
    titleOnOff: {
      type: "boolean",
      default: true,
    },
    iconPaddingTop: {
      type: "number",
      default: 16,
    },
    iconPaddingRight: {
      type: "number",
      default: 20,
    },
    titleTag: {
      type: "string",
      default: "p",
    },
    titleFF: {
      type: "string",
      default: "Ubuntu Mono",
    },
    // icon border
    iconBorder: {
      type: "boolean",
      default: false,
    },
    iconBorderWidth: {
      type: "number",
      default: 2,
    },
    iconBorderRadius: {
      type: "number",
      default: 50,
    },
    iconBorderColor: {
      type: "string",
      default: "#ffa600",
    },
    // icon border
    iconSpace: {
      type: "number",
      default: 79,
    },
    containerBorder: {
      type: "object",
      default: {
        enable: true,
        type: "solid",
        color: "yellow",
        width: 1,
        radius: 0,
      },
    },
  },
  example: () => {},
  edit: ({ attributes, setAttributes }) => {
    const {
      iconClass,
      iconColor,
      iconBgColor,
      titleColor,
      iconFontsize,
      titleFF,
      titleFontsize,
      titleMarginTop,
      titleMarginRight,
      titleMarginBottom,
      titleMarginLeft,
      titleTxt,
      titleArrenge,
      itemAlign,
      titleOnOff,
      iconPaddingTop,
      iconPaddingRight,
      titleTag,
      iconBorder,
      iconBorderWidth,
      iconBorderRadius,
      iconBorderColor,
      iconSpace,
      containerBorder,
    } = attributes;

    let borderStyle = iconBorder
      ? {
          borderWidth: iconBorderWidth + "px",
          borderStyle: "solid",
          borderColor: iconBorderColor,
          borderRadius: iconBorderRadius + "%",
          width: iconSpace + "px",
          height: iconSpace + "px",
        }
      : null;

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
    const [activeFamilyContainer2, activeFamilyDrop2] = useState(false);
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
    // icon container style backgroundColor
    let containerStyleBgColor = {
      "flex-direction": titleArrenge,
      paddingTop: iconPaddingTop + "px",
      paddingRight: iconPaddingRight + "px",
      paddingBottom: iconPaddingTop + "px",
      paddingLeft: iconPaddingRight + "px",
    };
    //icon container border
    if (containerBorder.enable) {
      containerStyleBgColor[
        "border"
      ] = `${containerBorder.width}px ${containerBorder.type} ${containerBorder.color}`;
      containerStyleBgColor["border-radius"] = containerBorder.radius + "px";
    }
    // bg color solid or gradient
    let bgColorOrGRadient = {};
    if (iconBgColor.type == "color") {
      bgColorOrGRadient = { backgroundColor: iconBgColor.color };
    } else {
      bgColorOrGRadient = { backgroundImage: iconBgColor.gradient };
    }
    containerStyleBgColor = {
      ...containerStyleBgColor,
      ...bgColorOrGRadient,
    };
    return (
      <>
        <InspectorControls>
          <PanelBody
            title={__("Icon Setting", "unlimited-blocks")}
            initialOpen={false}
          >
            <p>
              <strong>{__("Choose Icon", "unlimited-blocks")}</strong>
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
                  // let set__container = !activeIconContainer;
                  activeIconContainerSet(true);
                }}
              >
                <i className={iconClass}></i>
                <div className="search-container">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    onChange={(e) => {
                      let value_ = e.target.value;
                      if (value_ != "") {
                        let newAr = icons_.filter(
                          (checkStr) => checkStr.search(value_) != -1
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
                  setAttributes({ iconClass: e.target.value });
                }}
              >
                {iconList.map((iconValue) => {
                  return (
                    <div className="wpgt-radio-wrapper">
                      <input
                        id={"wpgt-Radio-" + iconValue}
                        type="radio"
                        name="wpgt-choose-icon"
                        className="radio-input"
                        value={iconValue}
                      />
                      <label htmlFor={"wpgt-Radio-" + iconValue}>
                        <i className={iconValue}></i>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <p>
              <strong>{__("Icon Position", "unlimited-blocks")}</strong>
            </p>
            <SelectControl
              value={titleArrenge} // e.g: value = [ 'a', 'c' ]
              onChange={(e) => {
                setAttributes({
                  titleArrenge: e,
                  titleMarginTop: 0,
                  titleMarginRight: 0,
                  titleMarginBottom: 0,
                  titleMarginLeft: 0,
                });
              }}
              options={[
                { value: null, label: "Select a User", disabled: true },
                { value: "unset", label: "Left" },
                { value: "row-reverse", label: "Right" },
                { value: "column", label: "Top" },
                { value: "column-reverse", label: "Bottom" },
              ]}
            />
            <p>
              <strong>
                {__("Space Between Icon and Title", "unlimited-blocks")}
              </strong>
            </p>
            {titleArrenge == "column" && (
              <RangeControl
                label={__("Top", "unlimited-blocks")}
                value={titleMarginTop}
                min={0}
                max={200}
                onChange={(e) => setAttributes({ titleMarginTop: e })}
              />
            )}
            {titleArrenge == "row-reverse" && (
              <RangeControl
                label={__("Right", "unlimited-blocks")}
                value={titleMarginRight}
                min={0}
                max={200}
                onChange={(e) => setAttributes({ titleMarginRight: e })}
              />
            )}
            {titleArrenge == "column-reverse" && (
              <RangeControl
                label={__("Bottom", "unlimited-blocks")}
                value={titleMarginBottom}
                min={0}
                max={200}
                onChange={(e) => setAttributes({ titleMarginBottom: e })}
              />
            )}
            {titleArrenge == "unset" && (
              <RangeControl
                label={__("Left", "unlimited-blocks")}
                value={titleMarginLeft}
                min={0}
                max={200}
                onChange={(e) => setAttributes({ titleMarginLeft: e })}
              />
            )}

            <p>
              <strong>{__("Font Size", "unlimited-blocks")}</strong>
            </p>
            <RangeControl
              value={iconFontsize}
              min={0}
              max={100}
              onChange={(e) => setAttributes({ iconFontsize: e })}
            />
            <p>
              <strong>{__("Border", "unlimited-blocks")}</strong>
            </p>
            <ToggleControl
              label={
                iconBorder
                  ? __("Disable", "unlimited-blocks")
                  : __("Enable", "unlimited-blocks")
              }
              checked={iconBorder}
              onChange={(e) => setAttributes({ iconBorder: e })}
            />
            {iconBorder && (
              <>
                <div className="icon-border-setting">
                  <RangeControl
                    label={__("Border Width", "unlimited-blocks")}
                    value={iconBorderWidth}
                    min={0}
                    max={100}
                    onChange={(e) => setAttributes({ iconBorderWidth: e })}
                  />
                  <RangeControl
                    label={__("Border Radius", "unlimited-blocks")}
                    value={iconBorderRadius}
                    min={0}
                    max={50}
                    onChange={(e) => setAttributes({ iconBorderRadius: e })}
                  />
                  <p>{__("Border Color", "unlimited-blocks")}</p>
                  <ColorPalette
                    onChange={(color) =>
                      setAttributes({ iconBorderColor: color })
                    }
                  />
                  <RangeControl
                    label={__("Icon Space", "unlimited-blocks")}
                    value={iconSpace}
                    min={0}
                    max={200}
                    onChange={(e) => setAttributes({ iconSpace: e })}
                  />
                </div>
              </>
            )}
          </PanelBody>
          <PanelBody
            title={__("Title Setting", "unlimited-blocks")}
            initialOpen={false}
          >
            <ToggleControl
              label={
                titleOnOff
                  ? __("Hide", "unlimited-blocks")
                  : __("Show", "unlimited-blocks")
              }
              checked={titleOnOff}
              onChange={(e) => setAttributes({ titleOnOff: e })}
            />
            <p>
              <strong>{__("Choose Tag", "unlimited-blocks")}</strong>
            </p>
            <SelectControl
              value={titleTag} // e.g: value = [ 'a', 'c' ]
              onChange={(e) => setAttributes({ titleTag: e })}
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
            <p>
              <strong>{__("Font Size", "unlimited-blocks")}</strong>
            </p>
            <RangeControl
              value={titleFontsize}
              min={0}
              max={100}
              onChange={(e) => setAttributes({ titleFontsize: e })}
            />
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
                  <span style={{ fontFamily: titleFF }}>
                    {titleFF
                      ? titleFF
                      : __("Choose Family", "unlimited-blocks")}
                  </span>
                </div>
                <div className="family-items">
                  {fontFamily.map((family, key_) => {
                    return (
                      <span
                        onClick={() => setAttributes({ titleFF: family })}
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
          </PanelBody>
          <PanelBody
            title={__("Color Setting", "unlimited-blocks")}
            initialOpen={false}
          >
            <BackgroundColor
              value={{
                backgroundColorType: iconBgColor.type,
                backgroundColor: iconBgColor.color,
                backgroundImageGradient: iconBgColor.gradient,
              }}
              changeme={(_properties) => {
                let saveObj = {
                  type: _properties.backgroundColorType,
                  color: _properties.backgroundColor,
                  gradient: _properties.backgroundImageGradient,
                };
                setAttributes({ iconBgColor: saveObj });
              }}
            />

            <p>
              <strong>{__("Icon Color", "unlimited-blocks")}</strong>
            </p>
            <ColorPalette
              onChange={(color) => setAttributes({ iconColor: color })}
            />
            <p>
              <strong>{__("Title Color", "unlimited-blocks")}</strong>
            </p>
            <ColorPalette onChange={(e) => setAttributes({ titleColor: e })} />
          </PanelBody>

          <PanelBody
            title={__("Container Setting", "unlimited-blocks")}
            initialOpen={false}
          >
            <p>
              <strong>{__("Padding", "unlimited-blocks")}</strong>
            </p>
            <RangeControl
              label={__("Top & Bottom", "unlimited-blocks")}
              value={iconPaddingTop}
              min={0}
              max={200}
              onChange={(e) => setAttributes({ iconPaddingTop: e })}
            />
            <RangeControl
              label={__("Left & Right", "unlimited-blocks")}
              value={iconPaddingRight}
              min={0}
              max={200}
              onChange={(e) => setAttributes({ iconPaddingRight: e })}
            />
            <p>
              <strong>{__("Border", "unlimited-blocks")}</strong>
            </p>
            <ToggleControl
              label={
                containerBorder.enable
                  ? __("Disable", "unlimited-blocks")
                  : __("Enable", "unlimited-blocks")
              }
              checked={containerBorder.enable}
              onChange={(e) => {
                let settingBrder = { ...containerBorder };
                settingBrder["enable"] = e;
                setAttributes({ containerBorder: settingBrder });
              }}
            />
            {containerBorder.enable && (
              <div className="icon-border-setting">
                <div className="ubl-multiple-select">
                  <SelectControl
                    label={__("Border Style", "unlimited-blocks")}
                    value={containerBorder.type}
                    onChange={(choosen) => {
                      let settingBrder = { ...containerBorder };
                      settingBrder["type"] = choosen;
                      setAttributes({ containerBorder: settingBrder });
                    }}
                    options={[
                      {
                        value: "solid",
                        label: __("Solid", "unlimited-blocks"),
                      },
                      {
                        value: "dotted",
                        label: __("Dotted", "unlimited-blocks"),
                      },
                      {
                        value: "dashed",
                        label: __("Dashed", "unlimited-blocks"),
                      },
                    ]}
                  />
                </div>
                <RangeControl
                  label={__("Border Radius", "unlimited-blocks")}
                  value={containerBorder.redius}
                  min={0}
                  max={50}
                  onChange={(e) => {
                    let settingBrder = { ...containerBorder };
                    settingBrder["radius"] = e;
                    setAttributes({ containerBorder: settingBrder });
                  }}
                />
                <RangeControl
                  label={__("Border Width", "unlimited-blocks")}
                  value={containerBorder.width}
                  min={0}
                  max={100}
                  onChange={(e) => {
                    let settingBrder = { ...containerBorder };
                    settingBrder["width"] = e;
                    setAttributes({ containerBorder: settingBrder });
                  }}
                />
                <ColorPalette
                  label={__("Border Color", "unlimited-blocks")}
                  value={containerBorder.color}
                  onChange={(color) => {
                    let settingBrder = { ...containerBorder };
                    settingBrder["color"] = color;
                    setAttributes({ containerBorder: settingBrder });
                  }}
                />
              </div>
            )}
          </PanelBody>
        </InspectorControls>
        <>
          <BlockControls>
            <AlignmentToolbar
              value={itemAlign}
              onChange={(e) => {
                let side =
                  e == "left" ? "left" : e == "right" ? "flex-end" : "center";
                setAttributes({ itemAlign: side });
              }}
            />
          </BlockControls>
          <div
            className="themehunk-icon-block"
            style={{
              "justify-content": itemAlign,
            }}
          >
            <div style={containerStyleBgColor}>
              <div className="icon-container" style={borderStyle}>
                <i
                  style={{
                    color: iconColor,
                    fontSize: iconFontsize + "px",
                  }}
                  className={iconClass}
                ></i>
              </div>
              {titleOnOff && (
                <div className="text-container">
                  <RichText
                    key="editable"
                    tagName={titleTag}
                    placeholder="Icon Title"
                    allowedFormats={[]}
                    value={titleTxt}
                    onChange={(e) => setAttributes({ titleTxt: e })}
                    style={{
                      color: titleColor,
                      fontSize: titleFontsize + "px",
                      marginTop: titleMarginTop + "px",
                      marginRight: titleMarginRight + "px",
                      marginBottom: titleMarginBottom + "px",
                      marginLeft: titleMarginLeft + "px",
                      fontFamily: titleFF,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      </>
    );
  },
  save: ({ attributes }) => {
    const {
      iconClass,
      iconColor,
      iconBgColor,
      titleColor,
      iconFontsize,
      titleFontsize,
      titleMarginTop,
      titleMarginRight,
      titleMarginBottom,
      titleMarginLeft,
      titleTxt,
      titleArrenge,
      titleFF,
      itemAlign,
      titleOnOff,
      titleTag,
      iconBorder,
      iconBorderWidth,
      iconBorderRadius,
      iconBorderColor,
      iconSpace,
      iconPaddingTop,
      iconPaddingRight,
      containerBorder,
    } = attributes;
    let borderStyle = iconBorder
      ? {
          borderWidth: iconBorderWidth + "px",
          borderStyle: "solid",
          borderColor: iconBorderColor,
          borderRadius: iconBorderRadius + "%",
          width: iconSpace + "px",
          height: iconSpace + "px",
        }
      : null;
    // icon container style backgroundColor
    let containerStyleBgColor = {
      "flex-direction": titleArrenge,
      paddingTop: iconPaddingTop + "px",
      paddingRight: iconPaddingRight + "px",
      paddingBottom: iconPaddingTop + "px",
      paddingLeft: iconPaddingRight + "px",
    };
    //icon container border
    if (containerBorder.enable) {
      containerStyleBgColor[
        "border"
      ] = `${containerBorder.width}px ${containerBorder.type} ${containerBorder.color}`;
      containerStyleBgColor["border-radius"] = containerBorder.radius + "px";
    }
    // bg color solid or gradient
    let bgColorOrGRadient = {};
    if (iconBgColor.type == "color") {
      bgColorOrGRadient = { backgroundColor: iconBgColor.color };
    } else {
      bgColorOrGRadient = { backgroundImage: iconBgColor.gradient };
    }
    containerStyleBgColor = {
      ...containerStyleBgColor,
      ...bgColorOrGRadient,
    };
    return (
      <div
        className="themehunk-icon-block"
        style={{
          "justify-content": itemAlign,
        }}
      >
        <div style={containerStyleBgColor}>
          <div className="icon-container" style={borderStyle}>
            <i
              style={{
                color: iconColor,
                fontSize: iconFontsize + "px",
              }}
              className={iconClass}
            ></i>
          </div>
          {titleOnOff && (
            <div className="text-container">
              <RichText.Content
                tagName={titleTag}
                value={titleTxt}
                style={{
                  color: titleColor,
                  fontSize: titleFontsize + "px",
                  marginTop: titleMarginTop + "px",
                  marginRight: titleMarginRight + "px",
                  marginBottom: titleMarginBottom + "px",
                  marginLeft: titleMarginLeft + "px",
                  fontFamily: titleFF,
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  },
});
