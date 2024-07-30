import { useAppSelector } from "@/store/hooks";
import { TUser } from "@/types/shared";
import React from "react";
import { Navigate} from "react-router-dom";

const ProtectedRoute = ({
  allowedTypes,
  children,
}: {
  allowedTypes: TUser[];
  children: React.ReactNode;
}) => {

  const { user_type } = useAppSelector((state) => state.auth.user);

  if (allowedTypes.includes(user_type)) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
