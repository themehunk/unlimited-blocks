const BasicToggleNav = (props) => {
  const { navItem, clickme, value, wrapperClass } = props;
  if (navItem && value) {
    let default_class = "ul-top-nav";
    if (wrapperClass) {
      default_class = default_class.concat(" ", wrapperClass);
    }
    return (
      <div className={default_class}>
        {navItem.map((nav_val, key_) => {
          return (
            <div
              key={key_}
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
export default BasicToggleNav;
// component
{
  /* <BasicToggleNav
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
