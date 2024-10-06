import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import SignInGithub from "./SignInGithub";
import { IconLayoutKanban } from "@tabler/icons-react";
import Logo from "@/public/logo.png";
import SignInGoogle from "./SignInGoogle";
import SignInDiscord from "./SignInDiscord";
import Image from "next/image";

export default async function CustomSignInPage() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  } else {
    return (
      <div className="flex justify-center items-center h-full">
        <Card
          className="min-w-96 shadow-xl bg-zinc-900 border-2 border-primary"
          shadow="none"
        >
          <CardHeader className="px-10 py-5 flex items-center">
            {/* <IconLayoutKanban className="text-primary w-8 h-8 md:w-14 md:h-14" /> */}
            <Image
              src={Logo}
              alt="logo"
              className="h-8 w-8 md:w-14 md:h-14 mr-2"
            />
            <h3 className="text-3xl md:text-5xl tracking-tighter text-center w-full font-bold">
              Next Kanban
            </h3>
          </CardHeader>
          <CardBody className="space-y-3 p-10 pt-0">
            <p className="uppercase text-sm text-center text-primary font-semibold">
              🔐 OAuth{" "}
            </p>
            <SignInGithub />
            <SignInGoogle />
            <SignInDiscord />
          </CardBody>
        </Card>
      </div>
    );
  }
}
