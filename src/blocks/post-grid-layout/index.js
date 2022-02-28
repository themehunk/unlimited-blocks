import "./editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import { __ } from "@wordpress/i18n";

import { blocksDetail } from "../block-assets/blocks-detail";
const { post_grid_layouts } = blocksDetail;
registerBlockType("unlimited-blocks/ubl-post-grid", {
  title: post_grid_layouts.title,
  description: post_grid_layouts.description,
  icon: post_grid_layouts.icon,
  keywords: post_grid_layouts.keywords,
  category: "unlimited-blocks-category",
  getEditWrapperProps(attributes) {
    let attr_ = { "data-align": "full" };
    return attr_;
  },
  // attributes: attrSave,
  example: {
    attributes: {
      preview: true,
    },
  },
  edit: Edit,
  save: () => {
    return null;
  },
});
