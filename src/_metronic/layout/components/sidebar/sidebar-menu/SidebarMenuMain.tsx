import { useIntl } from 'react-intl'
import { SidebarMenuItem } from './SidebarMenuItem'
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="element-11"
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        fontIcon="bi-app-indicator"
      />
        <SidebarMenuItem
        to="/student"
        icon="abstract-28"
        title="Students"
        fontIcon="bi-layers"
      />
      <SidebarMenuItem
        to="/herosliders"
        icon="abstract-28"
        title="All Teachers"
        fontIcon="bi-layers"
      />
       <SidebarMenuItem
        to="/allbus"
        icon="abstract-28"
        title="All Bus"
        fontIcon="bi-layers"
      />
      <SidebarMenuItem
        to="/allstaff"
        icon="abstract-28"
        title="All Staff"
        fontIcon="bi-layers"
      />
      <SidebarMenuItem
        to="/courts"
        icon="abstract-28"
        title="Courts"
        fontIcon="bi-layers"
      />
     

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Slider</span>
        </div>
      </div>


      <SidebarMenuItem
        to="/herosliders"
        icon="abstract-28"
        title="Hero Slider"
        fontIcon="bi-layers"
      />
       <SidebarMenuItem
        to="/allbus"
        icon="abstract-28"
        title="All Bus"
        fontIcon="bi-layers"
      />
       <SidebarMenuItem
        to="/allstaff"
        icon="abstract-28"
        title="Hero Slider"
        fontIcon="bi-layers"
      />


      <SidebarMenuItem
        to="/attendance"
        icon="abstract-28"
        title="Demo"
        fontIcon="bi-layers"
      />

      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Master Title Demo
          </span>
        </div>
      </div>


      <SidebarMenuItemWithSub
        to="/masters"
        title="Masters"
        fontIcon="bi-chat-left"
        icon="message-text-2"
      >
        <SidebarMenuItem
          to="/masters/organization"
          title="Master Demo"
          hasBullet={true}
        />

      </SidebarMenuItemWithSub>

    </>
  );
}

export { SidebarMenuMain }
