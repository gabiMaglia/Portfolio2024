"use client";

import { useRef } from "react";
import PropTypes from "prop-types";
import { StoreContext } from "@/store/store";
import { buildInitialState, createUserStore } from "@/store/user-store.mjs";

const StoreProvider = ({ data, children }) => {
  const storeRef = useRef(null);
  if (!storeRef.current) storeRef.current = createUserStore(buildInitialState(data));
  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
};

StoreProvider.propTypes = {
  data: PropTypes.object,
  children: PropTypes.node,
};

export default StoreProvider;
