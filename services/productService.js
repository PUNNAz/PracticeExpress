import { Products } from "../model/product";

export async function getAllProduct() {
  const product = await Products.findAll({
    order: [['price', 'DESC']]
  });
  return product;
}

export async function getProductByID(id) {
  let product;
  if (id) {
    product = await Products.findByPk(id);
  } else {
    product = await Products.findAll();
  }

  //   if (!product) throw new Error("Product not found");

  return product;
}

export async function saveProduct(productData) {
  const oldProduct = await Products.findByPk(productData.product_id);
  const date = new Date();
  let response = null;
  let message = null;
  if (oldProduct) {
    //update case
    response = await oldProduct.update({
      name: productData.name ?? oldProduct.name,
      description: productData.description ?? oldProduct.description,
      price: productData.price ?? oldProduct.price,
      stock_quantity: productData.stock_quantity ?? oldProduct.stock_quantity,
      created_at: date,
    });
    message = `Product ID :  ${response.product_id}  updated successfully`;
  } else {
    //insert case
    response = await Products.create({
      name: productData.name,
      description: productData.description,
      price: productData.price,
      stock_quantity: productData.stock_quantity,
      created_at: date,
    });
    message = `Product ID :  ${response.product_id}  insert successfully`;
  }
  const res = { response, message };
  return res;
}

export async function deleteProduct(id) {
  const product = await Products.findByPk(id);

  if (!product) throw new Error("Product not found");

  await product.destroy();
  return product;
}

export async function getAveragePrice() {
  const result = await Products.findAll({
    attributes: [
      [
        Products.sequelize.fn("AVG", Products.sequelize.col("price")),
        "avg_price",
      ],
    ],
    raw: true
  });

  return result;
}

export async function getMaxPriceByName() {
  const result = await Products.findAll({
    attributes: [
      'name',
      [Products.sequelize.fn('MAX', Products.sequelize.col('price')), 'max_price']
    ],
    group: ['name'],
    raw: true
  });

  return result;
}
