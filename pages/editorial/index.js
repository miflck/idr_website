import React, {
  useEffect,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";
import { request, EDITORIALTEXTE, EDITORIALINTRO } from "../../lib/datocms";
import styles from "./editorial.module.scss";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Container from "../../Components/Container/container";
import TextElement from "../../Components/Composition/TextElement";

import FilterElement from "../../Components/FilterElement/filterElement";
import ButtonLink from "../../Components/ButtonLink/buttonLink";
import Layout from "../../Components/Layout/layout";

import Header from "../../Components/Header/header";
import HeaderWrapper from "../../Components/HeaderWrapper/HeaderWrapper";
import {
  ListTitle,
  Title,
  ImageElement,
  Gallery,
  Video,
  ServiceElement,
  ModularContentWrapper,
} from "../../Components/Composition";
import {
  Lupe,
  FilterWrapper,
  SearchTerm,
  SearchTermWrapper,
  BackgroundGradientFadeOut,
  GradientFadeIn,
  TextContainer,
} from "../../Components";

import { AppContext, ACTIONS } from "../../context/state";
/*
import {
  Layout,
  Lupe,
  Header,
  HeaderWrapper,
  Title,
  TextElement,
  TextContainer,
  ServiceElement,
  Container,
  FilterElement,
  ButtonLink,
  FilterWrapper,
  SearchTerm,
  SearchTermWrapper,
  BackgroundGradientFadeOut,
  GradientFadeIn,
} from "../../Components";
*/
import {
  searchInput,
  searchInputArray,
  getIntersection,
  searchInputArrayRecursive,
} from "../../lib/helpers";

const Editorial = (props) => {
  const {
    editorialtexte: { allEditorials, allProjekts, allForschungsfelders },
  } = props;

  const { editorialintro } = props;

  console.log(props);

  const globalState = useContext(AppContext);
  const { state } = globalState;
  const { dispatch } = globalState;

  const router = useRouter();

  const { t } = useTranslation("common");

  const removeAllHoverFilter = () => {
    dispatch({ type: ACTIONS.REMOVE_ALL_HOVER_FILTER });
  };
  const removeAllActiveFilter = () => {
    dispatch({ type: ACTIONS.REMOVE_ALL_ACTIVE_FILTER });
  };
  const removeAllSearchterms = () => {
    dispatch({ type: ACTIONS.REMOVE_ALL_SEARCHTERM });
  };

  //const myRef = useRef(null);

  useEffect(() => {
    removeAllHoverFilter();
    removeAllActiveFilter();
    removeAllSearchterms();
  }, []);

  useEffect(() => {
    if (router.query.keyword) {
      dispatch({
        type: ACTIONS.ADD_ACTIVE_FILTER,
        payload: { element: [router.query.keyword] },
      });

      /*  router.push({
        query: {},
      });*/
    }
  }, [router.query.keyword]);

  const executeScroll = () => myRef.current.scrollIntoView();

  //Projekte zu Forschungsfeld dazufiltern
  function filterByForschungsfeld(data, filterterm) {
    return data.filter((obj) => {
      return obj.forschungsfeld.some((feld) => {
        return feld.id.includes(filterterm);
      });
    });
  }

  //nach Forschungsfelder filtern
  function filterBy(data, filterterms) {
    if (filterterms.length < 1) return data; // wenn kein filter ist gibt some leer zurück
    return data.filter((obj) => {
      //kann sein: every für && und some für || ?
      return filterterms.some((term) => {
        return obj.forschungsfeld.some((feld) => {
          return feld.id.toString().includes(term);
        });
      });
    });
  }

  const [filterdList, setFilterdList] = useState([]);
  const [searchFilterdList, setSearchFilterdList] = useState([]);

  // get data after all filters
  let result =
    getIntersection([filterdList, searchFilterdList]) || allEditorials;

  const refs = allEditorials.reduce((item, value) => {
    const ref = useRef(null);
    const setRef = useCallback((node) => {
      if (ref.current) {
        // Make sure to cleanup any events/references added to the last instance
      }
      if (node !== null) {
      }
      ref.current = node;
    }, []);
    item[value.forschungsfeld[0].id] = ref;

    return item;
  }, {});

  useEffect(() => {
    setFilterdList(filterBy(allEditorials, state.activeFilters)); // filter if any filter is set, else show all
  }, [state.activeFilters]);

  useEffect(() => {
    const lastItem = state.activeFilters[state.activeFilters.length - 1];
    if (refs[lastItem] !== undefined && refs[lastItem].current !== null) {
      refs[lastItem].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [filterdList]);

  // fields to search
  let fields = ["titel", "name", "value"];
  const [search, setSearch] = useState("");
  useEffect(() => {
    let array = [...state.searchTerms, search];
    setSearchFilterdList(
      searchInputArrayRecursive(allEditorials, array, fields)
    );
    window.scrollTo(0, 0);
  }, [search]);

  useEffect(() => {
    setSearchFilterdList(
      searchInputArrayRecursive(allEditorials, state.searchTerms, fields)
    );

    window.scrollTo(0, 0);
  }, [state.searchTerms]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch({
        type: ACTIONS.ADD_SEARCHTERM,
        payload: { element: e.currentTarget.value },
      });
    }
  };

  const handleSubmit = (e) => {
    dispatch({
      type: ACTIONS.ADD_SEARCHTERM,
      payload: { element: e },
    });
  };

  return (
    <Layout
      setMainColor={props.setMainColor}
      setSecondColor={props.setSecondColor}
      colorHexCode={props.colorHexCode}
      colorHexCodeSecond={props.colorHexCodeSecond}
    >
      <HeaderWrapper>
        <Header></Header>
        <FilterWrapper>
          <FilterElement filterarray={allForschungsfelders} />

          <Lupe
            setSearch={setSearch}
            handleKeyDown={handleKeyDown}
            handleSubmit={handleSubmit}
          ></Lupe>
        </FilterWrapper>
        <SearchTermWrapper>
          {state.searchTerms.map((term, index) => {
            return <SearchTerm key={index} term={term}></SearchTerm>;
          })}
        </SearchTermWrapper>
      </HeaderWrapper>

      {filterdList.length == allEditorials.length && (
        <div className={styles.editorialwrapper}>
          <Container>
            <Title title={editorialintro.editorialeinfHrungstext.titel} />

            <TextContainer>
              <div className={styles.text}>
                <TextElement {...editorialintro.editorialeinfHrungstext.text} />
              </div>
              <ServiceElement></ServiceElement>
            </TextContainer>
          </Container>
        </div>
      )}

      {result.map((editorial) => {
        const filterdProjectlist = filterByForschungsfeld(
          allProjekts,
          editorial.forschungsfeld[0].id
        ).slice(0, 5);

        let background_style;
        let background_style_small;
        let colors = [];
        editorial.forschungsfeld.map((forschungsfeld) => {
          colors.push(forschungsfeld.colour.hex);
        });
        background_style = {
          //            background: `linear-gradient(to right, white,${colors[0]}, ${colors[1] || "white"},white)`,
          background: `linear-gradient(to bottom, ${
            colors[0] + "DD"
          },white, white)`,
        };
        background_style_small = {
          background: `linear-gradient(to right, ${colors[0]}, ${
            colors[1] || "white"
          })`,
        };

        return (
          <div
            className={styles.editorialwrapper}
            key={editorial.id}
            style={background_style}
            ref={refs[editorial.forschungsfeld[0].id]}
          >
            <Container>
              <Link href={`editorial/${editorial.slug}`}>
                <div>
                  {editorial.forschungsfeld.map((forschungsfeld) => {
                    return (
                      <ListTitle
                        key={forschungsfeld.id}
                        title={forschungsfeld.titel}
                      />
                      // <div className={styles.titel}>{forschungsfeld.titel}</div>
                    );
                  })}

                  {/* {editorial.beitraege != null &&
                    editorial.beitraege.map((block) => {
                      return (
                        <ModularContentWrapper key={block.id}>
                          {block._modelApiKey === "text" && (
                            <TextElement
                              key={block.id}
                              {...block.text}
                            ></TextElement>
                          )}
                          {block._modelApiKey === "einzelbild" && (
                            <ImageElement
                              key={block.einzelbild.id}
                              src={block.einzelbild.url}
                              title={block.einzelbild.title}
                              alt={block.einzelbild.alt}
                              width={block.einzelbild.width}
                              height={block.einzelbild.height}
                            />
                          )}

                          {block._modelApiKey === "galerie" && (
                            <Gallery data={block.galerie}></Gallery>
                          )}

                          {block._modelApiKey === "video" && (
                            <Video
                              key={block.id}
                              data={block.clip}
                              caption={block.caption}
                            ></Video>
                          )}
                        </ModularContentWrapper>
                      );
                    })} */}

                  <TextContainer>
                    <div className={styles.text}>
                      {editorial.listenansicht.map((beitrag) => {
                        return (
                          <TextElement
                            key={beitrag.id}
                            {...beitrag.text}
                          ></TextElement>
                        );
                      })}
                    </div>
                    <div className={styles.serviceWrapper}>
                      <ServiceElement title={t("Koord")}>
                        {editorial.menschen.map((koordinatorin) => {
                          let href = `/team`;
                          if (koordinatorin.slug != "") {
                            href += `/${koordinatorin.slug}`;
                          }
                          return <ButtonLink {...koordinatorin} href={href} />;
                        })}{" "}
                      </ServiceElement>

                      {/* <ServiceElement
                        title={t("Projekte (Auswahl)")}
                        style={{ width: 66 + "%" }}
                      >
                        {filterdProjectlist.map((projekt) => {
                          let href = `/projekte`;
                          if (projekt.slug != "") {
                            href += `/${projekt.slug}`;
                          }
                          return <ButtonLink {...projekt} href={href} />;
                        })}{" "}
                      </ServiceElement> */}
                    </div>
                  </TextContainer>
                </div>
              </Link>
            </Container>
          </div>
        );
      })}
    </Layout>
  );
};

export default Editorial;

// de mit default alng ersetzten falls die nicht de ist
export async function getStaticProps({ locale }) {
  const editorialtexte = await request({
    query: EDITORIALTEXTE,
    variables: { locale: locale },
  });
  const editorialintro = await request({
    query: EDITORIALINTRO,
    variables: { locale: locale },
  });

  return {
    props: {
      editorialtexte,
      editorialintro,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
