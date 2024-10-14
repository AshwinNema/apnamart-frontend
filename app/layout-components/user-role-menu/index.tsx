import { useAppSelector } from "@/lib/main/hooks";
import { useCallback, useEffect, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { setNestedPath } from "@/app/_utils";
import { RxCross1 } from "react-icons/rx";
import { usePathname, useRouter } from "next/navigation";
import { rolePageDetails, roleWiseList } from "./constants";
import { Spinner } from "@/app/_custom-components";

export const UserRoleMenu = () => {
  const [config, setConfig] = useState<{
    itemList: rolePageDetails[];
    toggleIcon: boolean;
    showSpinner: boolean;
  }>({
    itemList: [],
    toggleIcon: true,
    showSpinner: false,
  });
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const role = user?.role;
    if (!role) {
      setData("itemList")([]);
      return;
    }
    const list = roleWiseList[role] || [];
    setData("itemList")(list);
  }, [user?.role]);

  useEffect(() => {
    setData("showSpinner")(false);
  }, [path]);
  if (!user || !config.itemList.length) return null;

  return (
    <>
      <Dropdown
        onOpenChange={(isOpen: boolean) => {
          setData("toggleIcon")(!isOpen);
        }}
      >
        <DropdownTrigger>
          <Button
            disableAnimation
            className="bg-[transparent]"
            isIconOnly
            aria-label="user dropdown"
          >
            {config.toggleIcon ? (
              <IoMenuOutline className="scale-[2]" />
            ) : (
              <RxCross1 className="scale-[1.3]" />
            )}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="User role pages"
          items={config.itemList}
          onAction={(key) => {
            const route = key as string;
            setData("showSpinner")(true);
            router.push(route);
          }}
          color="primary"
          variant="faded"
        >
          {(item) => (
            <DropdownItem
              startContent={item.icon}
              key={item.link}
              className={`${path === item.link && "bg-mainTheme"}`}
              variant={`${path === item.link ? "solid" : "faded"}`}
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      {config.showSpinner && <Spinner />}
    </>
  );
};
