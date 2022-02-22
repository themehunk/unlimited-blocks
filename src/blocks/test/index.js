import "./style.scss";
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
import { __ } from "@wordpress/i18n";
import Edit from "./edit";
const attrs_ = {
  title: { type: "string", default: "hello " },
};
import { blocksDetail } from "../block-assets/blocks-detail";
const { linear_progress } = blocksDetail;
registerBlockType("unlimited-blocks/test-block", {
  title: "linear test ",
  description: "linear test description",
  icon: linear_progress.icon,
  keywords: linear_progress.keywords,
  category: "unlimited-blocks-category",

  example: () => {},
  edit: Edit,
  save: () => {
    return null;
  },
});
