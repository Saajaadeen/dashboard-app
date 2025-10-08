import { redirect, useActionData, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { authenticateUser } from "server/auth.queries.server";
import { getLoginInfo } from "server/dashboard.queries.server";
import { createUserSession, getUserId } from "server/session.server";
import LoginForm from "~/components/forms/LoginForm";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);

  const loginInfo = await getLoginInfo();
  if (userId) return redirect("/dashboard");
  return { loginInfo: loginInfo ?? {} };
}

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const user = await authenticateUser(email, password);
  if (!user) { return { error: "Invalid credentials" }; }

  return createUserSession(user.id, "/dashboard");
};

export default function Login() {
  const data = useLoaderData() as { loginInfo: any };
  const actionData = useActionData<{ error?: string }>();
  return <LoginForm loginInfo={data?.loginInfo} error={actionData?.error}/>;
}
