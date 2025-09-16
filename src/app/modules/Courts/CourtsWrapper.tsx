import { KTCard } from "../../../_metronic/helpers";
import { Content } from "../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { useLayout } from "../../../_metronic/layout/core";
import CourtsDrawer from "./columns/form/CourtsDrawer";
import { CourtsTable } from "./columns/table/CourtsTable";
import { ListViewProvider } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";

const CourtsList = () => {
  return (
    <>
      <KTCard className="m-4">
        <CourtsTable />
      </KTCard>
    </>
  );
};

const CourtsWrapper = () => {
  const { setToolbarType } = useLayout();
  setToolbarType("courts"); // Match this with your toolbar config

  return (
    <QueryRequestProvider>
      <QueryResponseProvider>
        <ListViewProvider>
          <ToolbarWrapper />
          <Content>
            <CourtsList />
            <CourtsDrawer />
          </Content>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  );
};

export { CourtsWrapper };
