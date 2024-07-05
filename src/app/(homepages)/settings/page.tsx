import { MonthProgress } from "@/src/components/settings/month-progress";
import { ThemeSwitcher } from "@/src/components/settings/theme-provider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

export default function SettingsPage() {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Settings</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Theme</TableCell>
            <TableCell className="text-right">
              <ThemeSwitcher />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <MonthProgress />
    </>
  );
}
