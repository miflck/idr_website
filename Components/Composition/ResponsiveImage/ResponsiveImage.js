import React from "react";
import PropTypes from "prop-types";
import styles from "./ResponsiveImage.module.scss";
import { Image } from "react-datocms";

const ResponsiveImage = (props) => {
  const { responsiveImage } = props;

  return (
    <div className={styles.root}>
      <Image
        data={responsiveImage}
        alt={props.alt}
        fadeInDuration="0"
        // layout="fill"
        // objectFit="cover"
        // width={500}
        // height={500}
        style={{
          objectFit: "cover",
          layout: "fill",
        }}
      />
    </div>
  );
};

ResponsiveImage.defaultProps = {};

export default ResponsiveImage;
