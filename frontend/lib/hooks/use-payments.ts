import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { stripeCheckout, verifyPaymentSession } from "@/lib/api/api-payments";

export const paymentKeys = {
  verify: (sessionId: string) => ["payments", "verify", sessionId] as const,
};

export const useStripeCheckout = () => {
  return useMutation({
    mutationFn: stripeCheckout,
  });
};

export const useVerifyPaymentSession = (sessionId: string) => {
  return useSuspenseQuery({
    queryKey: paymentKeys.verify(sessionId),
    queryFn: () => verifyPaymentSession(sessionId),
  });
};
