document.addEventListener("DOMContentLoaded", () => {
  const defaultOptions = {
    value: 30,
    animated: false,
    hidden: false,
  };

  class Progress {
    constructor(documentElements = {}, options = defaultOptions) {
      const { value, animated, hidden } = options;

      this.ring = documentElements.ring;
      this.progress = documentElements.progress;

      this.valueProgress = value;
      this.animated = animated;
      this.hidden = hidden;

      this.registerEvents(documentElements);
    }

    registerEvents({ input, animateBtn, hideBtn }) {
      input.addEventListener("change", (event) => {
        this.valueProgress = event.target.value;
      });

      animateBtn.addEventListener("change", (event) => {
        this.animated = event.target.checked;
      });

      hideBtn.addEventListener("change", (event) => {
        this.hidden = event.target.checked;
      });
    }

    set valueProgress(newValue) {
      if (newValue < 0 || newValue > 100) {
        console.error("Value must be between 0 and 100");
        return;
      }

      const radius = this.progress.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (newValue / 100) * circumference;

      this.progress.style.strokeDasharray = `${circumference}`;
      this.progress.style.strokeDashoffset = offset;
    }

    set animated(isAnimated) {
      if (isAnimated) {
        this.progress.classList.add("animation--running");
        return;
      }

      this.progress.classList.remove("animation--running");
    }

    set hidden(isHidden) {
      if (isHidden) {
        this.ring.style.display = "none";
        return;
      }

      this.ring.style.display = "block";
    }
  }

  const hideBtn = document.getElementById("hideToggle");
  const animateBtn = document.getElementById("animateToggle");
  const input = document.querySelector(".input");
  const ring = document.querySelector(".progress-ring");
  const progress = ring.querySelector(".progress-ring__circle");

  new Progress(
    {
      ring,
      progress,
      input,
      animateBtn,
      hideBtn,
    },
    { value: 30, animated: animateBtn.checked, hidden: hideBtn.checked }
  );
});
