import PropTypes from "prop-types";
import styles from "./PodcastFeed.module.scss";
import React, { useEffect, useState } from "react";
import Parser from "rss-parser";
import PodcastPlayer from "../PodcastPlayer/PodcastPlayer";

const PodcastFeed = (props) => {
  const [feed, setFeed] = useState(null);
  useEffect(() => {
    const parser = new Parser();

    const fetchFeed = async () => {
      try {
        const response = await fetch("/api/podigee-proxy");
        const data = await response.text();
        const parsedFeed = await parser.parseString(data);

        setFeed(parsedFeed);
      } catch (error) {
        console.error("Error fetching podcast feed:", error);
      }
    };

    fetchFeed();
  }, []);

  return (
    <div className={styles.root}>
      {feed ? (
        <div>
          {feed.items.map((item) => {
            const audioUrl = item.enclosure?.url || item.link;
            return (
              <PodcastPlayer
                key={item.guid}
                episode={item}
                audioUrl={audioUrl}
              />
            );
          })}
        </div>
      ) : (
        <p>Loading podcast feed...</p>
      )}
    </div>
  );
};

PodcastFeed.defaultProps = {};

export default PodcastFeed;
