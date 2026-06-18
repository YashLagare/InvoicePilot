
import { requireUser } from "../utils/hooks";

const DashboardPage = async () => {
  const session = await requireUser();
  return (
    <>

      

    </>
  )
}

export default DashboardPage