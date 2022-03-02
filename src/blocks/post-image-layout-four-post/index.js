import "./editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import { __ } from "@wordpress/i18n";
import { blocksDetail } from "../block-assets/blocks-detail";
const { post_image_layout_four_post } = blocksDetail;
registerBlockType("unlimited-blocks/ubl-post-section-four-post", {
  title: post_image_layout_four_post.title,
  description: post_image_layout_four_post.description,
  icon: post_image_layout_four_post.icon,
  keywords: post_image_layout_four_post.keywords,
  category: "unlimited-blocks-category",
  getEditWrapperProps(attributes) {
    let attr_ = { "data-align": attributes.align };
    return attr_;
  },
  example: {
    attributes: {
      preview: true,
    },
  },
  // attributes: attrSave,
  supports: {
    align: ["none", "wide", "full"],
  },
  edit: Edit,
  save: () => {
    return null;
  },
});
