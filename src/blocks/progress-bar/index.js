import "./editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import {
  RichText,
  InspectorControls,
  ColorPalette,
} from "@wordpress/block-editor";
import {
  PanelBody,
  RangeControl,
  ToggleControl,
  ColorPicker,
  __experimentalGradientPicker as GradientPicker,
} from "@wordpress/components";
import BackgroundColor from "../block-assets/utility-components/backgroundType/backgroundColor";
import { UBLGraDientColors } from "../block-assets/post-functions";
import { __ } from "@wordpress/i18n";

const attrs_ = {
  blockUniqueId: { type: "number", default: false },
  percentTitle: {
    type: "string",
    default: __("Percent title", "unlimited-blocks"),
  },
  titleFs: { type: "number" },
  titleFf: { type: "string" },
  titleIn: { type: "boolean", default: false },
  titleColor: { type: "string" },
  progressHeight: { type: "number", default: 12 },
  percent: { type: "number", default: 40 },
  animationDelay: { type: "number", default: 10 },
  percentColor: {
    type: "object",
    default: {
      type: "color",
      color: "rgb(255, 36, 0)",
      gradient: "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
    },
  },
  percentBgColor: {
    type: "object",
    default: {
      type: "color",
      color: "yellow",
      gradient: "radial-gradient(rgb(6, 147, 227) 38%, rgb(155, 81, 224) 80%)",
    },
  },
  borderRadius: { type: "number" },
};
import { blocksDetail } from "../block-assets/blocks-detail";
const { linear_progress } = blocksDetail;
registerBlockType("unlimited-blocks/progress-block", {
  title: linear_progress.title,
  description: linear_progress.description,
  icon: linear_progress.icon,
  keywords: linear_progress.keywords,
  category: "unlimited-blocks-category",
  attributes: attrs_,
  example: () => {},
  edit: (props) => {
    const { attributes, setAttributes } = props;
    const {
      percent,
      progressHeight,
      percentTitle,
      titleIn,
      titleFs,
      titleFf,
      animationDelay,
      titleColor,
      percentColor,
      percentBgColor,
      borderRadius,
      blockUniqueId,
    } = attributes;
    // bg container
    let percentBgColorStyle = {
      height: progressHeight + "px",
      borderRadius: borderRadius + "px",
    };
    if (percentBgColor.type == "color") {
      percentBgColorStyle["backgroundColor"] = percentBgColor.color;
    } else if (percentBgColor.type == "gradient") {
      percentBgColorStyle["backgroundImage"] = percentBgColor.gradient;
    }
    // bg percent
    let percentStyle = {
      width: percent + "%",
    };
    if (percentColor.type == "color") {
      percentStyle["backgroundColor"] = percentColor.color;
    } else if (percentColor.type == "gradient") {
      percentStyle["backgroundImage"] = percentColor.gradient;
    }
    return [
      <InspectorControls>
        <PanelBody
          title={__("Title Setting", "unlimited-blocks")}
          initialOpen={false}
        >
          <ToggleControl
            label={
              titleIn
                ? __("Outside", "unlimited-blocks")
                : __("Inside", "unlimited-blocks")
            }
            checked={titleIn}
            onChange={(e) => setAttributes({ titleIn: e })}
          />
          <RangeControl
            label={__("Font Size", "unlimited-blocks")}
            value={titleFs}
            min={1}
            max={100}
            onChange={(e) => setAttributes({ titleFs: e })}
          />
          <p>
            <strong>{__("Color", "unlimited-blocks")}</strong>
          </p>
          <ColorPalette
            value={titleColor}
            onChange={(color) => setAttributes({ titleColor: color })}
          />
        </PanelBody>
        <PanelBody
          title={__("Progress Bar Setting", "unlimited-blocks")}
          initialOpen={false}
        >
          <RangeControl
            label={__("Height", "unlimited-blocks")}
            value={progressHeight}
            min={1}
            max={50}
            onChange={(e) => setAttributes({ progressHeight: e })}
          />
          <RangeControl
            label={__("Percent", "unlimited-blocks")}
            value={percent}
            min={1}
            max={100}
            onChange={(e) => setAttributes({ percent: e })}
          />

          <RangeControl
            label={__("Border Radius", "unlimited-blocks")}
            value={borderRadius}
            min={1}
            max={60}
            onChange={(e) => setAttributes({ borderRadius: e })}
          />
          <RangeControl
            label={__("Animation Delay", "unlimited-blocks")}
            value={animationDelay}
            min={1}
            max={100}
            onChange={(e) => setAttributes({ animationDelay: e })}
          />
          <BackgroundColor
            value={{
              title: "Color",
              backgroundColorType: percentColor.type,
              backgroundColor: percentColor.color,
              backgroundImageGradient: percentColor.gradient,
            }}
            changeme={(_properties) => {
              // console.log("_properties", _properties);
              let saveObj = {
                type: _properties.backgroundColorType,
                color: _properties.backgroundColor,
                gradient: _properties.backgroundImageGradient,
              };
              setAttributes({ percentColor: saveObj });
            }}
          />
          <BackgroundColor
            value={{
              backgroundColorType: percentBgColor.type,
              backgroundColor: percentBgColor.color,
              backgroundImageGradient: percentBgColor.gradient,
            }}
            changeme={(_properties) => {
              // console.log("_properties", _properties);
              let saveObj = {
                type: _properties.backgroundColorType,
                color: _properties.backgroundColor,
                gradient: _properties.backgroundImageGradient,
              };
              setAttributes({ percentBgColor: saveObj });
            }}
          />
        </PanelBody>
      </InspectorControls>,
      <div className="thk-progress-bar-wrapper">
        <div className="ubl-linear-progress-bar">
          <div
            className="txt-section"
            style={{ fontSize: titleFs, color: titleColor }}
          >
            <RichText
              allowedFormats={[]}
              value={percentTitle}
              tagName="p"
              onChange={(e) => setAttributes({ percentTitle: e })}
            />
            {!titleIn && <span className="percent_">{percent}%</span>}
          </div>
          <div style={percentBgColorStyle} className="line_">
            <div style={percentStyle} className="line-inner_">
              {titleIn && <span className="percent_">{percent}%</span>}
            </div>
          </div>
        </div>
      </div>,
    ];
  },
  save: ({ attributes }) => {
    const {
      progressHeight,
      percent,
      percentTitle,
      titleIn,
      titleFs,
      titleFf,
      titleColor,
      percentColor,
      percentBgColor,
      borderRadius,
      animationDelay,
    } = attributes;
    // bg container
    let percentBgColorStyle = {
      height: progressHeight + "px",
      borderRadius: borderRadius + "px",
    };
    if (percentBgColor.type == "color") {
      percentBgColorStyle["backgroundColor"] = percentBgColor.color;
    } else if (percentBgColor.type == "gradient") {
      percentBgColorStyle["backgroundImage"] = percentBgColor.gradient;
    }
    // bg percent
    let percentStyle = {};
    if (percentColor.type == "color") {
      percentStyle["backgroundColor"] = percentColor.color;
    } else if (percentColor.type == "gradient") {
      percentStyle["backgroundImage"] = percentColor.gradient;
    }
    return (
      <div className="thk-progress-bar-wrapper">
        <div
          className="ubl-linear-progress-bar front_"
          percent={percent}
          delay={animationDelay}
        >
          <div
            className="txt-section"
            style={{ fontSize: titleFs, color: titleColor }}
          >
            <RichText.Content value={percentTitle} tagName="p" />
            {!titleIn && <span className="percent_"></span>}
          </div>
          <div style={percentBgColorStyle} className="line_">
            <div style={percentStyle} className="line-inner_">
              {titleIn && <span className="percent_"></span>}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
