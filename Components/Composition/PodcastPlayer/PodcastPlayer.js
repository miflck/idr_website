import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import Container from "../../Container/container";
import H5AudioPlayer from "react-h5-audio-player";
import styles from "./PodcastPlayer.module.scss";

const PodcastPlayer = ({ episode, audioUrl }) => {
  console.log("episode", episode, "audoUrl", audioUrl);
  const [isPlaying, setIsPlaying] = useState(false);
  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState);
  };
  const [coverImageUrl, setCoverImageUrl] = useState("");
  useEffect(() => {
    const extractCoverImageUrl = () => {
      const htmlParser = new DOMParser();
      const doc = htmlParser.parseFromString(episode.content, "text/html");
      const imgElement = doc.querySelector("img");

      if (imgElement) {
        setCoverImageUrl(imgElement.src);
      }
    };

    extractCoverImageUrl();
  }, [episode.content]);

  const date = new Date(episode.isoDate).toLocaleString([], {
    year: "numeric",
    month: "long",
  });

  return (
    <div className={`${styles.wrapper}`}>
      <Container>
        <div className={styles.content}>
          <div className={styles.datum}>{date} </div>
          <div className={styles.info}>
            <h2 className={styles.titel}>{episode.title}</h2>
            <div>{episode.contentSnippet}</div>
          </div>
          <H5AudioPlayer
            src={audioUrl}
            playing={isPlaying}
            className={styles["custom-audio-player"]} // Apply your custom class
          />
        </div>
      </Container>
    </div>
  );
};

PodcastPlayer.defaultProps = {};

export default PodcastPlayer;
