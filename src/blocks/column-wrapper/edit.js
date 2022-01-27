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
  MediaUpload,
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
  GradientPicker,
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
const columnOptions = [
  {
    class_: "100",
    width: { 0: 100 },
    columns: 1,
  },
  {
    class_: "1-2",
    width: { 0: 50, 1: 50 },
    columns: 2,
  },
  {
    class_: "30-70",
    width: { 0: 30, 1: 70 },
    columns: 2,
  },
  {
    class_: "70-30",
    width: { 0: 70, 1: 30 },
    columns: 2,
  },
  {
    class_: "1-3",
    width: { 0: 33.333, 1: 33.333, 2: 33.333 },
    columns: 3,
  },
  {
    class_: "25-25-50",
    width: { 0: 25, 1: 25, 2: 50 },
    columns: 3,
  },
  {
    class_: "50-25-25",
    width: { 0: 50, 1: 25, 2: 25 },
    columns: 3,
  },
  {
    class_: "25-50-25",
    width: { 0: 25, 1: 50, 2: 25 },
    columns: 3,
  },
  {
    class_: "1-4",
    width: { 0: 25, 1: 25, 2: 25, 3: 25 },
    columns: 4,
  },
  {
    class_: "1-5",
    width: { 0: 20, 1: 20, 2: 20, 3: 20 },
    columns: 5,
  },
];
const ALLOWED_BLOCKS = ["unlimited-blocks/ubl-column-block-column"];
/* Get the column template. */

// for()

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
    };
  }
  componentDidUpdate(prevProps) {
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
      this.setupWidthOnchangeWidth(setObjectColumn);
    } else if (this.props.wrapper_childrens !== prevProps.wrapper_childrens) {
      // console.log("yes change is 2");
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
    } else if (
      this.props.attributes.listStyle.columns !=
      prevProps.attributes.listStyle.columns
    ) {
      // console.log("yes change is 3");
      // if change column width by individual columns
      this.setupWidthOnchangeWidth();
    }
  }

  setupWidthOnchangeWidth(listColumn = false) {
    const { attributes, wrapper_childrens } = this.props;
    let getListStyle = !listColumn ? attributes.listStyle.columns : listColumn;

    // console.log("this->props setupWidthOnchangeWidth ->", this.props);
    // console.log("this->props getListStyle ->", getListStyle);

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
  render() {
    // prevv ------------------=+++++++++++++============

    // console.log("wrapper props by render ->", this.props);

    // initialize style for column
    const { attributes, setAttributes, clientId } = this.props;
    // set block id
    if (attributes.blockId == "")
      setAttributes({ blockId: "ubl-blocks-" + clientId });

    const { blockId, styles, contentWidth } = attributes;
    // let dataListStyle_ = null;
    // let initWidthJson_ = this.state.initWidthJson;
    // if (initWidthJson_) {
    //   // set column width
    //   dataListStyle_ = JSON.stringify(this.state.initWidthJson);
    // }
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
        overlLayColor = { backgroundImage: styles.backgroundImageGradient };
      } else {
        overlLayColor = { backgroundColor: styles.backgroundColor };
      }
      overlLayColor = {
        ...overlLayColor,
        ...{ opacity: styles.backgroundOpacity },
      };
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
              let { columns, class_ } = columnOpt;
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
                      }}
                      changeme={(getProperty) => {
                        console.log("getProperty", getProperty);
                        this.updateStyle(true, true, getProperty);
                      }}
                    />

                    {/* <div className="ubl-multiple-select">
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
                          {
                            value: "image",
                            label: __("Image", "unlimited-blocks"),
                          },
                        ]}
                      />
                    </div> */}
                    {/* {styles.backgroundType == "image" && (
                      <>
                        <p>
                          <strong>
                            {__("Background image", "unlimited-blocks")}
                          </strong>
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
                                this.updateStyle(
                                  "backgroundImageSize",
                                  e.target.value
                                );
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
                    )} */}

                    {/* {(styles.backgroundType == "color" ||
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
                              styles.backgroundColorType == "color"
                                ? "selected"
                                : ""
                            }
                          >
                            {__("Solid", "unlimited-blocks")}
                          </span>
                          <span
                            onClick={() =>
                              this.updateStyle(
                                "backgroundColorType",
                                "gradient"
                              )
                            }
                            className={
                              styles.backgroundColorType == "gradient"
                                ? "selected"
                                : ""
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
                            disableCustomGradients={false}
                            value={styles.backgroundImageGradient}
                            gradients={UBLGraDientColors}
                            onChange={(newGradient) => {
                              this.updateStyle(
                                "backgroundImageGradient",
                                newGradient
                              );
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
                    )} */}
                  </PanelBody>

                  <PanelBody
                    title={__("Border and Box Shadow", "unlimited-blocks")}
                    initialOpen={false}
                  >
                    <div class="ubl-switcher-button-section">
                      <span
                        onClick={() =>
                          this.setState({ chooseBorderORShadow: "border" })
                        }
                        className={
                          this.state.chooseBorderORShadow == "border"
                            ? "selected"
                            : ""
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
                                <strong>
                                  {__("Blur", "unlimited-blocks")}
                                </strong>
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
                                <strong>
                                  {__("Spread", "unlimited-blocks")}
                                </strong>
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
                              <strong>
                                {__("Shadow Color", "unlimited-blocks")}
                              </strong>
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
                              onChange={(e) =>
                                this.updateStyle("borderWidth", e)
                              }
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
                // templateLock={false}
                // templateLock={`all`}
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
