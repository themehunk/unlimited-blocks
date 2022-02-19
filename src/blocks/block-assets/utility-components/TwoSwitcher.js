const Switcher = (props) => {
  const { navItem, clickme, value, wrapperClass } = props;
  if (navItem) {
    let default_class = "ul-switch-nav";
    if (wrapperClass) {
      default_class = default_class.concat(" ", wrapperClass);
    }
    let getIndexValue = navItem.findIndex((val) => val.name == value);
    let divider = navItem.length;
    let widthBG = 100 / divider;
    let styleBack = { width: widthBG + "%" };
    if (getIndexValue > 0) {
      let moveLeft = widthBG * getIndexValue;
      styleBack = { ...styleBack, left: `calc(${moveLeft}% - 2px)` };
    }
    return (
      <div className={default_class}>
        <div className="bg-switch" style={styleBack}></div>
        {navItem.map((nav_val, key_) => {
          return (
            <div
              key={key_}
              nav-id={nav_val.name}
              onClick={() => {
                if (nav_val.name != value) {
                  clickme(nav_val.name);
                }
              }}
              className={value == nav_val.name ? "active" : null}
            >
              {nav_val.icon && (
                <span className="icon_">
                  {<span className={nav_val.icon}></span>}
                </span>
              )}
              <span className="title_">
                {nav_val.title}
                {/* {__(nav_val.title, "unlimited-blocks")} */}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
};
export default Switcher;
// component
{
  /* <Switcher
              value={this.state.openPanel}
              navItem={[
                {
                  name: "layout",
                  title: "Layout",
                  icon: "dashicons dashicons-editor-table",
                },
                {
                  name: "style",
                  title: "Style",
                  icon: "dashicons dashicons-admin-customizer",
                },
              ]}
              clickme={(value_) => {
                this.setState({ openPanel: value_ });
              }}
            /> */
}
// component
