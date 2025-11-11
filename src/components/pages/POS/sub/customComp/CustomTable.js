import React from "react";
import { Skeleton } from "@mui/material";

const CustomTable = ({
  tablehead = [],
  tablerow = [],
  className,
  isLoading,
}) => {
  return (
    <div
      className={`w-full overflow-x-auto border border-pink-300/40 rounded-lg bg-white shadow-sm ${
        className || ""
      }`}
    >
      <table className="min-w-full table-auto text-sm">
        {/* 🩷 Table Header */}
        <thead className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
          <tr>
            {Array.isArray(tablehead) &&
              tablehead.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-4 py-2 border border-pink-200/30 text-left text-[12px] font-semibold uppercase tracking-wide whitespace-nowrap"
                >
                  {column}
                </th>
              ))}
          </tr>
        </thead>

        {/* 🪶 Table Body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Loading State */}
          {isLoading ? (
            Array.from({ length: 10 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.isArray(tablehead) &&
                  tablehead.map((_, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-4 py-3 border border-gray-200 whitespace-nowrap"
                    >
                      <Skeleton
                        animation="wave"
                        height={18}
                        width="100%"
                        sx={{ bgcolor: "rgba(240, 167, 255, 0.3)" }}
                      />
                    </td>
                  ))}
              </tr>
            ))
          ) : tablerow.length === 0 ? (
            // Empty State
            <tr>
              <td
                colSpan={tablehead?.length || 1}
                className="text-center text-gray-500 px-4 py-6 text-sm"
              >
                No data found
              </td>
            </tr>
          ) : (
            // Table Rows
            tablerow.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-pink-50 transition-colors duration-150 cursor-pointer"
              >
                {Array.isArray(row) &&
                  row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-2 py-1 border border-gray-200 text-gray-700 text-xs whitespace-nowrap"
                    >
                      {cell}
                    </td>
                  ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
