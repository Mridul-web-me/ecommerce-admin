import prismadb from "@/lib/prismadb"
import OrderDelete from "./components/OrderDelete";
import CellAction from "../components/cell-action";


const OrderPage = async ({
    params
}: {
    params: { orderId: string }
}) => {
    // fetch the data
    const order = await prismadb.order.findUnique({
        where: {
            id: params.orderId
        }
    });

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <OrderDelete
                initialData={order}
            />
        </div>
    </div>
  )
}

export default OrderPage