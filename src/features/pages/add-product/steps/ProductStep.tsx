import { Box } from "@mui/material";
import React from "react";
import FormAddProduct from "./FormAddProduct";
import ProductTable from "./ProductTable";

function ProductStep() {
  return (
    <Box className="w-full h-full flex flex-col">
      <header>
        <FormAddProduct />
      </header>
      <main className="flex-1">
        <ProductTable />
      </main>
    </Box>
  );
}

export default ProductStep;
