export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  delCard(card) {
    this._container.remove(card);
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }
}