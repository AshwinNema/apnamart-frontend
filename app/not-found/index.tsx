"use client";
import React, { useEffect, useRef } from "react";
import {
  Listbox,
  ListboxItem,
  ListboxSection,
  Link,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@heroui/react";
import { useTheme } from "next-themes";
import { ImageComponent } from "../_custom-components";
import { browserTheme } from "../layout-components/theme-switch";
import { guideItem, guideItems } from "./constants";

export default function NotFound() {
  const { theme } = useTheme();
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div ref={bodyRef} className="flex justify-center mt-11">
      <div>
        <div className="flex justify-center">
          <div>
            <div>
              <ImageComponent
                width={256}
                height={256}
                src={`https://res.cloudinary.com/ash006/image/upload/v1730920921/ltljrhinpmdxcwxa6ecj.jpg`}
                alt="Not found"
              />
            </div>
          </div>
        </div>
        <Card
          shadow={`${theme === browserTheme.dark ? "lg" : "none"}`}
          className={`${theme === browserTheme.dark && "border-none"} m-5 overflow-visible`}
          classNames={{ footer: ["flex justify-center"] }}
        >
          <CardHeader className="flex justify-center text-4xl font-bold">
            Page Not Found!
          </CardHeader>
          <CardBody>
            <div className="flex items-center justify-center">
              <div>
                It looks like the page you’re trying to reach doesn’t exist
                anymore or may have moved.
                <span className="text-primary">Click </span>
                <span className="text-primary">here</span> to go back to home
                page. Don’t worry; we’re here to help you find what you need!
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Listbox aria-label="Documentation list" variant="flat">
              <ListboxSection title="You can refer below for understanding this project better">
                {guideItems.map((item: guideItem) => {
                  const { key, description, Icon, mainText } = item;
                  return (
                    <ListboxItem
                      key={key}
                      classNames={{
                        description: ["overflow-visible", "text-clip"],
                      }}
                      description={description}
                      startContent={<Icon />}
                    >
                      {mainText}
                    </ListboxItem>
                  );
                })}
              </ListboxSection>
            </Listbox>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
