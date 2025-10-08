import { redirect, useActionData } from "react-router";
import { registerUser } from "server/auth.queries.server";
import RegisterForm from "~/components/forms/RegisterForm";

export const action = async ({ request }: { request: Request}) => {
  const formData  = await request.formData();
  const firstName = formData.get("firstName")?.toString();
  const lastName  = formData.get("lastName")?.toString();
  const email     = formData.get("email")?.toString();
  const password  = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    await registerUser(firstName ?? '', lastName ?? '', email, password);
    return redirect("/login");
  } catch ( error: any ) {
    return { error: error.message || "Something went wrong..." };
  }
};

export default function Register() {
  const actionData = useActionData<{ error?: string }>();
  return <RegisterForm error={actionData?.error} />;
}
