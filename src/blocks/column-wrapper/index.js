import "./style/editor.scss";
import Edit from "./edit";
import { registerBlockType } from "@wordpress/blocks";
const { InnerBlocks } = wp.blockEditor;
import { setAnimationClass } from "../block-assets/utility-components/animations/index";
import { __ } from "@wordpress/i18n";
const attrS = {
  align: { type: "string", default: "wide" },
  columns: {
    type: "number",
    default: 0,
  },
  blockId: {
    type: "string",
    default: "",
  },
  listStyle: {
    type: "object",
    default: {
      columns: false,
    },
  },
  contentWidth: {
    type: "object",
    default: {
      enable: false,
      width: 100,
      parameter: "%",
      widthPx: 600,
    },
  },
  // styles added
  styles: {
    type: "object",
    default: {
      // background
      // image/color/none/gradient
      backgroundType: "",
      // color/gradient
      backgroundColorType: "color",
      backgroundColor: "",
      backgroundImage: "",
      backgroundImageSize: "cover",
      backgroundImageGradient:
        "radial-gradient(rgba(6,147,227,1) 38%,rgb(155,81,224) 80%)",
      backgroundOpacity: 1,
      // border
      borderWidthLink: true,
      borderStyle: "solid",
      borderWidth: 0,
      borderColor: "#f8c045",
      borderRadiusLink: true,
      borderRadius: 0,
      // box-shadow
      shadowEnable: false,
      shadowOffsetX: 1,
      shadowOffsetY: 0,
      shadowBlur: 2,
      shadowSpread: 2,
      shadowColor: "#f8c045",
      // margin
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      marginLink: true,
      // padding
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 12,
      paddingRight: 12,
      paddingLink: true,
    },
  },
  additionalClassNames: {
    type: "object",
    default: {},
  },
};
import { blocksDetail } from "../block-assets/blocks-detail";
const { column_wrapper } = blocksDetail;
registerBlockType("unlimited-blocks/ubl-column-block-wrapper", {
  title: column_wrapper.title,
  description: column_wrapper.description,
  icon: column_wrapper.icon,
  keywords: column_wrapper.keywords,
  category: "unlimited-blocks-category",
  attributes: attrS,
  example: () => {},
  getEditWrapperProps: (attributes) => {
    const { align, columns } = attributes;
    if (
      ("left" === align ||
        "right" === align ||
        "full" === align ||
        "wide" === align) &&
      columns > 0
    ) {
      return { "data-align": align };
    }
  },
  edit: Edit,
  save: (props) => {
    const { attributes } = props;
    const { listStyle, blockId, styles, align, contentWidth } = attributes;
    let jsonSettingData = attributes.listStyle;
    jsonSettingData = JSON.stringify(jsonSettingData);
    let columnWrapperStyle = {};
    if (align == "wide") {
      columnWrapperStyle["max-width"] = "1000px";
    } else if (align == "full") {
      columnWrapperStyle["max-width"] = "100%";
    } else if (align == "center") {
      columnWrapperStyle["max-width"] = "650px";
    }
    let ublStyler = {
      id: blockId,
      put_res_class: 1,
      style: columnWrapperStyle,
    };
    ublStyler = JSON.stringify(ublStyler);
    // ----------------===========-------------------
    let wrapperStyles = {
      "margin-top": styles.marginTop,
      "margin-right": styles.marginRight,
      "margin-bottom": styles.marginBottom,
      "margin-left": styles.marginLeft,
      "padding-top": styles.paddingTop,
      "padding-right": styles.paddingRight,
      "padding-bottom": styles.paddingBottom,
      "padding-left": styles.paddingLeft,
    };
    // wrapper bg image if image is enable
    if ("image" == styles.backgroundType && "" != styles.backgroundImage) {
      wrapperStyles = {
        ...wrapperStyles,
        ...{
          "background-image": `url(${styles.backgroundImage})`,
          "background-size": styles.backgroundImageSize,
        },
      };
    }
    // wrapper box shadow is enable
    if (styles.shadowEnable) {
      let BoxShadow = `${styles.shadowOffsetX}px ${styles.shadowOffsetY}px ${styles.shadowBlur}px ${styles.shadowSpread}px ${styles.shadowColor}`;
      wrapperStyles = {
        ...wrapperStyles,
        ...{
          "box-shadow": BoxShadow,
        },
      };
    }

    if (styles.borderWidth || styles.borderRadius) {
      wrapperStyles = {
        ...wrapperStyles,
        ...{
          "border-width": styles.borderWidth,
          "border-color": styles.borderColor,
          "border-style": styles.borderStyle,
          "border-radius": styles.borderRadius,
        },
      };
    }
    let ublStyler1 = {
      id: blockId + "wrap2-",
      // put_res_class: 1,
      style: wrapperStyles,
    };
    ublStyler1 = JSON.stringify(ublStyler1);

    // wrapper overlay color / background / gradient color if color or image or gradient
    let overlLayColor = "";
    if ("color" == styles.backgroundType || "image" == styles.backgroundType) {
      if ("gradient" == styles.backgroundColorType) {
        // console.log("")
        overlLayColor = { "background-image": styles.backgroundImageGradient };
      } else {
        overlLayColor = { "background-color": styles.backgroundColor };
      }
      if ("image" == styles.backgroundType) {
        overlLayColor = {
          ...overlLayColor,
          ...{ opacity: styles.backgroundOpacity },
        };
      }
    }
    let ublStyler2 = {
      id: blockId + "overlay-",
      style: overlLayColor,
    };
    ublStyler2 = JSON.stringify(ublStyler2);
    // ----------------===========-------------------
    // content style
    let contentWidthApply = null;
    if (contentWidth.enable) {
      if (contentWidth.parameter == "%") {
        contentWidthApply = { width: contentWidth.width + "%" };
      } else {
        contentWidthApply = {
          width: contentWidth.widthPx + "px",
          "max-width": "100%",
        };
      }
    }
    let WrapperClass = `ubl-blocks-column-wrapper-2 ${blockId + "wrap2-"}  ${"ubl-col-" + attributes.columns}`;
    WrapperClass = setAnimationClass(attributes.additionalClassNames, [
      WrapperClass,
    ]);

    let mainWrapperClass = [
      "align" + align,
      "ubl-blocks-column-wrapper",
      blockId,
    ];
    mainWrapperClass = mainWrapperClass.join(" ");
    return (
      <div
        id={blockId}
        className={mainWrapperClass}
        ubl-blocks-styler={ublStyler}
        data-ubl-column-width={jsonSettingData}
      >
        <div className={WrapperClass} ubl-blocks-styler={ublStyler1}>
          <div
            className={`ubl-blocks-column-wrapper-2-overlay ${
              blockId + "overlay-"
            }`}
            ubl-blocks-styler={ublStyler2}
          ></div>
          <div className="ubl-blocks-column-wrapper-2-svg"></div>
          <div
            className="ubl-blocks-column-wrapper-2-content"
            style={contentWidthApply}
          >
            <InnerBlocks.Content />
          </div>
        </div>
      </div>
    );
  },
});
