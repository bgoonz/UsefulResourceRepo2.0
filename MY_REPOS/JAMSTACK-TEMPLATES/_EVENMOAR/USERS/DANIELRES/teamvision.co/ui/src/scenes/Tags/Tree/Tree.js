import classnames from "classnames";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-sortable-tree/style.css";
import getTreeFromFlatData from "../getTreeFromFlatData";

const sum = arr => arr.reduce((a, b) => a + b, 0);
const max = arr => Math.max(...arr);

const Graph = ({ items, type }) => {
  const personsCount = sum(items.map(i => i.count));
  const maxPersonsPerItem = max(items.map(i => i.count));
  const levels = [20, 40, 60, 80, 100];

  return (
    <div
      className="flex items-baseline"
      style={{ position: "relative", top: -3 }}
      title={`${personsCount} ${
        personsCount === 1 ? "person has" : "persons have"
      }  this ${type}`}
    >
      <div className="mr-1 inline-block font-semibold">{personsCount}</div>

      <div className="flex inline-block text-white">
        <div
          className="whitespace-no-wrap"
          style={{
            paddingTop: 6,
            paddingBottom: 0,
            position: "relative",
            height: "1rem"
          }}
        >
          {levels.map(l => {
            const item = items.find(i => i.level === l);
            const count = item ? item.count : 0;
            return (
              <div
                className={classnames("inline-block overflow-hidden", {
                  "bg-pink-500": type === "motivation",
                  "bg-blue-500": type === "skill",
                  "bg-gray-500": type !== "skill" && type !== "motivation"
                })}
                style={{
                  marginRight: 2,
                  height: `${(count / maxPersonsPerItem) * 100}%`,
                  minHeight: 1,
                  width: 3
                }}
              >
                _
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const RenderNode = ({ node }) => (
  <li>
    <Link
      className=" flex items-center inline-block hover:bg-teal-100 px-2 py-1 leading-tight "
      to={`/tags/${node.title}`}
    >
      <span className="inline-block mr-1">{node.title}</span>

      {node.motivations.length > 0 && (
        <span className="rounded text-pink-500 text-xs inline-block px-1">
          <Graph items={node.motivations} type="motivation" />
        </span>
      )}

      {node.skills.length > 0 && (
        <span className="rounded text-blue-500 text-xs inline-block px-1 ml-1">
          <Graph items={node.skills} type="skill" />
        </span>
      )}
    </Link>
    {node.children && (
      <ul className="pl-4">
        {node.children.map(n => (
          <RenderNode key={n.title} node={n} />
        ))}
      </ul>
    )}
  </li>
);

const c = {
  filter: "px-2 py-1 border rounded leading-tight inline-block text-sm",
  filter_active: "bg-teal-500 text-white border-white",
  filter_inactive: "text-gray-800 hover:bg-gray-200"
};

export default ({ ButtonDone, flatTreeData: { tags, taggings }, history }) => {
  const treeData = getTreeFromFlatData({ tags, taggings });

  const allFilters = treeData.filter(n => n.children).map(({ title }) => title);
  const [filters, setFilters] = useState(allFilters);
  const addFilter = filter => setFilters([...filters, filter]);
  const removeFilter = filter =>
    filters.length > 1 && setFilters(filters.filter(f => f !== filter));
  const toggleFilter = filter =>
    filters.includes(filter) ? removeFilter(filter) : addFilter(filter);

  const orphans = treeData.filter(n => !n.children);
  const [enableOrphans, setEnableOrphans] = useState(orphans.length > 0);
  const toggleOrphans = () => setEnableOrphans(!enableOrphans);

  return (
    <div>
      <nav className="mb-4">
        <div className="flex">
          <div className="w-3/4">
            <ul className="inline-block">
              {treeData
                .filter(n => n.children)
                .map(({ title }) => (
                  <li className="inline-block" key={title}>
                    <button
                      onClick={() => toggleFilter(title)}
                      className={classnames(
                        "mr-1",
                        c.filter,
                        filters.includes(title)
                          ? c.filter_active
                          : c.filter_inactive
                      )}
                    >
                      {title}
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          {orphans.length > 0 && (
            <ul className="md:w-1/4 text-right">
              <li className="inline-block">
                <button
                  className={classnames(
                    "ml-4",
                    c.filter,
                    enableOrphans ? c.filter_active : c.filter_inactive
                  )}
                  onClick={toggleOrphans}
                >
                  Orphans
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>

      <div className="md:flex md:flex-row-reverse">
        {enableOrphans && (
          <div className="md:w-1/4 md:border-l md:pl-4 pt-4">
            <div className="font-semibold md:hidden">Orphans</div>
            {orphans.map(orphan => (
              <div key={orphan.title}>
                <Link
                  className="inline-block hover:bg-teal-100 px-2 py-1 leading-tight "
                  to={`/tags/${orphan.title}`}
                >
                  {orphan.title}
                </Link>
              </div>
            ))}
            <hr className="my-4 md:hidden" />
          </div>
        )}

        <div
          className={enableOrphans ? "w-3/4" : "w-full"}
          style={{ columns: "4 200px", columnGap: "0" }}
        >
          {treeData
            .filter(n => n.children)
            .filter(({ title }) => filters.includes(title))
            .map(rootNode => (
              <div key={rootNode.title} className="inline-block w-full py-2">
                <div
                  className="border border-transparent hover:border-gray-400 rounded p-2"
                  style={{ position: "relative", top: -2 }}
                >
                  <h2 className="font-semibold">
                    <Link
                      className="block px-2 py-1 hover:bg-teal-100"
                      to={`/tags/${rootNode.title}`}
                    >
                      {rootNode.title}
                    </Link>
                  </h2>
                  {rootNode.children && (
                    <ul className="pl-4">
                      {rootNode.children.map(n => (
                        <RenderNode key={n.title} node={n} />
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
