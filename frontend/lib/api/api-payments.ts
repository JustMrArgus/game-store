import type { CheckoutResponse, VerifySessionResponse } from "@/lib/types/responses";
import { apiFetch } from "./utils/api-utils";

export const stripeCheckout = async (): Promise<CheckoutResponse> => {
  return await apiFetch<CheckoutResponse>("/payments/checkout", {
    method: "POST",
  }) as CheckoutResponse;
};

export const verifyPaymentSession = async (sessionId: string): Promise<VerifySessionResponse> => {
  return await apiFetch<VerifySessionResponse>(`/payments/verify?session_id=${sessionId}`) as VerifySessionResponse;
};