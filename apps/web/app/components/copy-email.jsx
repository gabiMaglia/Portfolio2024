"use client";

import { useId } from "react";
import PropTypes from "prop-types";
import { useCopy } from "@/hooks/use-copy";

// Link mailto que copia al clic. Si el navegador no deja copiar, abre el mail como siempre.
// El aviso vive FUERA del link (región aria-live aparte): no ensucia el nombre del enlace.
const CopyEmail = ({ email, copiedLabel, hint, className = "" }) => {
  const { copied, copy } = useCopy(email);
  const hintId = useId();

  const onClick = async (e) => {
    e.preventDefault();
    const ok = await copy();
    if (!ok) window.location.href = `mailto:${email}`;
  };

  return (
    <span className={`email-wrap ${className}`.trim()}>
      <a className="email-link" href={`mailto:${email}`} onClick={onClick} aria-describedby={hintId}>
        {email}
        <span className="email-arrow" aria-hidden="true">{copied ? "✓" : "→"}</span>
      </a>
      <span className="email-status t-kicker" role="status" aria-live="polite">{copied ? copiedLabel : ""}</span>
      <span id={hintId} className="sr-only">{hint}</span>
    </span>
  );
};

CopyEmail.propTypes = {
  email: PropTypes.string.isRequired,
  copiedLabel: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default CopyEmail;
