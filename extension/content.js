const expanderElement = document.createElement("expander-element");
document.body.appendChild(expanderElement);

const setMarkerPosition = (markerPosition) =>
expanderElement.setAttribute(
    "markerPosition",
    JSON.stringify(markerPosition)
  );

const setText = (text) =>
  expanderElement.setAttribute(
      "text",
      JSON.stringify(text)
    );

const getSelectedText = () => window.getSelection().toString();

document.addEventListener("click", () => {
  if (getSelectedText().length > 0) {
    setText(getSelectedText());
    setMarkerPosition(getMarkerPosition());
  }
});

document.addEventListener("selectionchange", () => {
  if (getSelectedText().length === 0) {
    setMarkerPosition({ display: "none" });
  }
});

function getMarkerPosition() {
  const rangeBounds = window
    .getSelection()
    .getRangeAt(0)
    .getBoundingClientRect();
  return {
    left: rangeBounds.left + (rangeBounds.width / 2),
    top: rangeBounds.top - 32,
    display: "flex",
  };
}