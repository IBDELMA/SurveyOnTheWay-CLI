export class PollPromptType {
  static OpenBox = new PollPromptType("Open Box");
  static MultipleChoice = new PollPromptType("Multiple Choice");
  static Grade = new PollPromptType("Grade");

  constructor(name) {
    this.name = name;
  }
}
