import axios from "axios";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { heroDelete, fetchHeroes, selectAll } from "./heroesSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import "./heroesList.scss";

const HeroesList = () => {
  const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    selectAll,
    (filters, heroes) => {
      if (filters === "all") {
        return heroes;
      } else {
        return heroes.filter((item) => item.element === filters);
      }
    }
  );

  const api = "/heroes";
  const filteredHeroes = useSelector(filteredHeroesSelector);
  const heroesLoadingStatus = useSelector(
    (state) => state.heroes.heroesLoadingStatus
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroes());
    // eslint-disable-next-line
  }, []);

  const onDelete = useCallback(
    async (hero) => {
      await axios
        .delete(`${api}/${hero.id}`)        
        .then(dispatch(heroDelete(hero)))
        .catch((err) => console.log(err));
    },
    // eslint-disable-next-line
    []
  );

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Loading error</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={0} classNames="hero">
          <h5 className="text-center mt-5">No heroes yet</h5>
        </CSSTransition>
      );
    }

    return arr.map(({ id, ...props }) => {      
      return (
        <CSSTransition key={id} timeout={300} classNames="hero">
          <HeroesListItem {...props} onDelete={() => onDelete({id, ...props})} />
        </CSSTransition>
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);

  return (
    <TransitionGroup component="div" className="content__elements">
      {elements}
    </TransitionGroup>
  );
};

export default HeroesList;
