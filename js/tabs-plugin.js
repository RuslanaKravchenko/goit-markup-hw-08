class Tabs {
  constructor({
    rootSelector,
    activeControlClass = 'active',
    activePaneClass = 'active',
    activeTab = 1,
  }) {
    this._refs = this._getRefs(rootSelector);
    this._activeControlClass = activeControlClass;
    this._activePaneClass = activePaneClass;
    this._activeTabIdx = activeTab - 1;

    this._bindEvents();
    this._setActiveTab();
  }

  _getRefs(root) {
    const refs = {};

    refs.controls = document.querySelector(`${root} [data-controls]`);
    refs.panes = document.querySelector(`${root} [data-panes]`);

    return refs;
  }

  _bindEvents() {
    this._refs.controls.addEventListener(
      'click',
      this._onControlsClick.bind(this),
    );
  }

  _onControlsClick(event) {
    // event.preventDefault();

    if (event.target.nodeName !== 'BUTTON') {
      console.log('Кликнули не в ссылку');
      return;
    }

    const panes = [...this._refs.panes.children];
    panes.forEach(pane => pane.classList.remove(this._activePaneClass));

    this._removeActiveTab();

    if (event.target.dataset.control === 'all') {
      const panes = [...this._refs.panes.children];
      console.log(panes);
      panes.forEach(pane => pane.classList.add(this._activePaneClass));
    }

    const controlItem = event.target;
    controlItem.classList.add(this._activeControlClass);

    const paneDataAtt = this._getPaneDataAtt(controlItem);
    this._setActivePane(paneDataAtt);
  }

  _setActiveTab() {
    const controlItems = this._refs.controls.querySelectorAll('button');
    const control = controlItems[this._activeTabIdx];

    control.classList.add(this._activeControlClass);

    const panes = [...this._refs.panes.children];
    panes.forEach(pane => pane.classList.add(this._activePaneClass));
  }

  _removeActiveTab() {
    const currentActiveControlItem = this._refs.controls.querySelector(
      `.${this._activeControlClass}`,
    );

    if (!currentActiveControlItem) {
      return;
    }

    currentActiveControlItem.classList.remove(this._activeControlClass);

    const paneDataAtt = this._getPaneDataAtt(currentActiveControlItem);

    this._removeActivePane(paneDataAtt);
  }

  _setActivePane(paneDataAtt) {
    const panes = this._getPaneByDataAtt(paneDataAtt);

    panes.forEach(pane => pane.classList.add(this._activePaneClass));
  }

  _removeActivePane(paneDataAtt) {
    const panes = this._getPaneByDataAtt(paneDataAtt);

    panes.forEach(pane => pane.classList.remove(this._activePaneClass));
  }

  _getPaneDataAtt(control) {
    return control.dataset.control;
  }

  _getPaneByDataAtt(dataAtt) {
    return this._refs.panes.querySelectorAll(`[data-pane="${dataAtt}"]`);
  }
}

const tabs1 = new Tabs({
  rootSelector: '#projects',
  activeControlClass: 'controls__item--active',
  activePaneClass: 'pane--active',
});
