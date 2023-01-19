import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  RichText,
  ColorPalette,
} from "@wordpress/block-editor";
import { PanelBody, RangeControl, ToggleControl } from "@wordpress/components";
import {
  showCateFn,
  showTagsFn,
  excerptWords,
  filterPostInit,
  firstTimeInit,
  PostNotfound,
  PostLoader,
} from "../block-assets/post-functions";
import BackgroundColor from "../block-assets/utility-components/backgroundType/backgroundColor";
import Switcher from "../block-assets/utility-components/TwoSwitcher";
import ProductCategory from "../block-assets/woocommerce/productCategory";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metaChoose: "primary",
      excerpt: "primary",
      heading: "primary",
      // pages state from post
      posts: [],
      category: [],
      totalPost: null,
    };
  }
  componentDidMount() {
    let sendData = { featured_image: 1 };
    firstTimeInit(this, sendData);
  }
  updateObj = (parent_key, child_key, initialValue, value_) => {
    let newNewValue = [...initialValue];
    newNewValue[0][child_key] = value_;
    let setAttr_ = {};
    setAttr_[parent_key] = newNewValue;
    this.props.setAttributes(setAttr_);
  };
  render() {
    // ++++++++++++++===============
    const { attributes, setAttributes } = this.props;
    const { posts, category, totalPost } = this.state;
    let {
      heading,
      author,
      layout,
      date,
      showTag,
      showCate,
      excerpt,
      postCategories,
      meta_style,
      meta_style2,
      title,
      // secondary
      heading2,
      excerpt2,
      showCate2,
      showTag2,
      date2,
      author2,
      preview,
    } = attributes;
    let heading_ = heading[0];
    let excerpt_ = excerpt[0];
    let date_ = date[0];
    let author_ = author[0];
    let meta_style_ = meta_style[0];
    let meta_style2_ = meta_style2[0];
    let title_ = title[0];
    let showTag_ = showTag[0];
    let showCate_ = showCate[0];
    let layout_ = layout[0];
    // secondary
    let heading2_ = heading2[0];
    let excerpt2_ = excerpt2[0];
    let showCate2_ = showCate2[0];
    let showTag2_ = showTag2[0];
    let date2_ = date2[0];
    let author2_ = author2[0];

    if (layout_.type == 3) {
      if (
        this.state.metaChoose == "secondary" ||
        this.state.excerpt == "secondary" ||
        this.state.heading == "secondary"
      ) {
        this.setState({
          metaChoose: "primary",
          excerpt: "primary",
          heading: "primary",
        });
      }
    }
    if (preview) {
      return <img src={`${plugin_url.url}assets/img/post-layout-2.png`} />;
    }
    // if number of post sum
    return (
      <>
        <InspectorControls>
          <PanelBody
            title={__("Block Title", "unlimited-blocks")}
            initialOpen={false}
          >
            <ToggleControl
              label={
                title_.enable
                  ? __("Show", "unlimited-blocks")
                  : __("Hide", "unlimited-blocks")
              }
              checked={title_.enable}
              onChange={(e) => this.updateObj("title", "enable", title, e)}
            />
            {title_.enable && (
              <>
                <p>
                  <strong>{__("Title Alignment", "unlimited-blocks")}</strong>
                </p>
                <div className="ubl-alignment">
                  <div>
                    <span
                      onClick={() => {
                        this.updateObj("title", "align", title, "left");
                      }}
                      className={`dashicons dashicons-editor-alignleft ${
                        title_.align == "left" && "active"
                      }`}
                    ></span>
                  </div>
                  <div>
                    <span
                      onClick={() => {
                        this.updateObj("title", "align", title, "center");
                      }}
                      className={`dashicons dashicons-editor-aligncenter ${
                        title_.align == "center" && "active"
                      }`}
                    ></span>
                  </div>
                  <div>
                    <span
                      onClick={() => {
                        this.updateObj("title", "align", title, "flex-end");
                      }}
                      className={`dashicons dashicons-editor-alignright ${
                        title_.align == "flex-end" && "active"
                      }`}
                    ></span>
                  </div>
                </div>

                <RangeControl
                  label={__("Font Size", "unlimited-blocks")}
                  value={title_.fontSize}
                  min={5}
                  max={50}
                  onChange={(e) => {
                    this.updateObj("title", "fontSize", title, e);
                  }}
                />
                <p>
                  <strong>{__("Color", "unlimited-blocks")}</strong>
                </p>
                <ColorPalette
                  value={title_.color}
                  onChange={(color) =>
                    this.updateObj("title", "color", title, color)
                  }
                />
                <p>
                  <strong>{__("Background Color", "unlimited-blocks")}</strong>
                </p>

                <ColorPalette
                  value={title_.backgroundColor}
                  onChange={(color) => {
                    this.updateObj("title", "backgroundColor", title, color);
                  }}
                />
                {/* font weight */}
                <div className="flex-section">
                  <p>{__("Font Weight", "unlimited-blocks")}</p>
                  <select
                    value={title_.fontWeight}
                    onChange={(e) => {
                      this.updateObj(
                        "title",
                        "fontWeight",
                        title,
                        e.target.value
                      );
                    }}
                  >
                    <option value="400">400</option>
                    <option value="600">600</option>
                    <option value="700">700</option>
                  </select>
                </div>
                {/* font weight */}
                <p>
                  <strong>{__("Min Width %", "unlimited-blocks")}</strong>
                </p>
                <RangeControl
                  value={title_.width}
                  min={1}
                  max={100}
                  onChange={(e) => {
                    this.updateObj("title", "width", title, e);
                  }}
                />
              </>
            )}
          </PanelBody>
          <PanelBody
            title={__("Post Layout", "unlimited-blocks")}
            initialOpen={false}
          >
            <div className="flex-section">
              <p>Choose Layout</p>
              <select
                value={layout_.type}
                onChange={(e) => {
                  let value_ = parseInt(e.target.value);
                  this.updateObj("layout", "type", layout, value_);
                }}
              >
                <option value="1">
                  {__("Layout One", "unlimited-blocks")}
                </option>
                <option value="2">
                  {__("Layout Two", "unlimited-blocks")}
                </option>
                <option value="3">
                  {__("Layout Three", "unlimited-blocks")}
                </option>
              </select>
            </div>
            {layout_.type == 3 && (
              <>
                <p>
                  <strong>{__("Content Placed", "unlimited-blocks")}</strong>
                </p>
                <Switcher
                  value={layout_.contentPlace}
                  navItem={[
                    {
                      name: "inner",
                      title: "Inner",
                    },
                    {
                      name: "outer",
                      title: "Outer",
                    },
                  ]}
                  clickme={(value_) => {
                    this.updateObj("layout", "contentPlace", layout, value_);
                  }}
                />
              </>
            )}
            {(layout_.type == 2 ||
              layout_.type == 1 ||
              (layout_.type == 3 && layout_.contentPlace == "inner")) && (
              <>
                <p>
                  <strong>{__("Content Alignment", "unlimited-blocks")}</strong>
                </p>

                <Switcher
                  value={layout_.contentAlign}
                  navItem={[
                    {
                      name: "center",
                      title: "Center",
                    },
                    {
                      name: "bottom",
                      title: "Bottom",
                    },
                  ]}
                  clickme={(value_) => {
                    this.updateObj("layout", "contentAlign", layout, value_);
                  }}
                />
              </>
            )}

            <BackgroundColor
              title="Image Overlay Color"
              value={{
                backgroundColorType: layout_.overlayColor.type,
                backgroundColor: layout_.overlayColor.color,
                backgroundImageGradient: layout_.overlayColor.gradient,
              }}
              changeme={(_properties) => {
                let getBgcolor = { ...layout_.overlayColor };
                getBgcolor["type"] = _properties.backgroundColorType;
                getBgcolor["color"] = _properties.backgroundColor;
                getBgcolor["gradient"] = _properties.backgroundImageGradient;
                this.updateObj("layout", "overlayColor", layout, getBgcolor);
              }}
            />
            <RangeControl
              label={__("Opacity", "unlimited-blocks")}
              value={layout_.overlayColor.opacity}
              min={0}
              max={10}
              step={1}
              onChange={(e) => {
                let getBgcolor = { ...layout_.overlayColor };
                getBgcolor["opacity"] = e;
                this.updateObj("layout", "overlayColor", layout, getBgcolor);
              }}
            />
            {/* bg color  */}
          </PanelBody>
          <PanelBody
            title={__("Post Title", "unlimited-blocks")}
            initialOpen={false}
          >
            {layout_.type != 3 && (
              <Switcher
                value={this.state.heading}
                navItem={[
                  {
                    name: "primary",
                    title: "Primary",
                  },
                  {
                    name: "secondary",
                    title: "Secondary",
                  },
                ]}
                clickme={(value_) => {
                  this.setState({ heading: value_ });
                }}
              />
            )}
            {this.state.heading == "primary" ? (
              <>
                <p>
                  <strong>{__("Post Title Tag", "unlimited-blocks")}</strong>
                </p>
                <select
                  value={heading_.tag}
                  className="ubl-block-select"
                  onChange={(e) => {
                    let value_ = e.target.value;
                    let font_ =
                      value_ == "h1"
                        ? 30
                        : value_ == "h2"
                        ? 25
                        : value_ == "h3"
                        ? 20
                        : 17;
                    let newHeading = [...heading];
                    newHeading[0]["tag"] = value_;
                    newHeading[0]["fontSize"] = font_;
                    setAttributes({ heading: newHeading });
                  }}
                >
                  <option value="h1">{__("H1", "unlimited-blocks")}</option>
                  <option value="h2">{__("H2", "unlimited-blocks")}</option>
                  <option value="h3">{__("H3", "unlimited-blocks")}</option>
                  <option value="p">{__("P", "unlimited-blocks")}</option>
                </select>
                <p>
                  <strong>{__("Font Size", "unlimited-blocks")}</strong>
                </p>
                <RangeControl
                  value={heading_.fontSize}
                  min={1}
                  max={50}
                  onChange={(e) =>
                    this.updateObj("heading", "fontSize", heading, e)
                  }
                />
                <p>
                  <strong>{__("Color", "unlimited-blocks")}</strong>
                </p>
                <ColorPalette
                  value={heading_.color}
                  onChange={(color) =>
                    this.updateObj("heading", "color", heading, color)
                  }
                />
              </>
            ) : (
              <>
                <p>
                  <strong>{__("Heading Tag", "unlimited-blocks")}</strong>
                </p>
                <select
                  value={heading2_.tag}
                  className="ubl-block-select"
                  onChange={(e) => {
                    let value_ = e.target.value;
                    let font_ =
                      value_ == "h1"
                        ? 30
                        : value_ == "h2"
                        ? 25
                        : value_ == "h3"
                        ? 20
                        : 17;
                    let newHeading = [...heading2];
                    newHeading[0]["tag"] = value_;
                    newHeading[0]["fontSize"] = font_;
                    setAttributes({ heading2: newHeading });
                  }}
                >
                  <option value="h1">{__("H1", "unlimited-blocks")}</option>
                  <option value="h2">{__("H2", "unlimited-blocks")}</option>
                  <option value="h3">{__("H3", "unlimited-blocks")}</option>
                  <option value="p">{__("P", "unlimited-blocks")}</option>
                </select>
                <p>
                  <strong>{__("Font Size", "unlimited-blocks")}</strong>
                </p>
                <RangeControl
                  value={heading2_.fontSize}
                  min={1}
                  max={50}
                  onChange={(e) =>
                    this.updateObj("heading2", "fontSize", heading2, e)
                  }
                />
                <p>
                  <strong>{__("Color", "unlimited-blocks")}</strong>
                </p>
                <ColorPalette
                  value={heading2_.color}
                  onChange={(color) =>
                    this.updateObj("heading2", "color", heading2, color)
                  }
                />
              </>
            )}
          </PanelBody>
          <PanelBody
            title={__("Excerpt / Content", "unlimited-blocks")}
            initialOpen={false}
          >
            {layout_.type != 3 && (
              <Switcher
                value={this.state.excerpt}
                navItem={[
                  {
                    name: "primary",
                    title: "Primary",
                  },
                  {
                    name: "secondary",
                    title: "Secondary",
                  },
                ]}
                clickme={(value_) => {
                  this.setState({ excerpt: value_ });
                }}
              />
            )}
            {this.state.excerpt == "primary" ? (
              <>
                <ToggleControl
                  label={
                    excerpt_.enable
                      ? __("Hide", "unlimited-blocks")
                      : __("Show", "unlimited-blocks")
                  }
                  checked={excerpt_.enable}
                  onChange={(e) =>
                    this.updateObj("excerpt", "enable", excerpt, e)
                  }
                />
                {excerpt_.enable && (
                  <>
                    <p>
                      <strong>{__("Font Size", "unlimited-blocks")}</strong>
                    </p>
                    <RangeControl
                      value={excerpt_.fontSize}
                      min={1}
                      max={25}
                      onChange={(e) =>
                        this.updateObj("excerpt", "fontSize", excerpt, e)
                      }
                    />
                    <p>
                      <strong>
                        {__("Number of words", "unlimited-blocks")}
                      </strong>
                    </p>
                    <RangeControl
                      value={excerpt_.words}
                      min={1}
                      max={200}
                      onChange={(e) =>
                        this.updateObj("excerpt", "words", excerpt, e)
                      }
                    />
                    <p>
                      <strong>{__("Color", "unlimited-blocks")}</strong>
                    </p>
                    <ColorPalette
                      value={excerpt_.color}
                      onChange={(color) =>
                        this.updateObj("excerpt", "color", excerpt, color)
                      }
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <ToggleControl
                  label={
                    excerpt2_.enable
                      ? __("Hide", "unlimited-blocks")
                      : __("Show", "unlimited-blocks")
                  }
                  checked={excerpt2_.enable}
                  onChange={(e) =>
                    this.updateObj("excerpt2", "enable", excerpt2, e)
                  }
                />
                {excerpt2_.enable && (
                  <>
                    <p>
                      <strong>
                        {__("Number of words", "unlimited-blocks")}
                      </strong>
                    </p>
                    <RangeControl
                      value={excerpt2_.words}
                      min={1}
                      max={200}
                      onChange={(e) =>
                        this.updateObj("excerpt2", "words", excerpt2, e)
                      }
                    />
                    <p>
                      <strong>{__("Font Size", "unlimited-blocks")}</strong>
                    </p>
                    <RangeControl
                      value={excerpt2_.fontSize}
                      min={1}
                      max={25}
                      onChange={(e) =>
                        this.updateObj("excerpt2", "fontSize", excerpt2, e)
                      }
                    />
                    <p>
                      <strong>{__("Color", "unlimited-blocks")}</strong>
                    </p>
                    <ColorPalette
                      value={excerpt2_.color}
                      onChange={(color) =>
                        this.updateObj("excerpt2", "color", excerpt2, color)
                      }
                    />
                  </>
                )}
              </>
            )}
          </PanelBody>
          <PanelBody
            title={__("Post Meta", "unlimited-blocks")}
            initialOpen={false}
          >
            {/* category */}
            <p>
              <strong>{__("Choose Category", "unlimited-blocks")}</strong>
            </p>

            {category && category.length > 0 ? (
              <ProductCategory
                value={postCategories.length ? postCategories : []}
                category={category}
                onMovement={(category) => {
                  setAttributes({ postCategories: category });
                  filterPostInit(this, {
                    postCategories: category,
                    featured_image: 1,
                  });
                }}
              />
            ) : (
              <p className="category-blank">
                {__("No Categories Found", "unlimited-blocks")}
              </p>
            )}

            {/* category */}
            {/* primery and secondary */}
            {layout_.type != 3 && (
              <Switcher
                value={this.state.metaChoose}
                navItem={[
                  {
                    name: "primary",
                    title: "Primary",
                  },
                  {
                    name: "secondary",
                    title: "Secondary",
                  },
                ]}
                clickme={(value_) => {
                  this.setState({ metaChoose: value_ });
                }}
              />
            )}
            {/* show author */}
            {this.state.metaChoose == "primary" ? (
              <>
                <ToggleControl
                  label={__("Author", "unlimited-blocks")}
                  checked={author_.enable}
                  onChange={(e) =>
                    this.updateObj("author", "enable", author, e)
                  }
                />
                {/* show date */}
                <ToggleControl
                  label={__("Date", "unlimited-blocks")}
                  checked={date_.enable}
                  onChange={(e) => this.updateObj("date", "enable", date, e)}
                />
                <ToggleControl
                  label={__("Categories", "unlimited-blocks")}
                  checked={showCate_.enable}
                  onChange={(e) =>
                    this.updateObj("showCate", "enable", showCate, e)
                  }
                />
                {/* show last date */}
                <ToggleControl
                  label={__("Last Modified Date", "unlimited-blocks")}
                  checked={date_.last_modified}
                  onChange={(e) =>
                    this.updateObj("date", "last_modified", date, e)
                  }
                />
                <ToggleControl
                  label={__("Tag", "unlimited-blocks")}
                  checked={showTag_.enable}
                  onChange={(e) =>
                    this.updateObj("showTag", "enable", showTag, e)
                  }
                />
                <p class="block-inside">
                  {__("Meta Custom Style", "unlimited-blocks")}
                </p>
                <p>
                  <strong>
                    {__("Author/Dates Font Size", "unlimited-blocks")}
                  </strong>
                </p>
                <RangeControl
                  value={meta_style_.fontSize}
                  min={1}
                  max={25}
                  onChange={(e) => {
                    this.updateObj("meta_style", "fontSize", meta_style, e);
                  }}
                />
                <p>
                  <strong>
                    {__("Author/Dates Color", "unlimited-blocks")}
                  </strong>
                </p>
                <ColorPalette
                  value={"color" in meta_style_ ? meta_style_.color : ""}
                  onChange={(color) =>
                    this.updateObj("meta_style", "color", meta_style, color)
                  }
                />
                {showCate_.enable && (
                  <>
                    <p class="block-inside">
                      {__("Category Custom Style", "unlimited-blocks")}
                    </p>
                    <p>
                      <strong>
                        {__("Number Category Per Post", "unlimited-blocks")}
                      </strong>
                    </p>
                    <RangeControl
                      value={showCate_.count}
                      min={1}
                      max={10}
                      onChange={(e) => {
                        this.updateObj("showCate", "count", showCate, e);
                      }}
                    />
                    <p>
                      <strong>{__("Font Size", "unlimited-blocks")}</strong>
                    </p>
                    <RangeControl
                      value={showCate_.fontSize}
                      min={1}
                      max={30}
                      onChange={(e) => {
                        this.updateObj("showCate", "fontSize", showCate, e);
                      }}
                    />
                    <ToggleControl
                      label={
                        showCate_.customColor
                          ? __("Custom Style", "unlimited-blocks")
                          : __("Default Style", "unlimited-blocks")
                      }
                      checked={showCate_.customColor}
                      onChange={(e) =>
                        this.updateObj("showCate", "customColor", showCate, e)
                      }
                    />
                    {showCate_.customColor && (
                      <>
                        <p>
                          <strong>{__("Color", "unlimited-blocks")}</strong>
                        </p>
                        <ColorPalette
                          value={showCate_.color}
                          onChange={(color) =>
                            this.updateObj("showCate", "color", showCate, color)
                          }
                        />
                        <p>
                          <strong>
                            {__("Background Color", "unlimited-blocks")}
                          </strong>
                        </p>

                        <ColorPalette
                          value={showCate_.backgroundColor}
                          onChange={(color) => {
                            this.updateObj(
                              "showCate",
                              "backgroundColor",
                              showCate,
                              color
                            );
                          }}
                        />
                      </>
                    )}
                  </>
                )}
                {showTag_.enable && (
                  <>
                    <p class="block-inside">
                      {__("Tags Custom Style", "unlimited-blocks")}
                    </p>
                    <p>
                      <strong>
                        {__("Number Tags Per Post", "unlimited-blocks")}
                      </strong>
                    </p>
                    <RangeControl
                      value={showTag_.count}
                      min={1}
                      max={10}
                      onChange={(e) => {
                        this.updateObj("showTag", "count", showTag, e);
                      }}
                    />
                    <p>
                      <strong>{__("Font Size", "unlimited-blocks")}</strong>
                    </p>
                    <RangeControl
                      value={showTag_.fontSize}
                      min={1}
                      max={30}
                      onChange={(e) => {
                        this.updateObj("showTag", "fontSize", showTag, e);
                      }}
                    />
                    <p>
                      <strong>{__("Color", "unlimited-blocks")}</strong>
                    </p>
                    <ColorPalette
                      value={showTag_.color}
                      onChange={(color) =>
                        this.updateObj("showTag", "color", showTag, color)
                      }
                    />
                    <p>
                      <strong>
                        {__("Background Color", "unlimited-blocks")}
                      </strong>
                    </p>

                    <ColorPalette
                      value={showTag_.backgroundColor}
                      onChange={(color) => {
                        this.updateObj(
                          "showTag",
                          "backgroundColor",
                          showTag,
                          color
                        );
                      }}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                {/* secondary  */}
                {/* show author */}
                <ToggleControl
                  label={__("Author", "unlimited-blocks")}
                  checked={author2_.enable}
                  onChange={(e) =>
                    this.updateObj("author2", "enable", author2, e)
                  }
                />
                {/* show date */}
                <ToggleControl
                  label={__("Date", "unlimited-blocks")}
                  checked={date2_.enable}
                  onChange={(e) => this.updateObj("date2", "enable", date2, e)}
                />
                <ToggleControl
                  label={__("Categories", "unlimited-blocks")}
                  checked={showCate2_.enable}
                  onChange={(e) =>
                    this.updateObj("showCate2", "enable", showCate2, e)
                  }
                />
                {/* show last date */}
                <ToggleControl
                  label={__("Last Modified Date", "unlimited-blocks")}
                  checked={date2_.last_modified}
                  onChange={(e) =>
                    this.updateObj("date2", "last_modified", date2, e)
                  }
                />
                <ToggleControl
                  label={__("Tag", "unlimited-blocks")}
                  checked={showTag2_.enable}
                  onChange={(e) =>
                    this.updateObj("showTag2", "enable", showTag2, e)
                  }
                />
                <p class="block-inside">
                  {__("Meta Custom Style", "unlimited-blocks")}
                </p>
                <p>
                  <strong>
                    {__("Author/Dates Font Size", "unlimited-blocks")}
                  </strong>
                </p>
                <RangeControl
                  value={meta_style2_.fontSize}
                  min={1}
                  max={25}
                  onChange={(e) => {
                    this.updateObj("meta_style2", "fontSize", meta_style2, e);
                  }}
                />
                <p>
                  <strong>
                    {__("Author/Dates Color", "unlimited-blocks")}
                  </strong>
                </p>
                <ColorPalette
                  value={"color" in meta_style2_ ? meta_style2_.color : ""}
                  onChange={(color) =>
                    this.updateObj("meta_style2", "color", meta_style2, color)
                  }
                />
                {showCate2_.enable && (
                  <>
                    <p class="block-inside">
                      {__("Category Custom Style", "unlimited-blocks")}
                    </p>
                    <p>
                      <strong>
                        {__("Number Category Per Post", "unlimited-blocks")}
                      </strong>
                    </p>
                    <RangeControl
                      value={showCate2_.count}
                      min={1}
                      max={10}
                      onChange={(e) => {
                        this.updateObj("showCate2", "count", showCate2, e);
                      }}
                    />
                    <p>
                      <strong>{__("Font Size", "unlimited-blocks")}</strong>
                    </p>
                    <RangeControl
                      value={showCate2_.fontSize}
                      min={1}
                      max={30}
                      onChange={(e) => {
                        this.updateObj("showCate2", "fontSize", showCate2, e);
                      }}
                    />
                    <ToggleControl
                      label={
                        showCate2_.customColor
                          ? __("Custom Style", "unlimited-blocks")
                          : __("Default Style", "unlimited-blocks")
                      }
                      checked={showCate2_.customColor}
                      onChange={(e) =>
                        this.updateObj("showCate2", "customColor", showCate2, e)
                      }
                    />
                    {showCate2_.customColor && (
                      <>
                        <p>
                          <strong>{__("Color", "unlimited-blocks")}</strong>
                        </p>
                        <ColorPalette
                          value={showCate2_.color}
                          onChange={(color) =>
                            this.updateObj(
                              "showCate2",
                              "color",
                              showCate2,
                              color
                            )
                          }
                        />
                        <p>
                          <strong>
                            {__("Background Color", "unlimited-blocks")}
                          </strong>
                        </p>
                        <ColorPalette
                          value={showCate2_.backgroundColor}
                          onChange={(color) => {
                            this.updateObj(
                              "showCate2",
                              "backgroundColor",
                              showCate2,
                              color
                            );
                          }}
                        />
                      </>
                    )}
                  </>
                )}
                {showTag2_.enable && (
                  <>
                    <p class="block-inside">
                      {__("Tags Custom Style", "unlimited-blocks")}
                    </p>
                    <p>
                      <strong>
                        {__("Number Tags Per Post", "unlimited-blocks")}
                      </strong>
                    </p>
                    <RangeControl
                      value={showTag2_.count}
                      min={1}
                      max={10}
                      onChange={(e) => {
                        this.updateObj("showTag2", "count", showTag2, e);
                      }}
                    />
                    <p>
                      <strong>{__("Font Size", "unlimited-blocks")}</strong>
                    </p>
                    <RangeControl
                      value={showTag2_.fontSize}
                      min={1}
                      max={30}
                      onChange={(e) => {
                        this.updateObj("showTag2", "fontSize", showTag2, e);
                      }}
                    />
                    <p>
                      <strong>{__("Color", "unlimited-blocks")}</strong>
                    </p>
                    <ColorPalette
                      value={showTag2_.color}
                      onChange={(color) =>
                        this.updateObj("showTag2", "color", showTag2, color)
                      }
                    />
                    <p>
                      <strong>
                        {__("Background Color", "unlimited-blocks")}
                      </strong>
                    </p>
                    <ColorPalette
                      value={showTag2_.backgroundColor}
                      onChange={(color) => {
                        this.updateObj(
                          "showTag",
                          "backgroundColor",
                          showTag2,
                          color
                        );
                      }}
                    />
                  </>
                )}
              </>
            )}
            {/* secondary  */}
            <p>
              <strong>{__("Color", "unlimited-blocks")}</strong>
            </p>
            <ColorPalette
              value={"color" in meta_style_ ? meta_style_.color : ""}
              onChange={(color) =>
                this.updateObj("meta_style", "color", meta_style, color)
              }
            />
          </PanelBody>
          {posts && posts.length > 0 && posts.length < totalPost && (
            <PanelBody title="Next / Previous Button" initialOpen={false}>
              <ToggleControl
                label={__("Enable", "unlimited-blocks")}
                checked={meta_style_.npEnable}
                onChange={(e) =>
                  this.updateObj("meta_style", "npEnable", meta_style, e)
                }
              />
              {meta_style_.npEnable && (
                <>
                  <p>
                    <strong>{__("Font Size", "unlimited-blocks")}</strong>
                  </p>
                  <RangeControl
                    value={meta_style_.npBgfontSize}
                    min={1}
                    max={30}
                    onChange={(e) => {
                      this.updateObj(
                        "meta_style",
                        "npBgfontSize",
                        meta_style,
                        e
                      );
                    }}
                  />
                  <p>
                    <strong>{__("Color", "unlimited-blocks")}</strong>
                  </p>
                  <ColorPalette
                    value={meta_style_.npColor}
                    onChange={(color) =>
                      this.updateObj("meta_style", "npColor", meta_style, color)
                    }
                  />
                  <p>
                    <strong>
                      {__("Background Color", "unlimited-blocks")}
                    </strong>
                  </p>
                  <ColorPalette
                    value={meta_style_.npBgColor}
                    onChange={(color) => {
                      this.updateObj(
                        "meta_style",
                        "npBgColor",
                        meta_style,
                        color
                      );
                    }}
                  />
                </>
              )}
            </PanelBody>
          )}
        </InspectorControls>
        {posts && posts.length > 0 ? (
          <div className="ubl-section-post">
            {title_.enable && (
              <div
                className="ubl-block-post-title"
                style={{
                  justifyContent: title_.align,
                  borderColor: title_.backgroundColor,
                }}
              >
                <RichText
                  allowedFormats={[]}
                  key="editable"
                  tagName="h4"
                  placeholder={__("My block title", "unlimited-blocks")}
                  value={title_.value}
                  style={{
                    fontSize: title_.fontSize + "px",
                    color: title_.color,
                    backgroundColor: title_.backgroundColor,
                    fontWeight: title_.fontWeight,
                    minWidth: title_.width + "%",
                  }}
                  onChange={(e) => this.updateObj("title", "value", title, e)}
                />
              </div>
            )}

            <div
              className={`parent-column-two count-3 post-three-layout-${layout_.type} content-align-${layout_.contentAlign} content-placed-${layout_.contentPlace}`}
            >
              {layout_.type == 3 ? (
                posts.map((post, in_) => {
                  return this.returnHtml(
                    post,
                    heading_,
                    author_,
                    date_,
                    meta_style_,
                    showCate_,
                    excerpt_,
                    showTag_,
                    layout_
                  );
                })
              ) : (
                <>
                  {posts === 'undefined' && layout_.type == "2" ? (
                    <>
                      <div>
                        <div className="column-count column-count-1">
                          {posts.map((post, in_) => {
                            return (
                              in_ < 2 &&
                              this.returnHtml(
                                post,
                                heading2_,
                                author2_,
                                date2_,
                                meta_style2_,
                                showCate2_,
                                excerpt2_,
                                showTag2_,
                                layout_
                              )
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <div className="column-count column-count-1">
                          {this.returnHtml(
                            posts[2],
                            heading_,
                            author_,
                            date_,
                            meta_style_,
                            showCate_,
                            excerpt_,
                            showTag_,
                            layout_
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="column-count column-count-1">
                          {this.returnHtml(
                            posts[0],
                            heading_,
                            author_,
                            date_,
                            meta_style_,
                            showCate_,
                            excerpt_,
                            showTag_,
                            layout_
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="column-count column-count-1">
                          {posts.map((post, in_) => {
                            return (
                              in_ != 0 &&
                              this.returnHtml(
                                post,
                                heading2_,
                                author2_,
                                date2_,
                                meta_style2_,
                                showCate2_,
                                excerpt2_,
                                showTag2_,
                                layout_
                              )
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
            {meta_style_.npEnable && posts.length < totalPost && (
              <div className="ubl-two-post-wrapper-next-prev">
                {/* npBgfontSize npColor npBgColor */}
                <div
                  style={{
                    fontSize: meta_style_.npBgfontSize,
                    color: meta_style_.npColor,
                    backgroundColor: meta_style_.npBgColor,
                  }}
                >
                  <i class="fas fa-chevron-left"></i>
                </div>
                <div
                  style={{
                    fontSize: meta_style_.npBgfontSize,
                    color: meta_style_.npColor,
                    backgroundColor: meta_style_.npBgColor,
                  }}
                >
                  <i class="fas fa-chevron-right"></i>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>{!posts ? <PostNotfound /> : <PostLoader />}</div>
        )}
      </>
    );
    // ++++++++++++++===============
  }
  returnHtml = (
    post,
    heading_,
    author_,
    date_,
    meta_style_,
    showCate_,
    excerpt_,
    showTag_,
    layout_
  ) => {
    let postAuthor = author_ && author_.enable ? post.author : false;
    // layout_.overlayColor;
    let bgColorOrGRadient = { opacity: layout_.overlayColor.opacity / 10 };
    if (layout_.overlayColor.type == "color") {
      bgColorOrGRadient["backgroundColor"] = layout_.overlayColor.color;
    } else {
      bgColorOrGRadient["backgroundImage"] = layout_.overlayColor.gradient;
    }
    return (
      <article className="block-post-article">
        <div className="post-wrapper">
          <div className="featured-image">
            <img src={post.feature_image} />
          </div>
          <div className="post-content-overlay" style={bgColorOrGRadient}></div>
          <div className="post-content">
            {showCate_ && showCate_.enable && (
              <p className="post-category">
                {showCateFn(this.props, post.post_categories, showCate_)}
              </p>
            )}
            <RichText.Content
              className="post-heading"
              tagName={heading_.tag}
              value={post.postTitle}
              style={{
                fontSize: heading_.fontSize + "px",
                color: heading_.color,
              }}
            />
            <div className="post-meta-all">
              {postAuthor && (
                <p
                  style={{
                    color: meta_style_.color,
                    fontSize: meta_style_.fontSize + "px",
                  }}
                  className="post-author"
                >
                  {postAuthor}
                </p>
              )}
              {date_.enable && (
                <>
                  {postAuthor && (
                    <span
                      style={{
                        color: meta_style_.color,
                        fontSize: meta_style_.fontSize + "px",
                      }}
                      className="slash"
                    >
                      /
                    </span>
                  )}
                  <p
                    style={{
                      color: meta_style_.color,
                      fontSize: meta_style_.fontSize + "px",
                    }}
                    className="post-date"
                  >
                    <span>{post.post_date}</span>
                  </p>
                </>
              )}
              {date_.last_modified && (
                <>
                  {(date_.enable || postAuthor) && (
                    <span
                      style={{
                        color: meta_style_.color,
                        fontSize: meta_style_.fontSize + "px",
                      }}
                      className="slash"
                    >
                      /
                    </span>
                  )}
                  <p
                    style={{
                      color: meta_style_.color,
                      fontSize: meta_style_.fontSize + "px",
                    }}
                    className="post-date-last-modified"
                  >
                    <span>{__("Modified", "unlimited-blocks")}: </span>
                    <span>{post.post_modified_date}</span>
                  </p>
                </>
              )}
            </div>
            {excerpt_ && excerpt_.enable && (
              <p
                style={{
                  color: excerpt_.color,
                  fontSize: excerpt_.fontSize + "px",
                }}
                className="post-excerpt"
              >
                {excerptWords(excerpt_.words, post.post_excerpt)}
                <span className="read-more">
                  ...{__("Read More", "unlimited-blocks")}
                </span>
              </p>
            )}
            {showTag_ && showTag_.enable && (
              <p style={{ color: meta_style_.color }} className="post-tags">
                {showTagsFn(post.post_tag, showTag_)}
              </p>
            )}
          </div>
        </div>
      </article>
    );
  };
}
export default Edit;
