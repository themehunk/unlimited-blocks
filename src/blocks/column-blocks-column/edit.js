/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import {
  InnerBlocks,
  InspectorControls,
  MediaUpload,
  ColorPalette,
  Inserter,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import {
  PanelBody,
  RangeControl,
  ColorPicker,
  SelectControl,
  ToggleControl,
  __experimentalGradientPicker as GradientPicker,
  ResizableBox,
  IconButton,
} from "@wordpress/components";
const { withSelect } = wp.data;

import { UBLGraDientColors } from "../block-assets/post-functions";
import BasicToggleNav from "../block-assets/utility-components/BasicToggleNav";
import Dimension from "../block-assets/utility-components/dimension";
import {
  Animation,
  setAnimationClass,
} from "../block-assets/utility-components/animations/index";
import { compose } from "redux";
import { withDispatch } from "@wordpress/data";
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

    //   const { attributes, setAttributes, clientId } = this.props;
    //   const useSelectData = useSelect(
    //     (select) => {
    //       // const { getBlockOrder, getBlockRootClientId } =
    //       //   select(blockEditorStore);
    //       // const rootId = getBlockRootClientId(clientId);
    //       return {
    //         // hasChildBlocks: getBlockOrder(clientId).length > 0,
    //         // rootClientId: rootId,
    //         // columnsIds: getBlockOrder(rootId),
    //         yes: true,
    //       };
    //     },
    //     [clientId]
    //   );
    //   console.log("useSelectData->", useSelectData);
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
    // console.log("block column block class name ", this.props);

    const { attributes, setAttributes, clientId } = this.props;

    let clickSyncBlock = document.getElementById(attributes.blockId);
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
    let WrapperClass = "ubl-blocks-cw-column-wrap";
    WrapperClass = setAnimationClass(
      attributes.additionalClassNames,
      WrapperClass
    );
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
              <strong>{__("Animation", "unlimited-blocks")}</strong>
            </p>

            <Animation
              value={attributes.additionalClassNames}
              change={(animate) => {
                setAttributes({ additionalClassNames: animate });
              }}
            />

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
          }}
        >
          {/* ////// */}
          <div
            id={attributes.blockId}
            className="ubl-blocks-cw-column"
            style={verticleStyle}
          >
            <div className={WrapperClass} style={wrapperStyles}>
              <div
                className="ubl-blocks-cw-column-overlay"
                style={overlLayColor}
              ></div>
              <div className="ubl-blocks-cw-column-content">
                <InnerBlocks
                  // template={[["core/paragraph"]]}
                  templateLock={false}
                  templateInsertUpdatesSelection={false}
                  renderAppender={InnerBlocks.ButtonBlockAppender}
                  // renderAppender={() => (
                  //   <this.UlBlockAppender rootClientId={clientId} />
                  // )}
                />
              </div>
            </div>
          </div>
        </ResizableBox>
      </>
    );
  }
  // UlBlockAppender({ rootClientId }) {
  //   return (
  //     <Inserter
  //       rootClientId={rootClientId}
  //       renderToggle={({ onToggle, disabled }) => (
  //         <IconButton
  //           className="my-button-block-appender"
  //           onClick={onToggle}
  //           disabled={disabled}
  //           label="Add a Block"
  //           icon="plus"
  //         />
  //       )}
  //       isAppender
  //     />
  //   );
  // }
}

export default compose(
  withSelect((select, ownProps) => {
    // console.log("block column block class name inside select  ", ownProps);
    // const { clientId } = ownProps;
    // const { getBlockOrder, getBlockRootClientId, getBlock } =
    //   select(blockEditorStore);
    // const rootId = getBlockRootClientId(clientId);
    // let getRootBlock = getBlock(rootId);
    // console.log("clientId -> ", clientId);
    // let getBlockorder = getBlockOrder(clientId);
    // console.log("getBlockorder->", getBlockorder);
    // console.log("getRootBlock->", getRootBlock);
    // console.log("getRootBlock attr->", getRootBlock.attributes);
    // console.log("getBlockRootClientId->", getBlockRootClientId);
  }),
  withDispatch((dispatch, ownProps, registry) => {
    const { clientId } = ownProps;
    const { getBlockOrder, getBlockRootClientId, getBlock } =
      registry.select(blockEditorStore);

    // console.log("getBlockregistry->", getBlockregistry);
    // console.log("getBlockregistry order ->", getBlockregistry.getBlockOrder);

    const rootId = getBlockRootClientId(clientId);

    let getRootBlock = getBlock(rootId);

    console.log("rootId -> ", rootId);
    console.log("getBlock -> ", getRootBlock);
    // let getBlockorder = getBlockOrder(clientId);
    // console.log("getBlockorder->", getBlockorder);
    // console.log("getRootBlock->", getRootBlock);
    // console.log("getRootBlock attr->", getRootBlock.attributes);

    // const { clientId, setAttributes } = ownProps;
    // const { getBlockOrder } = registry.select("core/block-editor");
    const { updateBlockAttributes } = dispatch("core/block-editor");

    let updatedProps = { "updated-by-ext": 8085005396 };
    updateBlockAttributes(rootId, updatedProps);
  })
)(Edit);
//single higher order component ex-----
// export default withSelect((select, props) => {
//   console.log("block column block class name inside select  ", props);
//   const { clientId } = props;
//   const { getBlockOrder, getBlockRootClientId, getBlock } =
//     select(blockEditorStore);
//   const rootId = getBlockRootClientId(clientId);

//   let getRootBlock = getBlock(rootId);

//   console.log("clientId -> ", clientId);
//   let getBlockorder = getBlockOrder(clientId);
//   console.log("getBlockorder->", getBlockorder);
//   console.log("getRootBlock->", getRootBlock);
//   console.log("getRootBlock attr->", getRootBlock.attributes);
//   // console.log("getBlockRootClientId->", getBlockRootClientId);
// })(Edit);
//single higher order component ex-----

// compose(
// 	withSelect( ( select, { clientId } ) => {
// 		const block = select( blockEditorStore ).getBlock( clientId );

// 		return {
// 			block,
// 			shouldRender: block && block.name === 'core/html',
// 		};
// 	} ),
// 	withDispatch( ( dispatch, { block } ) => ( {
// 		onClick: () =>
// 			dispatch( blockEditorStore ).replaceBlocks(
// 				block.clientId,
// 				rawHandler( { HTML: getBlockContent( block ) } )
// 			),
// 	} ) )
// )
