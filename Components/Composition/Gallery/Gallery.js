import React from "react";
import PropTypes from "prop-types";
import styles from "./Gallery.module.scss";
import { ImageElement } from "..";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const handlers = () => (
  <Carousel
    onClickThumb={action("click thumb")}
    onClickItem={action("click item")}
    onChange={action("change")}
  >
    {baseChildren.props.children}
  </Carousel>
);

const Gallery = (props) => {
  const { data } = props;

  return (
    <div className={styles.root}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        /*</div> statusFormatter={(current, total) =>
          `Current slide: ${current} / Total: ${total}`
        }*/
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <div
              type="button"
              onClick={onClickHandler}
              //  onClick={onClickHandler}

              className={styles.arrowStyles}
              style={{ left: 15 + "px" }}
            >
              {"\u2190"}
            </div>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <div
              type="button"
              onClick={onClickHandler}
              className={styles.arrowStyles}
              style={{ right: 15 + "px" }}
            >
              {"\u2192"}
            </div>
          )
        }
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          if (isSelected) {
            return (
              <li
                className={`${styles.indicatorStyles} ${styles.selected}`}
                //  style={{ ...indicatorStyles, background: "#000" }}
                //  aria-label={`Selected: ${label} ${index + 1}`}
                //  title={`Selected: ${label} ${index + 1}`}
              />
            );
          }
          return (
            <li
              className={styles.indicatorStyles}
              //  style={indicatorStyles}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              //title={`${label} ${index + 1}`}
              //aria-label={`${label} ${index + 1}`}
            />
          );
        }}
      >
        {data.map((element) => {
          console.log(element);
          return (
            <div>
              <ImageElement
                key={element.id}
                src={element.url}
                title={element.title}
                alt={element.alt}
              />

              {/* <img src={element.url} alt="image1" />*/}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

Gallery.defaultProps = {};

export default Gallery;
