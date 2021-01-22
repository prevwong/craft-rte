const listItem = (children, opts = {}) => {
  return {
    type: "li",
    children,
    after: opts.isLast ? null : "{enter}",
  };
};

export const TextWithList = [
  {
    type: "p",
    children: "Hello World",
    after: "{enter}",
  },
  {
    type: "ul",
    before: "- ",
    children: [
      listItem([{ type: "span", children: "List Item 1" }]),
      listItem([{ type: "span", children: "List Item 2" }]),
      listItem([{ type: "span", children: "List Item 3" }]),
      {
        type: "ul",
        before: "- ",
        children: [
          listItem([{ type: "span", children: "Sub-List Item 1" }]),
          listItem([{ type: "span", children: "Sub-List Item 2" }]),
          listItem([{ type: "span", children: "Sub-List Item 3" }], {
            isLast: true,
          }),
        ],
        after: "{enter}{enter}",
      },
      {
        type: "p",
        children: "Typography inside parent List",
      },
    ],
  },
];

export const ListToNormalize = [
  {
    type: "ul",
    before: "- ",
    children: [
      listItem([{ type: "span", children: "List Item 1" }]),
      {
        type: "ul",
        before: "- ",
        children: [
          listItem([{ type: "span", children: "Sub-List Item 1" }]),
          listItem([{ type: "span", children: "Sub-List Item 2" }]),
          {
            type: "ul",
            before: "- ",
            children: [
              listItem([{ type: "span", children: "Sub-sub-List Item 1" }]),
              listItem([{ type: "span", children: "Sub-sub-List Item 2" }], {
                isLast: true,
              }),
            ],
          },
        ],
      },
    ],
  },
];

export const accumString = (obj) => {
  return obj.reduce((res, o) => {
    const { children, before, after } = o;

    if (before) {
      res += before;
    }

    if (Array.isArray(children)) {
      res += accumString(children);
    } else if (typeof children === "string") {
      res += children;
    }

    if (after) {
      res += after;
    }

    return res;
  }, "");
};

const validateObj = (domChildren, obj) => {
  return domChildren.each((child, i) => {
    const o = obj[i];

    const { type, children } = o;

    expect(child.prop("tagName").toLowerCase()).equal(type);
    if (typeof children === "string") {
      expect(child.text().trim()).equal(children);
    } else if (Array.isArray(children)) {
      validateObj(cy.get(child).children(), children);
    }
  });
};

export const typeObj = (selector, obj, noValidation = false) => {
  if (noValidation) {
    return selector.type(accumString(obj));
  }

  return validateObj(selector.type(accumString(obj)).children(), obj);
};
