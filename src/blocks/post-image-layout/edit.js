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
  PostLoader,
  PostNotfound,
} from "../block-assets/post-functions";
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
    const { posts, category, totalPost, heading: stateHeading } = this.state;

    let {
      heading,
      author,
      numberOfPosts,
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
    // secondary
    let heading2_ = heading2[0];
    let excerpt2_ = excerpt2[0];
    let showCate2_ = showCate2[0];
    let showTag2_ = showTag2[0];
    let date2_ = date2[0];
    let author2_ = author2[0];
    // if number of post sum
    // console.log("state", this.state);

    // if (
    //   (numberOfPosts == 3 || numberOfPosts == 5) &&
    //   (this.state.metaChoose == "secondary" ||
    //     this.state.excerpt == "secondary" ||
    //     stateHeading == "secondary")
    // ) {
    //   this.setState({
    //     metaChoose: "primary",
    //     excerpt: "primary",
    //     heading: "primary",
    //   });
    // }
    // category init
    // let cateGory = [];
    // if (!category) {
    //   cateGory = false;
    // } else {
    //   cateGory = categoryList(category);
    // }
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
                  <strong>{__("Max Width %", "unlimited-blocks")}</strong>
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
            <p>
              <strong>
                {__("Number of Post Display", "unlimited-blocks")}
              </strong>
            </p>
            <RangeControl
              value={numberOfPosts}
              min={1}
              max={6}
              onChange={(e) => {
                setAttributes({ numberOfPosts: e });
                filterPostInit(this, { numberOfPosts: e, featured_image: 1 });
              }}
            />
          </PanelBody>
          <PanelBody
            title={__("Post Title", "unlimited-blocks")}
            initialOpen={false}
          >
            {(numberOfPosts == 3 || numberOfPosts == 5) && (
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
            {(numberOfPosts == 3 || numberOfPosts == 5) && (
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
                    featured_image: this.props.attributes.thumbnail[0].typeShow,
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
            {(numberOfPosts == 3 || numberOfPosts == 5) && (
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
                    {/* <ColorPicker
                      color={showTag_.backgroundColor}
                      onChangeComplete={(colorBg) => {
                        let color = `rgba(${colorBg.rgb.r},${colorBg.rgb.g},${colorBg.rgb.b},${colorBg.rgb.a})`;
                        this.updateObj(
                          "showTag",
                          "backgroundColor",
                          showTag,
                          color
                        );
                      }}
                    /> */}
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
                        {/* <ColorPicker
                          color={showCate2_.backgroundColor}
                          onChangeComplete={(colorBg) => {
                            let color = `rgba(${colorBg.rgb.r},${colorBg.rgb.g},${colorBg.rgb.b},${colorBg.rgb.a})`;
                            this.updateObj(
                              "showCate2",
                              "backgroundColor",
                              showCate2,
                              color
                            );
                          }}
                        /> */}
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
                    {/* <ColorPicker
                      color={showTag2_.backgroundColor}
                      onChangeComplete={(colorBg) => {
                        let color = `rgba(${colorBg.rgb.r},${colorBg.rgb.g},${colorBg.rgb.b},${colorBg.rgb.a})`;
                        this.updateObj(
                          "showTag",
                          "backgroundColor",
                          showTag2,
                          color
                        );
                      }}
                    /> */}
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
                    width: title_.width + "%",
                  }}
                  onChange={(e) => this.updateObj("title", "value", title, e)}
                />
              </div>
            )}
            {(posts.length == 1 ||
              posts.length == 2 ||
              posts.length == 4 ||
              posts.length == 6) && (
              <div
                className={`column-count column-count-${
                  posts.length == 2 || posts.length == 4
                    ? 2
                    : posts.length == 6
                    ? 3
                    : 1
                }`}
              >
                {posts.map((post) => {
                  return this.returnHtml(
                    post,
                    heading_,
                    author_,
                    date_,
                    meta_style_,
                    showCate_,
                    excerpt_,
                    showTag_
                  );
                })}
              </div>
            )}
            {(posts.length == 3 || posts.length == 5) && (
              <div
                className={`parent-column-two count-${
                  posts.length == 3 ? 3 : 5
                }`}
              >
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
                      showTag_
                    )}
                  </div>
                </div>
                <div>
                  <div
                    className={`column-count column-count-${
                      posts.length == 3 ? 1 : 2
                    }`}
                  >
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
                          showTag2_
                        )
                      );
                    })}
                  </div>
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
    showTag_
  ) => {
    let postAuthor = author_ && author_.enable ? post.author : false;
    return (
      <article className="block-post-article">
        <div className="post-wrapper">
          <div className="featured-image">
            <img src={post.feature_image} />
          </div>
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
