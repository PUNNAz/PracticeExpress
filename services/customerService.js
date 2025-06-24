import { Customer } from "../model/customer";

export async function getCustomerById(id) {
  let customer;
  if (id) {
    customer = await Customer.findByPk(id);
  } else {
    customer = await Customer.findAll();
  }
  return customer;
}

export async function registerCustomer(customerData) {
  const date = new Date();
  const response = await Customer.create({
    first_name: customerData.first_name,
    last_name: customerData.last_name,
    email: customerData.email,
    phone: customerData.phone,
    address: customerData.address,
    created_at: date,
  });
  return response;
}

export async function updateCustomer(customerData) {
  const date = new Date();
  const customer = await Customer.findByPk(customerData.customer_id);

  if (!customer) throw new Error("Customer not found");

  const response = await customer.update({
    first_name:
      customer.first_name && customer.first_name.trim() !== ""
        ? customerData.first_name
        : customer.first_name,
    last_name:
      customer.last_name && customer.last_name.trim() !== ""
        ? customerData.last_name
        : customer.last_name,
    email:
      customer.email && customer.email.trim() !== ""
        ? customerData.email
        : customer.email,
    phone:
      customer.phone && customer.phone.trim() !== ""
        ? customerData.phone
        : customer.phone,
    address:
      customer.address && customer.address.trim() !== ""
        ? customerData.address
        : customer.address,
    created_at: date,
  });

  return response;
}

export async function deleteCustomer(customerData) {
  const customer = await Customer.findByPk(customerData.customer_id);

  if (!customer) throw new Error("Customer not found");

  await customer.destroy();
  return customer;
}
