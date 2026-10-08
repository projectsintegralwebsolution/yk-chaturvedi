import React from "react";
import {
  ShieldCheck,
  Receipt,
  FileSpreadsheet,
  Award,
  BadgeCheck,
  Briefcase,
  Scale,
  GitMerge,
  TrendingUp,
  BarChart3,
  Calculator,
  UserCheck as UsersCheck,
  Shield,
  Building2,
  Users,
  GraduationCap,
  Building,
  UserCheck,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  FileText,
  Search,
  Sparkles,
} from "lucide-react";

interface DynamicIconProps {
  name: string;
  className?: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = "w-6 h-6" }) => {
  switch (name) {
    case "ShieldCheck":
      return <ShieldCheck className={className} />;
    case "Receipt":
      return <Receipt className={className} />;
    case "FileSpreadsheet":
      return <FileSpreadsheet className={className} />;
    case "Award":
      return <Award className={className} />;
    case "BadgeCheck":
      return <BadgeCheck className={className} />;
    case "Briefcase":
      return <Briefcase className={className} />;
    case "Scale":
      return <Scale className={className} />;
    case "GitMerge":
      return <GitMerge className={className} />;
    case "TrendingUp":
      return <TrendingUp className={className} />;
    case "BarChart3":
      return <BarChart3 className={className} />;
    case "Calculator":
      return <Calculator className={className} />;
    case "UsersCheck":
      return <UsersCheck className={className} />;
    case "Shield":
      return <Shield className={className} />;
    case "Building2":
      return <Building2 className={className} />;
    case "Users":
      return <Users className={className} />;
    case "GraduationCap":
      return <GraduationCap className={className} />;
    case "Building":
      return <Building className={className} />;
    case "UserCheck":
      return <UserCheck className={className} />;
    case "CheckCircle":
      return <CheckCircle className={className} />;
    case "Clock":
      return <Clock className={className} />;
    case "FileText":
      return <FileText className={className} />;
    case "Search":
      return <Search className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    default:
      return <FileText className={className} />;
  }
};
