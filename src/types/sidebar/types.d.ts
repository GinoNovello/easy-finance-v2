type SidebarProviderProps = {
  children?: React.ReactNode;
  expanded: boolean;
  setExpanded: (value: boolean) => void;
};
interface SidebarProps {
  children: React.ReactNode;
}
interface SiberItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
}
