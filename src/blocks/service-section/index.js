// import "./parent";
import icons_ from "../block-assets/icons";
import "./editor.scss";
import fontFamily from "../block-assets/font-family";

import { registerBlockType } from "@wordpress/blocks";
import {
  RichText,
  InspectorControls,
  ColorPalette,
  MediaUpload,
  __experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { useState, useRef, useEffect } from "@wordpress/element";
import {
  PanelBody,
  RangeControl,
  ToggleControl,
  ColorPicker,
  __experimentalGradientPicker as GradientPicker,
} from "@wordpress/components";
import { UBLGraDientColors } from "../block-assets/post-functions";
import { __ } from "@wordpress/i18n";

const attrSave = {
  image: {
    type: "string",
    default: "icon",
  },
  imageStyle: {
    type: "object",
    default: {
      padding: 0,
      width: 30,
      border: false,
      borderRadius: 0,
      borderType: "solid",
      borderColor: "yellow",
      borderWidth: 1,
      imgUrl: plugin_url.url + "assets/img/image2.jpg",
      imageLink: {
        keepUrl: false,
        link: "#",
        target: false,
      },
    },
  },
  title: {
    type: "object",
    default: {
      value: __("Add Title", "unlimited-blocks"),
      url: { keepUrl: false, url: "", target: "" },
      style: {
        fontSize: 21,
        color: "#ffa600",
        fontFamily: "",
        fontWeight: 600,
      },
    },
  },
  description: {
    type: "object",
    default: {
      value: __("Add Service Description", "unlimited-blocks"),
      style: { fontSize: 21, color: "", fontFamily: "" },
    },
  },
  containerBgColor: {
    type: "object",
    default: {
      type: "color",
      color: "#EEF6F9",
      gradient: "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
    },
  },
  containerBorder: {
    type: "boolean",
    default: false,
  },
  containerBorderWidth: {
    type: "number",
    default: 2,
  },
  containerBorderRadius: {
    type: "number",
    default: 3,
  },
  containerBorderColor: {
    type: "string",
    default: "black",
  },
  //   icon
  iconClass: {
    type: "string",
    default: "fas fa-coffee",
  },
  //////----------------
  iconStyle: {
    type: "object",
    default: {
      fontSize: 40,
      color: "#ffa600",
      width: 79,
      backgroundColor: {
        type: "color",
        color: "#EEF6F9",
        gradient:
          "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
      },
    },
  },
  iconBorder: {
    type: "object",
    default: {
      border: true,
      color: "#ffa600",
      width: 2,
      radius: 50,
    },
  },
  imageBorder: {
    type: "object",
    default: {
      border: true,
      color: "#ffa600",
      width: 2,
      radius: 5,
    },
  },
};
import { blocksDetail } from "../block-assets/blocks-detail";
const { service_section } = blocksDetail;
registerBlockType("unlimited-blocks/icon-image-content", {
  title: service_section.title,
  description: service_section.description,
  icon: service_section.icon,
  keywords: service_section.keywords,
  category: "unlimited-blocks-category",
  getEditWrapperProps(attributes) {},
  attributes: attrSave,
  example: () => {},
  edit: (props) => {
    // console.log("props", props);
    const { attributes, setAttributes } = props;
    const {
      image,
      imageStyle,
      title,
      description,
      containerBgColor,
      containerBorder,
      containerBorderWidth,
      containerBorderRadius,
      containerBorderColor,
      //icon
      iconStyle,
      iconBorder,
      //icon
      iconClass,
    } = attributes;

    //icon border
    let borderStyle = iconBorder.border
      ? {
          borderWidth: iconBorder.width + "px",
          borderStyle: "solid",
          borderColor: iconBorder.color,
          borderRadius: iconBorder.radius + "%",
          width: iconStyle.width + "px",
          height: iconStyle.width + "px",
        }
      : {};
    if (iconStyle.backgroundColor.type == "color") {
      borderStyle["backgroundColor"] = iconStyle.backgroundColor.color;
    } else if (iconStyle.backgroundColor.type == "gradient") {
      borderStyle["backgroundImage"] = iconStyle.backgroundColor.gradient;
    }

    let customImgStyle = {
      width: imageStyle.width + "%",
      padding: imageStyle.padding + "px",
    };
    if (imageStyle.border) {
      customImgStyle = {
        ...customImgStyle,
        ...{
          borderRadius: imageStyle.borderRadius + "px",
          borderWidth: imageStyle.borderWidth + "px",
          borderColor: imageStyle.borderColor,
          borderStyle: imageStyle.borderType,
        },
      };
    }
    let containerBorderStyle = containerBorder
      ? {
          borderWidth: containerBorderWidth + "px",
          borderStyle: "solid",
          borderColor: containerBorderColor,
          borderRadius: containerBorderRadius + "px",
        }
      : {};
    // if(containerBgColor)
    if (containerBgColor.type == "color") {
      containerBorderStyle["backgroundColor"] = containerBgColor.color;
    } else if (containerBgColor.type == "gradient") {
      containerBorderStyle["backgroundImage"] = containerBgColor.gradient;
    }
    const [activeIconContainer, activeIconContainerSet] = useState(false);
    const [iconList, setIconList] = useState(icons_);
    const [titleDescription, setTitleDescription] = useState("title");
    const [contentORborder, setcontentORborder] = useState("content");
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

    const [activeFamilyContainer, activeFamilyDrop] = useState(false);
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

    return [
      <InspectorControls>
        <PanelBody
          title={__("Image and Icon Setting", "unlimited-blocks")}
          initialOpen={false}
        >
          <div className="flex-section">
            <p>{__("Image and Icon", "unlimited-blocks")}</p>
            <select
              value={image}
              onChange={(e) => {
                setAttributes({ image: e.target.value });
              }}
            >
              <option value="icon">{__("Icon", "unlimited-blocks")}</option>
              <option value="image">{__("Image", "unlimited-blocks")}</option>
            </select>
          </div>
          {/* content or border  */}
          <div class="ubl-switcher-button-section">
            <span
              onClick={() => {
                setcontentORborder("content");
              }}
              className={contentORborder == "content" ? "selected" : ""}
            >
              {__("Content", "unlimited-blocks")}
            </span>
            <span
              onClick={() => {
                setcontentORborder("border");
              }}
              className={contentORborder == "border" ? "selected" : ""}
            >
              {__("Border", "unlimited-blocks")}
            </span>
          </div>
          {/* content or border  */}
          {image == "image" && (
            <div className="service-image-setting">
              {contentORborder == "content" ? (
                <>
                  <p>
                    <strong>
                      {__("Background image", "unlimited-blocks")}
                    </strong>
                  </p>
                  <MediaUpload
                    allowedType="image"
                    onSelect={(newImage) => {
                      let image = { ...imageStyle };
                      image["imgUrl"] = newImage.sizes.full.url;
                      setAttributes({ imageStyle: image });
                    }}
                    value={imageStyle.imgUrl}
                    render={({ open }) => (
                      <div
                        onClick={open}
                        className={`ubl-block-image-uploader ${
                          !imageStyle.imgUrl ? "blank" : ""
                        }`}
                      >
                        <div>
                          <i className="fas fa-plus"></i>
                        </div>
                        {imageStyle.imgUrl ? (
                          <img src={imageStyle.imgUrl} />
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  />
                  <p>
                    <strong>{__("Image Link", "unlimited-blocks")}</strong>
                  </p>
                  <ToggleControl
                    label={
                      imageStyle.imageLink.keepUrl
                        ? __("Disable", "unlimited-blocks")
                        : __("Enable", "unlimited-blocks")
                    }
                    checked={imageStyle.imageLink.keepUrl}
                    onChange={(e) => {
                      let image = { ...imageStyle };
                      image.imageLink.keepUrl = e;
                      setAttributes({ imageStyle: image });
                    }}
                  />
                  {imageStyle.imageLink.keepUrl && (
                    <div className="ubl-blocks-linkbtn">
                      <LinkControl
                        value={{
                          url: imageStyle.imageLink.link,
                          opensInNewTab: imageStyle.imageLink.target,
                        }}
                        onChange={(vall) => {
                          if ("url" in vall) {
                            let image = { ...imageStyle };
                            image.imageLink.link = vall.url;
                            setAttributes({ imageStyle: image });
                          }
                          //target
                          if ("opensInNewTab" in vall) {
                            let image = { ...imageStyle };
                            image.imageLink.target = vall.opensInNewTab;
                            setAttributes({ imageStyle: image });
                          }
                        }}
                      />
                    </div>
                  )}
                  <RangeControl
                    label={__("Width", "unlimited-blocks")}
                    value={imageStyle.width}
                    min={0}
                    max={100}
                    onChange={(e) => {
                      let image = { ...imageStyle };
                      image["width"] = e;
                      setAttributes({ imageStyle: image });
                    }}
                  />
                  <RangeControl
                    label={__("Padding", "unlimited-blocks")}
                    value={imageStyle.padding}
                    min={0}
                    max={100}
                    onChange={(e) => {
                      let image = { ...imageStyle };
                      image["padding"] = e;
                      setAttributes({ imageStyle: image });
                    }}
                  />
                </>
              ) : (
                <>
                  <ToggleControl
                    label={
                      imageStyle.border
                        ? __("Disable", "unlimited-blocks")
                        : __("Enable", "unlimited-blocks")
                    }
                    checked={imageStyle.border}
                    onChange={(e) => {
                      let border = { ...imageStyle };
                      border["border"] = e;
                      setAttributes({ imageStyle: border });
                    }}
                  />
                  {imageStyle.border && (
                    <div className="icon-border-setting">
                      <RangeControl
                        label={__("Border Width", "unlimited-blocks")}
                        value={imageStyle.borderWidth}
                        min={0}
                        max={100}
                        onChange={(e) => {
                          let border = { ...imageStyle };
                          border["borderWidth"] = e;
                          setAttributes({ imageStyle: border });
                        }}
                      />
                      <RangeControl
                        label={__("Border Radius", "unlimited-blocks")}
                        value={imageStyle.borderRadius}
                        min={0}
                        max={50}
                        onChange={(e) => {
                          let border = { ...imageStyle };
                          border["borderRadius"] = e;
                          setAttributes({ imageStyle: border });
                        }}
                      />
                      <label className="normal-label">
                        {__("Border Color", "unlimited-blocks")}
                      </label>
                      <ColorPalette
                        value={imageStyle.borderColor}
                        onChange={(color) => {
                          let border = { ...imageStyle };
                          border["borderColor"] = color;
                          setAttributes({ imageStyle: border });
                        }}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          {image == "icon" && (
            <div className="service-icon-setting">
              {contentORborder == "content" ? (
                <>
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
                  <label className="normal-label">
                    {__("Font Size", "unlimited-blocks")}
                  </label>
                  <RangeControl
                    value={iconStyle.fontSize}
                    min={0}
                    max={100}
                    onChange={(e) => {
                      let iconStyle_ = { ...iconStyle };
                      iconStyle_["fontSize"] = e;
                      setAttributes({ iconStyle: iconStyle_ });
                    }}
                  />
                  <label className="normal-label">
                    {__("Color", "unlimited-blocks")}
                  </label>
                  <ColorPalette
                    onChange={(color) => {
                      let iconStyle_ = { ...iconStyle };
                      iconStyle_["color"] = color;
                      setAttributes({ iconStyle: iconStyle_ });
                    }}
                  />
                  <label className="normal-label">
                    {__("Background Color", "unlimited-blocks")}
                  </label>
                  {/* bg color  */}
                  <div class="ubl-switcher-button-section sub">
                    <span
                      onClick={() => {
                        let getBgcolor = { ...iconStyle };
                        getBgcolor.backgroundColor.type = "color";
                        setAttributes({ iconStyle: getBgcolor });
                      }}
                      className={
                        iconStyle.backgroundColor.type == "color"
                          ? "selected"
                          : ""
                      }
                    >
                      {__("Solid", "unlimited-blocks")}
                    </span>
                    <span
                      onClick={() => {
                        let getBgcolor = { ...iconStyle };
                        getBgcolor.backgroundColor.type = "gradient";
                        setAttributes({ iconStyle: getBgcolor });
                      }}
                      className={
                        iconStyle.backgroundColor.type == "gradient"
                          ? "selected"
                          : ""
                      }
                    >
                      {__("Gradient", "unlimited-blocks")}
                    </span>
                  </div>
                  {"color" == iconStyle.backgroundColor.type ? (
                    <ColorPicker
                      color={iconStyle.backgroundColor.color}
                      onChangeComplete={(colorBg) => {
                        let color = `rgba(${colorBg.rgb.r},${colorBg.rgb.g},${colorBg.rgb.b},${colorBg.rgb.a})`;
                        let getBgcolor = { ...iconStyle };
                        getBgcolor.backgroundColor.color = color;
                        setAttributes({ iconStyle: getBgcolor });
                      }}
                    />
                  ) : (
                    <GradientPicker
                      disableCustomGradients={false}
                      value={iconStyle.backgroundColor.gradient}
                      gradients={UBLGraDientColors}
                      onChange={(newGradient) => {
                        let getBgcolor = { ...iconStyle };
                        getBgcolor.backgroundColor.gradient = newGradient;
                        setAttributes({ iconStyle: getBgcolor });
                      }}
                    />
                  )}
                </>
              ) : (
                <>
                  <ToggleControl
                    label={
                      iconBorder.border
                        ? __("Disable", "unlimited-blocks")
                        : __("Enable", "unlimited-blocks")
                    }
                    checked={iconBorder.border}
                    onChange={(e) => {
                      let border = { ...iconBorder };
                      border["border"] = e;
                      setAttributes({ iconBorder: border });
                    }}
                  />
                  {iconBorder.border && (
                    <div className="icon-border-setting">
                      <RangeControl
                        label={__("Icon Space", "unlimited-blocks")}
                        value={iconStyle.width}
                        min={0}
                        max={200}
                        onChange={(e) => {
                          let iconStyle_ = { ...iconStyle };
                          iconStyle_["width"] = e;
                          setAttributes({ iconStyle: iconStyle_ });
                        }}
                      />
                      <RangeControl
                        label={__("Border Width", "unlimited-blocks")}
                        value={iconBorder.width}
                        min={0}
                        max={100}
                        onChange={(e) => {
                          let border = { ...iconBorder };
                          border["width"] = e;
                          setAttributes({ iconBorder: border });
                        }}
                      />
                      <RangeControl
                        label={__("Border Radius", "unlimited-blocks")}
                        value={iconBorder.radius}
                        min={0}
                        max={50}
                        onChange={(e) => {
                          let border = { ...iconBorder };
                          border["radius"] = e;
                          setAttributes({ iconBorder: border });
                        }}
                      />
                      <label className="normal-label">
                        {__("Border Color", "unlimited-blocks")}
                      </label>
                      <ColorPalette
                        value={iconBorder.color}
                        onChange={(color) => {
                          let border = { ...iconBorder };
                          border["color"] = color;
                          setAttributes({ iconBorder: border });
                        }}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </PanelBody>

        <PanelBody
          title={__("Title / Description Settings", "unlimited-blocks")}
          initialOpen={false}
        >
          {/* title description  */}
          <div class="ubl-switcher-button-section">
            <span
              onClick={() => {
                setTitleDescription("title");
              }}
              className={titleDescription == "title" ? "selected" : ""}
            >
              {__("Title", "unlimited-blocks")}
            </span>
            <span
              onClick={() => {
                setTitleDescription("description");
              }}
              className={titleDescription == "description" ? "selected" : ""}
            >
              {__("Description", "unlimited-blocks")}
            </span>
          </div>
          {/* title description  */}
          {titleDescription == "title" ? (
            <>
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
                    <span style={{ fontFamily: title.style.fontFamily }}>
                      {title.style.fontFamily
                        ? title.style.fontFamily
                        : __("Choose Family", "unlimited-blocks")}
                    </span>
                  </div>
                  <div className="family-items">
                    {fontFamily.map((family, key_) => {
                      return (
                        <span
                          onClick={() => {
                            let title_ = { ...title };
                            title_.style.fontFamily = family;
                            setAttributes({ title: title_ });
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
                label={__("Font Size", "unlimited-blocks")}
                value={title.style.fontSize}
                min={0}
                max={100}
                onChange={(e) => {
                  let title_ = { ...title };
                  title_.style.fontSize = e;
                  setAttributes({ title: title_ });
                }}
              />
              <label className="normal-label">
                {__("Color", "unlimited-blocks")}
              </label>
              <ColorPalette
                value={title.style.color}
                onChange={(e) => {
                  let title_ = { ...title };
                  title_.style.color = e;
                  setAttributes({ title: title_ });
                }}
              />
              {/* font weight */}
              <div className="flex-section">
                <p>{__("Font Weight", "unlimited-blocks")}</p>
                <select
                  value={title.style.fontWeight}
                  onChange={(e) => {
                    let title_ = { ...title };
                    title_.style.fontWeight = e.target.value;
                    setAttributes({ title: title_ });
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
                <strong>{__("Title Link", "unlimited-blocks")}</strong>
              </p>
              <ToggleControl
                label={
                  title.url.keepUrl
                    ? __("Disable", "unlimited-blocks")
                    : __("Enable", "unlimited-blocks")
                }
                checked={title.url.keepUrl}
                onChange={(e) => {
                  let title_ = { ...title };
                  title_.url.keepUrl = e;
                  setAttributes({ title: title_ });
                }}
              />
              {title.url.keepUrl && (
                <div className="ubl-blocks-linkbtn">
                  <LinkControl
                    value={{
                      url: title.url.url,
                      opensInNewTab: title.url.target,
                    }}
                    onChange={(vall) => {
                      if ("url" in vall) {
                        let title_ = { ...title };
                        title_.url.url = vall.url;
                        // console.log("new title", title_);
                        setAttributes({ title: title_ });
                      }
                      //target
                      if ("opensInNewTab" in vall) {
                        let title_ = { ...title };
                        title_.url.target = vall.opensInNewTab;
                        setAttributes({ title: title_ });
                      }
                    }}
                  />
                </div>
              )}
            </>
          ) : (
            <>
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
                    <span style={{ fontFamily: description.style.fontFamily }}>
                      {description.style.fontFamily
                        ? description.style.fontFamily
                        : __("Choose Family", "unlimited-blocks")}
                    </span>
                  </div>
                  <div className="family-items">
                    {fontFamily.map((family, key_) => {
                      return (
                        <span
                          onClick={() => {
                            let description_ = { ...description };
                            description_.style.fontFamily = family;
                            setAttributes({ description: description_ });
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
                label={__("Font Size", "unlimited-blocks")}
                value={description.style.fontSize}
                min={0}
                max={100}
                onChange={(e) => {
                  let description_ = { ...description };
                  description_.style.fontSize = e;
                  setAttributes({ description: description_ });
                }}
              />
              <label className="normal-label">
                {__("Color", "unlimited-blocks")}
              </label>
              <ColorPalette
                value={description.style.color}
                onChange={(e) => {
                  let description_ = { ...description };
                  description_.style.color = e;
                  setAttributes({ description: description_ });
                }}
              />
              {/* font weight */}
              <div className="flex-section">
                <p>{__("Font Weight", "unlimited-blocks")}</p>
                <select
                  value={description.style.fontWeight}
                  onChange={(e) => {
                    let description_ = { ...description };
                    description_.style.fontWeight = e.target.value;
                    setAttributes({ description: description_ });
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
            </>
          )}
        </PanelBody>
        <PanelBody
          title={__("Background Color", "unlimited-blocks")}
          initialOpen={false}
        >
          <BackgroundColor
            value={{
              backgroundColorType: containerBgColor.type,
              backgroundColor: containerBgColor.color,
              backgroundImageGradient: containerBgColor.gradient,
            }}
            changeme={(_properties) => {
              let saveObj = {
                type: _properties.backgroundColorType,
                color: _properties.backgroundColor,
                gradient: _properties.backgroundImageGradient,
              };
              setAttributes({ containerBgColor: saveObj });
            }}
          />
        </PanelBody>
        <PanelBody
          title={__("Container Border Settings", "unlimited-blocks")}
          initialOpen={false}
        >
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
                max={100}
                onChange={(e) => setAttributes({ containerBorderRadius: e })}
              />
              <label className="normal-label">
                {__("Border Color", "unlimited-blocks")}
              </label>
              <ColorPalette
                onChange={(color) =>
                  setAttributes({ containerBorderColor: color })
                }
              />
            </div>
          )}
        </PanelBody>
      </InspectorControls>,
      <div className="service-section-wrapper" style={containerBorderStyle}>
        <div className={`service-image-icon ${image == "icon" ? "icon_" : ""}`}>
          {image == "image" && (
            <div className="service-image-section">
              <img style={customImgStyle} src={imageStyle.imgUrl} />
            </div>
          )}
          {image == "icon" && (
            <div className="icon-container" style={borderStyle}>
              <i
                style={{
                  color: iconStyle.color,
                  fontSize: iconStyle.fontSize + "px",
                }}
                className={iconClass}
              ></i>
            </div>
          )}
        </div>
        <div className="service-title-description">
          <div>
            <RichText
              key="editable"
              tagName="h1"
              allowedFormats={[]}
              placeholder={__("Service Title", "unlimited-blocks")}
              value={title.value}
              onChange={(e) => {
                let title_ = { ...title };
                title_.value = e;
                setAttributes({ title: title_ });
              }}
              style={{
                color: title.style.color,
                fontSize: title.style.fontSize + "px",
                fontFamily: title.style.fontFamily,
                fontWeight: title.style.fontWeight,
              }}
            />
            <RichText
              key="editable"
              tagName="p"
              allowedFormats={[]}
              placeholder={__("Service Description", "unlimited-blocks")}
              value={description.value}
              onChange={(e) => {
                let description_ = { ...description };
                description_.value = e;
                setAttributes({ description: description_ });
              }}
              style={{
                color: description.style.color,
                fontSize: description.style.fontSize + "px",
                fontFamily: description.style.fontFamily,
                fontWeight: description.style.fontWeight,
              }}
            />
          </div>
        </div>
      </div>,
    ];
  },
  save: (props) => {
    const { attributes } = props;
    const {
      image,
      imageStyle,
      title,
      description,
      containerBgColor,
      containerBorder,
      containerBorderWidth,
      containerBorderRadius,
      containerBorderColor,
      //icon
      iconStyle,
      iconBorder,
      iconClass,
    } = attributes;
    //icon border
    let borderStyle = iconBorder.border
      ? {
          borderWidth: iconBorder.width + "px",
          borderStyle: "solid",
          borderColor: iconBorder.color,
          borderRadius: iconBorder.radius + "%",
          width: iconStyle.width + "px",
          height: iconStyle.width + "px",
        }
      : {};
    if (iconStyle.backgroundColor.type == "color") {
      borderStyle["backgroundColor"] = iconStyle.backgroundColor.color;
    } else if (iconStyle.backgroundColor.type == "gradient") {
      borderStyle["backgroundImage"] = iconStyle.backgroundColor.gradient;
    }
    //icon border

    let customImgStyle = {
      width: imageStyle.width + "%",
      padding: imageStyle.padding + "px",
    };
    if (imageStyle.border) {
      customImgStyle = {
        ...customImgStyle,
        ...{
          borderRadius: imageStyle.borderRadius + "px",
          borderWidth: imageStyle.borderWidth + "px",
          borderColor: imageStyle.borderColor,
          borderStyle: imageStyle.borderType,
        },
      };
    }

    let containerBorderStyle = containerBorder
      ? {
          borderWidth: containerBorderWidth + "px",
          borderStyle: "solid",
          borderColor: containerBorderColor,
          borderRadius: containerBorderRadius + "px",
        }
      : {};
    if (containerBgColor.type == "color") {
      containerBorderStyle["backgroundColor"] = containerBgColor.color;
    } else if (containerBgColor.type == "gradient") {
      containerBorderStyle["backgroundImage"] = containerBgColor.gradient;
    }
    return (
      <div className="service-section-wrapper" style={containerBorderStyle}>
        <div className={`service-image-icon ${image == "icon" ? "icon_" : ""}`}>
          {image == "image" && (
            <div className="service-image-section">
              {imageStyle.imageLink.keepUrl ? (
                <a
                  href={imageStyle.imageLink.link}
                  target={imageStyle.imageLink.target ? "_blank" : null}
                  rel={
                    imageStyle.imageLink.target ? "noopener noreferrer" : null
                  }
                >
                  <img style={customImgStyle} src={imageStyle.imgUrl} />
                </a>
              ) : (
                <img style={customImgStyle} src={imageStyle.imgUrl} />
              )}
            </div>
          )}
          {image == "icon" && (
            <div className="icon-container" style={borderStyle}>
              <i
                style={{
                  color: iconStyle.color,
                  fontSize: iconStyle.fontSize + "px",
                }}
                className={iconClass}
              ></i>
            </div>
          )}
        </div>
        <div className="service-title-description">
          <div>
            {title.url.keepUrl && title.url.url != "" ? (
              <a
                href={title.url.url}
                target={title.url.target ? "_blank" : null}
                rel={title.url.target ? "noopener noreferrer" : null}
              >
                <RichText.Content
                  tagName="h1"
                  value={title.value}
                  style={{
                    color: title.style.color,
                    fontSize: title.style.fontSize + "px",
                    fontFamily: title.style.fontFamily,
                    fontWeight: title.style.fontWeight,
                  }}
                />
              </a>
            ) : (
              <RichText.Content
                tagName="h1"
                value={title.value}
                style={{
                  color: title.style.color,
                  fontSize: title.style.fontSize + "px",
                  fontFamily: title.style.fontFamily,
                  fontWeight: title.style.fontWeight,
                }}
              />
            )}

            <RichText.Content
              tagName="p"
              value={description.value}
              style={{
                color: description.style.color,
                fontSize: description.style.fontSize + "px",
                fontFamily: description.style.fontFamily,
                fontWeight: description.style.fontWeight,
              }}
            />
          </div>
        </div>
      </div>
    );
  },
});
