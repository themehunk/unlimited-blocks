/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import {
  AlignmentToolbar,
  BlockControls,
  InnerBlocks,
  InspectorControls,
  BlockAlignmentToolbar,
  MediaUpload,
  ColorPalette,
} from "@wordpress/block-editor";
import {
  PanelBody,
  RangeControl,
  ColorPicker,
  SelectControl,
  ToggleControl,
  __experimentalGradientPicker as GradientPicker,
  ResizableBox,
} from "@wordpress/components";
import { UBLGraDientColors } from "../block-assets/post-functions";
import BasicToggleNav from "../block-assets/utility-components/BasicToggleNav";
import Dimension from "../block-assets/utility-components/dimension";
class Edit extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      widthFirst: false,
      chooseBorderORShadow: "border",
      resizeWidth: false,
      resizeContainerWidth: false,
      openPanel: "layout",
    };
  }
  updateStyle = (key_, value, multiple = false) => {
    const { attributes, setAttributes } = this.props;
    let getStyle = { ...attributes.styles };
    if (multiple) {
      getStyle = { ...getStyle, ...multiple };
    } else {
      getStyle[key_] = value;
    }

    setAttributes({ styles: getStyle });
  };
  componentDidUpdate(prevProps) {
    if (this.props.attributes.width !== prevProps.attributes.width) {
      this.setState({ widthFirst: true });
      // if (this.state.widthFirst) {
      // this.updateWidth();
      // }
    }
  }

  updateWidth(attrWidth) {
    let columnId = this.props.attributes.blockId;
    // console.log("attrWidth-> ", attrWidth);
    let getCurrentColumn = document.getElementById(columnId);
    let attrButesWidth = attrWidth;
    // let attrButesWidth = attrWidth ? attrWidth : this.props.attributes.width;
    let checkNeedCHangeWidth = false;
    if (getCurrentColumn) {
      let getParentColumn =
        getCurrentColumn.getAttribute("data-type") ==
        "unlimited-blocks/ubl-column-block-column"
          ? getCurrentColumn
          : getCurrentColumn.closest(
              '[data-type="unlimited-blocks/ubl-column-block-column"]'
            );
      let getNextSibling = getParentColumn.nextSibling;
      //get current index
      let nodes = Array.prototype.slice.call(
        getParentColumn.closest(".block-editor-block-list__layout").children
      );
      let getIndex = nodes.indexOf(getParentColumn);
      // get width-------------------
      let mainJsonWrapper = getCurrentColumn.closest(
        ".ubl-blocks-column-wrapper"
      );
      let getJsonWidth = mainJsonWrapper.getAttribute("dataliststyle");
      if (getJsonWidth && (getIndex || getIndex == 0)) {
        //for double code remove
        if (getJsonWidth.indexOf('"') == 0)
          getJsonWidth = getJsonWidth.slice(1, -1);
        //for \
        getJsonWidth = getJsonWidth.replace(/\\/g, "");
        getJsonWidth = JSON.parse(getJsonWidth);
        if (getNextSibling) {
          // update next
          let complexWidth =
            getJsonWidth[getIndex] + getJsonWidth[getIndex + 1];
          let width_ = complexWidth - attrButesWidth;
          getJsonWidth[getIndex + 1] = width_;
          getJsonWidth[getIndex] = attrButesWidth;

          // console.log("attrButesWidth-> ", attrButesWidth);
          // console.log("next width_-> ", width_);
          if (width_ >= 10) {
            // console.log("next width_ af ceil-> ", width_);
            checkNeedCHangeWidth = true;
            getNextSibling.style.width = width_ + "%";
          } else {
            checkNeedCHangeWidth = false;
          }
          // checkNeedCHangeWidth = Math.ceil(width_) > 10 ? true : false;
        } else if (getParentColumn.previousSibling) {
          // update previous
          let complexWidth =
            getJsonWidth[getIndex] + getJsonWidth[getIndex - 1];
          let width_ = complexWidth - attrButesWidth;
          getJsonWidth[getIndex - 1] = width_;
          getJsonWidth[getIndex] = attrButesWidth;

          // console.log("attrButesWidth-> ", attrButesWidth);
          // console.log("previous width_-> ", width_);
          if (width_ >= 10) {
            // console.log("previous width_ af ceil-> ", width_);
            checkNeedCHangeWidth = true;
            getParentColumn.previousSibling.style.width = width_ + "%";
          } else {
            checkNeedCHangeWidth = false;
          }
        }

        if (checkNeedCHangeWidth == true) {
          // console.log("checkNeedCHangeWidth aplly ->", checkNeedCHangeWidth);
          // console.log("checkNeedCHangeWidth aplly ->", checkNeedCHangeWidth);
          getParentColumn.style.width = attrButesWidth + "%";
          mainJsonWrapper.setAttribute(
            "dataliststyle",
            JSON.stringify(getJsonWidth)
          );
        }
      }
    }
    return checkNeedCHangeWidth;
  }

  componentDidMount() {
    setTimeout(() => {
      this.firstTimeWidthInit();
    }, 200);
  }

  firstTimeWidthInit() {
    let columnId = this.props.attributes.blockId;
    let getCurrentColumn = document.getElementById(columnId);
    if (getCurrentColumn) {
      let currentColumn =
        getCurrentColumn.getAttribute("data-type") ==
        "unlimited-blocks/ubl-column-block-column"
          ? getCurrentColumn
          : getCurrentColumn.closest(
              '[data-type="unlimited-blocks/ubl-column-block-column"]'
            );
      // console.log("currentColumn->", currentColumn);
      let currentColumnWrap = getCurrentColumn.closest(
        ".block-editor-block-list__layout"
      );
      // console.log("currentColumnWrap->", currentColumnWrap);
      let nodes = Array.prototype.slice.call(currentColumnWrap.children);
      let getIndex = nodes.indexOf(currentColumn);
      // console.log("index of -" + columnId, getIndex);
      // get width
      let getJsonWidth = getCurrentColumn
        .closest(".ubl-blocks-column-wrapper")
        .getAttribute("dataliststyle");
      if (getJsonWidth) {
        //for double code remove
        if (getJsonWidth.indexOf('"') == 0)
          getJsonWidth = getJsonWidth.slice(1, -1);
        //for \\
        getJsonWidth = getJsonWidth.replace(/\\/g, "");
        getJsonWidth = JSON.parse(getJsonWidth);
        if (getIndex in getJsonWidth) {
          this.props.setAttributes({ width: getJsonWidth[getIndex] });
        }
      }
      // get width
    }
  }

  render() {
    // console.log("pppp", this.props);

    let clickSyncBlock = document.getElementById(this.props.attributes.blockId);
    if (clickSyncBlock) {
      clickSyncBlock =
        clickSyncBlock.getAttribute("data-type") ==
        "unlimited-blocks/ubl-column-block-column"
          ? clickSyncBlock
          : clickSyncBlock.closest(
              '[data-type="unlimited-blocks/ubl-column-block-column"]'
            );
      clickSyncBlock.addEventListener("click", () => {
        // console.log("now clicked");
        this.firstTimeWidthInit();
      });
    }

    const { attributes, setAttributes } = this.props;
    let { width, styles } = attributes;
    // wrapper style
    let wrapperStyles = {
      margin: `${styles.marginTop}px ${styles.marginRight}px ${styles.marginBottom}px ${styles.marginLeft}px`,
      padding: `${styles.paddingTop}px ${styles.paddingRight}px ${styles.paddingBottom}px ${styles.paddingLeft}px`,
    };
    // wrapper bg image if image is enable
    if ("image" == styles.backgroundType && "" != styles.backgroundImage) {
      wrapperStyles = {
        ...wrapperStyles,
        ...{
          backgroundImage: `url(${styles.backgroundImage})`,
          backgroundSize: styles.backgroundImageSize,
        },
      };
    }
    // wrapper box shadow is enable
    if (styles.shadowEnable) {
      let BoxShadow = `${styles.shadowOffsetX}px ${styles.shadowOffsetY}px ${styles.shadowBlur}px ${styles.shadowSpread}px ${styles.shadowColor}`;
      wrapperStyles = {
        ...wrapperStyles,
        ...{
          boxShadow: BoxShadow,
        },
      };
    }
    // wrapper border is enable
    if (styles.borderEnable) {
      let borderStyle = `${styles.borderWidth}px ${styles.borderStyle} ${styles.borderColor}`;
      wrapperStyles = {
        ...wrapperStyles,
        ...{
          border: borderStyle,
          borderRadius: styles.borderRadius + "px",
        },
      };
    }
    // wrapper overlay color / background / gradient color if color or image or gradient
    let overlLayColor = null;
    if ("color" == styles.backgroundType || "image" == styles.backgroundType) {
      if ("gradient" == styles.backgroundColorType) {
        // console.log("")
        overlLayColor = { backgroundImage: styles.backgroundImageGradient };
      } else {
        overlLayColor = { backgroundColor: styles.backgroundColor };
      }
      overlLayColor = {
        ...overlLayColor,
        ...{ opacity: styles.backgroundOpacity },
      };
    }
    let verticleStyle = {};
    if (attributes.verticleAlign) {
      verticleStyle = {
        ...verticleStyle,
        ...{
          height: 100 + "%",
          display: "flex",
          alignItems: attributes.verticleAlign,
        },
      };
      wrapperStyles = { ...wrapperStyles, ...{ width: 100 + "%" } };
    }

    return (
      <>
        <InspectorControls key="inspector">
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
          <PanelBody
            title={__("Layouts", "unlimited-blocks")}
            initialOpen={false}
          >
            <p>
              <strong>{__("Width", "unlimited-blocks")}</strong>
            </p>
            <RangeControl
              label={__("Column Width (%)", "unlimited-blocks")}
              value={width}
              min={10}
              max={100}
              onChange={(e) => {
                // console.log("e vent width", e);

                let check_Width = this.updateWidth(e);
                if (check_Width == true) {
                  setAttributes({ width: e });
                }
              }}
            />
            {/* verticle alignment  */}
            <p>
              <strong>{__("Verticle Alignment", "unlimited-blocks")}</strong>
            </p>
            <div class="ubl-switcher-button-section">
              <span
                onClick={() => setAttributes({ verticleAlign: "" })}
                className={attributes.verticleAlign == "" ? "selected" : ""}
              >
                {__("Top", "unlimited-blocks")}
              </span>
              <span
                onClick={() => setAttributes({ verticleAlign: "center" })}
                className={
                  attributes.verticleAlign == "center" ? "selected" : ""
                }
              >
                {__("Center", "unlimited-blocks")}
              </span>
              <span
                onClick={() => setAttributes({ verticleAlign: "flex-end" })}
                className={
                  attributes.verticleAlign == "flex-end" ? "selected" : ""
                }
              >
                {__("Bottom", "unlimited-blocks")}
              </span>
            </div>
            {/* verticle alignment  */}
            {/* -----------------box shadow----------------- */}
            <p>
              <strong>{__("Border & Box Shadow", "unlimited-blocks")}</strong>
            </p>
            <div class="ubl-switcher-button-section">
              <span
                onClick={() =>
                  this.setState({ chooseBorderORShadow: "border" })
                }
                className={
                  this.state.chooseBorderORShadow == "border" ? "selected" : ""
                }
              >
                {__("Border", "unlimited-blocks")}
              </span>
              <span
                onClick={() =>
                  this.setState({ chooseBorderORShadow: "boxshadow" })
                }
                className={
                  this.state.chooseBorderORShadow == "boxshadow"
                    ? "selected"
                    : ""
                }
              >
                {__("Box Shadow", "unlimited-blocks")}
              </span>
            </div>
            {this.state.chooseBorderORShadow == "boxshadow" ? (
              <>
                <ToggleControl
                  label={
                    styles.shadowEnable
                      ? __("Enable", "unlimited-blocks")
                      : __("Disable", "unlimited-blocks")
                  }
                  checked={styles.shadowEnable}
                  onChange={(e) => this.updateStyle("shadowEnable", e)}
                />
                {styles.shadowEnable && (
                  <>
                    <div className="range-and-title-inline">
                      <p className="title-inline">
                        <strong>{__("X", "unlimited-blocks")}</strong>
                      </p>
                      <RangeControl
                        value={styles.shadowOffsetX}
                        min={0}
                        max={20}
                        onChange={(e) => {
                          this.updateStyle("shadowOffsetX", e);
                        }}
                      />
                    </div>
                    <div className="range-and-title-inline">
                      <p className="title-inline">
                        <strong>{__("Y", "unlimited-blocks")}</strong>
                      </p>
                      <RangeControl
                        value={styles.shadowOffsetY}
                        min={0}
                        max={20}
                        onChange={(e) => {
                          this.updateStyle("shadowOffsetY", e);
                        }}
                      />
                    </div>
                    <div className="range-and-title-inline">
                      <p className="title-inline">
                        <strong>{__("Blur", "unlimited-blocks")}</strong>
                      </p>
                      <RangeControl
                        value={styles.shadowBlur}
                        min={0}
                        max={20}
                        onChange={(e) => {
                          this.updateStyle("shadowBlur", e);
                        }}
                      />
                    </div>
                    <div className="range-and-title-inline">
                      <p className="title-inline">
                        <strong>{__("Spread", "unlimited-blocks")}</strong>
                      </p>
                      <RangeControl
                        value={styles.shadowSpread}
                        min={0}
                        max={20}
                        onChange={(e) => {
                          this.updateStyle("shadowSpread", e);
                        }}
                      />
                    </div>
                    <p>
                      <strong>{__("Shadow Color", "unlimited-blocks")}</strong>
                    </p>
                    <ColorPicker
                      color={styles.shadowColor}
                      onChangeComplete={(colorBg) => {
                        let color = `rgba(${colorBg.rgb.r},${colorBg.rgb.g},${colorBg.rgb.b},${colorBg.rgb.a})`;
                        this.updateStyle("shadowColor", color);
                      }}
                    />
                  </>
                )}
                {/* -----------------box shadow----------------- */}
              </>
            ) : (
              <>
                <ToggleControl
                  label={
                    styles.borderEnable
                      ? __("Disable", "unlimited-blocks")
                      : __("Enable", "unlimited-blocks")
                  }
                  checked={styles.borderEnable}
                  onChange={(e) => this.updateStyle("borderEnable", e)}
                />
                {styles.borderEnable && (
                  <div className="icon-border-setting">
                    <div className="ubl-multiple-select">
                      <SelectControl
                        label={__("Border Style", "unlimited-blocks")}
                        value={styles.borderStyle}
                        onChange={(choosen) => {
                          this.updateStyle("borderStyle", choosen);
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
                      value={styles.borderRadius}
                      min={0}
                      max={50}
                      onChange={(e) => {
                        this.updateStyle("borderRadius", e);
                      }}
                    />
                    <RangeControl
                      label={__("Border Width", "unlimited-blocks")}
                      value={styles.borderWidth}
                      min={0}
                      max={100}
                      onChange={(e) => this.updateStyle("borderWidth", e)}
                    />
                    <ColorPalette
                      label={__("Border Color", "unlimited-blocks")}
                      value={styles.borderColor}
                      onChange={(color) =>
                        this.updateStyle("borderColor", color)
                      }
                    />
                  </div>
                )}
              </>
            )}
          </PanelBody>
          <PanelBody
            title={__("Spacing", "unlimited-blocks")}
            initialOpen={false}
          >
            <p>
              <strong>{__("Padding", "unlimited-blocks")}</strong>
            </p>
            <Dimension
              value={{
                top: styles.paddingTop,
                right: styles.paddingRight,
                bottom: styles.paddingBottom,
                left: styles.paddingLeft,
              }}
              isLink={styles.paddingLink}
              changeme={(val_) => {
                let saveObj = {
                  paddingTop: val_.top,
                  paddingRight: val_.right,
                  paddingBottom: val_.bottom,
                  paddingLeft: val_.left,
                };
                if ("isLink" in val_) {
                  saveObj.paddingLink = val_.isLink;
                }
                this.updateStyle(true, true, saveObj);
              }}
            />
            <p>
              <strong>{__("Margin", "unlimited-blocks")}</strong>
            </p>
            <Dimension
              value={{
                top: styles.marginTop,
                right: styles.marginRight,
                bottom: styles.marginBottom,
                left: styles.marginLeft,
              }}
              isLink={styles.marginLink}
              changeme={(val_) => {
                let saveObj = {
                  marginTop: val_.top,
                  marginRight: val_.right,
                  marginBottom: val_.bottom,
                  marginLeft: val_.left,
                };
                if ("isLink" in val_) {
                  saveObj.marginLink = val_.isLink;
                }
                this.updateStyle(true, true, saveObj);
              }}
            />
            {/* <p>
              <strong>{__("Padding", "unlimited-blocks")}</strong>
            </p>
            <div className="range-and-title-inline">
              <p className="title-inline">
                <strong>{__("Top", "unlimited-blocks")}</strong>
              </p>
              <RangeControl
                value={styles.paddingTop}
                min={0}
                max={100}
                onChange={(e) => {
                  this.updateStyle("paddingTop", e);
                }}
              />
            </div>
            <div className="range-and-title-inline">
              <p className="title-inline">
                <strong>{__("Bottom", "unlimited-blocks")}</strong>
              </p>
              <RangeControl
                value={styles.paddingBottom}
                min={0}
                max={100}
                onChange={(e) => {
                  this.updateStyle("paddingBottom", e);
                }}
              />
            </div>
            <div className="range-and-title-inline">
              <p className="title-inline">
                <strong>{__("Left", "unlimited-blocks")}</strong>
              </p>
              <RangeControl
                value={styles.paddingLeft}
                min={0}
                max={100}
                onChange={(e) => {
                  this.updateStyle("paddingLeft", e);
                }}
              />
            </div>
            <div className="range-and-title-inline">
              <p className="title-inline">
                <strong>{__("Right", "unlimited-blocks")}</strong>
              </p>
              <RangeControl
                value={styles.paddingRight}
                min={0}
                max={100}
                onChange={(e) => {
                  this.updateStyle("paddingRight", e);
                }}
              />
            </div> */}
            {/* -----------------------margin--------------- */}
            {/* <p>
              <strong>{__("Margin", "unlimited-blocks")}</strong>
            </p>
            <div className="range-and-title-inline">
              <p className="title-inline">
                <strong>{__("Top", "unlimited-blocks")}</strong>
              </p>
              <RangeControl
                value={styles.marginTop}
                min={0}
                max={100}
                onChange={(e) => {
                  this.updateStyle("marginTop", e);
                }}
              />
            </div>
            <div className="range-and-title-inline">
              <p className="title-inline">
                <strong>{__("Bottom", "unlimited-blocks")}</strong>
              </p>
              <RangeControl
                value={styles.marginBottom}
                min={0}
                max={100}
                onChange={(e) => {
                  this.updateStyle("marginBottom", e);
                }}
              />
            </div>
            <div className="range-and-title-inline">
              <p className="title-inline">
                <strong>{__("Left", "unlimited-blocks")}</strong>
              </p>
              <RangeControl
                value={styles.marginLeft}
                min={0}
                max={100}
                onChange={(e) => {
                  this.updateStyle("marginLeft", e);
                }}
              />
            </div>
            <div className="range-and-title-inline">
              <p className="title-inline">
                <strong>{__("Right", "unlimited-blocks")}</strong>
              </p>
              <RangeControl
                value={styles.marginRight}
                min={0}
                max={100}
                onChange={(e) => {
                  this.updateStyle("marginRight", e);
                }}
              />
            </div> */}
          </PanelBody>
          <PanelBody
            title={__("Background", "unlimited-blocks")}
            initialOpen={false}
          >
            <div className="ubl-multiple-select">
              <SelectControl
                value={styles.backgroundType}
                onChange={(choosen) => {
                  this.updateStyle("backgroundType", choosen);
                }}
                options={[
                  {
                    value: "none",
                    label: __("None", "unlimited-blocks"),
                  },
                  {
                    value: "color",
                    label: __("Color", "unlimited-blocks"),
                  },
                  // { value: "color", label: __("Color", "unlimited-blocks") },
                  {
                    value: "image",
                    label: __("Image", "unlimited-blocks"),
                  },
                ]}
              />
            </div>
            {styles.backgroundType == "image" && (
              <>
                <p>
                  <strong>{__("Background image", "unlimited-blocks")}</strong>
                </p>
                <MediaUpload
                  allowedType="image"
                  onSelect={(newImage) => {
                    this.updateStyle(
                      "backgroundImage",
                      newImage.sizes.full.url
                    );
                  }}
                  value={styles.backgroundImage}
                  render={({ open }) => (
                    <div
                      onClick={open}
                      className={`ubl-block-image-uploader ${
                        "" == styles.backgroundImage && "blank"
                      }`}
                    >
                      <div>
                        <i className="fas fa-plus"></i>
                      </div>
                      <img src={styles.backgroundImage} />
                    </div>
                  )}
                />
                {styles.backgroundImage != "" && (
                  <div className="flex-section">
                    <p>{__("Background Size", "unlimited-blocks")}</p>
                    <select
                      value={styles.backgroundImageSize}
                      onChange={(e) => {
                        this.updateStyle("backgroundImageSize", e.target.value);
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
                )}
              </>
            )}

            {(styles.backgroundType == "color" ||
              styles.backgroundType == "image") && (
              <>
                <p>
                  <strong>
                    {styles.backgroundType == "image" &&
                    styles.backgroundImage != ""
                      ? __("Overlay Color", "unlimited-blocks")
                      : __("Background Color", "unlimited-blocks")}
                  </strong>
                </p>

                <div class="ubl-switcher-button-section">
                  <span
                    onClick={() =>
                      this.updateStyle("backgroundColorType", "color")
                    }
                    className={
                      styles.backgroundColorType == "color" ? "selected" : ""
                    }
                  >
                    {__("Solid", "unlimited-blocks")}
                  </span>
                  <span
                    onClick={() =>
                      this.updateStyle("backgroundColorType", "gradient")
                    }
                    className={
                      styles.backgroundColorType == "gradient" ? "selected" : ""
                    }
                  >
                    {__("Gradient", "unlimited-blocks")}
                  </span>
                </div>
                {"color" == styles.backgroundColorType ? (
                  <ColorPicker
                    color={styles.backgroundColor}
                    onChangeComplete={(colorBg) => {
                      let color = `rgba(${colorBg.rgb.r},${colorBg.rgb.g},${colorBg.rgb.b},${colorBg.rgb.a})`;
                      this.updateStyle("backgroundColor", color);
                    }}
                  />
                ) : (
                  <GradientPicker
                    value={styles.backgroundImageGradient}
                    gradients={UBLGraDientColors}
                    onChange={(newGradient) => {
                      this.updateStyle("backgroundImageGradient", newGradient);
                    }}
                  />
                )}
                <RangeControl
                  label={__("Opacity", "unlimited-blocks")}
                  value={styles.backgroundOpacity}
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={(e) => {
                    this.updateStyle("backgroundOpacity", e);
                  }}
                />
              </>
            )}
          </PanelBody>
        </InspectorControls>

        <ResizableBox
          className="ubl-blocks-custom-resizeable"
          handleWrapperClass="ubl-blocks-cw-column-handle-wrapper"
          enable={{
            top: false,
            right: true,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          onResizeStop={() => {
            this.setState({ resizeWidth: false });
          }}
          onResizeStart={() => {
            // toggleSelection(false);
            let getElement = document.getElementById(attributes.blockId);
            if (getElement) {
              let wrapper = getElement.closest(
                ".block-editor-block-list__layout"
              );
              if (wrapper) {
                let elementWidth = getElement.getBoundingClientRect().width;
                let elementWrapperWidth = wrapper.getBoundingClientRect().width;
                this.setState({
                  resizeWidth: elementWidth,
                  resizeContainerWidth: elementWrapperWidth,
                });
              }

              // console.log("getElement width onResizeStart ->", elementWidth);
              // resizeContainerWidth
            }
          }}
          onResize={(_event, _direction, elt, arg_) => {
            // console.log("state width->", this.state.resizeWidth);
            // console.log(
            //   "state wrapper width->",
            //   this.state.resizeContainerWidth
            // );
            if (this.state.resizeWidth && this.state.resizeContainerWidth) {
              let nowWidth = this.state.resizeWidth + arg_.width;
              let calculateWidth =
                (100 * nowWidth) / this.state.resizeContainerWidth;
              // console.log("calculateWidth width->", calculateWidth);
              let gotWidth = parseInt(calculateWidth);
              // console.log("gotWidth width->", gotWidth);

              let check_Width = this.updateWidth(gotWidth);
              if (check_Width == true) {
                setAttributes({ width: gotWidth });
              }
            }

            // console.log("getElement->", getElement);

            // console.log(
            //   "element_ width->",
            //   element_.getBoundingClientRect().width
            // );
          }}
        >
          {/* ////// */}
          <div
            id={attributes.blockId}
            className="ubl-blocks-cw-column"
            style={verticleStyle}
          >
            <div className="ubl-blocks-cw-column-wrap" style={wrapperStyles}>
              <div
                className="ubl-blocks-cw-column-overlay"
                style={overlLayColor}
              ></div>
              <div className="ubl-blocks-cw-column-content">
                <InnerBlocks
                  template={[["core/paragraph"]]}
                  templateLock={false}
                  templateInsertUpdatesSelection={false}
                />
              </div>
            </div>
          </div>
        </ResizableBox>
      </>
    );
  }
}

export default Edit;

{
  /* <ResizableBox
            enable={{
              top: false,
              right: true,
              bottom: false,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
            }}
            
            onResizeStart={(_event, _direction, elt) => {
              console.log("onResizeStart->");
              // console.log("_event->", _event);
              // console.log("_direction->", _direction);
              // console.log("elt->", elt);

              // const nextVal = getNextVal(elt);
              // onResizeStart(nextVal);
              // onResize(nextVal);
            }}
            onResize={(_event, _direction, elt) => {
              console.log("onResize->");
              console.log("_event->", _event);
              console.log("_direction->", _direction);
              console.log("elt->", elt);
              // onResize(getNextVal(elt));
              // if (!isResizing) {
              //   setIsResizing(true);
              // }
            }}
            onResizeStop={(_event, _direction, elt) => {
              console.log("onResizeStop->");
              // console.log("_event->", _event);
              // console.log("_direction->", _direction);
              // console.log("elt->", elt);

              // const nextVal = Math.min(MAX_SPACER_SIZE, getCurrentSize(elt));
              // onResizeStop(`${nextVal}px`);
              // setIsResizing(false);
            }}
          /> */
}

{
  /* <p>
              <strong>{__("check gradient Color", "unlimited-blocks")}</strong>
            </p>
            <GradientPicker
              // value={gradientValue}
              onChange={(newGradient) => {
                console.log("hh",newGradient);
                // onGradientChange(newGradient);
                // onColorChange();
              }}
              // onChange={
              //   canChooseAColor
              //     ? (newGradient) => {
              //         onGradientChange(newGradient);
              //         onColorChange();
              //       }
              //     : onGradientChange
              // }
              // {...{ gradients, disableCustomGradients }}
            /> */
}
// editor-post-publish-button
// components-button editor-post-publish-panel__toggle editor-post-publish-button__button is-primary
// components-button editor-post-publish-button editor-post-publish-button__button is-primary

{
  /* <div class="wp-themeisle-block-advanced-column-resize-container-handle">
  <div
    class="components-resizable-box__handle components-resizable-box__side-handle components-resizable-box__handle-right"
    style="position: absolute; user-select: none; cursor: col-resize;"
  ></div>
</div>;

<div
  class="components-resizable-box__container has-show-handle"
  style="position: relative; user-select: auto; width: 320px; height: 200px; box-sizing: border-box; flex-shrink: 0;"
>
  <div>
    <div
      class="components-resizable-box__handle components-resizable-box__side-handle components-resizable-box__handle-right"
      style="position: absolute; user-select: none; cursor: col-resize;"
    ></div>
    <div
      class="components-resizable-box__handle components-resizable-box__side-handle components-resizable-box__handle-bottom"
      style="position: absolute; user-select: none; cursor: row-resize;"
    ></div>
    <div
      class="components-resizable-box__handle components-resizable-box__corner-handle components-resizable-box__handle-bottom components-resizable-box__handle-right"
      style="position: absolute; user-select: none; cursor: se-resize;"
    ></div>
  </div>
</div>; */
}
