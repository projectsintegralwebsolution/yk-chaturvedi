import React from "react";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { PageEditForm } from "@/components/admin/PageEditForm";

export const dynamic = "force-dynamic";

export default function AdminNewPageScreen() {
  if (!isAdminAuthenticated()) {
    redirect("/admin/login");
  }

  return <PageEditForm isNew={true} />;
}
