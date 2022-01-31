import memoize from "memize";

/**
 * WordPress dependencies.
 */
import { withDispatch, withSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import {
  InspectorControls,
  BlockControls,
  BlockAlignmentToolbar,
  InnerBlocks,
  ColorPalette,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import {
  PanelBody,
  Placeholder,
  ButtonGroup,
  Button,
  RangeControl,
  ToggleControl,
  SelectControl,
  ColorPicker,
  __experimentalUnitControl as UnitControl,
} from "@wordpress/components";
// import { UBLGraDientColors } from "./../block-assets/post-functions";
import BasicToggleNav from "../block-assets/utility-components/BasicToggleNav";
import Dimension from "../block-assets/utility-components/dimension";
import {
  Animation,
  setAnimationClass,
} from "../block-assets/utility-components/animations/index";
import BackgroundType from "../block-assets/utility-components/backgroundType/backgroundType";
import { compose } from "redux";
import Border from "../block-assets//utility-components/border";
import Boxshadow from "./../block-assets/utility-components/box-shadow";
import { columnOptions } from "./columnOptions";
const ALLOWED_BLOCKS = ["unlimited-blocks/ubl-column-block-column"];

const getLayoutTemplate = memoize((columns) => {
  const times_ = [];
  for (let countcolumns = 0; countcolumns < columns; countcolumns++) {
    times_.push(["unlimited-blocks/ubl-column-block-column"]);
  }
  return times_;
});

// console.log("getLayoutTemplate", getLayoutTemplate);

class Edit extends Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      chooseBorderORShadow: "border",
      openPanel: "layout",
      changeWidthPreventForFirstTime: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("prev props", prevProps);
    // console.log("current props", this.props);

    if (prevProps.attributes.columns != this.props.attributes.columns) {
      // console.log("yes change is 1");
      let currentColumn = parseInt(this.props.attributes.columns);
      let columnsWidth = 100 / currentColumn;
      let SetObject = {};
      for (let initWidth = 0; initWidth < currentColumn; initWidth++) {
        // const element = array[index_];
        SetObject[initWidth] = columnsWidth;
      }
      let setObjectColumn = { columns: SetObject };
      this.props.setAttributes({ listStyle: setObjectColumn });
      // console.log("setObjectColumn->", setObjectColumn);
      // this.setupWidthOnchangeWidth(setObjectColumn);

      this.setState({ changeWidthPreventForFirstTime: 1 });
    } else if (this.props.wrapper_childrens !== prevProps.wrapper_childrens) {
      // console.log("yes change is 2");

      if (
        prevProps.wrapper_childrens.length &&
        prevProps.wrapper_childrens.length > this.props.wrapper_childrens.length
      ) {
        // console.log("yes change is 22");
        let currentColumn = parseInt(this.props.attributes.columns);
        let columnsWidth = 100 / currentColumn;
        let SetObject = {};
        for (let initWidth = 0; initWidth < currentColumn; initWidth++) {
          // const element = array[index_];
          SetObject[initWidth] = columnsWidth;
        }
        let setObjectColumn = { columns: SetObject };
        this.props.setAttributes({ listStyle: setObjectColumn });

        if (
          this.props.wrapper_childrens.length != this.props.attributes.columns
        ) {
          this.props.setAttributes({
            columns: this.props.wrapper_childrens.length,
          });
        }
        this.setupWidthOnchangeWidth(setObjectColumn);
      } else {
        this.setupWidthOnchangeWidth();
      }
    } else if (
      this.props.attributes.listStyle.columns !=
      prevProps.attributes.listStyle.columns
    ) {
      this.setupWidthOnchangeWidth();
    }
  }

  setupWidthOnchangeWidth(listColumn = false) {
    const { attributes, wrapper_childrens } = this.props;
    let getListStyle = !listColumn ? attributes.listStyle.columns : listColumn;
    // console.log("--getListStyle", getListStyle);
    // console.log("--wrapper_childrens", wrapper_childrens);
    // ---------
    if (
      getListStyle &&
      wrapper_childrens.length &&
      Object.keys(getListStyle).length == wrapper_childrens.length
    ) {
      for (let getOrderChildren in getListStyle) {
        let getIdOfColumn = wrapper_childrens[getOrderChildren].clientId;
        let getIdOfColumnWidth = getListStyle[getOrderChildren];
        if (getIdOfColumn) {
          let IdOfColumn = "block-" + getIdOfColumn;
          let foundColumn = document.getElementById(IdOfColumn);
          if (foundColumn) {
            foundColumn.style.width = getIdOfColumnWidth + "%";
          }
        }
      }
    }
    // ---------
  }
  componentDidMount() {
    this.setupWidthOnchangeWidth();
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
  buttonPercent(percent) {
    let Per = Object.keys(percent).map((key_) => (
      <span>{parseInt(percent[key_])}</span>
    ));
    return Per;
  }
  render() {
    // prevv ------------------=+++++++++++++============
    // initialize style for column
    const { attributes, setAttributes, clientId } = this.props;
    // set block id
    if (attributes.blockId == "")
      setAttributes({ blockId: "ubl-blocks-" + clientId });
    const { blockId, styles, contentWidth } = attributes;
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
        overlLayColor = { backgroundImage: styles.backgroundImageGradient };
      } else {
        overlLayColor = { backgroundColor: styles.backgroundColor };
      }
      if ("image" == styles.backgroundType) {
        overlLayColor = {
          ...overlLayColor,
          ...{ opacity: styles.backgroundOpacity },
        };
      }
    }
    /**
     * content width
     */
    let contentWidthApply = null;
    if (contentWidth.enable) {
      contentWidthApply = {};
      if (contentWidth.parameter == "px") {
        contentWidthApply.maxWidth = "100%";
        contentWidthApply.width = contentWidth.widthPx + "px";
      } else {
        contentWidthApply.width = contentWidth.width + "%";
      }
    }
    /**
     * wrapper class
     *
     **/
    let WrapperClass = "ubl-blocks-column-wrapper-2";
    WrapperClass = setAnimationClass(
      attributes.additionalClassNames,
      WrapperClass
    );
    /* Show the layout placeholder. */
    if (attributes.columns == 0) {
      return [
        <BlockControls key="controls">
          <BlockAlignmentToolbar
            value={attributes.align}
            onChange={(align) => setAttributes({ align })}
            controls={["wide", "full"]}
          />
        </BlockControls>,
        <Placeholder
          key="placeholder"
          icon="editor-table"
          label={__("Advance Column Layout", "unlimited-blocks")}
          className={"ubl-column-placeholder"}
        >
          <ButtonGroup
            aria-label={__("Select Row Columns", "unlimited-blocks")}
            className="ubl-blocks-columns-group"
          >
            {columnOptions.map((columnOpt) => {
              let { columns, class_, width } = columnOpt;
              return (
                <div className="ubl-blocks-column-btn-container">
                  <Button
                    className={`ubl-clmn-btn-${class_}`}
                    onClick={() => {
                      if ("width" in columnOpt) {
                        let updateListStyle = { columns: columnOpt.width };
                        setAttributes({
                          columns: columns,
                          listStyle: updateListStyle,
                        });
                      } else {
                        setAttributes({ columns: columns });
                      }
                    }}
                  >
                    <div>
                      {[...Array(columns)].map((vall, keyy) => (
                        <span className={`span-${keyy}`}></span>
                      ))}
                    </div>
                  </Button>
                  <span className="column-percent">
                    {this.buttonPercent(width)}
                  </span>
                </div>
              );
            })}
          </ButtonGroup>
        </Placeholder>,
      ];
    }

    return (
      <>
        <BlockControls key="controls">
          <BlockAlignmentToolbar
            value={attributes.align}
            onChange={(align) => setAttributes({ align })}
            controls={["center", "wide", "full"]}
          />
        </BlockControls>
        <InspectorControls key="inspector">
          {attributes.columns > 0 && (
            <>
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
                    title={__("Column & Layout", "unlimited-blocks")}
                    initialOpen={true}
                  >
                    {/* testing ------------------------------------- */}
                    {/* testing ------------------------------------- */}

                    <RangeControl
                      label={__("Columns", "unlimited-blocks")}
                      // help={}
                      value={attributes.columns}
                      onChange={(value) => {
                        let prevColumn = this.props.attributes.columns;
                        this.props.updateColumn(prevColumn, value);
                        this.props.setAttributes({ columns: value });
                      }}
                      min={1}
                      max={6}
                      step={1}
                    />
                    {/* contentWidth */}
                    <p>
                      <strong>{__("Inner Width", "unlimited-blocks")}</strong>
                    </p>
                    <ToggleControl
                      label={
                        contentWidth.enable
                          ? __("Custom Width", "unlimited-blocks")
                          : __("Full Width", "unlimited-blocks")
                      }
                      checked={contentWidth.enable}
                      onChange={(e) => {
                        let setWidth = { ...contentWidth };
                        setWidth["enable"] = e;
                        this.props.setAttributes({ contentWidth: setWidth });
                      }}
                    />
                    {contentWidth.enable && (
                      <>
                        <label className="normal-label with-radio">
                          {__("Width", "unlimited-blocks")}
                          <div className="parameter-toggle">
                            <span
                              className={
                                contentWidth.parameter == "%"
                                  ? "selected"
                                  : null
                              }
                              onClick={() => {
                                let setWidth = { ...contentWidth };
                                setWidth["parameter"] = "%";
                                this.props.setAttributes({
                                  contentWidth: setWidth,
                                });
                              }}
                            >
                              %
                            </span>
                            <span
                              className={
                                contentWidth.parameter == "px"
                                  ? "selected"
                                  : null
                              }
                              onClick={() => {
                                let setWidth = { ...contentWidth };
                                setWidth["parameter"] = "px";
                                this.props.setAttributes({
                                  contentWidth: setWidth,
                                });
                              }}
                            >
                              px
                            </span>
                          </div>
                        </label>
                        <RangeControl
                          value={
                            contentWidth.parameter == "%"
                              ? contentWidth.width
                              : contentWidth.widthPx
                          }
                          onChange={(value) => {
                            let setWidth = { ...contentWidth };
                            if (contentWidth.parameter == "%") {
                              setWidth["width"] = value;
                            } else {
                              setWidth["widthPx"] = value;
                            }

                            this.props.setAttributes({
                              contentWidth: setWidth,
                            });
                          }}
                          min={contentWidth.parameter == "%" ? 1 : 200}
                          max={contentWidth.parameter == "%" ? 100 : 1600}
                        />
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
                    {/* -----------------------margin--------------- */}
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
                        // console.log("getProperty", getProperty);
                        this.updateStyle(true, true, getProperty);
                      }}
                    />
                  </PanelBody>

                  <PanelBody
                    title={__("Border and Box Shadow", "unlimited-blocks")}
                    initialOpen={false}
                  >
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

                    {/* <Border /> */}
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
            </>
          )}
          <PanelBody
            title={__("Animations", "unlimited-blocks")}
            initialOpen={false}
          >
            <Animation
              value={attributes.additionalClassNames}
              change={(animate) => {
                // console.log("animation", animate);
                setAttributes({ additionalClassNames: animate });
              }}
            />
          </PanelBody>
        </InspectorControls>

        <div
          className="ubl-blocks-column-wrapper"
          id={blockId}
          // dataListStyle={dataListStyle_}
        >
          <div className={WrapperClass} style={wrapperStyles}>
            <div
              className="ubl-blocks-column-wrapper-2-overlay"
              style={overlLayColor}
            ></div>
            <div className="ubl-blocks-column-wrapper-2-svg"></div>
            <div
              className="ubl-blocks-column-wrapper-2-content"
              style={contentWidthApply}
            >
              <InnerBlocks
                template={getLayoutTemplate(attributes.columns)}
                orientation="horizontal"
                allowedBlocks={ALLOWED_BLOCKS}
                renderAppender={false}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default compose(
  withSelect((select, ownProps) => {
    const { clientId } = ownProps;
    const { getBlock } = select(blockEditorStore);
    let getRootBlock = getBlock(clientId);

    // ownProps

    return { wrapper_childrens: getRootBlock.innerBlocks };
  }),
  withDispatch((dispatch, ownProps, registry) => {
    const { getBlocks } = registry.select(blockEditorStore);
    const { clientId } = ownProps;
    let innerBlocks = getBlocks(clientId);
    const { replaceInnerBlocks } = dispatch(blockEditorStore);
    // update column without index
    const updateColumn = (prevColumn, newColumns) => {
      const adding = newColumns > prevColumn;
      if (adding) {
        let columnBlock = wp.blocks.createBlock(
          "unlimited-blocks/ubl-column-block-column"
        );
        innerBlocks = [...innerBlocks, ...[columnBlock]];
      } else {
        // innerBlocks = dropRight([...innerBlocks], 1);
        innerBlocks = [...innerBlocks].slice(0, -1);
      }
      replaceInnerBlocks(clientId, innerBlocks);
    };
    // update column without index
    return {
      updateColumn: updateColumn,
    };
  })
)(Edit);
