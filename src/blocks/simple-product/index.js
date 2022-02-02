import "./editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import { __ } from "@wordpress/i18n";
import { blocksDetail } from "../block-assets/blocks-detail";
const { ubl_block_product } = blocksDetail;
registerBlockType("unlimited-blocks/ubl-product", {
  title: ubl_block_product.title,
  description: ubl_block_product.description,
  icon: ubl_block_product.icon,
  keywords: ubl_block_product.keywords,
  category: "unlimited-blocks-category",
  getEditWrapperProps(attributes) {
    // let attr_ = { "data-align": "full" };
    // return attr_;
  },
  example: () => {},
  edit: Edit,
  save: () => {
    return null;
  },
});
