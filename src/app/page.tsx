import { UserAuthForm } from "@/src/components/login/user-auth-form";
import { ThemeSwitch } from "../components/settings/theme-switch";

export default function Home() {
  return (
    <>
      <ThemeSwitch className="m-2" variant="icon" />
      <div className="min-h-dvh flex items-center justify-center gap-28">
        <UserAuthForm />
        {/* <img
            className="shadow-lg shadow-amber-200"
            src="/logingif.gif"
            alt="Como sacar mi url .tsv"
            width="1000"
            height="1000"
          /> */}
      </div>
    </>
  );
}
