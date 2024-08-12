import { useAppSelector } from "@/store/hooks";
import { TUserRole } from "@/types/shared";
import React from "react";
import { Navigate} from "react-router-dom";

const ProtectedRoute = ({
  allowedTypes,
  children,
}: {
  allowedTypes: TUserRole[];
  children: React.ReactNode;
}) => {

  const { user } = useAppSelector((state) => state.auth);

  if (allowedTypes.includes(user?.user_type)) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
