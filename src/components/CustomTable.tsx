"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

interface Column {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
  minWidth?: number;
}

interface CustomTableProps {
  columns: Column[];
  rows: any[];
  onDelete?: (index: number) => void;
  readOnly?: boolean;
  enableSelect?: boolean;
}

export default function CustomTable({
  columns,
  rows,
  onDelete,
  readOnly = false,
  enableSelect = false,
}: CustomTableProps) {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<number[]>([]);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleSelect = (index: number) => {
    if (readOnly) return;
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (readOnly) return;
    setSelected(checked ? rows.map((_, i) => i) : []);
  };

  const handleDeleteSelected = () => {
    if (readOnly || !onDelete) return;
    [...selected].sort((a, b) => b - a).forEach(onDelete);
    setSelected([]);
  };

  const isAllSelected = rows.length > 0 && selected.length === rows.length;

  return (
    <Box
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: theme.palette.mode === "dark" ? "#353535" : "#e0e0e0",
        overflow: "hidden",
        marginTop: "20px",
      }}
    >
      {/* نوار ابزار حذف */}
      {!readOnly && enableSelect && (
        <Toolbar className="flex justify-start !pl-3 !pr-3 py-3 !min-h-auto">
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
        </Toolbar>
      )}

      <TableContainer>
        <Table stickyHeader size="small">
          <TableHead
            sx={{
              backgroundColor:
                theme.palette.mode === "dark" ? "#222" : "#f19941",
              "& th": {
                color: theme.palette.mode === "dark" ? "#ffff" : "#303030",
                fontWeight: 600,
              },
            }}
          >
            <TableRow>
              {enableSelect && !readOnly && (
                <TableCell padding="checkbox">
                  <Checkbox
                    color="secondary"
                    indeterminate={
                      selected.length > 0 && selected.length < rows.length
                    }
                    checked={isAllSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </TableCell>
              )}
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align || "left"}
                  sx={{ minWidth: col.minWidth }}
                >
                  {col.label}
                </TableCell>
              ))}
              {!readOnly && onDelete && (
                <TableCell align="center">عملیات</TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody
            sx={{
              "& td": {
                color:
                  theme.palette.mode === "dark"
                    ? "#fff"
                    : theme.palette.text.primary,
              },
            }}
          >
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length + (enableSelect ? 1 : 0) + (onDelete ? 1 : 0)
                  }
                  align="center"
                >
                  <Typography color="textDisabled" variant="caption">
                    هیچ داده‌ای وجود ندارد.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => (
                  <TableRow hover key={idx}>
                    {enableSelect && !readOnly && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="secondary"
                          checked={selected.includes(idx + page * rowsPerPage)}
                          onChange={() =>
                            handleSelect(idx + page * rowsPerPage)
                          }
                        />
                      </TableCell>
                    )}

                    {columns.map((col) => (
                      <TableCell key={col.id}>{row[col.id] ?? "-"}</TableCell>
                    ))}

                    {!readOnly && onDelete && (
                      <TableCell align="center">
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => onDelete(idx + page * rowsPerPage)}
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

      {/* صفحه‌بندی */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="تعداد سطرهای هر صفحه"
        sx={{
          direction: "rtl", // 🔹 راست‌چین کلی
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
          "& .MuiTablePagination-toolbar": {
            flexDirection: "row-reverse", // ترتیب اجزا برعکس بشه
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
              display: "flex",
              flexDirection: "row", // ✅ این خط باعث میشه دو‌نقطه سمت چپ بمونه
              alignItems: "center",
              gap: "4px",
            },
          "& .MuiTablePagination-spacer": {
            display: "none",
          },
          "& .MuiTablePagination-actions": {
            direction: "ltr", // 🔹 فلش‌ها در جهت درست
          },
        }}
      />
    </Box>
  );
}
