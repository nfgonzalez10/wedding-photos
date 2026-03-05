import { AppContextDispatch } from "@/context/Context";
import { SubmitEventHandler, useContext } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Authentication() {
  const dispatch = useContext(AppContextDispatch);
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (
      e.currentTarget.password.value === process.env.NEXT_PUBLIC_AUTHORIZATION
    ) {
      dispatch?.({
        type: "SET_AUTHENTICATED",
        payload: { isAuthenticated: true },
      });
    }
  };

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
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
