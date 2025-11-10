import { Box } from "@mui/material";
import React from "react";
import FormAddProduct from "./FormAddProduct";
import ProductTable from "./ProductTable";

function ProductStep() {
  return (
    <Box className="w-full h-full flex flex-col p-4">
      <header>
        <FormAddProduct />
      </header>
      <ProductTable />
    </Box>
  );
}

export default ProductStep;
