import { Button } from "./ui/button";
import { socialLogin } from "@/action/user";
import Image from "next/image";
function SocialRegisterForm() {
  return (
    <div>
      <form action={socialLogin} className="flex justify-around items-center">
        <div className="w-full ">
          <Button type="submit" variant="login" name="action" value="google">
            <Image src="/icons/google.svg" alt="google" width={22} height={22} />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SocialRegisterForm;
