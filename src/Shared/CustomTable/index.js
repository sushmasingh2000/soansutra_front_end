import React from "react";
import { Skeleton } from "@mui/material";

const CustomTable = ({
  tablehead = [],   // default empty array
  tablerow = [],    // default empty array
  className,
  isLoading,
}) => {
  return (
    <div className={`w-full overflow-x-auto example ${className || ""}`}>
      <table className="min-w-full table-auto divide-y divide-yellow-700 text-sm">
        <thead className="bg-yellow-100">
          <tr>
            {Array.isArray(tablehead) &&
              tablehead.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="border border-gray-300 px-4 py-2 text-left text-xs font-bold uppercase whitespace-nowrap"
                >
                  {column}
                </th>
              ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-300">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.isArray(tablehead) &&
                  tablehead.map((_, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border border-gray-300 px-4 py-3 whitespace-nowrap "
                    >
                      <Skeleton animation="wave" height={20} />
                    </td>
                  ))}
              </tr>
            ))
          ) : tablerow.length === 0 ? (
            <tr>
              <td
                colSpan={tablehead?.length || 1}
                className="text-center text-black px-4 py-6"
              >
                No data found
              </td>
            </tr>
          ) : (
            tablerow.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-yellow-600/30  transition-colors cursor-pointer"
              >
                {Array.isArray(row) &&
                  row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border border-gray-300 px-4 py-3 whitespace-nowrap text-sm "
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
