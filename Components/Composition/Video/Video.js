import React from "react";
import PropTypes from "prop-types";
import styles from "./Video.module.scss";
import ReactPlayer from "react-player";
import { StructuredText } from "react-datocms";

const Video = (props) => {
  const { data, caption } = props;
  return (
    <div className={styles.root}>
      <div className={styles.playerWrapper}>
        <ReactPlayer
          url={data.url}
          className={styles.player}
          width="100%"
          height="100%"
          controls="true"
        />
      </div>

      <div className={styles.caption}>
        <StructuredText data={caption} />
      </div>
    </div>
  );
};

Video.defaultProps = {};

export default Video;
