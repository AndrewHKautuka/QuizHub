import type { ValidationRule } from "react-hook-form";

export const fieldRequired: ValidationRule<boolean> = { value: true, message: "This field is required" };

// RegExp pattern obatined from Stackflow (Dhruv Kumar Jha's 2016 answer, https://stackoverflow.com/questions/39356826/how-to-check-if-it-a-text-input-has-a-valid-email-format-in-reactjs)
// Tested superficially for correctness against some personal emails
export const emailPattern: ValidationRule<RegExp> = { value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Malformed email" };
const maxEmailLen: number = 96;
export const maxEmailLength: ValidationRule<number> = { value: maxEmailLen, message: `At most ${maxEmailLen} characters are expected in an email` };

const [minPassLen, maxPassLen]: number[] = [8, 64];
export const minPasswordLength: ValidationRule<number> = { value: minPassLen, message: `At least ${minPassLen} characters are expected in a password` };
export const maxPasswordLength: ValidationRule<number> = { value: maxPassLen, message: `At most ${maxPassLen} characters are expected in a password` };