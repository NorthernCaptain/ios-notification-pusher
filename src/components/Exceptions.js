
export class CodeError extends Error {
  constructor(code, ...args) {
    super(...args);
    this.code = code;
  }
}

export class ValidateError extends CodeError {
}
