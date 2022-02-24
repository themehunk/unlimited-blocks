import React, { Component } from "react";
import { __ } from "@wordpress/i18n";
class productCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: false,
    };
  }
  componentDidMount() {
    // console.log("category Filter", this.props);
  }

  updatePropsCategory = (cate, operator = "") => {
    let selectedCate = [...this.props.value];
    if (cate == "removeall") {
      selectedCate = [];
    } else if (operator == "remove") {
      if (selectedCate.length) {
        let getIndex = selectedCate.indexOf(cate);
        if (getIndex > -1) {
          selectedCate.splice(getIndex, 1);
        }
      }
    } else {
      selectedCate.unshift(cate);
    }
    this.props.onMovement(selectedCate);
  };
  renderCategory = () => {
    let renderCategory = this.props.category;
    let noCateFound = (
      <span className="noCateFound">
        {__("No Category Found..", "unlimited-blocks")}
      </span>
    );
    let selectedCate = this.props.value;
    // let selectedCate = ["accessories", "dairy-products"];
    if (renderCategory || this.state.category) {
      renderCategory = this.state.category
        ? this.state.category
        : renderCategory;
      if (renderCategory != "no") {
        return renderCategory.map((val) => {
          let slug_ = val.slug;
          let selectedCateCl = selectedCate.includes(slug_) ? "selected" : "";
          return (
            <div
              className={`cate-radio-caontainer ${selectedCateCl}`}
              onClick={() => {
                let operator_ = !selectedCateCl ? "add" : "remove";
                this.updatePropsCategory(slug_, operator_);
              }}
            >
              <div className="radio-title">
                <span className="r_"></span>
                <span className="t_">{__(val.name, "unlimited-blocks")}</span>
              </div>
              <div className="total_">
                <span>{__(val.count + " Products", "unlimited-blocks")}</span>
              </div>
            </div>
          );
        });
      } else {
        return noCateFound;
      }
    } else {
      return noCateFound;
    }
  };
  cateFilter = (val) => {
    // console.log("val", val);
    let setStateCate = { category: false };
    if (val != "") {
      val = val.toLowerCase();
      let renderCategory = [...this.props.category];
      let filter_ = (val_) => {
        let title_ = val_.name.toLowerCase();
        let getIndex = title_.indexOf(val);
        return getIndex > -1;
      };
      let filterCate = renderCategory.filter(filter_);
      if (filterCate.length) {
        setStateCate = { category: filterCate };
      } else {
        setStateCate = { category: "no" };
      }
    }
    // set state
    this.setState(setStateCate);
    // set state
  };
  categorySearch = () => {
    return (
      <div className="categoriesSearch_">
        <span>{__("Search for product categories", "unlimited-blocks")}</span>
        <input
          type="text"
          onKeyUp={(e) => {
            let val = e.target.value;
            this.cateFilter(val);
          }}
        />
      </div>
    );
  };

  categorySelected() {
    let renderCategory = [...this.props.category];
    if (renderCategory.length) {
      //   let selectedCate = ["accessories", "dairy-products"];
      let selectedCate = this.props.value;
      let selectedCateLength = selectedCate.length;
      const getName = (slug_) => {
        const filterName = (val_) => val_.slug == slug_;
        let filtered = renderCategory.filter(filterName);
        return filtered.length ? filtered[0].name : false;
      };
      return (
        <div className="categoriesSelected">
          <div className="title_">
            <span className="t_">
              {__(
                `${selectedCateLength} ${
                  selectedCateLength == 1 ? "category" : "categories"
                } Selected`,
                "unlimited-blocks"
              )}
            </span>
            {selectedCateLength ? (
              <span
                onClick={() => {
                  this.updatePropsCategory("removeall");
                }}
                className="c_"
              >
                {__("Clear All", "unlimited-blocks")}
              </span>
            ) : (
              ""
            )}
          </div>
          {selectedCateLength ? (
            <div className="list_">
              {selectedCate.map((cateVal_) => (
                <span>
                  {getName(cateVal_)}
                  <i
                    onClick={() => {
                      this.updatePropsCategory(cateVal_, "remove");
                    }}
                    className="dashicons dashicons-dismiss"
                  ></i>
                </span>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      );
    }
  }

  render() {
    // console.log("category props->", this.props);
    return (
      <div className="categories_component">
        {this.categorySelected()}
        {this.categorySearch()}
        <div className="categories_">{this.renderCategory()}</div>
      </div>
    );
  }
}

export default productCategory;
