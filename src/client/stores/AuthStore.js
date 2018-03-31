import { observable, autorun, action, computed } from 'mobx';

class AuthStore {
  @observable closeForm = false;
  @observable username = null;

  constructor() {
    autorun(() => console.log('AuthStore'));
  }

  @action
  toggleForm = set => {
    // console.log(value);
    this.closeForm = set;
  };

  @action
  setUsername = name => {
    this.username = name;
  };

  @computed
  get usersName() {
    return this.username;
  }
}

const authStore = new AuthStore();
export default authStore;
