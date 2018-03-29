import { observable, action, computed } from 'mobx';

class ControlPanelStore {
  @observable selectedObject = null;
  @observable controlPanel = false;
  @observable browseObjects = false;
  @observable objectaddGroup = false;
  @observable objectProperties = false;
  @observable layerProperties = false;

  @computed
  get getSelectedObject() {
    return this.selectedObject;
  }

  @action closeControlPanel = () => {
    this.selectedObject = null;
    this.controlPanel = false;
  }

  @action openControlPanel = (object) => {
    this.closeControlPanel();
    this.selectedObject = object;
    this.controlPanel = true;
    console.log(this.selectedObject);
  }

  @action toggleBrowseObjects = () => {
    this.browseObjects = !this.browseObjects;
  }

  @action toggleObjectaddGroup = () => {
    this.objectaddGroup = !this.objectaddGroup;
  }

  @action toggleObjectProperties = () => {
    this.objectProperties = !this.objectProperties;
  }

  @action toggleLayerProperties = () => {
    this.layerProperties = !this.layerProperties;
  }

}

const controlpanelStore = new ControlPanelStore();
export default controlpanelStore;