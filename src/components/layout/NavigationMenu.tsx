
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/contexts/AuthContext";
import { StudentNavItems } from "./navigation/StudentNavItems";
import { TeacherNavItems } from "./navigation/TeacherNavItems";
import { AdminNavItems } from "./navigation/AdminNavItems";

const NavigationMenuDemo = () => {
  const { profile } = useAuth();
  const userRole = profile?.role || "student";

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {userRole === "student" && <StudentNavItems />}
        {userRole === "teacher" && <TeacherNavItems />}
        {userRole === "admin" && <AdminNavItems />}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationMenuDemo;
