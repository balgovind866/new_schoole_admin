import { KTCard } from "../../../_metronic/helpers";
import { Content } from "../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { useLayout } from "../../../_metronic/layout/core";
import AllStudentDrawer from "./columns/form/AllStudentDrawer";
import { StudentsTableUI } from "./columns/table/studentsTableUi";

import { ListViewProvider } from "./core /ListViewProvider";
import { QueryRequestProvider } from "./core /QueryRequestProvider";
import { QueryResponseProvider } from "./core /QueryResponseProvider";


const AllStudentList = () => {
  return (
    <>
      <KTCard className="m-4">
        < StudentsTableUI/>
      </KTCard>
    </>
  );
};

const AllStudentWrapper = () => {
  const { setToolbarType } = useLayout();
  setToolbarType("student"); // Match this with your toolbar config

  return (
    <QueryRequestProvider>
      <QueryResponseProvider>
        <ListViewProvider>
          <ToolbarWrapper />
          <Content>
            <AllStudentList />
        //    <AllStudentDrawer />
          </Content>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  );
};

export { AllStudentWrapper };