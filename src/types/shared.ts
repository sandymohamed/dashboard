import React from "react";

type TLoading = "idle" | "pending" | "succeeded" | "failed";

type TFirstDayOfWeek =  0 | 1 | 2 | 3 | 4 | 5 | 6;

type TUser = 'Admin' | 'Student' | 'Teacher' | 'Family';

type TPath = {
  title: string;
  path: string;
  icon: React.ReactNode;
}

export type { TLoading, TFirstDayOfWeek, TUser, TPath }