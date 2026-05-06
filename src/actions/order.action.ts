"use server";

import { CrateOrderPayload, orderServices } from "@/services/order.service";
import { meta } from "zod/v4/core";

export const createOrder = async (orderData: CrateOrderPayload) => {
  return await orderServices.createOrder(orderData);
};

export const getMyOrder = async () => {
  return orderServices.getMyOrder();
};

export const getTotalOrders = async (queryParams: any) => {
  try {
    const response = await orderServices.getTotalOrders(queryParams);
    if (response.data) {
      return {
        data: response.data,
        meta: response.meta,
        error: null,
      };
    }
  } catch (error) {
    console.log("Error fetching total orders:", error);
    return { data: [], error: { message: "Something went wrong" } };
  }
};

export const getOrderById = async (id: string) => {
  return await orderServices.getOrderById(id);
};

export const cancelOrder = async (id: string) => {
  return await orderServices.cancelOrder(id);
};
