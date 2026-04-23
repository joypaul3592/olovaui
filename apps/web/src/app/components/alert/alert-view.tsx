"use client";
import { Alert, AlertDescription, AlertTitle } from "./alert";
export function AlertDefaultView() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-3">
      <Alert variant="info">
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>New docs pages are now available in the components section.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Saved</AlertTitle>
        <AlertDescription>Your settings were synced successfully.</AlertDescription>
      </Alert>
    </div>
  );
}
export default AlertDefaultView;
