"use client";

import PropTypes from "prop-types";
import { Link } from "@/i18n/navigation";

const Opt = ({ opt, shown }) => (
  <span className={`lang-switch__opt ui-ink${shown === opt.code ? " on" : ""}`} data-ui-follow aria-hidden="true">
    {opt.label}
  </span>
);

Opt.propTypes = {
  opt: PropTypes.shape({ code: PropTypes.string, label: PropTypes.string }).isRequired,
  shown: PropTypes.string.isRequired,
};

// Presentacional: recibe textos y estado ya resueltos (sin t() ni hooks de locale).
// Un solo link real hacia el otro idioma: toda la pastilla es el área táctil.
const LangSwitch = ({ options, shown, target, hash, label, busy, onClick, onKeyDown }) => (
  <Link
    href={{ pathname: "/", hash }}
    locale={target}
    scroll={false}
    aria-label={label}
    aria-busy={busy}
    className="lang-switch"
    data-shown={shown}
    onClick={onClick}
    onKeyDown={onKeyDown}
  >
    <Opt opt={options[0]} shown={shown} />
    <span className="lang-switch__track" data-ui-follow aria-hidden="true">
      <span className="lang-switch__thumb" />
    </span>
    <Opt opt={options[1]} shown={shown} />
  </Link>
);

LangSwitch.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ code: PropTypes.string, label: PropTypes.string })).isRequired,
  shown: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  hash: PropTypes.string,
  label: PropTypes.string.isRequired,
  busy: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
};

export default LangSwitch;
