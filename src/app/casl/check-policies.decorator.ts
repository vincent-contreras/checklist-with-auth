import { SetMetadata } from "@nestjs/common";
import { CHECK_POLICIES_KEY } from "../commons/variables/policies.variables";

import { PolicyHandler } from "./policy-handler.interface";

export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
