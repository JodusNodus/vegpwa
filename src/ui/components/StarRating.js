import React from "react";
import IconButton from "material-ui/IconButton";
import StarIcon from "@material-ui/icons/Star";
import amber from "material-ui/colors/amber";
import blueGrey from "material-ui/colors/blueGrey";

export default ({ rating = 0, onChange, size = 30, ...props }) => {
  const styles = {
    btn: {
      height: size,
      width: size
    }
  };

  return (
    <div {...props}>
      {new Array(5).fill(null).map((x, i) => {
        const hiLi = i < rating;
        let fun = onChange ? () => onChange(i + 1) : undefined;
        let iconStyle = {
          fontSize: size,
          color: hiLi ? amber[500] : blueGrey[200]
        };
        return (
          <IconButton
            key={i}
            onClick={fun}
            disabled={!onChange}
            style={styles.btn}
          >
            <StarIcon style={iconStyle} />
          </IconButton>
        );
      })}
    </div>
  );
};
