import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { GenresWidjet } from './GenresWidget';

export function SideBarWidget() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="font-bold">Choose your favorite genres</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <GenresWidjet />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
