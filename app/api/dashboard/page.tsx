
import { requireUser } from "../../utils/hooks";

const DashboardPage = async () => {
    const session = await requireUser();
    return (
        <div>DashboardPage is here broo</div>
    )
}

export default DashboardPage