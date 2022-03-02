import { __ } from "@wordpress/i18n";
export const blocksDetail = {
  block_layout_pre: {
    title: __("Unlimited Blocks Templates", "unlimited-blocks"),
    keywords: [],
    description: __(
      "This block allows you to display predefined Unlimited Blocks templates. (E.g- post, page, template)",
      "unlimited-blocks"
    ),
    icon: "album",
  },
  column_blocks_column: {
    title: __("Unlimited Blocks Column", "unlimited-blocks"),
    description: __("Add a pre-defined column layout.", "unlimited-blocks"),
    keywords: [],
    icon: "editor-table",
  },
  column_wrapper: {
    title: __("Advance Column", "unlimited-blocks"),
    description: __("Add a pre-defined column layout.", "unlimited-blocks"),
    keywords: [],
    icon: (
      <svg fill="#f8c045" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5v13h17V5H4zm2 11V7h3v9H6zm5 0v-3.5h3V16h-3zm8 0h-3v-3.5h3V16zm-8-5.5V7h8v3.5h-8z"></path>
      </svg>
    ),
  },
  icon_block: {
    title: __("Icon", "unlimited-blocks"),
    description: __(
      "This block allows you to insert an icon (E.g- icon, image)",
      "unlimited-blocks"
    ),
    keywords: ["icon", "iconbox"],
    icon: (
      <svg fill="#f8c045" viewBox="0 0 24 24" aria-hidden="true" tabindex="-1">
        <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path>
      </svg>
    ),
  },
  post_category_layout: {
    title: __("Post Category", "unlimited-blocks"),
    description: __(
      "This block allows you to display image based posts layout of posts from your selected categories (E.g- post category)",
      "unlimited-blocks"
    ),
    keywords: [],
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm.5 16c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5V7h15v12zM9 10H7v2h2v-2zm0 4H7v2h2v-2zm4-4h-2v2h2v-2zm4 0h-2v2h2v-2zm-4 4h-2v2h2v-2zm4 0h-2v2h2v-2z"></path>
      </svg>
    ),
  },
  post_grid_layouts: {
    title: __("Post Grid", "unlimited-blocks"),
    description: __(
      "This block allows you to display grid type post layout from your blog posts. (E.g- display post, grid post)",
      "unlimited-blocks"
    ),
    keywords: [],
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M6 5.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5zM4 6a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm11-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5zM13 6a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2h-3a2 2 0 01-2-2V6zm5 8.5h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zM15 13a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-2-2h-3zm-9 1.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM4 15a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3z"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
    ),
  },
  post_list_layout: {
    title: __("Post List", "unlimited-blocks"),
    description: __(
      "This block allows you to display list based post layout. (E.g- Post list)",
      "unlimited-blocks"
    ),
    keywords: [],
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h12c.3 0 .5.2.5.5v12zM7 11h2V9H7v2zm0 4h2v-2H7v2zm3-4h7V9h-7v2zm0 4h7v-2h-7v2z"></path>
      </svg>
    ),
  },
  post_image_layout_two_post: {
    title: __("Post Image Layout 1", "unlimited-blocks"),
    description: __(
      "This block allows you to display column based two post layouts. (E.g- two column post)",
      "unlimited-blocks"
    ),
    keywords: [],
    icon: (
      <svg
        class="MuiSvgIcon-root jss174"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z"></path>
      </svg>
    ),
  },
  post_image_layout_three_post: {
    title: __("Post Image Layout 2", "unlimited-blocks"),
    description: __(
      "This block allows you to display column based Three post layouts. (E.g- three column post)",
      "unlimited-blocks"
    ),
    keywords: [],
    icon: (
      <svg
        class="MuiSvgIcon-root jss174"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z"></path>
      </svg>
    ),
  },
  post_image_layout_four_post: {
    title: __("Post Image Layout 3", "unlimited-blocks"),
    description: __(
      "This block allows you to display column based four post layouts. (E.g- four column post)",
      "unlimited-blocks"
    ),
    keywords: [],
    icon: (
      <svg
        class="MuiSvgIcon-root jss174"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z"></path>
      </svg>
    ),
  },
  post_image_layout_five_post: {
    title: "Post Image Layout 4",
    description: __(
      "This block allows you to display column based five post layouts. (E.g- five column post)",
      "unlimited-blocks"
    ),
    keywords: [],
    icon: (
      <svg
        class="MuiSvgIcon-root jss174"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z"></path>
      </svg>
    ),
  },
  post_image_layout_six_post: {
    title: __("Post Image Layout 5", "unlimited-blocks"),
    description: __(
      "This block allows you to display column based six post layouts. (E.g- six column post)",
      "unlimited-blocks"
    ),
    keywords: [],
    icon: (
      <svg
        class="MuiSvgIcon-root jss174"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z"></path>
      </svg>
    ),
  },
  ubl_post_slider: {
    title: "Post Slider",
    description: __(
      "This block allows you to display post based sliders. (E.g- post slider, blog slider)",
      "unlimited-blocks"
    ),
    keywords: [],
    icon: (
      <svg
        id="_x31__x2C_5"
        enable-background="new 0 0 24 24"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m6.251 13c-.242 0-.48-.117-.625-.334l-1.5-2.25c-.168-.252-.168-.58 0-.832l1.5-2.25c.229-.345.695-.438 1.04-.208s.438.695.208 1.04l-1.223 1.834 1.223 1.834c.229.345.137.81-.208 1.04-.128.085-.272.126-.415.126z" />
        <path d="m17.749 13c-.143 0-.287-.041-.415-.126-.345-.23-.438-.695-.208-1.04l1.223-1.834-1.223-1.834c-.229-.345-.137-.81.208-1.04.346-.23.811-.137 1.04.208l1.5 2.25c.168.252.168.58 0 .832l-1.5 2.25c-.145.217-.383.334-.625.334z" />
        <path d="m7 20.25c-.689 0-1.25-.561-1.25-1.25s.561-1.25 1.25-1.25 1.25.561 1.25 1.25-.561 1.25-1.25 1.25zm0-1.5c-.138 0-.25.112-.25.25 0 .275.5.275.5 0 0-.138-.112-.25-.25-.25z" />
        <path d="m12 20.25c-.689 0-1.25-.561-1.25-1.25s.561-1.25 1.25-1.25 1.25.561 1.25 1.25-.561 1.25-1.25 1.25zm0-1.5c-.138 0-.25.112-.25.25 0 .275.5.275.5 0 0-.138-.112-.25-.25-.25z" />
        <path d="m17 20.25c-.689 0-1.25-.561-1.25-1.25s.561-1.25 1.25-1.25 1.25.561 1.25 1.25-.561 1.25-1.25 1.25zm0-1.5c-.138 0-.25.112-.25.25 0 .275.5.275.5 0 0-.138-.112-.25-.25-.25z" />
        <path d="m21.25 24h-18.5c-1.517 0-2.75-1.233-2.75-2.75v-18.5c0-1.517 1.233-2.75 2.75-2.75h18.5c1.517 0 2.75 1.233 2.75 2.75v18.5c0 1.517-1.233 2.75-2.75 2.75zm-18.5-22.5c-.689 0-1.25.561-1.25 1.25v18.5c0 .689.561 1.25 1.25 1.25h18.5c.689 0 1.25-.561 1.25-1.25v-18.5c0-.689-.561-1.25-1.25-1.25z" />
      </svg>
    ),
  },
  pricing_table: {
    title: __("Price Box", "unlimited-blocks"),
    description: __(
      "This block allows you to insert beautiful pricing table. (E.g- price, rate, features)",
      "unlimited-blocks"
    ),
    keywords: [],
    icon: (
      <svg fill="#f8c045" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11 17h2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1h-3v-1h4V8h-2V7h-2v1h-1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3v1H9v2h2v1zm9-13H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V6h16v12z"></path>
      </svg>
    ),
  },
  linear_progress: {
    title: __("Linear Progress Bar", "unlimited-blocks"),
    description: __(
      "This block allows you to insert linear progress bar anywhere in the page or post. (E.g-  progress bar)",
      "unlimited-blocks"
    ),
    keywords: [],
    icon: (
      <svg fill="#f8c045" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.5 9.5c-1.03 0-1.9.62-2.29 1.5h-2.92c-.39-.88-1.26-1.5-2.29-1.5s-1.9.62-2.29 1.5H6.79c-.39-.88-1.26-1.5-2.29-1.5C3.12 9.5 2 10.62 2 12s1.12 2.5 2.5 2.5c1.03 0 1.9-.62 2.29-1.5h2.92c.39.88 1.26 1.5 2.29 1.5s1.9-.62 2.29-1.5h2.92c.39.88 1.26 1.5 2.29 1.5 1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5z"></path>
      </svg>
    ),
  },
  progress_bar_pie: {
    title: __("Circular Progress Bar", "unlimited-blocks"),
    description: __(
      "This block allows you to insert circular progress bar anywhere in the page or post. (E.g-  progress bar)",
      "unlimited-blocks"
    ),
    keywords: [],
    icon: (
      <svg fill="#f8c045" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"></path>
      </svg>
    ),
  },
  service_section: {
    title: __("Service Section", "unlimited-blocks"),
    description: __(
      "This block allows you to insert columns based image and texts. (E.g- service, image, icon)",
      "unlimited-blocks"
    ),
    keywords: [],
    icon: (
      <svg
        class="MuiSvgIcon-root jss174"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M3 15h8v-2H3v2zm0 4h8v-2H3v2zm0-8h8V9H3v2zm0-6v2h8V5H3zm10 0h8v14h-8V5z"></path>
      </svg>
    ),
  },

  ubl_block_slider_owl: {
    title: __("Advance Slider", "unlimited-blocks"),
    description: __(
      "This block allows you to insert content and image slides. (E.g- Image slider, content slider)",
      "unlimited-blocks"
    ),
    keywords: [],
    icon: (
      <svg
        id="_x31__x2C_5"
        enable-background="new 0 0 24 24"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m6.251 13c-.242 0-.48-.117-.625-.334l-1.5-2.25c-.168-.252-.168-.58 0-.832l1.5-2.25c.229-.345.695-.438 1.04-.208s.438.695.208 1.04l-1.223 1.834 1.223 1.834c.229.345.137.81-.208 1.04-.128.085-.272.126-.415.126z" />
        <path d="m17.749 13c-.143 0-.287-.041-.415-.126-.345-.23-.438-.695-.208-1.04l1.223-1.834-1.223-1.834c-.229-.345-.137-.81.208-1.04.346-.23.811-.137 1.04.208l1.5 2.25c.168.252.168.58 0 .832l-1.5 2.25c-.145.217-.383.334-.625.334z" />
        <path d="m7 20.25c-.689 0-1.25-.561-1.25-1.25s.561-1.25 1.25-1.25 1.25.561 1.25 1.25-.561 1.25-1.25 1.25zm0-1.5c-.138 0-.25.112-.25.25 0 .275.5.275.5 0 0-.138-.112-.25-.25-.25z" />
        <path d="m12 20.25c-.689 0-1.25-.561-1.25-1.25s.561-1.25 1.25-1.25 1.25.561 1.25 1.25-.561 1.25-1.25 1.25zm0-1.5c-.138 0-.25.112-.25.25 0 .275.5.275.5 0 0-.138-.112-.25-.25-.25z" />
        <path d="m17 20.25c-.689 0-1.25-.561-1.25-1.25s.561-1.25 1.25-1.25 1.25.561 1.25 1.25-.561 1.25-1.25 1.25zm0-1.5c-.138 0-.25.112-.25.25 0 .275.5.275.5 0 0-.138-.112-.25-.25-.25z" />
        <path d="m21.25 24h-18.5c-1.517 0-2.75-1.233-2.75-2.75v-18.5c0-1.517 1.233-2.75 2.75-2.75h18.5c1.517 0 2.75 1.233 2.75 2.75v18.5c0 1.517-1.233 2.75-2.75 2.75zm-18.5-22.5c-.689 0-1.25.561-1.25 1.25v18.5c0 .689.561 1.25 1.25 1.25h18.5c.689 0 1.25-.561 1.25-1.25v-18.5c0-.689-.561-1.25-1.25-1.25z" />
      </svg>
    ),
  },
  ubl_block_product: {
    title: __("Product Slider", "unlimited-blocks"),
    description: __("This block is for Product Blocks.", "unlimited-blocks"),
    keywords: ["product"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        width="64px"
        height="64px"
        viewBox="0 0 64 64"
        enable-background="new 0 0 64 64"
      >
        <g>
          <path
            fill="none"
            stroke="#2d78ff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            d="   M54.1,29.3H9.9c-0.6,0-1-0.4-1-1v-3.3c0-0.6,0.4-1,1-1h44.3c0.6,0,1,0.4,1,1v3.3C55.1,28.9,54.7,29.3,54.1,29.3z"
          />
          <path
            fill="none"
            stroke="#2d78ff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            d="   M51.1,29.3H12.9c-0.6,0-1.1,0.5-1,1.2l3.2,20.2c0.1,0.5,0.5,0.8,1,0.8h31.8c0.5,0,0.9-0.4,1-0.8l3.2-20.2   C52.2,29.9,51.7,29.3,51.1,29.3z"
          />
          <g>
            <line
              fill="none"
              stroke="#2d78ff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-miterlimit="10"
              x1="17.4"
              y1="24.1"
              x2="27.1"
              y2="12.5"
            />

            <line
              fill="none"
              stroke="#2d78ff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-miterlimit="10"
              x1="46.6"
              y1="24.1"
              x2="36.9"
              y2="12.5"
            />
          </g>
          <g>
            <line
              fill="none"
              stroke="#2d78ff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-miterlimit="10"
              x1="35"
              y1="35"
              x2="35"
              y2="45"
            />

            <line
              fill="none"
              stroke="#2d78ff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-miterlimit="10"
              x1="29"
              y1="35"
              x2="29"
              y2="45"
            />

            <line
              fill="none"
              stroke="#2d78ff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-miterlimit="10"
              x1="23"
              y1="35"
              x2="23"
              y2="45"
            />

            <line
              fill="none"
              stroke="#2d78ff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-miterlimit="10"
              x1="41"
              y1="35"
              x2="41"
              y2="45"
            />
          </g>
          <path
            fill="none"
            stroke="#2d78ff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            d="   M32,44.8"
          />
          <path
            fill="none"
            stroke="#2d78ff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            d="   M32,34.8"
          />
        </g>
      </svg>
    ),
  },
};
