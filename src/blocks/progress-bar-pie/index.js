import "./editor.scss";
// import fontFamily from "../block-assets/font-family";
// import icons_ from "../block-assets/icons";
import { registerBlockType } from "@wordpress/blocks";
import {
  InspectorControls,
  ColorPalette,
  RichText,
} from "@wordpress/block-editor";
import { PanelBody, RangeControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
const attrs_ = {
  circleRadius: { type: "number", default: 80 },
  strokeWidth: { type: "number", default: 15 },
  strokeColor: { type: "string", default: "blue" },
  strokeBgColor: { type: "string", default: "grey" },
  fillBgColor: { type: "string", default: "pink" },
  animationDelay: { type: "number", default: 10 },
  lineCap: { type: "boolean", default: false },
  alignment: { type: "string", default: "center" },
  text: { type: "number", default: 50 },
  textFs: { type: "number", default: 18 },
  textColor: { type: "string", default: "black" },
  percentTitleE: { type: "boolean", default: true },
  percentTitle: { type: "string", default: __("Add Title", "unlimited-blocks") },
  percentTitleFs: { type: "number" },
  percentTitleColor: { type: "string" },
};
import { blocksDetail } from "../block-assets/blocks-detail";
const { progress_bar_pie } = blocksDetail;
  
registerBlockType("unlimited-blocks/progress-bar-pie", {
  title: progress_bar_pie.title,
  description: progress_bar_pie.description,
  icon: progress_bar_pie.icon,
  keywords: progress_bar_pie.keywords,
  category: "unlimited-blocks-category",
  attributes: attrs_,
  example: () => {},
  edit: ({ attributes, setAttributes }) => {
    const {
      circleRadius,
      strokeWidth,
      strokeColor,
      strokeBgColor,
      fillBgColor,
      lineCap,
      animationDelay,
      alignment,
      text,
      textFs,
      textColor,
      percentTitleE,
      percentTitle,
      percentTitleColor,
      percentTitleFs,
    } = attributes;
    let HW = circleRadius * 2 + strokeWidth;
    let cxCy = HW / 2;
    return [
      <InspectorControls>
        <PanelBody
          title={__("Circle Setting", "unlimited-blocks")}
          initialOpen={false}
        >
          <RangeControl
            label={__("Percent", "unlimited-blocks")}
            value={text}
            min={1}
            max={100}
            onChange={(e) => setAttributes({ text: e })}
          />
          <RangeControl
            label={__("Width", "unlimited-blocks")}
            value={circleRadius}
            min={1}
            max={150}
            onChange={(e) => setAttributes({ circleRadius: e })}
          />
          <RangeControl
            label={__("Stroke Width", "unlimited-blocks")}
            value={strokeWidth}
            min={1}
            max={150}
            onChange={(e) => setAttributes({ strokeWidth: e })}
          />
          <RangeControl
            label={__("Animation Delay", "unlimited-blocks")}
            value={animationDelay}
            min={1}
            max={100}
            onChange={(e) => setAttributes({ animationDelay: e })}
          />
          <p>
            <strong>{__("Stroke Edges Type", "unlimited-blocks")}</strong>
          </p>
          <ToggleControl
            label={
              lineCap
                ? __("Flat", "unlimited-blocks")
                : __("Circular", "unlimited-blocks")
            }
            checked={lineCap}
            onChange={(e) => setAttributes({ lineCap: e })}
          />
          <p>
            <strong>{__("Stroke Color", "unlimited-blocks")}</strong>
          </p>
          <ColorPalette
            value={strokeColor}
            onChange={(color) => setAttributes({ strokeColor: color })}
          />
          <p>
            <strong>{__("Stroke Background Color", "unlimited-blocks")}</strong>
          </p>
          <ColorPalette
            value={strokeBgColor}
            onChange={(color) => setAttributes({ strokeBgColor: color })}
          />
          <p>
            <strong>{__("Fill Background Color", "unlimited-blocks")}</strong>
          </p>
          <ColorPalette
            value={fillBgColor}
            onChange={(color) => setAttributes({ fillBgColor: color })}
          />
        </PanelBody>
        <PanelBody
          title={__("Text Setting", "unlimited-blocks")}
          initialOpen={false}
        >
          <p className="block-inside">{__("Title Setting", "unlimited-blocks")}</p>
          <ToggleControl
            label={
              percentTitleE
                ? __("Hide", "unlimited-blocks")
                : __("Show", "unlimited-blocks")
            }
            checked={percentTitleE}
            onChange={(e) => setAttributes({ percentTitleE: e })}
          />
          {percentTitleE && (
            <>
              <RangeControl
                label={__("Font Size", "unlimited-blocks")}
                value={percentTitleFs}
                min={1}
                max={50}
                onChange={(e) => setAttributes({ percentTitleFs: e })}
              />
              <p>
                <strong>{__("Color", "unlimited-blocks")}</strong>
              </p>
              <ColorPalette
                value={percentTitleColor}
                onChange={(color) =>
                  setAttributes({ percentTitleColor: color })
                }
              />
            </>
          )}
          <p className="block-inside">{__("Percent Setting", "unlimited-blocks")}</p>
          <RangeControl
            label={__("Font Size", "unlimited-blocks")}
            value={textFs}
            min={1}
            max={50}
            onChange={(e) => setAttributes({ textFs: e })}
          />
          <p>
            <strong>{__("Color", "unlimited-blocks")}</strong>
          </p>
          <ColorPalette
            value={textColor}
            onChange={(color) => setAttributes({ textColor: color })}
          />
        </PanelBody>
      </InspectorControls>,
      <div className="thk-progress-bar-wrapper-pie">
        <div className="ubl-block-pie-circle">
          <div className="pie-circle_">
            <div className="text-sction">
              {percentTitleE && (
                <RichText
                  allowedFormats={[]}
                  className="title_"
                  key="editable"
                  tagName="span"
                  placeholder={__("Add Title", "unlimited-blocks")}
                  value={percentTitle}
                  onChange={(e) => setAttributes({ percentTitle: e })}
                  style={{
                    color: percentTitleColor,
                    fontSize: percentTitleFs + "px",
                  }}
                />
              )}
              <span
                className="percent_"
                style={{ fontSize: textFs + "px", color: textColor }}
              >
                {text}%
              </span>
            </div>
            <svg height={HW} width={HW}>
              <circle cx={cxCy} cy={cxCy} r={circleRadius} fill={fillBgColor} />
              <circle
                cx={cxCy}
                cy={cxCy}
                r={circleRadius}
                fill="none"
                stroke-width={strokeWidth}
                stroke={strokeBgColor}
              />
              <circle
                r={circleRadius}
                cx={cxCy}
                cy={cxCy}
                stroke-width={strokeWidth}
                fill="none"
                stroke={strokeColor}
                stroke-linecap={lineCap ? "round" : "flat"}
                stroke-dasharray={`${
                  text * ((Math.PI * (circleRadius * 2)) / 100)
                } ${Math.PI * (circleRadius * 2)}`}
              />
            </svg>
          </div>
        </div>
      </div>,
    ];
  },
  save: ({ attributes }) => {
    const {
      circleRadius,
      strokeWidth,
      strokeColor,
      strokeBgColor,
      fillBgColor,
      animationDelay,
      lineCap,
      alignment,
      text,
      textFs,
      textColor,
      percentTitleE,
      percentTitle,
      percentTitleColor,
      percentTitleFs,
    } = attributes;
    let circleData = {
      radius: circleRadius,
      strokeWidth: strokeWidth,
      strokeColor: strokeColor,
      strokeBgColor: strokeBgColor,
      lineCap: lineCap,
      animationDelay: animationDelay,
      text: text,
    };
    circleData = JSON.stringify(circleData);
    let HW = circleRadius * 2 + strokeWidth;
    let cxCy = HW / 2;
    return (
      <div className="thk-progress-bar-wrapper-pie">
        <div className="ubl-block-pie-circle front_">
          <div className="pie-circle_">
            <div className="text-sction">
              {percentTitleE && (
                <RichText.Content
                  className="title_"
                  tagName="span"
                  value={percentTitle}
                  style={{
                    color: percentTitleColor,
                    fontSize: percentTitleFs + "px",
                  }}
                />
              )}
              <span
                className="percent_"
                style={{ fontSize: textFs + "px", color: textColor }}
              ></span>
            </div>

            <svg height={HW} width={HW} data={circleData}>
              <circle cx={cxCy} cy={cxCy} r={circleRadius} fill={fillBgColor} />
              <circle
                cx={cxCy}
                cy={cxCy}
                r={circleRadius}
                fill="none"
                stroke-width={strokeWidth}
                stroke={strokeBgColor}
              />
              <circle
                className="percent-apply"
                r={circleRadius}
                cx={cxCy}
                cy={cxCy}
                fill="none"
                stroke-linecap={lineCap ? "round" : "flat"}
              />
            </svg>
          </div>
        </div>
      </div>
    );
  },
});
