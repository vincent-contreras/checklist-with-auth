import { AuthorizationGuard } from "./authorization.guard";

describe("AuthenticationGuard", () => {
  it("should be defined", () => {
    expect(new AuthorizationGuard()).toBeDefined();
  });
});
