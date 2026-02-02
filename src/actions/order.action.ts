"use server";

import { CrateOrderPayload, orderServices } from "@/services/order.service";

export const createOrder = async (orderData: CrateOrderPayload) => {
  return await orderServices.createOrder(orderData);
};

export const getMyOrder = async () => {
  return orderServices.getMyOrder();
};

export const getOrderById = async (id: string) => {
  return await orderServices.getOrderById(id);
};

export const cancelOrder = async (id: string) => {
  return await orderServices.cancelOrder(id);
};
