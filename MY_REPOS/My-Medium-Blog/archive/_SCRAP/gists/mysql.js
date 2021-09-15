/* eslint-disable no-restricted-syntax, no-use-before-define */
import _ from "lodash";
import { log } from "../debug";
import {
  interpretForOffsetPaging,
  orderColumnsToString,
  // interpretForKeysetPaging,
  // keysetPagingSelect,
  // offsetPagingSelect,
  validateCursor,
} from "join-monster/dist/stringifiers/shared";
import { wrap, maybeQuote } from "join-monster/dist/util";
import idx from "idx";
import { isObject, arrEq, isArray } from "../util";

function quote(str) {
  return "`" + String(str).replace(/`/g, "``") + "`";
}

function throwErr() {
  throw new Error("This type of pagination not supported on this dialect");
}

function offsetPagingSelect(
  table,
  pagingWhereConditions,
  order,
  limit,
  offset,
  as,
  options = {},
  children
) {
  let { q } = options;
  q = dialect.quote;
  const whereCondition =
    _.filter(pagingWhereConditions).join(" AND ") || "TRUE";

  let joinCondition1;
  let joinCondition2;
  let joins = "";
  for (const child of children) {
    if (child.junction) {
      joinCondition1 = child.junction.sqlJoins[0](
        `${q(as)}`,
        q(child.junction.as),
        {},
        null,
        child
      );
      joinCondition2 = child.junction.sqlJoins[1](
        `${q(child.junction.as)}`,
        q(child.as),
        {},
        null,
        child
      );

      joins += `\r\n            LEFT JOIN ${child.junction.sqlTable} ${q(
        child.junction.as
      )} ON ${joinCondition1}`;
      joins += `\r\n            LEFT JOIN ${child.name} ${q(
        child.as
      )} ON ${joinCondition2}`;
    }
  }

  const total = `SELECT count(*) FROM ${table} ${q(
    as
  )} ${joins} WHERE ${whereCondition}`;

  return `\
        FROM (
          SELECT DISTINCT ${q(as)}.*, (${total}) as $total
          FROM ${table} ${q(as)} ${joins}
          WHERE ${whereCondition}
          ORDER BY ${orderColumnsToString(order.columns, q, order.table)}
          LIMIT ${limit} OFFSET ${offset}
        ) ${q(as)}`;
}

const dialect = {
  name: "mysql",
  quote,

  compositeKey(parent, keys) {
    // eslint-disable-next-line
    keys = keys.map((key) => `${quote(parent)}.${quote(key)}`);
    return `CONCAT(${keys.join(", ")})`;
  },

  handleJoinedOneToManyPaginated: throwErr,
  handleBatchedOneToManyPaginated: throwErr,
  handleJoinedManyToManyPaginated: throwErr,
  handleBatchedManyToManyPaginated: throwErr,

  async handlePaginationAtRoot(parent, node, context, tables) {
    const pagingWhereConditions = [];
    if (node.sortKey) {
      const {
        limit,
        order,
        whereCondition: whereAddendum,
      } = interpretForKeysetPaging(node, dialect);
      pagingWhereConditions.push(whereAddendum);
      if (node.where) {
        pagingWhereConditions.push(
          await node.where(`${quote(node.as)}`, node.args || {}, context, node)
        );
      }
      tables.push(
        keysetPagingSelect(
          node.name,
          pagingWhereConditions,
          order,
          limit,
          node.as,
          { q: quote }
        )
      );
    } else if (node.orderBy) {
      const { limit, offset, order } = interpretForOffsetPaging(node, dialect);
      if (node.where) {
        pagingWhereConditions.push(
          await node.where(`${quote(node.as)}`, node.args || {}, context, node)
        );
      }
      tables.push(
        offsetPagingSelect(
          node.name,
          pagingWhereConditions,
          order,
          limit,
          offset,
          node.as,
          { q: quote }
        )
      );
    }
  },
};

function keysetPagingSelect(
  table,
  whereCondition,
  order,
  limit,
  as,
  options = {}
) {
  let { joinCondition, joinType, extraJoin, q } = options;
  q = q || quote;
  // console.log(require('util').inspect(whereCondition, {colors: true, depth: 10}));
  whereCondition = _.filter(whereCondition).join(" AND ") || "1";

  if (joinCondition) {
    return `\
${joinType || ""} JOIN LATERAL (
  SELECT ${q(as)}.*
  FROM ${table} ${q(as)}
  ${
    extraJoin
      ? `LEFT JOIN ${extraJoin.name} ${q(extraJoin.as)}
    ON ${extraJoin.condition}`
      : ""
  }
  WHERE ${whereCondition}
  ORDER BY ${orderColumnsToString(order.columns, q, order.table)}
  LIMIT ${limit}
) ${q(as)} ON ${joinCondition}`;
  }
  return `\
FROM (
  SELECT ${q(as)}.*
  FROM ${table} ${q(as)}
  WHERE ${whereCondition}
  ORDER BY ${orderColumnsToString(order.columns, q, order.table)}
  LIMIT ${limit}
) ${q(as)}`;
}

export default dialect;

function flipDir(dir) {
  return dir === "DESC" ? "ASC" : "DESC";
}

function interpretForKeysetPaging(node, dialect) {
  const { name } = dialect;

  let sortTable;
  let sortKey;
  let descending;
  const order = { columns: {} };
  if (node.sortKey) {
    sortKey = node.sortKey;
    descending = sortKey.order.toUpperCase() === "DESC";
    sortTable = node.as;
    // flip the sort order if doing backwards paging
    if (idx(node, (_) => _.args.last)) {
      descending = !descending;
    }
    if (node.orderBy) {
      for (const [col, dir] of Object.entries(node.orderBy)) {
        order.columns[col] = descending ? flipDir(dir) : dir;
      }
    }
    for (let column of wrap(sortKey.key)) {
      if (!order.columns[column]) {
        order.columns[column] = descending ? "DESC" : "ASC";
      }
    }
    order.table = node.as;
  } else {
    sortKey = node.junction.sortKey;
    descending = sortKey.order.toUpperCase() === "DESC";
    sortTable = node.junction.as;
    // flip the sort order if doing backwards paging
    if (idx(node, (_) => _.args.last)) {
      descending = !descending;
    }
    for (let column of wrap(sortKey.key)) {
      order.columns[column] = descending ? "DESC" : "ASC";
    }
    order.table = node.junction.as;
  }

  let limit = ["mariadb", "mysql", "oracle"].includes(name)
    ? "18446744073709551615"
    : "ALL";
  let whereCondition = "";
  if (idx(node, (_) => _.args.first)) {
    limit = parseInt(node.args.first, 10) + 1;
    if (node.args.after) {
      const cursorObj = cursorToObj(node.args.after);
      validateCursor(cursorObj, wrap(sortKey.key));
      whereCondition = sortKeyToWhereCondition(
        cursorObj,
        descending,
        sortTable,
        dialect
      );
    }
    if (node.args.before) {
      throw new Error('Using "before" with "first" is nonsensical.');
    }
  } else if (idx(node, (_) => _.args.last)) {
    limit = parseInt(node.args.last, 10) + 1;
    if (node.args.before) {
      const cursorObj = cursorToObj(node.args.before);
      validateCursor(cursorObj, wrap(sortKey.key));
      whereCondition = sortKeyToWhereCondition(
        cursorObj,
        descending,
        sortTable,
        dialect
      );
    }
    if (node.args.after) {
      throw new Error('Using "after" with "last" is nonsensical.');
    }
  }
  // FIXME: join-monster doesn't support hard-limits properly: https://github.com/acarl005/join-monster/blob/93446c5ee006313215618bedba1ebd3af131692e/src/array-to-connection.js#L41
  // if(limit != null) {
  //     if(limit < 0) {
  //         limit = 0;
  //     } else if(node.limit && limit > node.limit) {
  //         limit = node.limit;
  //     }
  // } else if(node.limit) {
  //     limit = node.limit;
  // } else {
  //     limit = '18446744073709551615';
  // }

  return { limit, order, whereCondition };
}

function cursorToObj(cursor) {
  const str = Buffer.from(cursor, "base64").toString();
  return JSON.parse(str, function reviver(key, value) {
    if (isObject(value) && value.type === "Buffer" && isArray(value.data)) {
      return Buffer.from(value.data);
    }
    return value;
  });
}

function sortKeyToWhereCondition(keyObj, descending, sortTable, dialect) {
  return maxWhere(
    _.toPairs(keyObj).map(([col, val]) => [
      `${dialect.quote(sortTable)}.${dialect.quote(col)}`,
      maybeQuote(val, dialect.name),
    ]),
    descending ? "<" : ">"
  );
}

function maxWhere(cols, op) {
  if (cols.length === 1) {
    const [c, v] = cols[0];
    return `${c} ${op} ${v}`;
  } else {
    let first = cols.shift();
    const [c, v] = first;
    return `(${maxWhere([first], op)} OR (${c} <=> ${v} AND ${maxWhere(
      cols,
      op
    )}))`;
  }
}
