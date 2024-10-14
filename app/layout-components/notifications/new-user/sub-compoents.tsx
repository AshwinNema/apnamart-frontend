import { ReactNode } from "react";

export enum footerWrapperType {
  container = "container",
  element = "element",
}

export const FooterElementWrapper = ({
  type,
  children,
  count,
}: {
  type: footerWrapperType;
  children: ReactNode;
  count: number;
}) => {
  if (count < 2) return children;
  switch (type) {
    case footerWrapperType.container:
      return (
        <div>
          <ul className="list-disc">{children}</ul>
        </div>
      );

    case footerWrapperType.element:
      return <li>{children}</li>;
    default:
      return null;
  }
};
