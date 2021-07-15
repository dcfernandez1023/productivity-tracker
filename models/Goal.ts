import uuid from 'react-native-uuid';

class Goal {
  id: string;
  userId: string;
  date: string;
  name: string;
  description: string;
  isCompleted: boolean;

  constructor(userId: string, date: string) {
    this.id = uuid.v4();
    this.userId = userId;
    this.date = date;
    this.name = "";
    this.description = "";
    this.isCompleted = false;
  }

  toJson(): object {
    return {
      id: this.id,
      userId: this.userId,
      date: this.date,
      name: this.name,
      description: this.description,
      isCompleted: this.isCompleted
    };
  }
}

export { Goal };
