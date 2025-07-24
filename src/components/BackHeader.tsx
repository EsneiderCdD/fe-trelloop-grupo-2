"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface BackHeaderProps {
  title: string;
}

export default function BackHeader({title}: BackHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      onClick={handleBack}
      className="flex items-center space-x-2 cursor-pointer hover:text-blue-600 ps-7 h-15 bg-blue-950"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <h1 className="text-lg font-semibold">{title}</h1>
    </div>
  );
}
