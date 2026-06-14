
import { signOut } from "@/app/utils/auth";
import { requireUser } from "../utils/hooks";

const DashboardPage = async () => {
  const session = await requireUser();
  return (
    <div>
      <h1>DashboardPage is here broo</h1>
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>

  )
}

export default DashboardPage