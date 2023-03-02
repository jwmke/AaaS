const styled = ({ display = "none", left = 0, top = 0 }) => `
  #expander {
    align-items: center;
    background-color: #EAEFF2;
    border-radius: 1.5rem;
    border: none;
    display: ${display};
    justify-content: center;
    left: ${left}px;
    position: fixed;
    top: ${top}px;
    height: 3rem;
    padding: 0 1.5rem;
    z-index: 9999;
    transform: translate(-50%);
    box-shadow: 6px 6px 8px 0 rgba(0, 0, 0, .15);
  }
  .text-marker {
    fill: white;
  }
`;

class Expander extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  get markerPosition() {
    return JSON.parse(this.getAttribute("markerPosition") || "{}");
  }

  get styleElement() {
    return this.shadowRoot.querySelector("style");
  }

  static get observedAttributes() {
    return ["markerPosition", "text"];
  }

  highlightSelection() {
    var userSelection = window.getSelection();
    for (let i = 0; i < userSelection.rangeCount; i++) {
      this.highlightRange(userSelection.getRangeAt(i));
    }
    window.getSelection().empty();
  }

  render() { 
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = styled({});
    this.shadowRoot.appendChild(style);
    this.shadowRoot.innerHTML += `
    <div id="expander">
    </div>
  `;
    this.shadowRoot
      .getElementById("expander")
      .addEventListener("click", () => this.highlightSelection());
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "markerPosition") {
      this.styleElement.textContent = styled(this.markerPosition);
    }
    if (name === "text") {
      this.shadowRoot.getElementById("expander").textContent = "No Acronym Found";
      let key = this.getAttribute("text").replace(/['"\s\.]+/g, '').toUpperCase();
      if (key.length <= 15) {
        key = `${key}${"0".repeat(15-key.length)}`;
        fetch(`http://127.0.0.1:8090/api/collections/acronyms/records/${key}`).then(r => r.text()).then(result => {
        const jsonRes = JSON.parse(result);
          if (jsonRes.code) {
            this.shadowRoot.getElementById("expander").textContent = "No Acronym Found";
          } else {
            this.shadowRoot.getElementById("expander").textContent = jsonRes.expanded;
          }
        })
      }
    }
  }
}

window.customElements.define("expander-element", Expander);