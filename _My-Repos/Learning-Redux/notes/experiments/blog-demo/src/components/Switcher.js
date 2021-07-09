import React from "react";
import { connect } from "react-redux";
import { TransitionGroup, Transition } from "transition-group";
import universal from "react-universal-component";

import Loading from "./Loading";
import Err from "./Error";
import styles from "../css/Switcher";

const UniversalComponent = universal(({ page }) => import(`./${page}`), {
  minDelay: 500,
  loading: Loading,
  error: Err,
});

const Switcher = ({ page, direction }) => (
  <TransitionGroup
    className={`${styles.switcher} ${direction}`}
    duration={500}
    prefix="fade"
  >
    <Transition key={page}>
      <UniversalComponent page={page} />
    </Transition>
  </TransitionGroup>
);

const mapState = ({ page, direction }) => ({
  page,
  direction,
});

export default connect(mapState)(Switcher);
