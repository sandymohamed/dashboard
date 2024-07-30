import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MainLayout, LoginLayout } from "@/layouts";
import { StudentHomePage } from "@/pages/student";
import ProdectedRoute from "./ProtectedRoute";

// ==================== Icons ====================
import HomeIcon from "@/assets/home.svg?react";
import CalendarIcon from "@/assets/calendar.svg?react";
import Boy from "@/assets/Boy.svg?react";
import Teacher from "@/assets/teacher.svg?react";
import Report from "@/assets/reports.svg?react";
import {
  AdminClassesPage,
  AdminHomePage,
  AdminReportsPage,
  AdminStudentsPage,
  AdminTeachersPage,
} from "@/pages/admin";
import {
  TeacherClassesPage,
  TeacherHomePage,
  TeacherReportsPage,
  TeacherStudentsPage,
} from "@/pages/teacher";
import {
  FamilyHomePage,
  FamilyNotesPage,
} from "@/pages/family";
import { CalendarPage, HelpPage, SettingsPage } from "@/pages/shared";
import { Login, PhoneNumber, SetPassword } from "@/pages/login";

const SIDEBAR_DATA = {
  Student: [
    {
      title: "الرئيسية",
      path: "/student",
      icon: <HomeIcon />,
    },
    {
      title: "الجدول",
      path: "calendar",
      icon: <CalendarIcon />,
    },
  ],

  Admin: [
    {
      title: "الرئيسية",
      path: "/admin",
      icon: <HomeIcon />,
    },
    {
      title: "الحصص",
      path: "classes",
      icon: <CalendarIcon />,
    },
    {
      title: "الطلاب",
      path: "students",
      icon: <Boy />,
    },
    {
      title: "المعلمين",
      path: "teachers",
      icon: <Teacher />,
    },
    {
      title: "التقارير",
      path: "reports",
      icon: <Report />,
    },
  ],

  Teacher: [
    {
      title: "الرئيسية",
      path: "/teacher",
      icon: <HomeIcon />,
    },
    {
      title: "الحصص",
      path: "classes",
      icon: <CalendarIcon />,
    },
    {
      title: "الطلاب",
      path: "students",
      icon: <Boy />,
    },
    {
      title: "التقارير",
      path: "reports",
      icon: <Report />,
    },
  ],

  Family: [
    {
      title: "الرئيسية",
      path: "/family",
      icon: <HomeIcon />,
    },
    {
      title: "الجدول",
      path: "calendar",
      icon: <CalendarIcon />,
    },
    {
      title: "الملاحظات",
      path: "notes",
      icon: <Report />,
    },
  ],
};

const router = createBrowserRouter([
  // Login Routes
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "set-phoneNumber",
        element: <PhoneNumber />,
      },
      {
        path: "set-password",
        element: <SetPassword />,
      },
    ],
  },

  // Student Routes
  {
    path: "/student",
    element: (
      <ProdectedRoute allowedTypes={["Student"]}>
        <MainLayout sideBarData={SIDEBAR_DATA["Student"]} />
      </ProdectedRoute>
    ),
    children: [
      {
        index: true,
        element: <StudentHomePage />,
      },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "help",
        element: <HelpPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    element: (
      <ProdectedRoute allowedTypes={["Admin"]}>
        <MainLayout sideBarData={SIDEBAR_DATA["Admin"]} />
      </ProdectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminHomePage />,
      },
      {
        path: "classes",
        element: <AdminClassesPage />,
      },
      {
        path: "students",
        element: <AdminStudentsPage />,
      },
      {
        path: "teachers",
        element: <AdminTeachersPage />,
      },
      {
        path: "reports",
        element: <AdminReportsPage />,
      },
      {
        path: "help",
        element: <HelpPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },

  // Teacher Routes
  {
    path: "/teacher",
    element: (
      <ProdectedRoute allowedTypes={["Teacher"]}>
        <MainLayout sideBarData={SIDEBAR_DATA["Teacher"]} />
      </ProdectedRoute>
    ),
    children: [
      {
        index: true,
        element: <TeacherHomePage />,
      },
      {
        path: "classes",
        element: <TeacherClassesPage />,
      },
      {
        path: "reports",
        element: <TeacherReportsPage />,
      },
      {
        path: "students",
        element: <TeacherStudentsPage />,
      },
      {
        path: "help",
        element: <HelpPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },

  // Family Routes
  {
    path: "/family",
    element: (
      <ProdectedRoute allowedTypes={["Family"]}>
        <MainLayout sideBarData={SIDEBAR_DATA["Family"]} />
      </ProdectedRoute>
    ),
    children: [
      {
        index: true,
        element: <FamilyHomePage />,
      },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "notes",
        element: <FamilyNotesPage />,
      },
      {
        path: "help",
        element: <HelpPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
