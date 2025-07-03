import { Order } from "../model/order";
import { Customer } from "../model/customer";

export async function getOrderById(id) {
  let response;
  if (id) {
    response = await Order.findByPk(id);
  } else {
    response = await Order.findAll();
  }
  return response;
}

export async function saveOrder(orderData) {
  const customer = await Customer.findByPk(orderData.customer_id);

  if (!customer) throw new Error("Customer not found");

  const order = await Order.create(orderData);
  return order;
}

export async function updateStatus(obj) {
  const order = await Order.findByPk(obj.id);

  if (!order) throw new Error("Order not found");

  const result = order.update(obj);
  // const result = order.update({
  //   status: obj.status,
  // });
  return result;
}

export async function deleteOrder(id) {
  const order = await Order.findByPk(id);
  const result = order.destroy();

  // this solution is work but cant get data to show in Json response
  // const result = await Order.destroy({ where: { order_id: id } });
  return result;
}

export async function getOrderAndCustomer(id) {
  const order = await Order.findOne({
    where: { order_id: id },
    include: {
      model: Customer,
    },
  });
  return order;
}
