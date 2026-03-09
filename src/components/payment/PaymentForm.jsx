import CardHolderInput from "./CardHolderInput";
import CardNumberInput from "./CardNumberInput";
import CardExpiryInput from "./CardExpiryInput";
import CardCvcInput from "./CardCvcInput";

export default function PaymentForm({ formData, setFormData, errors }) {
  return (
    <div className="flex flex-col gap-5">
      <CardHolderInput
        value={formData.cardHolder}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, cardHolder: value }))
        }
        error={errors.cardHolder}
      />

      <CardNumberInput
        value={formData.cardNumber}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, cardNumber: value }))
        }
        error={errors.cardNumber}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CardExpiryInput
          value={formData.expiry}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, expiry: value }))
          }
          error={errors.expiry}
        />

        <CardCvcInput
          value={formData.cvc}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, cvc: value }))
          }
          error={errors.cvc}
        />
      </div>
    </div>
  );
}