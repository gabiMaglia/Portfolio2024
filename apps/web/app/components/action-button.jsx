import PropTypes from "prop-types";

// Botón de acción único del sitio. Las variantes viven acá y en el CSS de `.action-btn`,
// nunca por pantalla. `aria-disabled` (no `disabled`): el foco no se pierde al llegar al borde.
const ActionButton = ({ label, icon, onClick, disabled = false, variant = "round", size = "lg" }) => (
  <button
    type="button"
    className={`action-btn action-btn--${variant} action-btn--${size}`}
    aria-label={label}
    aria-disabled={disabled ? "true" : undefined}
    onClick={disabled ? undefined : onClick}
  >
    <span aria-hidden="true" className="action-btn__icon">{icon}</span>
  </button>
);

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["lg"]),
};

export default ActionButton;
