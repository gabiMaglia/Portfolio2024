import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ActionButton from "./action-button";

// Presentacional: contador y textos llegan resueltos (sin t()).
const CarouselControls = ({ counter, prevLabel, nextLabel, onPrev, onNext, prevDisabled, nextDisabled }) => (
  <div className="proj-controls">
    <span className="t-fine proj-counter">{counter}</span>
    <div className="proj-controls__btns">
      <ActionButton label={prevLabel} icon={<ChevronLeft size={20} />} onClick={onPrev} disabled={prevDisabled} />
      <ActionButton label={nextLabel} icon={<ChevronRight size={20} />} onClick={onNext} disabled={nextDisabled} />
    </div>
  </div>
);

CarouselControls.propTypes = {
  counter: PropTypes.string.isRequired,
  prevLabel: PropTypes.string.isRequired,
  nextLabel: PropTypes.string.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  prevDisabled: PropTypes.bool,
  nextDisabled: PropTypes.bool,
};

export default CarouselControls;
