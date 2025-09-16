import { KTCard } from "../../../_metronic/helpers";
import { Content } from "../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { useLayout } from "../../../_metronic/layout/core";
import HeroSliderDrawer from "./columns/form/HeroSliderDrawer";
import HeroSliderTable from "./columns/table/HeroSliderTable";
import { ListViewProvider } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";


const HeroSliderList = () => {
  return (
    <>
      <KTCard className="m-4">
        <HeroSliderTable />
      </KTCard>
    </>
  );
};

const HeroSliderWrapper = () => {
  const { setToolbarType } = useLayout();
  setToolbarType("herosliders"); // Match this with your toolbar config

  return (
    <QueryRequestProvider>
      <QueryResponseProvider>
        <ListViewProvider>
          <ToolbarWrapper />
          <Content>
            <HeroSliderList />
            <HeroSliderDrawer />
          </Content>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  );
};

export { HeroSliderWrapper };