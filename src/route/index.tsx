import { createBrowserRouter } from "react-router-dom";
import Overview from "../components/pages/overview/Overview";
import Notification from "../components/pages/notification/Notification";
import CreateNotification from "../components/pages/notification/CreateNotification";
import Profile from "../components/pages/profile/Profile";
import CreateUser from "../components/pages/users/CreateUser";
import AllUsers from "../components/pages/users/AllUsers";
import CreateVariant from "../components/pages/variant/CreateVariant";
import AllVariant from "../components/pages/variant/AllVariant";
import CreateCategory from "../components/pages/category/CreateCategory";
import AllCategory from "../components/pages/category/AllCategory";
import AllOrder from "../components/pages/order/AllOrder";
import AllSellerPay from "../components/pages/seller-pay/AllSellerPay";
import CreateRequisition from "../components/pages/requisition/CreateRequisition";
import Requisition from "../components/pages/requisition/Requisition";
import AllFeedback from "../components/pages/feedback/AllFeedback";
import CreateFeedback from "../components/pages/feedback/CreateFeedback";
import Images from "../components/gallery/Images";
import Login from "../components/pages/Login";
import App from "../layout/App";
import Folder from "../components/gallery/Folders";
import NotFound from "../components/pages/NotFound";
import ViewUser from "../components/pages/users/ViewUser";
import UpdateUser from "../components/pages/users/UpdateUser";
import ViewAttributes from "../components/pages/variant/ViewAttributes";
import UpdateVariant from "../components/pages/variant/UpdateVariant";
import CreateOrder from "../components/pages/order/createOrder";
import UpdateCategory from "../components/pages/category/UpdateCategory";
import UpdateSubCategory from "../components/pages/category/UpdateSubCategory";
import UpdateMainCategory from "../components/pages/category/UpdateMainCategory";
import ViewCategories from "../components/pages/category/ViewCategories";
import UpdateProduct from "../components/pages/product/UpdateProduct";
import AllProduct from "../components/pages/product/allProduct";
import CreateProduct from "../components/pages/product/createProduct";

export const route = createBrowserRouter([
  {
    Component: App,
    errorElement: <NotFound />,
    children: [
      { path: "overview", Component: Overview },
      { path: "profile", Component: Profile },
      { path: "create", Component: CreateUser },
      { path: "users", Component: AllUsers },
      { path: "view-user/:slug", Component: ViewUser },
      { path: "update-user/:slug", Component: UpdateUser },
      { path: "create-product", Component: CreateProduct },
      { path: "all-product", Component: AllProduct },
      { path: "update-product/:slug", Component: UpdateProduct },
      { path: "create-variant", Component: CreateVariant },
      { path: "all-variant", Component: AllVariant },
      { path: "update-variant/:slug", Component: UpdateVariant },
      { path: "view-attributes/:slug", Component: ViewAttributes },
      { path: "create-category", Component: CreateCategory },
      { path: "update-sub-category/:slug", Component: UpdateSubCategory },
      { path: "update-category/:slug", Component: UpdateCategory },
      { path: "update-main-category/:slug", Component: UpdateMainCategory },
      { path: "view-categories/:slug", Component: ViewCategories },
      { path: "all-category", Component: AllCategory },
      { path: "create-order", Component: CreateOrder },
      { path: "all-order", Component: AllOrder },
      { path: "seller-pay", Component: AllSellerPay },
      { path: "create-notice", Component: CreateNotification },
      { path: "all-notice", Component: Notification },
      { path: "create-requisition", Component: CreateRequisition },
      { path: "all-requisition", Component: Requisition },
      { path: "create-feedback", Component: CreateFeedback },
      { path: "all-feedback", Component: AllFeedback },
      { path: "images", Component: Images },
      { path: "folders", Component: Folder },
    ],
  },
  { path: "/", element: <Login /> },
]);
