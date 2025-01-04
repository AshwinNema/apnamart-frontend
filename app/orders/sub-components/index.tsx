import { ImageComponent } from "@/app/_custom-components";
import { order } from "../helpers";
import styles from "@/app/styles.module.css";
export const OrderItems = ({ order }: { order: order }) => {
  return (
    <div>
      {order.orderItems.map((orderItem, index) => {
        return (
          <div
            key={orderItem.id}
            className={`${styles["order-item-grid"]} ${index > 0 && "mt-2"}`}
          >
            {" "}
            <div className="flex items-center gap-3">
              <div className="min-w-[75px]">
                <ImageComponent
                  src={orderItem?.product?.photos?.[0]?.url}
                  alt="Order Item Photo"
                  width={75}
                  height={75}
                />
              </div>
              <div className="break-all"> {orderItem.name} </div>
            </div>
            <div className="break-all">
              {orderItem.quantity}&ensp;X&ensp;{orderItem.price} ={" "}
              {orderItem.quantity * orderItem.price}{" "}
            </div>
          </div>
        );
      })}
    </div>
  );
};
