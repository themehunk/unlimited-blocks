import "./editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import { __ } from "@wordpress/i18n";
import { blocksDetail } from "../block-assets/blocks-detail";
const { post_list_layout } = blocksDetail;
registerBlockType("unlimited-blocks/ubl-post-list", {
  title: post_list_layout.title,
  description: post_list_layout.description,
  icon: post_list_layout.icon,
  keywords: post_list_layout.keywords,
  category: "unlimited-blocks-category",
  getEditWrapperProps(attributes) {
    let attr_ = { "data-align": attributes.align };
    return attr_;
  },
  // attributes: attrSave,
  supports: {
    align: ["none", "wide", "full"],
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
