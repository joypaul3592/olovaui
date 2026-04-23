"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
export function TabsDefaultView() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger tabValue="account">Account</TabsTrigger>
        <TabsTrigger tabValue="team">Team</TabsTrigger>
        <TabsTrigger tabValue="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent tabValue="account">Account preferences and profile settings.</TabsContent>
      <TabsContent tabValue="team">Invite members and adjust collaboration access.</TabsContent>
      <TabsContent tabValue="billing">Payment methods and invoices.</TabsContent>
    </Tabs>
  );
}
export default TabsDefaultView;
