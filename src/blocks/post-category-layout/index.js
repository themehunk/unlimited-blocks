import "./editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import { __ } from "@wordpress/i18n";
import { blocksDetail } from "../block-assets/blocks-detail";
const { post_category_layout } = blocksDetail;
registerBlockType("unlimited-blocks/ubl-post-tc", {
  title: post_category_layout.title,
  description: post_category_layout.description,
  icon: post_category_layout.icon,
  keywords: post_category_layout.keywords,
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
