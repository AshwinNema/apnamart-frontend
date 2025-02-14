import { Accordion, AccordionItem, Checkbox } from "@heroui/react";
import { useContext } from "react";
import { MainContext } from "../../../helpers";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { produce } from "immer";

export const ItemFilters = () => {
  const context = useContext(MainContext);
  if (!context) return null;
  const { config, setConfig } = context;
  const { itemFilters } = config;
  return (
    <>
      <Accordion>
        {itemFilters.map((filter) => {
          return (
            <AccordionItem
              classNames={{
                title: "font-medium text-sm",
              }}
              key={filter.id}
              aria-label={filter.name}
              title={filter.name}
              indicator={({ isOpen }) =>
                isOpen ? <FaChevronRight /> : <FaChevronDown />
              }
            >
              {filter.options.map((option) => {
                const { id } = option;
                return (
                  <div>
                    <Checkbox
                      isSelected={!!config.selectedOptions[id]}
                      onValueChange={(val) => {
                        setConfig(
                          produce((draft) => {
                            if (!val) {
                              delete draft["selectedOptions"][id];
                            }
                            if (val) {
                              draft["selectedOptions"][id] = option;
                            }
                          }),
                        );
                      }}
                      classNames={{
                        label: "text-xs",
                      }}
                      key={option.id}
                      value={`${option.id}`}
                    >
                      {option.name}
                    </Checkbox>
                  </div>
                );
              })}
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};
