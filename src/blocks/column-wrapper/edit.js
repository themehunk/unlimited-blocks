import memoize from "memize";
import map from "lodash/map";
import _times from "lodash/times";
/**
 * WordPress dependencies.
 */
const { dispatch } = wp.data;
import { withSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import {
  InspectorControls,
  BlockControls,
  BlockAlignmentToolbar,
  InnerBlocks,
  MediaUpload,
  ColorPalette,
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
  __experimentalGradientPicker as GradientPicker,
} from "@wordpress/components";
import { UBLGraDientColors } from "./../block-assets/post-functions";
import BasicToggleNav from "../block-assets/utility-components/BasicToggleNav";
import Dimension from "../block-assets/utility-components/dimension";
import {
  Animation,
  setAnimationClass,
} from "../block-assets/utility-components/animations/index";
const columnOptions = [
  {
    class_: "100",
    columns: 1,
  },
  {
    class_: "1-2",
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
    columns: 4,
  },
  {
    class_: "1-5",
    columns: 5,
  },
];
const ALLOWED_BLOCKS = ["unlimited-blocks/ubl-column-block-column"];
/* Get the column template. */
const getLayoutTemplate = memoize((columns) => {
  // console.log('columns->',columns);

  return _times(columns, () => ["unlimited-blocks/ubl-column-block-column"]);
});

class Edit extends Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      selectLayout: true,
      initWidthJson: false,
      chooseBorderORShadow: "border",
      openPanel: "layout",
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.attributes.columns !== prevProps.attributes.columns) {
      // this.props.attributes.listStyle.columns
      let listStyle_ = { ...this.props.attributes.listStyle };
      listStyle_.columns = false;
      this.props.setAttributes({ listStyle: listStyle_ });

      // dispatch("core/block-editor").synchronizeTemplate();
      // wp.data.dispatch("core/block-editor").synchronizeTemplate()
      this.setupINStateByProps(true);
      this.updateAndInitWidth();
    }
  }

  updateAndInitWidth = () => {
    let filterAfterSec = () => {
      let element = document.getElementById(this.props.attributes.blockId);
      // console.log("updateAndInitWidth element", element);
      if (element) {
        let getWidthColumns = element.getAttribute("dataliststyle");
        // console.log("getWidthColumns", getWidthColumns);
        if (getWidthColumns) {
          //for double code remove
          if (getWidthColumns.indexOf('"') == 0)
            getWidthColumns = getWidthColumns.slice(1, -1);
          //for \\
          getWidthColumns = getWidthColumns.replace(/\\/g, "");

          getWidthColumns = JSON.parse(getWidthColumns);
          // console.log("getWidthColumns", getWidthColumns);
          let children = element.querySelector(
            ".ubl-blocks-column-wrapper-2 > .ubl-blocks-column-wrapper-2-content > .block-editor-inner-blocks > .block-editor-block-list__layout"
          ).children;
          if (children && getWidthColumns) {
            for (let x in getWidthColumns) {
              if (children[x])
                children[x].style.width = getWidthColumns[x] + "%";
            }
            element.classList.add("active");
          }
        }
      }
    };
    setTimeout(filterAfterSec, 100);
  };
  componentDidMount() {
    this.setupINStateByProps();
    this.updateAndInitWidth();

    // save style option one
    let updateBtn = document.getElementsByClassName(
      "editor-post-publish-button__button"
    );
    if (updateBtn && updateBtn.length > 0) {
      // console.log("update btn triggered", updateBtn);
      // console.log("this porops componentDidmount", this.props);
      const { attributes, setAttributes } = this.props;
      updateBtn[0].addEventListener("click", function () {
        // console.log("attributes->", attributes);
        // console.log("setAttributes->", setAttributes);
        let getElement = document.querySelector(
          '[id="' + attributes.blockId + '"][dataliststyle]'
        );
        if (getElement) {
          let getPreviousStyle = { ...attributes.listStyle };
          let dataliststyle = getElement.getAttribute("dataliststyle");
          getPreviousStyle["columns"] = JSON.parse(dataliststyle);
          setAttributes({ listStyle: getPreviousStyle });
        }
      });
    }
    // save style option one
  }
  setupINStateByProps(updatecolumn = false) {
    if (
      false == this.props.attributes.listStyle.columns ||
      true == updatecolumn
    ) {
      let columnWidth = 100 / this.props.attributes.columns;
      let columnWidthI = {};
      // set style as children
      for (
        let initWidth = 0;
        initWidth < this.props.attributes.columns;
        initWidth++
      ) {
        columnWidthI[initWidth] = columnWidth;
      }
      this.setState({ initWidthJson: columnWidthI });
    } else if (this.props.attributes.listStyle.columns) {
      this.setState({ initWidthJson: this.props.attributes.listStyle.columns });
    }
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

    // console.log("wrapper props->", this.props);

    // initialize style for column
    const { attributes, setAttributes, clientId } = this.props;
    // set block id
    if (attributes.blockId == "")
      setAttributes({ blockId: "ubl-blocks-" + clientId });

    const { blockId, styles, contentWidth } = attributes;
    let dataListStyle_ = null;
    let initWidthJson_ = this.state.initWidthJson;
    if (initWidthJson_) {
      // set column width
      dataListStyle_ = JSON.stringify(this.state.initWidthJson);
    }
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
            controls={["center", "wide", "full"]}
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
            {map(columnOptions, (columnOpt) => {
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
                    <RangeControl
                      label={__("Columns", "unlimited-blocks")}
                      // help={}
                      value={attributes.columns}
                      onChange={(value) =>
                        this.props.setAttributes({ columns: value })
                      }
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
                    )}
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
            {/* <Animation
              value={attributes.additionalClassNames}
              change={(animate) => {
                console.log("animation", animate);
                setAttributes({ additionalClassNames: animate });
              }}
            /> */}
          </PanelBody>
        </InspectorControls>

        <div
          className="ubl-blocks-column-wrapper"
          id={blockId}
          dataListStyle={dataListStyle_}
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
                templateLock="all"
                allowedBlocks={ALLOWED_BLOCKS}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Edit;
// export default withSelect((select, props) => {
//   console.log("in props->",props);
//   // console.log("selectooò");
//   // const { attributes, setAttributes } = props;
//   const {
//     isSavingPost,
//     isCurrentPostPublished,
//     isCurrentPostScheduled,
//   } = select("core/editor");

//   // let getElement = document.querySelector(
//   //   '[id="' + attributes.blockId + '"][dataliststyle]'
//   // );
//   // if (getElement && isSavingPost() && isCurrentPostPublished()) {
//   //   let getPreviousStyle = { ...attributes.listStyle };
//   //   let dataliststyle = getElement.getAttribute("dataliststyle");
//   //   getPreviousStyle["columns"] = JSON.parse(dataliststyle);
//   //   setAttributes({ listStyle: getPreviousStyle });
//   // }

//   return {
//     isSaving: isSavingPost(),
//     isPublished: isCurrentPostPublished(),
//     isScheduled: isCurrentPostScheduled(),
//     initilizedOkkkk: "arraaaa",
//   };
//   // return arrayCatePost;
// })(Edit);
