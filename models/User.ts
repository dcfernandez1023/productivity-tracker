import uuid from 'react-native-uuid';

class User {
  id: string;
  preferences: object;

  constructor() {
    this.id = uuid.v4();
    this.preferences = {
      goalView: "calendar"
    };
  }

  toJson(): object {
    return {id: this.id, preferences: this.preferences};
  }
}

export { User };
