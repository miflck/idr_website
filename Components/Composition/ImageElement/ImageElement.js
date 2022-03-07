import React from "react";
import PropTypes from "prop-types";
import styles from "./ImageElement.module.scss";
import Image from "next/image";

const ImageElement = (props) => {
  console.log("image element props", props);
  const { src, alt, height, focalPoint, title } = props;
  let x = focalPoint === undefined ? 50 : focalPoint.x * 100;
  let y = focalPoint === undefined ? 50 : focalPoint.y * 100;
  return (
    <div className={styles.root}>
      {/*<img src={src} alt={alt}/> */}
      <Image
        src={src}
        alt={alt}
        width={"100w"}
        height={height ? height : "80"}
        layout="responsive"
        objectFit="cover"
        objectPosition={`${x}% ${y}%`}
      />

      {title ? <div className={styles.caption}>{title}</div> : ""}
    </div>
  );
};

ImageElement.defaultProps = {};

export default ImageElement;
