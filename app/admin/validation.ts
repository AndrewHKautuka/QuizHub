import type { ValidationRule } from "react-hook-form";

export const fieldRequired: ValidationRule<boolean> = { value: true, message: "This field is required" };

export const quizFieldPattern: ValidationRule<RegExp> = { value: /^([a-zA-Z0-9-_?!][a-zA-Z0-9-_?! ]*[a-zA-Z0-9-_?!])$|^([a-zA-Z0-9-_?!])$/, message: "Must start and end with a-z, A-Z, 0-9, -, _, ? or !; and may additionally conatin spaces" };

const maxTitleLen: number = 64;
export const maxTitleLength: ValidationRule<number> = { value: maxTitleLen, message: `At most ${maxTitleLen} characters are allowed` };

const maxDescLen: number = 256;
export const maxDescLength: ValidationRule<number> = { value: maxDescLen, message: `At most ${maxDescLen} characters are allowed` };

const maxQuestionLen: number = 128;
export const maxQuestionLength: ValidationRule<number> = { value: maxQuestionLen, message: `At most ${maxQuestionLen} characters are allowed` };

const maxChoiceLen: number = 64;
export const maxChoiceLength: ValidationRule<number> = { value: maxChoiceLen, message: `At most ${maxChoiceLen} characters are allowed` };