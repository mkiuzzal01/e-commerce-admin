import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import MainCategory from "./components/MainCategory";
import Category from "./components/Category";
import SubCategories from "./components/SubCategories";
const AllCategory = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box>
      <Tabs value={tabIndex} onChange={handleChange}>
        <Tab label="Main Categories" />
        <Tab label="Categories" />
        <Tab label="Sub Categories" />
      </Tabs>

      {tabIndex === 0 && (
        <Box sx={{ mt: 2 }}>
          <MainCategory />
        </Box>
      )}

      {tabIndex === 1 && (
        <Box sx={{ mt: 2 }}>
          <Category/>
        </Box>
      )}
      {tabIndex === 2 && (
        <Box sx={{ mt: 2 }}>
          <SubCategories />
        </Box>
      )}
    </Box>
  );
};

export default AllCategory;
