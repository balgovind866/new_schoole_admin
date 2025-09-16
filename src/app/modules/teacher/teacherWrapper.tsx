import { KTCard } from "../../../_metronic/helpers";
import { Content } from "../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { useLayout } from "../../../_metronic/layout/core";
import TeacherDrawer from "./columns/form/teacherDrawer";
import AllStudentTable from "./columns/table/AllStudentTable";
import { ListViewProvider } from "./core /ListViewProvider";
import { QueryRequestProvider } from "./core /QueryRequestProvider";
import { QueryResponseProvider } from "./core /QueryResponseProvider";


const TeacherList = () => {
  return (
    <>
      <KTCard className="m-4">
        <AllStudentTable />
      </KTCard>
    </>
  );
};

const TeacherWrapper = () => {
  const { setToolbarType } = useLayout();
  setToolbarType("teacher"); // Match this with your toolbar config

  return (
    <QueryRequestProvider>
      <QueryResponseProvider>
        <ListViewProvider>
          <ToolbarWrapper />
          <Content>
            <TeacherList />
            <TeacherDrawer />
          </Content>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  );
};

export { TeacherWrapper };