import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeProduct } from "@/features/store/productListSlice";
import { lifetimes, statuses, parts } from "../../../store/questions";
import CustomTable from "@/components/CustomTable";

function ProductTable({ readOnly = false }) {
  const dispatch = useDispatch();
  const productList = useSelector(
    (state: RootState) => state.productList.items
  );

  const columns = [
    { id: "index", label: "ردیف", align: "left" as const },
    { id: "BrandName", label: "برند", align: "left" as const },
    { id: "ProductName", label: "محصول", align: "left" as const },
    { id: "ProductLifeLabel", label: "عمر", align: "left" as const },
    {
      id: "ProductionConditionsLabel",
      label: "وضعیت",
      align: "left" as const,
    },
    { id: "AccessoryConditionsLabel", label: "قطعه", align: "left" as const },
  ];

  const rows = productList.map((p, i) => ({
    index: i + 1,
    BrandName: p.BrandName,
    ProductName: p.ProductName,
    ProductLifeLabel:
      lifetimes.find((l) => l.id === p.ProductLife)?.label ?? "-",
    ProductionConditionsLabel:
      statuses.find((s) => s.id === p.ProductionConditions)?.label ?? "-",
    AccessoryConditionsLabel:
      parts.find((part) => part.id === p.AccessoryConditions)?.label ?? "-",
  }));

  const handleDelete = (index: number) => {
    dispatch(removeProduct(index));
  };

  return (
    <CustomTable
      columns={columns}
      rows={rows}
      onDelete={!readOnly ? handleDelete : undefined}
      enableSelect={!readOnly}
      readOnly={readOnly}
    />
  );
}

export default ProductTable;
