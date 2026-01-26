import type {
  CheckoutResponse,
  VerifySessionResponse,
} from "@/lib/types/responses";
import { handleResponse } from "./utils/api-utils";
import { API_URL } from "./constants/constants";

export const stripeCheckout = async (): Promise<CheckoutResponse> => {
  const response = await fetch(`${API_URL}/payments/checkout`, {
    method: "POST",
    credentials: "include",
  });
  return handleResponse<CheckoutResponse>(response);
};

export const verifyPaymentSession = async (
  sessionId: string,
): Promise<VerifySessionResponse> => {
  const response = await fetch(
    `${API_URL}/payments/verify?session_id=${sessionId}`,
    {
      credentials: "include",
    },
  );
  return handleResponse<VerifySessionResponse>(response);
};
