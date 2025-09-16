import { KTCard } from "../../../_metronic/helpers";
import { Content } from "../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { useLayout } from "../../../_metronic/layout/core";


import { ListViewProvider } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import AllBusDrawer from "./form/AllBusDrawer";
import AllBusTable from "./table/AllBusTable";


const AllBusList = () => {
  return (
    <>
      <KTCard className="m-4">
        <AllBusTable />
      </KTCard>
    </>
  );
};

const AllBusWrapper = () => {
  const { setToolbarType } = useLayout();
  setToolbarType("allbus"); // Match this with your toolbar config

  return (
    <QueryRequestProvider>
      <QueryResponseProvider>
        <ListViewProvider>
          <ToolbarWrapper />
          <Content>
            <AllBusList />
            <AllBusDrawer />
          </Content>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  );
};

export { AllBusWrapper };