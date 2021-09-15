import classnames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import "react-sortable-tree/style.css";
import getTreeFromFlatData from "../getTreeFromFlatData";

const RenderNode = ({ current, node }) => (
  <li>
    <Link
      className={classnames("px-2 py-1", {
        "bg-teal-100": node.title === current
      })}
      to={`/tags/${node.title}`}
    >
      {node.title}
    </Link>
    {node.children && (
      <ul className="pl-4">
        {node.children.map(n => (
          <RenderNode key={n.title} node={n} current={current} />
        ))}
      </ul>
    )}
  </li>
);

export default ({ flatTreeData: { tags, taggings }, node: current }) => {
  const treeData = getTreeFromFlatData({ tags, taggings });
  const noTree =
    tags.orphans.includes(current) && !tags.roots.includes(current);

  if (noTree)
    return (
      <div className="text-gray-600">
        <p className="mb-4">No tree to display</p>
        <p>
          <small>This tag doesn't have children.</small>
        </p>
      </div>
    );

  return (
    <div>
      {treeData
        .filter(n => n.children && JSON.stringify(n).includes(`"${current}"`))
        .map(rootNode => (
          <div key={rootNode.title}>
            <h2 className="font-semibold">
              <Link
                className={classnames("px-2 py-1", {
                  "bg-teal-100": rootNode.title === current
                })}
                to={`/tags/${rootNode.title}`}
              >
                {rootNode.title}
              </Link>
            </h2>
            {rootNode.children && (
              <ul className="pl-4">
                {rootNode.children.map(n => (
                  <RenderNode key={n.title} node={n} current={current} />
                ))}
              </ul>
            )}
          </div>
        ))}
    </div>
  );
};
