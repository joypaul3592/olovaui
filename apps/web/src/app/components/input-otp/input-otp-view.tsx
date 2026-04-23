"use client";
import { InputOtp } from "./input-otp";
export function InputOtpDefaultView() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-3 rounded-md border p-4">
      <p className="text-sm font-medium">Enter verification code</p>
      <InputOtp />
    </div>
  );
}
export default InputOtpDefaultView;
