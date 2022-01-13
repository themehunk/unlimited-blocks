import Edit from "./components/edit";
import "./editor.scss";
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import { blocksDetail } from "../block-assets/blocks-detail";
const { block_layout_pre } = blocksDetail;
registerBlockType("unlimited-blocks/unlimited-blocks-layouts", {
  title: block_layout_pre.title,
  description: block_layout_pre.description,
  icon: block_layout_pre.icon,
  keywords: block_layout_pre.keywords,
  category: "unlimited-blocks-category",
  edit: (props) => {
    return <Edit {...props} />;
  },
  save: () => {
    return null;
  },
});

/**
 * Add a Layout button to the toolbar.
 */
let genesisBlocksLayoutButtonAdded = false;
wp.data.subscribe(() => {
  appendImportButton();
});
/**
 * Build the layout inserter button.
 */
function appendImportButton() {
  if (genesisBlocksLayoutButtonAdded) {
    return;
  }
  const toolbar = document.querySelector(".edit-post-header__toolbar");
  if (!toolbar) {
    return;
  }
  setTimeout(() => {
    if (!document.getElementById("ublBlocksinsert")) {
      const buttonDiv = document.createElement("div");
      buttonDiv.className = "ublBlocksinsertWrap";
      let html = "";
      html += '<button id="ublBlocksinsert">';
      let imgUrl =
        plugin_url.url + "assets/img/blocks-image/ubl-transparent-img.png";
      html += '<img src="' + imgUrl + '">';
      html += `${__("Unlimited Templates", "unlimited-blocks")}`;
      html += "</button>";
      buttonDiv.innerHTML = html;
      toolbar.appendChild(buttonDiv);
      document
        .getElementById("ublBlocksinsert")
        .addEventListener("click", gbInsertLayout);
      genesisBlocksLayoutButtonAdded = true;
    }
  }, 1000);
}
/**
 * Add the Layout block on click.
 */
function gbInsertLayout() {
  const block = wp.blocks.createBlock(
    "unlimited-blocks/unlimited-blocks-layouts"
  );
  wp.data.dispatch("core/block-editor").insertBlocks(block);
}
