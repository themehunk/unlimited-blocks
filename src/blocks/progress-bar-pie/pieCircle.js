import { useState, useRef, useEffect } from "@wordpress/element";

export const Piecircle = (props) => {

  let {
    radius,
    strokeWidth,
    strokeBackground,
    strokeColor,
    fillColor,
    lineCap,
  } = props.canData;
  let { text, color, fontSize } = props.textData;
  let radiusApp = radius - (strokeWidth / 2);
  return (
    <div className="ubl-block-pie-circle">
      <div className="pie-circle_">
        <span style={{ fontSize: fontSize, color: color }}>{text}%</span>
        <svg>
          <circle cx={radius} cy={radius} r={radius} fill={fillColor} />
          <circle
            r={radiusApp}
            cx={radius}
            cy={radius}
            stroke-width={strokeWidth}
            fill="none"
            stroke={strokeColor}
            stroke-linecap="round"
            stroke-dasharray="calc(40 * (3.1416 * 500)/100) calc(3.1416 * 500)"
          />
        </svg>
      </div>
    </div>
  );
};
