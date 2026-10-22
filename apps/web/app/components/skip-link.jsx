import PropTypes from "prop-types";

// Primer elemento del DOM: primer foco al tabular. Invisible hasta recibir foco.
const SkipLink = ({ targetId, label }) => (
  <a
    href={`#${targetId}`}
    className="skip-link"
    onClick={(e) => {
      // Sin hash en la URL y con foco real en el destino (el stage es fixed: no hay scroll)
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      target.focus();
    }}
  >
    {label}
  </a>
);

SkipLink.propTypes = {
  targetId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default SkipLink;
