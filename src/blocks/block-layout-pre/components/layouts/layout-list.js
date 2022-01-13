const { compose } = wp.compose;
const { rawHandler } = wp.blocks;
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { Button } from "@wordpress/components";
import { withSelect, withDispatch } from "@wordpress/data";

class Layoutlist extends Component {
  constructor() {
    super();
    this.state = {
      // apiUrl: "http://localhost:8888/one/wp-json/zita-blocks-layout/v2/search/",
      apiUrl:
        "https://zitademo.wpzita.com/zita-blocks/wp-json/zita-blocks-layout/v2/search/",
      // apiUrl:
      //   "https://wpzita.com/zitademo/zita-blocks/wp-json/zita-blocks-layout/v2/search/",
      templateLoading: true,
      categoryLoading: true,
      templateCategory: "all",
      templatePrice: "all",
      block_templates_category: [],
      block_templates: [],
    };
  }
  //component did mount
  async componentDidMount() {
    await this.getAllRetrived();
  }
  //   get all blocks first time
  getAllRetrived() {
    let url = this.state.apiUrl + "?initilaize=1";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          block_templates: json.demos,
          block_templates_category: json.categories,
          templateLoading: false,
          categoryLoading: false,
        });
      });
  }
  // get all blocks with argument
  getDemosByFilter(object_parem = {}) {
    const urlParams = new URLSearchParams(object_parem);
    let putUrl = urlParams && urlParams != "" ? "?" + urlParams : "";
    let apiUrl = this.state.apiUrl + putUrl;
    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (
          "price_send" in object_parem &&
          json &&
          "categories" in json &&
          "demos" in json
        ) {
          let blockTemplate = json.demos.length > 0 ? json.demos : false;
          let blockTemplateCate =
            json.categories.length > 0 ? json.categories : false;
          this.setState({
            block_templates: blockTemplate,
            block_templates_category: blockTemplateCate,
            templateLoading: false,
            categoryLoading: false,
          });
        } else if (json) {
          this.setState({ block_templates: json, templateLoading: false });
        } else {
          // console.lo("no json data found json -> ", json);
        }
      });
  }
  //choose category,
  async getDemosFilterCategory(category) {
    this.setState({ templateCategory: category, templateLoading: true });
    await this.getDemosByFilter({
      category: category,
      price: this.state.templatePrice,
    });
  }
  //choose price,
  async getDemosFilterPrice(price) {
    this.setState({
      templateCategory: "all",
      templatePrice: price,
      categoryLoading: true,
      templateLoading: true,
    });
    await this.getDemosByFilter({
      category: "all",
      price: price,
      price_send: "1",
    });
  }
  // category loading
  PostLoading = (props) => {
    let msg = props.data;
    return (
      <div>
        <div className="post-loader">
          <div className="active linear-bubble ubl-block-loader">
            {__(msg, "unlimited-blocks")}
            <div>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  PostNotFound = (props) => {
    let msg = props.data;
    return (
      <div className="template-not-found">
        <h2>{__(msg, "unlimited-blocks")}</h2>
      </div>
    );
  };
  //show all data from
  render() {
    const {
      block_templates,
      block_templates_category,
      templateCategory,
      templatePrice,
      templateLoading,
      categoryLoading,
    } = this.state;
    const { clientId } = this.props;
    return (
      <div className="ubl-blocks-layout-wrapper">
        <div className="container_">
          <div className="left-section_">
            <nav>
              <span
                key={"all"}
                className={templatePrice == "all" ? "active" : null}
                onClick={() => {
                  if (templatePrice != "all") {
                    this.getDemosFilterPrice("all");
                  }
                }}
              >
                {__("All", "unlimited-blocks")}
              </span>
              <span
                key={"free"}
                className={templatePrice == "free" ? "active" : null}
                onClick={() => {
                  if (templatePrice != "free") {
                    this.getDemosFilterPrice("free");
                  }
                }}
              >
                {__("Free", "unlimited-blocks")}
              </span>
              <span
                key={"premium"}
                className={templatePrice == "premium" ? "active" : null}
                onClick={() => {
                  if (templatePrice != "premium") {
                    this.getDemosFilterPrice("premium");
                  }
                }}
              >
                {__("Premium", "unlimited-blocks")}
              </span>
            </nav>
            <div className="cate-container-">
              <div>
                <span>{__("CATEGORIES", "unlimited-blocks")}</span>
                <div className="list_">
                  {block_templates_category &&
                  block_templates_category.length > 0 &&
                  categoryLoading == false ? (
                    <>
                      <span
                        className={templateCategory == "all" ? "active" : null}
                        onClick={() => {
                          if (templateCategory != "all") {
                            this.getDemosFilterCategory("all");
                          }
                        }}
                      >
                        {__("all", "unlimited-blocks")}
                      </span>
                      {block_templates_category.map((template_v) => {
                        return (
                          <span
                            key={template_v.id}
                            className={
                              templateCategory == template_v.id
                                ? "active"
                                : null
                            }
                            onClick={() => {
                              if (templateCategory != template_v.id) {
                                this.getDemosFilterCategory(template_v.id);
                              }
                            }}
                          >
                            {__(template_v.title, "unlimited-blocks")}
                          </span>
                        );
                      })}
                    </>
                  ) : !block_templates_category ? (
                    <this.PostNotFound data={"Category Not Found."} />
                  ) : (
                    <this.PostLoading data={"Categories Loading..."} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="main-section_">
            {block_templates &&
            block_templates.length > 0 &&
            templateLoading == false ? (
              <div className="template-itemes_">
                {block_templates.map((template) => {
                  return (
                    <div>
                      <div className="template-content">
                        <div className="image_">
                          <img src={template.image} />
                        </div>
                        <div className="title_">
                          <span>{template.name}</span>
                        </div>
                      </div>
                      <div className="template-btn_">
                        <button>{__("Preview", "unlimited-blocks")}</button>
                        <Button
                          className="ubl-blocks-layout-imp-btn"
                          onClick={() => {
                            this.props.import(template.content);
                          }}
                        >
                          <i className="fas fa-download"></i>
                          <span>{__("import", "unlimited-blocks")}</span>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : !block_templates_category ? (
              <this.PostNotFound data={"Template Not Found."} />
            ) : (
              <this.PostLoading data={"Template Loading..."} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
// export default Layoutlist;
export default compose(
  withSelect((select, { clientId }) => {
    const { getBlock } = select("core/block-editor");
    const { canUserUseUnfilteredHTML } = select("core/editor");
    const block = getBlock(clientId);
    return {
      block,
      canUserUseUnfilteredHTML: canUserUseUnfilteredHTML(),
    };
  }),
  withDispatch((dispatch, { block, canUserUseUnfilteredHTML }) => ({
    import: (blockLayout) =>
      dispatch("core/block-editor").replaceBlocks(
        block.clientId,
        rawHandler({
          HTML: blockLayout,
          mode: "BLOCKS",
          canUserUseUnfilteredHTML,
        })
      ),
  }))
)(Layoutlist);
