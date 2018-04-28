import React from "react";
import Icon from "material-ui/Icon";
import amber from "material-ui/colors/amber";

export default ({ rating = 0, ...props }) => (
  <div {...props}>
    {new Array(5).fill(null).map((x, i) => {
      const hiLi = i < rating;
      return (
        <Icon
          key={i}
          color={!hiLi ? "disabled" : undefined}
          style={{ color: hiLi ? amber[400] : undefined, fontSize: 30 }}
        >
          star
        </Icon>
      );
    })}
  </div>
);
