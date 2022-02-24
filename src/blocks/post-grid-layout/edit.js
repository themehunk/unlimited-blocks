import { Component } from "@wordpress/element";
import {
  InspectorControls,
  RichText,
  ColorPalette,
} from "@wordpress/block-editor";
import {
  PanelBody,
  RangeControl,
  ToggleControl,
  SelectControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import {
  showCateFn,
  showTagsFn,
  excerptWords,
  filterPostInit,
  firstTimeInit,
  categoryList,
  PostLoader,
  PostNotfound,
} from "../block-assets/post-functions";
import BackgroundColor from "../block-assets/utility-components/backgroundType/backgroundColor";
import cloneDeep from "clone-deep";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      category: [],
      totalPost: null,
    };
  }
  componentDidMount() {
    let { thumbnail } = this.props.attributes;
    let sendData = {};
    if (thumbnail[0].typeShow == "1") {
      sendData["featured_image"] = 1;
    }
    firstTimeInit(this, sendData);
  }
  updateObj = (parent_key, child_key, initialValue, value_) => {
    let newNewValue = cloneDeep(initialValue);
    newNewValue[0][child_key] = value_;
    let setAttr_ = {};
    setAttr_[parent_key] = newNewValue;
    this.props.setAttributes(setAttr_);
  };
  render() {
    const { attributes, setAttributes } = this.props;
    const { posts, category, totalPost } = this.state;
    let {
      heading,
      author,
      numberOfPosts,
      thumbnail,
      numberOfColumn,
      date,
      showTag,
      showCate,
      excerpt,
      postCategories,
      meta_style,
      title,
    } = attributes;
    let heading_ = heading[0];
    let thumbnail_ = thumbnail[0];
    let excerpt_ = excerpt[0];
    let date_ = date[0];
    let author_ = author[0];
    let meta_style_ = meta_style[0];
    let title_ = title[0];
    let showTag_ = showTag[0];
    let showCate_ = showCate[0];
    // category init
    let cateGory = [];
    if (!category) {
      cateGory = false;
    } else {
      cateGory = categoryList(category);
    }
    // meta_style_.blockBgColor;
    let bgColorOrGRadient = {};
    if (meta_style_.blockBgColor.type == "color") {
      bgColorOrGRadient = { backgroundColor: meta_style_.blockBgColor.color };
    } else {
      bgColorOrGRadient = {
        backgroundImage: meta_style_.blockBgColor.gradient,
      };
    }
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
                  onChange={(color) =>
                    this.updateObj("title", "backgroundColor", title, color)
                  }
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
            <p>
              <strong>{__("Column", "unlimited-blocks")}</strong>
            </p>
            <RangeControl
              value={numberOfColumn}
              min={2}
              max={6}
              onChange={(e) => {
                setAttributes({ numberOfColumn: e });
              }}
            />
            <p>
              <strong>
                {__("Number of Post Display", "unlimited-blocks")}
              </strong>
            </p>
            <RangeControl
              value={numberOfPosts}
              min={1}
              max={24}
              onChange={(e) => {
                setAttributes({ numberOfPosts: e });
                filterPostInit(this, {
                  numberOfPosts: e,
                  featured_image: this.props.attributes.thumbnail[0].typeShow,
                });
              }}
            />
            <ToggleControl
              label={__("Left Border", "unlimited-blocks")}
              checked={meta_style_.left_border}
              onChange={(e) =>
                this.updateObj("meta_style", "left_border", meta_style, e)
              }
            />

            <BackgroundColor
              title={__("Block Background Color", "unlimited-blocks")}
              value={{
                backgroundColorType: meta_style_.blockBgColor.type,
                backgroundColor: meta_style_.blockBgColor.color,
                backgroundImageGradient: meta_style_.blockBgColor.gradient,
              }}
              changeme={(_properties) => {
                // console.log("_properties", _properties);
                let getBgcolor = { ...meta_style_.blockBgColor };
                getBgcolor["type"] = _properties.backgroundColorType;
                getBgcolor["color"] = _properties.backgroundColor;
                getBgcolor["gradient"] = _properties.backgroundImageGradient;
                this.updateObj(
                  "meta_style",
                  "blockBgColor",
                  meta_style,
                  getBgcolor
                );
              }}
            />
            {/* bg color  */}
          </PanelBody>
          <PanelBody
            title={__("Post Title", "unlimited-blocks")}
            initialOpen={false}
          >
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
          </PanelBody>
          <PanelBody
            title={__("Excerpt / Content", "unlimited-blocks")}
            initialOpen={false}
          >
            <ToggleControl
              label={
                excerpt_.enable
                  ? __("Show", "unlimited-blocks")
                  : __("Hide", "unlimited-blocks")
              }
              checked={excerpt_.enable}
              onChange={(e) => this.updateObj("excerpt", "enable", excerpt, e)}
            />
            {excerpt_.enable && (
              <>
                <p>
                  <strong>{__("Number of words", "unlimited-blocks")}</strong>
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
          </PanelBody>
          <PanelBody
            title={__("Post Featured Image", "unlimited-blocks")}
            initialOpen={false}
          >
            <select
              value={thumbnail_.typeShow}
              className="ubl-block-select"
              onChange={(e) => {
                let value_ = e.target.value;
                this.updateObj("thumbnail", "typeShow", thumbnail, value_);
                filterPostInit(this, {
                  featured_image: value_,
                });
              }}
            >
              <option value="all">{__("All Post", "unlimited-blocks")}</option>
              <option value="1">
                {__("Only Featured Image Post", "unlimited-blocks")}
              </option>
            </select>

            {(thumbnail_.typeShow == "all" || thumbnail_.typeShow == "1") && (
              <>
                <p>
                  <strong>{__("Border Radius", "unlimited-blocks")}</strong>
                </p>
                <RangeControl
                  value={thumbnail_.borderRadius}
                  min={0}
                  max={80}
                  onChange={(e) =>
                    this.updateObj("thumbnail", "borderRadius", thumbnail, e)
                  }
                />
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
            {cateGory && cateGory.length > 0 ? (
              <div className="ubl-multiple-select">
                <SelectControl
                  multiple
                  value={postCategories.length ? postCategories : ["all"]}
                  onChange={(choosen) => {
                    let chooseAll = choosen.filter((choose) => {
                      if (choose == "all") return true;
                    });
                    if (chooseAll.length) choosen = [];
                    setAttributes({ postCategories: choosen });
                    filterPostInit(this, {
                      postCategories: choosen,
                      featured_image:
                        this.props.attributes.thumbnail[0].typeShow,
                    });
                  }}
                  options={cateGory}
                />
              </div>
            ) : (
              <p className="category-blank">
                {__("No Categories Found", "unlimited-blocks")}
              </p>
            )}

            {/* category */}
            {/* show author */}
            <ToggleControl
              label={__("Author", "unlimited-blocks")}
              checked={author_.enable}
              onChange={(e) => this.updateObj("author", "enable", author, e)}
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
              onChange={(e) => this.updateObj("date", "last_modified", date, e)}
            />
            <ToggleControl
              label={__("Tag", "unlimited-blocks")}
              checked={showTag_.enable}
              onChange={(e) => this.updateObj("showTag", "enable", showTag, e)}
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
              <strong>{__("Author/Dates Color", "unlimited-blocks")}</strong>
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
                  <strong>{__("Background Color", "unlimited-blocks")}</strong>
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
          </PanelBody>
          {totalPost && totalPost > posts.length && (
            <PanelBody
              title={__("Next / Previous Button", "unlimited-blocks")}
              initialOpen={false}
            >
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
                    <strong>
                      {__("Pagination Number", "unlimited-blocks")}
                    </strong>
                  </p>
                  <ToggleControl
                    label={
                      meta_style_.npPagination
                        ? __("Pagination On", "unlimited-blocks")
                        : __("Next Previous On", "unlimited-blocks")
                    }
                    checked={meta_style_.npPagination}
                    onChange={(e) =>
                      this.updateObj(
                        "meta_style",
                        "npPagination",
                        meta_style,
                        e
                      )
                    }
                  />
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
          <div className="ubl-block-post" style={bgColorOrGRadient}>
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
              className={`column-count column-count-${numberOfColumn} ${
                meta_style_.left_border && "left-border"
              }`}
            >
              {posts.map((post) => {
                let postAuthor =
                  author_ && author_.enable ? post.author : false;
                return thumbnail_.typeShow == "1" &&
                  post.feature_image != "" ? (
                  <article className="block-post-article">
                    <div className="post-wrapper">
                      <div className="featured-image">
                        <img
                          style={{
                            borderRadius: thumbnail_.borderRadius + "px",
                          }}
                          src={post.feature_image}
                        />
                      </div>
                      <div className="post-content">
                        {showCate_.enable && (
                          <p className="post-category">
                            {showCateFn(
                              this.props,
                              post.post_categories,
                              showCate_
                            )}
                          </p>
                        )}
                        <RichText.Content
                          className="post-heading"
                          tagName={heading_.tag}
                          value={__(post.postTitle, "unlimited-blocks")}
                          style={{
                            fontSize: heading_.fontSize,
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
                              {(postAuthor || date_.enable) && (
                                <span
                                  style={{
                                    color: meta_style_.color,
                                    fontSize: meta_style_.fontSize,
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
                                <span>
                                  {__("Modified:", "unlimited-blocks")}{" "}
                                </span>
                                <span>{post.post_modified_date}</span>
                              </p>
                            </>
                          )}
                        </div>
                        {excerpt_.enable && (
                          <p
                            style={{
                              color: excerpt_.color,
                              fontSize: excerpt_.fontSize + "px",
                            }}
                            className="post-excerpt"
                          >
                            {excerptWords(excerpt_.words, post.post_excerpt)}
                          </p>
                        )}
                        {showTag_.enable && (
                          <p className="post-tags">
                            {showTagsFn(post.post_tag, showTag_)}
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                ) : thumbnail_.typeShow != "1" ? (
                  <article className="block-post-article">
                    <div className="post-wrapper">
                      {post.feature_image &&
                        post.feature_image != "" &&
                        thumbnail_.typeShow == "all" && (
                          <div className="featured-image">
                            <img
                              style={{
                                borderRadius: thumbnail_.borderRadius + "px",
                              }}
                              src={post.feature_image}
                            />
                          </div>
                        )}
                      <div className="post-content">
                        {showCate_.enable && (
                          <p className="post-category">
                            {showCateFn(
                              this.props,
                              post.post_categories,
                              showCate_
                            )}
                          </p>
                        )}
                        <RichText.Content
                          className="post-heading"
                          tagName={heading_.tag}
                          value={__(post.postTitle, "unlimited-blocks")}
                          style={{
                            fontSize: heading_.fontSize,
                            color: heading_.color,
                          }}
                        />
                        <div className="post-meta-all">
                          {postAuthor && (
                            <p
                              style={{
                                color: meta_style_.color,
                                fontSize: meta_style_.fontSize,
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
                                    fontSize: meta_style_.fontSize,
                                  }}
                                  className="slash"
                                >
                                  /
                                </span>
                              )}
                              <p
                                style={{
                                  color: meta_style_.color,
                                  fontSize: meta_style_.fontSize,
                                }}
                                className="post-date"
                              >
                                <span>{post.post_date}</span>
                              </p>
                            </>
                          )}
                          {date_.last_modified && (
                            <>
                              {(postAuthor || date_.enable) && (
                                <span
                                  style={{
                                    color: meta_style_.color,
                                    fontSize: meta_style_.fontSize,
                                  }}
                                  className="slash"
                                >
                                  /
                                </span>
                              )}
                              <p
                                style={{
                                  color: meta_style_.color,
                                  fontSize: meta_style_.fontSize,
                                }}
                                className="post-date-last-modified"
                              >
                                <span>
                                  {__("Modified:", "unlimited-blocks")}{" "}
                                </span>
                                <span>{post.post_modified_date}</span>
                              </p>
                            </>
                          )}
                        </div>
                        {excerpt_.enable && (
                          <p
                            style={{ color: excerpt_.color }}
                            className="post-excerpt"
                          >
                            {excerptWords(excerpt_.words, post.post_excerpt)}
                          </p>
                        )}
                        {showTag_.enable && (
                          <p className="post-tags">
                            {showTagsFn(post.post_tag, showTag_)}
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                ) : (
                  ""
                );
              })}
            </div>
            {meta_style_.npEnable && totalPost && totalPost > posts.length ? (
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
                {meta_style_.npPagination && (
                  <section className="paginationNumbers">
                    {[1, 2, 3].map((pagiV) => {
                      return (
                        <div
                          className="ubl-image-section-np  pagination"
                          style={{
                            fontSize: meta_style_.npBgfontSize,
                            color: meta_style_.npColor,
                            backgroundColor: meta_style_.npBgColor,
                          }}
                        >
                          {pagiV}
                        </div>
                      );
                    })}
                    <div class="dots pagination">
                      <span>...</span>
                    </div>
                    <div
                      className="ubl-image-section-np  pagination"
                      style={{
                        fontSize: meta_style_.npBgfontSize,
                        color: meta_style_.npColor,
                        backgroundColor: meta_style_.npBgColor,
                      }}
                    >
                      4
                    </div>
                  </section>
                )}
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
            ) : (
              ""
            )}
          </div>
        ) : (
          <div>{!posts ? <PostNotfound /> : <PostLoader />}</div>
        )}
      </>
    );
  }
}
export default Edit;
