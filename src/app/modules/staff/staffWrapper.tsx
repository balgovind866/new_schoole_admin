import { KTCard } from "../../../_metronic/helpers";
import { Content } from "../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { useLayout } from "../../../_metronic/layout/core";
import AllStaffDrawer from "./columns/form/AllStaffDrawer";
import AllStaffTable from "./columns/table/AllStaffTable";
import { ListViewProvider } from "./core /ListViewProvider";
import { QueryRequestProvider } from "./core /QueryRequestProvider";
import { QueryResponseProvider } from "./core /QueryResponseProvider";


const AllStaffList = () => {
  return (
    <>
      <KTCard className="m-4">
        <AllStaffTable />
      </KTCard>
    </>
  );
};

const AllStaffWrapper = () => {
  const { setToolbarType } = useLayout();
  setToolbarType("allstaff"); // Match this with your toolbar config

  return (
    <QueryRequestProvider>
      <QueryResponseProvider>
        <ListViewProvider>
          <ToolbarWrapper />
          <Content>
            <AllStaffList />
            <AllStaffDrawer />
          </Content>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  );
};

export { AllStaffWrapper };