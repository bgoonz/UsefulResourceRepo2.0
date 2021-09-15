import classnames from "classnames";
import React from "react";
import { ContainerQuery } from "react-container-query";
import { formatDate } from "../utils/dates";

const renderItem = ({ item, k }) => {
  if (["createdAt", "updatedAt"].includes(k)) return formatDate(item[k]);
  return item[k] || <span className="text-gray-500">—</span>;
};

export default ({ items, onRowClick, rows }) => {
  return (
    <ContainerQuery
      query={{
        "container-xs spaced": { maxWidth: 320 },
        "container-sm": { minWidth: 320, maxWidth: 640 },
        "container-md spaced": { minWidth: 640 }
      }}
    >
      {params => (
        <table
          className={classnames(params, "striped w-full text-sm md:text-base")}
          role="table"
        >
          <thead>
            <tr role="row">
              {Object.values(rows).map((text, i) => (
                <th key={text + i} role="columnheader">
                  {text}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {items.map(item => (
              <tr
                className={onRowClick ? "hover" : ""}
                key={JSON.stringify(item)}
                onClick={() => {
                  if (onRowClick) onRowClick(item.id);
                }}
                role="row"
              >
                {Object.entries(rows).map(([k, v]) => (
                  <td data-name={v} key={`${k}`} role="cell">
                    {renderItem({ item, k })}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </ContainerQuery>
  );
};
