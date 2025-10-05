"use client";
import React from "react";
import { PasswordStrengthMeter } from "@/r/new-york/strength-meter/strength-meter";
// import { advancedUsageExamples } from "./_components/AdvancedUsage";

export default function StrengthMeterPreview() {
  return (
    <div className="w-full flex justify-center">
      <PasswordStrengthMeter
        placeholder="Type your password"
        className="max-w-md"
      />
    </div>
  )
}