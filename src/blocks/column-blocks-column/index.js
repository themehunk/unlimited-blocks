/**
 * BLOCK: Genesis Blocks Advanced Columns InnerBlocks.
 */

/**
 * Internal dependencies.
 */
import Edit from "./edit";
import "./styles/editor.scss";
import { InnerBlocks } from "@wordpress/block-editor";
import { setAnimationClass } from "../block-assets/utility-components/animations/index";
/**
 * WordPress dependencies.
 */
import { __ } from "@wordpress/i18n";
const { registerBlockType } = wp.blocks;
/**
 *
 * Register advanced columns block.
 *
 */
import { blocksDetail } from "../block-assets/blocks-detail";
const { column_blocks_column } = blocksDetail;
const AttrS = {
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
      // borderEnable: false,
      borderStyle: "solid",
      borderWidth: 0,
      borderColor: "#f8c045",
      borderRadius: "",
      // box-shadowpP
      shadowEnable: false,
      shadowOffsetX: 1,
      shadowOffsetY: 0,
      shadowBlur: 2,
      shadowSpread: 2,
      shadowColor: "#f8c045",
      // margin
      marginLink: true,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      // padding
      paddingLink: true,
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 12,
      paddingRight: 12,
    },
  },
  blockId: { type: "string", default: "" },
  // width: {
  //   type: "number",
  //   default: 0,
  // },
  verticleAlign: {
    type: "string",
    default: "",
  },
  responsiveWidth: {
    type: "object",
    default: {
      orgWidth: 0,
      // maxWidth: 0,
    },
  },
  additionalClassNames: {
    type: "object",
    default: {},
  },
};
registerBlockType("unlimited-blocks/ubl-column-block-column", {
  title: column_blocks_column.title,
  description: column_blocks_column.description,
  icon: column_blocks_column.icon,
  keywords: column_blocks_column.keywords,
  category: "unlimited-blocks-category",
  parent: ["unlimited-blocks/ubl-column-block-wrapper"],
  attributes: AttrS,
  /* Render the block in the editor. */
  edit: (props) => {
    if (props.attributes.blockId == "")
      props.setAttributes({ blockId: "ubl-blocks-" + props.clientId });
    return <Edit {...props} />;
  },

  /* Save the block markup. */
  save: (props) => {
    const { attributes } = props;
    const { styles } = attributes;
    let blockId = attributes.blockId;
    // style 1
    let verticleStyle = "";
    if (attributes.verticleAlign) {
      verticleStyle = {
        // height: 100 + "%",
        display: "flex",
        "align-items": attributes.verticleAlign,
      };
    }
    // column responsive width
    let ublStyler1 = {
      id: blockId,
      put_res_class: 1,
      style: verticleStyle,
      responsiveWidth: attributes.responsiveWidth,
    };
    ublStyler1 = JSON.stringify(ublStyler1);
    // style 2
    // wrapper style
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
    let ublStyler2 = {
      id: blockId + "column-wrap",
      put_res_class: 0,
      style: wrapperStyles,
    };
    ublStyler2 = JSON.stringify(ublStyler2);
    // style 2
    //overlay color
    let overlLayColor = null;
    if ("color" == styles.backgroundType || "image" == styles.backgroundType) {
      if ("gradient" == styles.backgroundColorType) {
        // console.log("")
        overlLayColor = { backgroundImage: styles.backgroundImageGradient };
      } else {
        overlLayColor = { backgroundColor: styles.backgroundColor };
      }
    }
    // wrapper class
    let WrapperClass = `ubl-blocks-cw-column-wrap ${blockId}column-wrap`;
    WrapperClass = setAnimationClass(attributes.additionalClassNames, [
      WrapperClass,
    ]);
    // wrapper class
    return (
      <div
        className={`ubl-blocks-cw-column ${blockId}`}
        ubl-blocks-styler={ublStyler1}
      >
        <div className={WrapperClass} ubl-blocks-styler={ublStyler2}>
          <div
            className="ubl-blocks-cw-column-overlay"
            style={overlLayColor}
          ></div>
          <div className="ubl-blocks-cw-column-content">
            <InnerBlocks.Content />
          </div>
        </div>
      </div>
    );
  },
});
