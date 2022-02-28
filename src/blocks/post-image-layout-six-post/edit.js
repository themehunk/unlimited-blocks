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
import ProductCategory from "../block-assets/woocommerce/productCategory";
import BackgroundColor from "../block-assets/utility-components/backgroundType/backgroundColor";
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
    let sendData = { featured_image: 1 };
    firstTimeInit(this, sendData);
  }
  updateObj = (parent_key, child_key, initialValue, value_) => {
    let newNewValue = { ...initialValue };
    newNewValue[child_key] = value_;
    let setAttr_ = {};
    setAttr_[parent_key] = newNewValue;
    this.props.setAttributes(setAttr_);
  };
  render() {
    // ++++++++++++++===============
    // console.log("post ", this.props);
    const { attributes, setAttributes } = this.props;
    const { posts, category } = this.state;
    let {
      heading: heading_,
      author: author_,
      // numberOfPosts,
      date: date_,
      showTag: showTag_,
      showCate: showCate_,
      excerpt: excerpt_,
      postCategories,
      meta_style: meta_style_,
      title: title_,
      layout,
      preview,
    } = attributes;
    if (preview) {
      return <img src={`${plugin_url.url}assets/img/image-layout-5.png`} />;
    }
    return (
      <>
        <InspectorControls>
          <PanelBody
            title={__("Block Title", "unlimited-blocks")}
            initialOpen={false}
          >
            <BackgroundColor
              title="Image Overlay Color"
              value={{
                backgroundColorType: layout.overlayColor.type,
                backgroundColor: layout.overlayColor.color,
                backgroundImageGradient: layout.overlayColor.gradient,
              }}
              changeme={(_properties) => {
                let getBgcolor = { ...layout.overlayColor };
                getBgcolor["type"] = _properties.backgroundColorType;
                getBgcolor["color"] = _properties.backgroundColor;
                getBgcolor["gradient"] = _properties.backgroundImageGradient;
                this.updateObj("layout", "overlayColor", layout, getBgcolor);
              }}
            />
            <RangeControl
              label={__("Opacity", "unlimited-blocks")}
              value={layout.overlayColor.opacity}
              min={0}
              max={10}
              step={1}
              onChange={(e) => {
                let getBgcolor = { ...layout.overlayColor };
                getBgcolor["opacity"] = e;
                this.updateObj("layout", "overlayColor", layout, getBgcolor);
              }}
            />
            <ToggleControl
              label={
                title_.enable
                  ? __("Show", "unlimited-blocks")
                  : __("Hide", "unlimited-blocks")
              }
              checked={title_.enable}
              onChange={(e) => this.updateObj("title", "enable", title_, e)}
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
                        this.updateObj("title", "align", title_, "left");
                      }}
                      className={`dashicons dashicons-editor-alignleft ${
                        title_.align == "left" && "active"
                      }`}
                    ></span>
                  </div>
                  <div>
                    <span
                      onClick={() => {
                        this.updateObj("title", "align", title_, "center");
                      }}
                      className={`dashicons dashicons-editor-aligncenter ${
                        title_.align == "center" && "active"
                      }`}
                    ></span>
                  </div>
                  <div>
                    <span
                      onClick={() => {
                        this.updateObj("title", "align", title_, "flex-end");
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
                    this.updateObj("title", "fontSize", title_, e);
                  }}
                />
                <p>
                  <strong>{__("Color", "unlimited-blocks")}</strong>
                </p>
                <ColorPalette
                  value={title_.color}
                  onChange={(color) =>
                    this.updateObj("title", "color", title_, color)
                  }
                />
                <p>
                  <strong>{__("Background Color", "unlimited-blocks")}</strong>
                </p>

                <ColorPalette
                  value={title_.backgroundColor}
                  onChange={(color) => {
                    this.updateObj("title", "backgroundColor", title_, color);
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
                        title_,
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
                    this.updateObj("title", "width", title_, e);
                  }}
                />
              </>
            )}
          </PanelBody>
          {/* <PanelBody
            title={__("Post Layout", "unlimited-blocks")}
            initialOpen={false}
          >
            <p>
              <strong>{__("Number of Post Display", "unlimited-blocks")}</strong>
            </p>
            <RangeControl
              value={numberOfPosts}
              min={1}
              max={6}
              onChange={(e) => {
                setAttributes({ numberOfPosts: e });
              }}
            />
          </PanelBody> */}
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
                let newHeading = { ...heading_ };
                newHeading["tag"] = value_;
                newHeading["fontSize"] = font_;
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
                this.updateObj("heading", "fontSize", heading_, e)
              }
            />
            <p>
              <strong>{__("Color", "unlimited-blocks")}</strong>
            </p>
            <ColorPalette
              value={heading_.color}
              onChange={(color) =>
                this.updateObj("heading", "color", heading_, color)
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
                  ? __("Hide", "unlimited-blocks")
                  : __("Show", "unlimited-blocks")
              }
              checked={excerpt_.enable}
              onChange={(e) => this.updateObj("excerpt", "enable", excerpt_, e)}
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
                    this.updateObj("excerpt", "fontSize", excerpt_, e)
                  }
                />
                <p>
                  <strong>{__("Number of words", "unlimited-blocks")}</strong>
                </p>
                <RangeControl
                  value={excerpt_.words}
                  min={1}
                  max={200}
                  onChange={(e) =>
                    this.updateObj("excerpt", "words", excerpt_, e)
                  }
                />
                <p>
                  <strong>{__("Color", "unlimited-blocks")}</strong>
                </p>
                <ColorPalette
                  value={excerpt_.color}
                  onChange={(color) =>
                    this.updateObj("excerpt", "color", excerpt_, color)
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
            <ToggleControl
              label={__("Author", "unlimited-blocks")}
              checked={author_.enable}
              onChange={(e) => this.updateObj("author", "enable", author_, e)}
            />
            {/* show date */}
            <ToggleControl
              label={__("Date", "unlimited-blocks")}
              checked={date_.enable}
              onChange={(e) => this.updateObj("date", "enable", date_, e)}
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
                this.updateObj("date", "last_modified", date_, e)
              }
            />
            <ToggleControl
              label={__("Tag", "unlimited-blocks")}
              checked={showTag_.enable}
              onChange={(e) => this.updateObj("showTag", "enable", showTag_, e)}
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
                this.updateObj("meta_style", "fontSize", meta_style_, e);
              }}
            />
            <p>
              <strong>{__("Author/Dates Color", "unlimited-blocks")}</strong>
            </p>
            <ColorPalette
              value={"color" in meta_style_ ? meta_style_.color : ""}
              onChange={(color) =>
                this.updateObj("meta_style", "color", meta_style_, color)
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
                    this.updateObj("showCate", "count", showCate_, e);
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
                    this.updateObj("showCate", "fontSize", showCate_, e);
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
                    this.updateObj("showCate", "customColor", showCate_, e)
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
                        this.updateObj("showCate", "color", showCate_, color)
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
                          showCate_,
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
                    this.updateObj("showTag", "count", showTag_, e);
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
                    this.updateObj("showTag", "fontSize", showTag_, e);
                  }}
                />
                <p>
                  <strong>{__("Color", "unlimited-blocks")}</strong>
                </p>
                <ColorPalette
                  value={showTag_.color}
                  onChange={(color) =>
                    this.updateObj("showTag", "color", showTag_, color)
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
                      showTag_,
                      color
                    );
                  }}
                />
              </>
            )}
            {/* secondary  */}
            <p>
              <strong>{__("Color", "unlimited-blocks")}</strong>
            </p>
            <ColorPalette
              value={"color" in meta_style_ ? meta_style_.color : ""}
              onChange={(color) =>
                this.updateObj("meta_style", "color", meta_style_, color)
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
                    minWidth: title_.width + "%",
                  }}
                  onChange={(e) => this.updateObj("title", "value", title_, e)}
                />
              </div>
            )}
            <div className={`column-count column-count-3`}>
              {posts.map((post) => {
                return this.returnHtml(
                  post,
                  heading_,
                  author_,
                  date_,
                  meta_style_,
                  showCate_,
                  excerpt_,
                  showTag_,
                  layout
                );
              })}
            </div>
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
                    <span>{__("Modified:", "unlimited-blocks")} </span>
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
                  {__("...Read More", "unlimited-blocks")}
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
