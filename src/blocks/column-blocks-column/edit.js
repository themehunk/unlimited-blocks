/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import {
  InnerBlocks,
  InspectorControls,
  store as blockEditorStore,
  ////
  BlockControls,
  BlockVerticalAlignmentToolbar,
} from "@wordpress/block-editor";
import { PanelBody, RangeControl, ResizableBox } from "@wordpress/components";

import BasicToggleNav from "../block-assets/utility-components/BasicToggleNav";
import Dimension from "../block-assets/utility-components/dimension";
import {
  Animation,
  setAnimationClass,
} from "../block-assets/utility-components/animations/index";
import { compose } from "redux";
import { withSelect, withDispatch } from "@wordpress/data";

import BackgroundType from "../block-assets/utility-components/backgroundType/backgroundType";
import Border from "../block-assets//utility-components/border";
import Boxshadow from "./../block-assets/utility-components/box-shadow";

class Edit extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      // widthFirst: false,
      chooseBorderORShadow: "border",
      resizeWidth: false,
      resizeContainerWidth: false,
      openPanel: "layout",
      cloneWidth: false,
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
  render() {
    // console.log("block column block class name ", this.props);
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
    if (styles.borderWidth || styles.borderRadius) {
      wrapperStyles = {
        ...wrapperStyles,
        ...{
          borderWidth: styles.borderWidth,
          borderColor: styles.borderColor,
          borderStyle: styles.borderStyle,
          borderRadius: styles.borderRadius,
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
      let verticleAlign =
        attributes.verticleAlign == "top"
          ? "start"
          : attributes.verticleAlign == "center"
          ? "center"
          : "flex-end";
      // top,center,bottom - unset,center,flex-end

      verticleStyle = {
        ...verticleStyle,
        ...{
          height: 100 + "%",
          display: "flex",
          alignItems: verticleAlign,
        },
      };
      wrapperStyles = { ...wrapperStyles, ...{ width: 100 + "%" } };
    }
    let WrapperClass = "ubl-blocks-cw-column-wrap";
    WrapperClass = setAnimationClass(attributes.additionalClassNames, [
      WrapperClass,
    ]);
    return (
      <>
        <BlockControls key="controls">
          <BlockVerticalAlignmentToolbar
            value={attributes.verticleAlign}
            onChange={(align) => {
              setAttributes({ verticleAlign: align });
            }}
          />
        </BlockControls>
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

          {this.state.openPanel == "layout" ? (
            <>
              <PanelBody
                title={__("Layouts", "unlimited-blocks")}
                initialOpen={true}
              >
                <p>
                  <strong>{__("Width", "unlimited-blocks")}</strong>
                </p>
                <RangeControl
                  label={__("Column Width (%)", "unlimited-blocks")}
                  value={
                    this.state.cloneWidth
                      ? this.state.cloneWidth
                      : this.props.cloneWidth
                  }
                  min={10}
                  max={100}
                  onChange={(e) => {
                    let checkWidth = this.props.changeWidthColumn(e);
                    if (checkWidth == true) {
                      this.setState({ cloneWidth: e });
                    }
                  }}
                />
                {/* verticle alignment  */}
                <p>
                  <strong>
                    {__("Verticle Alignment", "unlimited-blocks")}
                  </strong>
                </p>
                <BasicToggleNav
                  wrapperClass="secondary-nav"
                  value={
                    attributes.verticleAlign
                      ? attributes.verticleAlign
                      : "unset"
                  }
                  navItem={[
                    {
                      name: "unset",
                      title: "Top",
                    },
                    {
                      name: "center",
                      title: "Center",
                    },
                    {
                      name: "flex-end",
                      title: "Bottom",
                    },
                  ]}
                  clickme={(value_) => {
                    setAttributes({ verticleAlign: value_ });
                  }}
                />
                {/* verticle alignment  */}
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
                title={__("Animations", "unlimited-blocks")}
                initialOpen={false}
              >
                <Animation
                  value={attributes.additionalClassNames}
                  change={(animate) => {
                    setAttributes({ additionalClassNames: animate });
                  }}
                />
              </PanelBody>
            </>
          ) : (
            <>
              <PanelBody
                title={__("Background", "unlimited-blocks")}
                initialOpen={false}
              >
                <BackgroundType
                  value={{
                    backgroundType: styles.backgroundType,
                    backgroundImage: styles.backgroundImage,
                    backgroundImageSize: styles.backgroundImageSize,
                    backgroundColorType: styles.backgroundColorType,
                    backgroundColor: styles.backgroundColor,
                    backgroundImageGradient: styles.backgroundImageGradient,
                    backgroundOpacity: styles.backgroundOpacity,
                  }}
                  changeme={(getProperty) => {
                    this.updateStyle(true, true, getProperty);
                  }}
                />
              </PanelBody>
              <PanelBody title={__("Border & Box Shadow")} initialOpen={false}>
                {/* -----------------box shadow----------------- */}
                <div
                  class={`ubl-switcher-bg-clr-gradient clor_${
                    this.state.chooseBorderORShadow == "boxshadow"
                      ? "gradient"
                      : ""
                  }`}
                >
                  <span class="bg-span"></span>
                  <span
                    class={
                      this.state.chooseBorderORShadow == "border"
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      this.setState({ chooseBorderORShadow: "border" })
                    }
                  >
                    {__("Border", "unlimited-blocks")}
                  </span>
                  <span
                    class={
                      this.state.chooseBorderORShadow == "boxshadow"
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      this.setState({ chooseBorderORShadow: "boxshadow" })
                    }
                  >
                    {__("Box Shadow", "unlimited-blocks")}
                  </span>
                </div>
                {this.state.chooseBorderORShadow == "boxshadow" ? (
                  <Boxshadow
                    shadowOffsetX={styles.shadowOffsetX}
                    shadowOffsetY={styles.shadowOffsetY}
                    shadowBlur={styles.shadowBlur}
                    shadowSpread={styles.shadowSpread}
                    shadowColor={styles.shadowColor}
                    shadowEnable={styles.shadowEnable}
                    changeme={(e) => {
                      console.log("shadow come", e);
                      this.updateStyle(true, true, e);
                    }}
                  />
                ) : (
                  <Border
                    value={{
                      allUnit: "px",
                      borderStyle: styles.borderStyle,
                      borderWidth: styles.borderWidth,
                      borderColor: styles.borderColor,
                      borderRadius: styles.borderRadius,
                      borderWidthLink: styles.borderWidthLink,
                      borderRadiusLink: styles.borderRadiusLink,
                    }}
                    changeme={(getProperty) => {
                      // console.log("ev->", getProperty);
                      this.updateStyle(true, true, getProperty);
                    }}
                  />
                )}
              </PanelBody>
            </>
          )}
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
              let checkWidth = this.props.changeWidthColumn(gotWidth);
              if (checkWidth == true) {
                this.setState({ cloneWidth: gotWidth });
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
              <div
                className={`ubl-blocks-cw-column-content ${
                  this.props.ul_has_children ? "ul_has_column_children" : ""
                }`}
              >
                <InnerBlocks
                  templateLock={false}
                  templateInsertUpdatesSelection={false}
                  renderAppender={InnerBlocks.ButtonBlockAppender}
                />
              </div>
            </div>
          </div>
          {this.props.ul_column_length < 5 &&
            this.props.ul_column_index != this.props.ul_column_length && (
              <button
                onClick={() => {
                  this.props.addBlockNextBlock();
                }}
                className="ul-add-new-column-btn"
              >
                <span className="dashicons dashicons-plus-alt2"></span>
              </button>
            )}
        </ResizableBox>
      </>
    );
  }
}

export default compose(
  withSelect((select, ownProps) => {
    // console.log("block column block class name inside select  ", ownProps);
    const { clientId } = ownProps;
    const { getBlockRootClientId, getBlock } = select(blockEditorStore);
    const rootId = getBlockRootClientId(clientId);
    let getRootBlock = getBlock(rootId);
    // console.log("getRootBlock from column select-> ", getRootBlock);
    // check column has children
    let currentColumnChildren = getBlock(clientId).innerBlocks.length;
    currentColumnChildren = currentColumnChildren ? true : false;
    // check column has children
    let rootBlockWrapperAttr = getRootBlock.attributes;
    let lengthInnerBlock = getRootBlock.innerBlocks.length;
    let WrapperColumns = rootBlockWrapperAttr.columns;
    let StyleColumn = rootBlockWrapperAttr.listStyle.columns;
    let StyleColumnL = Object.keys(StyleColumn).length;
    if (
      lengthInnerBlock == WrapperColumns &&
      lengthInnerBlock == StyleColumnL
    ) {
      let getIndexOfColumn =
        getRootBlock.innerBlocks.findIndex(checkIndexOfcolumn); // current column client id
      let setCloneWidth = StyleColumn[getIndexOfColumn];

      //get index of currentColumn
      function checkIndexOfcolumn(columns) {
        return clientId == columns.clientId;
      }
      //get index of currentColumn
      return {
        cloneWidth: setCloneWidth,
        ul_column_index: getIndexOfColumn,
        ul_column_length: StyleColumnL - 1,
        ul_has_children: currentColumnChildren,
      };
    }
  }),
  withDispatch((dispatch, ownProps, registry) => {
    const { clientId, ul_column_index, ul_column_length } = ownProps;
    const { getBlockRootClientId, getBlock } =
      registry.select(blockEditorStore);
    const rootWrapperID = getBlockRootClientId(clientId);
    const getRootBlock = getBlock(rootWrapperID);

    // ** current column change width
    const { updateBlockAttributes, insertBlock } =
      dispatch("core/block-editor");
    const rootBlockWrapperAttr = { ...getRootBlock.attributes };
    let getListStyle = rootBlockWrapperAttr.listStyle.columns;
    const changeWidthAndPlaceStyle = (width) => {
      let cloneColumnWidths = { ...getListStyle };
      let ApplyWidth = { ...getListStyle };
      let changeWidth = true;
      if (ul_column_index == ul_column_length) {
        let getPrevIndex = ul_column_index - 1;
        let getComplexWidth =
          cloneColumnWidths[ul_column_index] + cloneColumnWidths[getPrevIndex];
        let prev_item_width = getComplexWidth - width;

        if (prev_item_width <= 10) {
          changeWidth = false;
        }

        ApplyWidth[getPrevIndex] = prev_item_width;
      } else if (ul_column_index < ul_column_length) {
        let getNextIndex = ul_column_index + 1;
        let getComplexWidth =
          cloneColumnWidths[ul_column_index] + cloneColumnWidths[getNextIndex];
        let next_item_width = getComplexWidth - width;
        ApplyWidth[getNextIndex] = next_item_width;
        if (next_item_width <= 10) {
          changeWidth = false;
        }
      }
      ApplyWidth[ul_column_index] = width;
      let columnsStyle = { columns: ApplyWidth };
      if (changeWidth) {
        updateBlockAttributes(rootWrapperID, {
          listStyle: columnsStyle,
        });
      }
      return changeWidth;
    };
    // ** current column change width

    /**
     * add more column
     */
    // console.log("getRootBlock from column dispatch-> ", getRootBlock);
    const blockName = "unlimited-blocks/ubl-column-block-column";
    const insertedBlock = wp.blocks.createBlock(blockName);
    const columnAddIndex = ul_column_index + 1;
    const addBlockNextBlock = () => {
      insertBlock(insertedBlock, columnAddIndex, rootWrapperID);
      let NowColumnCount = rootBlockWrapperAttr.columns + 1;
      // change column length
      updateBlockAttributes(rootWrapperID, {
        columns: NowColumnCount,
      });
    };

    return {
      changeWidthColumn: changeWidthAndPlaceStyle,
      addBlockNextBlock: addBlockNextBlock,
    };
  })
)(Edit);
