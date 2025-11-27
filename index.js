import { render } from "https:/unpkg.com/lite-html";

const input = {
  value: "root",
  children: [
    {
      value: 1,
      children: [{ value: 2 }, { value: 3 }],
    },
    {
      value: 4,
      children: [
        {
          value: 5,
          children: [{ value: 6 }, { value: 7 }],
        },
      ],
    },
    {
      value: 8,
    },
  ],
};

const serialize = (treeObject) => {
  const childrenString = treeObject.children?.map(serialize).join(",") || "";
  const childNodeCount = treeObject.children
    ? "," + "|".repeat(treeObject.children?.length)
    : "";
  return `${childrenString}${childNodeCount}${treeObject.value}`;
};

const parseNode = (a) => a;

const out1 = document.createElement("p");
document.body.appendChild(out1);
render(serialize(input), out1);

const pipeRegex = /\|/g;
const parse = (treeString) => {
  const nodeStack = [];
  treeString.split(",").forEach((nodeString) => {
    const childCount = nodeString.match(pipeRegex)?.length;
    const children = nodeStack.splice(-childCount, childCount);
    const value = parseNode(nodeString.slice(childCount));
    const node = { value };
    if (children.length > 0) {
      node.children = children;
    }
    nodeStack.push(node);
  });

  return nodeStack[0];
};

const out2 = document.createElement("p");
document.body.appendChild(out2);
render(JSON.stringify(parse(serialize(input)), null, 2), out2);
