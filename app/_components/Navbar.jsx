import { getGuest } from "@/_lib/data-service";
import { auth } from "@/auth";
import NavbarList from "./NavbarList";

async function Navbar() {
  const session = await auth();
  const user = session?.user;
  const guest = await getGuest(session?.user?.email);

  return <NavbarList user={user} guest={guest} />;
}

export default Navbar;
