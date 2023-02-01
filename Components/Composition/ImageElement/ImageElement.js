import React from "react";
import PropTypes from "prop-types";
import styles from "./ImageElement.module.scss";
import Image from "next/image";

const ImageElement = (props) => {
  const { src, alt, height, focalPoint, title, width } = props;
  let x = focalPoint === undefined ? 50 : focalPoint.x * 100;
  let y = focalPoint === undefined ? 50 : focalPoint.y * 100;

  return (
    <div className={styles.root}>
      {/*<img src={src} alt={alt}/> */}
      <Image
        src={src}
        alt={alt}
        width={"100w"}
        //height={height}
        height={"75h"}
        layout="responsive"
        objectFit="cover"
        objectPosition={`${x}% ${y}%`}
        sizes="(max-width: 640px) 640px,
        (max-width: 768px) 768px,
        (max-width: 900px) 900px,
        (max-width: 1280px) 1280px"
      />

      {title ? <div className={styles.caption}>{title}</div> : ""}
    </div>
  );
};

ImageElement.defaultProps = {
  width: "100w",
  height: "80",
};

export default ImageElement;
