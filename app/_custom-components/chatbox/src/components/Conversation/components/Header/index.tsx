import { WidgetContext } from "@/app/_custom-components/chatbox";
import { useContext } from "react";

function Header() {
  const widgetProps = useContext(WidgetContext);
  if (!widgetProps) return null;
  return (
    <div className="bg-transparent">
      <div className="bg-chatBoxHeader rounded-t-3xl text-white text-center pt-2 pb-10">
        <h4 className="text-2xl py-4">{widgetProps.title}</h4>
        <span>{widgetProps.subtitle}</span>
      </div>
    </div>
  );
}

export default Header;
