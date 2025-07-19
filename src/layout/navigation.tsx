import {
  FaArrowTrendUp,
  FaList,
  FaPaypal,
  FaPerson,
  FaPlus,
  FaUserGroup,
  FaFolderOpen,
} from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { BsChatSquareQuoteFill } from "react-icons/bs";
import { MdFeedback } from "react-icons/md";
import { RiGalleryFill } from "react-icons/ri";
import type { Navigation } from "@toolpad/core/AppProvider";

export const navigation: Navigation = [
  {
    title: "Overview",
    icon: <FaArrowTrendUp size={20} />,
    children: [{ segment: "overview", icon: <FaArrowTrendUp size={20} /> }],
  },
  {
    title: "Profile",
    icon: <FaPerson size={20} />,
    children: [{ segment: "profile", icon: <FaPerson size={20} /> }],
  },
  {
    title: "Users",
    icon: <FaUserGroup size={20} />,
    children: [
      { segment: "create-user", icon: <FaPlus size={20} /> },
      { segment: "all-users", icon: <FaUserGroup size={20} /> },
    ],
  },
  {
    title: "Products",
    icon: <FaList size={20} />,
    children: [
      { segment: "create-product", icon: <FaPlus size={20} /> },
      { segment: "all-product", icon: <FaList size={20} /> },
      { segment: "create-variant", icon: <FaPlus size={20} /> },
      { segment: "all-variant", icon: <FaList size={20} /> },
      { segment: "create-category", icon: <FaPlus size={20} /> },
      { segment: "all-category", icon: <FaList size={20} /> },
    ],
  },
  {
    title: "Orders",
    icon: <FaPaypal size={20} />,
    children: [
      { segment: "create-order", icon: <FaPlus size={20} /> },
      { segment: "all-order", icon: <FaList size={20} /> },
      { segment: "seller-pay", icon: <FaPaypal size={20} /> },
    ],
  },
  {
    title: "Notifications",
    icon: <IoIosNotifications size={20} />,
    children: [
      { segment: "create-notice", icon: <FaPlus size={20} /> },
      { segment: "all-notice", icon: <IoIosNotifications size={20} /> },
    ],
  },
  {
    title: "Requisitions",
    icon: <BsChatSquareQuoteFill size={20} />,
    children: [
      { segment: "create-requisition", icon: <FaPlus size={20} /> },
      { segment: "all-requisition", icon: <BsChatSquareQuoteFill size={20} /> },
    ],
  },
  {
    title: "Feedback",
    icon: <MdFeedback size={20} />,
    children: [
      { segment: "create-feedback", icon: <FaPlus size={20} /> },
      { segment: "all-feedback", icon: <MdFeedback size={20} /> },
    ],
  },
  {
    title: "Gallery",
    icon: <RiGalleryFill size={20} />,
    children: [
      { segment: "images", icon: <RiGalleryFill size={20} /> },
      { segment: "folders", icon: <FaFolderOpen size={20} /> },
    ],
  },
];
