import { Signup as SignupComponent, useDynamicTitle } from "../components";

function Signup() {
  useDynamicTitle();
  return <SignupComponent />;
}

export default Signup;
