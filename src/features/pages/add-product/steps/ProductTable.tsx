"use client";

import { removeProduct } from "@/features/store/productListSlice";
import { RootState } from "@/store/store";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Badge,
  Button,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ProductTableProps {
  readOnly?: boolean; // اگر true بود، کاربر نمی‌تواند حذف یا انتخاب انجام دهد
}

function ProductTable({ readOnly = false }: ProductTableProps) {
  const dispatch = useDispatch();
  const productList = useSelector(
    (state: RootState) => state.productList.items
  );

  const theme = useTheme();
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelect = (index: number) => {
    if (readOnly) return;
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (readOnly) return;
    if (checked) {
      setSelected(productList.map((_, idx) => idx));
    } else {
      setSelected([]);
    }
  };

  const handleDelete = (index: number) => {
    if (readOnly) return;
    dispatch(removeProduct(index));
    setSelected((prev) => prev.filter((i) => i !== index));
  };

  const handleDeleteSelected = () => {
    if (readOnly) return;
    const sorted = [...selected].sort((a, b) => b - a);
    sorted.forEach((index) => dispatch(removeProduct(index)));
    setSelected([]);
  };

  const isAllSelected =
    productList.length > 0 && selected.length === productList.length;

  return (
    <TableContainer component={Paper} className="h-full">
      {/* نوار ابزار حذف */}
      {!readOnly && (
        <Toolbar className="flex justify-start px-4">
          <Badge
            badgeContent={selected.length}
            color="error"
            invisible={selected.length === 0}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Button
              variant="outlined"
              color="error"
              disabled={selected.length === 0}
              onClick={handleDeleteSelected}
              startIcon={<DeleteIcon />}
              size="small"
            >
              حذف موارد انتخاب شده
            </Button>
          </Badge>
        </Toolbar>
      )}

      <Table size="small">
        <TableHead
          sx={{
            backgroundColor: theme.palette.primary.main,
            "& th": { color: theme.palette.primary.contrastText },
          }}
        >
          <TableRow>
            {!readOnly && (
              <TableCell padding="checkbox">
                <Checkbox
                  sx={{
                    color: theme.palette.primary.contrastText,
                    "&.Mui-checked": {
                      color: theme.palette.primary.contrastText,
                    },
                  }}
                  indeterminate={
                    selected.length > 0 && selected.length < productList.length
                  }
                  checked={isAllSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </TableCell>
            )}
            <TableCell>ردیف</TableCell>
            <TableCell>برند</TableCell>
            <TableCell>محصول</TableCell>
            <TableCell>عمر</TableCell>
            <TableCell>وضعیت</TableCell>
            <TableCell>قطعه</TableCell>
            {!readOnly && <TableCell align="center">عملیات</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {productList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={readOnly ? 7 : 8} align="center">
                <Typography color="textDisabled" variant="caption">
                  هیچ محصولی اضافه نشده است.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            productList.map((p, idx) => (
              <TableRow key={idx} hover>
                {!readOnly && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selected.includes(idx)}
                      onChange={() => handleSelect(idx)}
                    />
                  </TableCell>
                )}
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{p.brandName}</TableCell>
                <TableCell>{p.productName}</TableCell>
                <TableCell>{p.lifetime}</TableCell>
                <TableCell>{p.status}</TableCell>
                <TableCell>{p.parts}</TableCell>
                {!readOnly && (
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(idx)}
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductTable;
