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
import { UBLGraDientColors } from "../block-assets/post-functions";
import { __ } from "@wordpress/i18n";
const attrs_ = {
  blockUniqueId: { type: "number", default: false },
  percentTitle: { type: "string", default: __("Percent title", "unlimited-blocks") },
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
          <p>
            <strong>{__("Color", "unlimited-blocks")}</strong>
          </p>
          {/* <ColorPalette
            value={percentColor}
            onChange={(color) => setAttributes({ percentColor: color })}
          /> */}
          {/* bg color  */}
          <div class="ubl-switcher-button-section">
            <span
              onClick={() => {
                let getBgcolor = { ...percentColor };
                getBgcolor["type"] = "color";
                setAttributes({ percentColor: getBgcolor });
              }}
              className={percentColor.type == "color" ? "selected" : ""}
            >
              {__("Solid", "unlimited-blocks")}
            </span>
            <span
              onClick={() => {
                let getBgcolor = { ...percentColor };
                getBgcolor["type"] = "gradient";
                setAttributes({ percentColor: getBgcolor });
              }}
              className={percentColor.type == "gradient" ? "selected" : ""}
            >
              {__("Gradient", "unlimited-blocks")}
            </span>
          </div>
          {"color" == percentColor.type ? (
            <ColorPicker
              color={percentColor.color}
              onChangeComplete={(colorBg) => {
                let color = `rgba(${colorBg.rgb.r},${colorBg.rgb.g},${colorBg.rgb.b},${colorBg.rgb.a})`;
                let getBgcolor = { ...percentColor };
                getBgcolor["color"] = color;
                setAttributes({ percentColor: getBgcolor });
              }}
            />
          ) : (
            <GradientPicker
              disableCustomGradients={false}
              value={percentColor.gradient}
              gradients={UBLGraDientColors}
              onChange={(newGradient) => {
                let getBgcolor = { ...percentColor };
                getBgcolor["gradient"] = newGradient;
                setAttributes({ percentColor: getBgcolor });
              }}
            />
          )}
          {/* bg color  */}
          <p>
            <strong>{__("Background Color", "unlimited-blocks")}</strong>
          </p>
          {/* <ColorPalette
            value={percentBgColor}
            onChange={(color) => setAttributes({ percentBgColor: color })}
          /> */}
          {/* bg color  */}
          <div class="ubl-switcher-button-section">
            <span
              onClick={() => {
                let getBgcolor = { ...percentBgColor };
                getBgcolor["type"] = "color";
                setAttributes({ percentBgColor: getBgcolor });
              }}
              className={percentBgColor.type == "color" ? "selected" : ""}
            >
              {__("Solid", "unlimited-blocks")}
            </span>
            <span
              onClick={() => {
                let getBgcolor = { ...percentBgColor };
                getBgcolor["type"] = "gradient";
                setAttributes({ percentBgColor: getBgcolor });
              }}
              className={percentBgColor.type == "gradient" ? "selected" : ""}
            >
              {__("Gradient", "unlimited-blocks")}
            </span>
          </div>
          {"color" == percentBgColor.type ? (
            <ColorPicker
              color={percentBgColor.color}
              onChangeComplete={(colorBg) => {
                let color = `rgba(${colorBg.rgb.r},${colorBg.rgb.g},${colorBg.rgb.b},${colorBg.rgb.a})`;
                let getBgcolor = { ...percentBgColor };
                getBgcolor["color"] = color;
                setAttributes({ percentBgColor: getBgcolor });
              }}
            />
          ) : (
            <GradientPicker
              disableCustomGradients={false}
              value={percentBgColor.gradient}
              gradients={UBLGraDientColors}
              onChange={(newGradient) => {
                let getBgcolor = { ...percentBgColor };
                getBgcolor["gradient"] = newGradient;
                setAttributes({ percentBgColor: getBgcolor });
              }}
            />
          )}
          {/* bg color  */}
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
