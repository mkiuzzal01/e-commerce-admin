import { Text } from "lucide-react";
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
import { MdCategory, MdFeedback } from "react-icons/md";
import { RiGalleryFill } from "react-icons/ri";

export const navigation = [
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
    title: "User",
    icon: <FaUserGroup size={20} />,
    children: [
      { segment: "Create", icon: <FaPlus size={20} /> },
      { segment: "Users", icon: <FaUserGroup size={20} /> },
    ],
  },
  {
    title: "Category",
    icon: <MdCategory size={20} />,
    children: [
      { segment: "create-category", icon: <FaPlus size={20} /> },
      { segment: "all-category", icon: <FaList size={20} /> },
    ],
  },
  {
    title: "Product",
    icon: <FaList size={20} />,
    children: [
      { segment: "create-product", icon: <FaPlus size={20} /> },
      { segment: "all-product", icon: <FaList size={20} /> },
      { segment: "create-variant", icon: <FaPlus size={20} /> },
      { segment: "all-variant", icon: <FaList size={20} /> },
    ],
  },
  {
    title: "Order",
    icon: <FaPaypal size={20} />,
    children: [{ segment: "all-order", icon: <FaList size={20} /> }],
  },
  {
    title: "Advertisement",
    icon: <IoIosNotifications size={20} />,
    children: [
      { segment: "create-advertisement", icon: <FaPlus size={20} /> },
      { segment: "all-advertisement", icon: <IoIosNotifications size={20} /> },
    ],
  },
  {
    title: "Banner content",
    icon: <Text size={20} />,
    children: [
      { segment: "create-content", icon: <FaPlus size={20} /> },
      { segment: "all-content", icon: <IoIosNotifications size={20} /> },
    ],
  },

  {
    title: "Client Feedback",
    icon: <MdFeedback size={20} />,
    children: [
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
