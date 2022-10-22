class Parts {
  static signup = "signup";
  static login = "login";
  static dashboard = "";
  static poll = "poll";
  static createPoll = "create-poll";
}

export class Paths {
  static signup = () => `/${Parts.signup}`;
  static login = () => `/${Parts.login}`;
  static dashboard = () => `/${Parts.dashboard}`;
  static pollPath = (pollId) => pollId ?? ":pollId";
  static poll = (pollId) => `/${Parts.poll}/${Paths.pollPath(pollId)}`;
  static createPoll = () => `/${Parts.createPoll}`;
}
