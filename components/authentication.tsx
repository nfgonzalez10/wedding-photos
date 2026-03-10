import { AppContextDispatch } from "@/context/Context";
import { isAuthenticated } from "@/data/authorization";
import { saveSession } from "@/lib/session";
import { SubmitEventHandler, useContext } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Authentication() {
  const dispatch = useContext(AppContextDispatch);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const password = e.currentTarget.password.value;

    const result = await isAuthenticated(password);

    if (result.authenticated) {
      saveSession(result.accessToken!, result.refreshToken!);
      return dispatch?.({
        type: "SET_AUTHENTICATED",
        payload: { isAuthenticated: true },
      });
    }

    toast.error("Incorrect password. Please try again.");
  };

  return (
    <form className="w-full max-w-sm px-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <Input
          placeholder="Enter password to view photos"
          type="password"
          name="password"
          id="password"
        />
      </div>
      <Button type="submit"> Submit</Button>
    </form>
  );
}
