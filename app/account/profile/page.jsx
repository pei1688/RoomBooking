import { getGuest } from "@/_lib/data-service";
import FormSpinner from "@/app/_components/spinner/FormSpinner";
import UpdateGuestForm from "@/app/_components/UpdateGuestForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { PiWarningCircleBold } from "react-icons/pi";

export const metadata = {
  title: "個人資料",
};

async function page() {
  const session = await auth();
  if (!session.user) redirect("/login");
  const guest = await getGuest(session.user.email);

  return (
    <Suspense fallback={<FormSpinner />}>
    <div className="bg-boshe-400 min-h-full w-full rounded-md flex flex-col justify-center items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg flex flex-col justify-center items-center">
        <h2 className="text-boshe-100 text-xl mb-5 self-start">
          編輯個人資料
        </h2>
        <p className="text-warm-100 mb-4 text-sm flex gap-1 items-center">
          <PiWarningCircleBold size={20} />
          提供完整的資訊有助於辦理預訂手續更流暢
        </p>
  
        <div className="w-full">
          <UpdateGuestForm guest={guest} />
        </div>
      </div>
    </div>
  </Suspense>
  
  );
}

export default page;
