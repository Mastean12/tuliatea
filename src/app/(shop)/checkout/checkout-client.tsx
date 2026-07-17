"use client"

import { useState, useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckoutStepper } from "@/components/checkout/checkout-stepper"
import { ShippingForm } from "@/components/checkout/shipping-form"
import { DeliverySelector } from "@/components/checkout/delivery-selector"
import { PaymentSelector } from "@/components/checkout/payment-selector"
import { OrderSummary } from "@/components/checkout/order-summary"
import { useCart } from "@/hooks/use-cart"
import { getDeliveryPrice } from "@/services/delivery"
import { formatPrice } from "@/lib/utils"
import { placeOrder, type CheckoutState } from "@/lib/actions/checkout"
import { routes } from "@/config/routes"

const emptyShipping = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  county: "",
  city: "",
  street: "",
  building: "",
  postalCode: "",
  deliveryNotes: "",
}

export function CheckoutClient() {
  const router = useRouter()
  const { items, getSubtotal, clearCart } = useCart()
  const subtotal = getSubtotal()

  const [step, setStep] = useState(0)
  const [shipping, setShipping] = useState(emptyShipping)
  const [deliveryMethod, setDeliveryMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("cod")

  const [state, formAction, pending] = useActionState<CheckoutState, FormData>(
    placeOrder,
    {}
  )

  const deliveryPrice = getDeliveryPrice(deliveryMethod, shipping.county)
  const total = subtotal + deliveryPrice

  // If order placed successfully
  useEffect(() => {
    if (state?.success && state.orderNumber) {
      clearCart()
      router.push(`${routes.checkout}/confirmation?order=${state.orderNumber}`)
    }
  }, [state?.success, state.orderNumber, clearCart, router])

  if (state?.success) return null

  const hasItems = items.length > 0

  function canProceedFromShipping(): boolean {
    const s = shipping
    return !!(
      s.firstName &&
      s.lastName &&
      s.email &&
      s.phone &&
      s.county &&
      s.city &&
      s.street
    )
  }

  async function handleSubmit(formData: FormData) {
    // Append all data to the form
    formData.set("subtotal", String(subtotal))
    formData.set("shipping", String(deliveryPrice))
    formData.set("total", String(total))
    formData.set("deliveryMethod", deliveryMethod)
    formData.set("paymentMethod", paymentMethod)
    formData.set("firstName", shipping.firstName)
    formData.set("lastName", shipping.lastName)
    formData.set("email", shipping.email)
    formData.set("phone", shipping.phone)
    formData.set("county", shipping.county)
    formData.set("city", shipping.city)
    formData.set("street", shipping.street)
    formData.set("building", shipping.building)
    formData.set("postalCode", shipping.postalCode)
    formData.set("deliveryNotes", shipping.deliveryNotes)
    formData.set(
      "cartItems",
      JSON.stringify(
        items.map((i) => ({ id: i.id, price: i.price, quantity: i.quantity }))
      )
    )

    return formAction(formData)
  }

  if (!hasItems) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-muted-foreground mb-4">Your cart is empty</p>
        <Button onClick={() => router.push(routes.products)}>
          Continue Shopping
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <CheckoutStepper currentStep={step} />

        {state?.error && (
          <div
            className="mb-6 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive"
            role="alert"
          >
            {state.error}
          </div>
        )}

        <Card className="p-6">
          {step === 0 && (
            <div>
              <h2 className="font-heading mb-1 text-xl font-semibold">
                Shipping Information
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Enter your delivery address
              </p>
              <ShippingForm data={shipping} onChange={setShipping} />
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={() => setStep(1)}
                  disabled={!canProceedFromShipping()}
                >
                  Continue to Delivery
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="font-heading mb-1 text-xl font-semibold">
                Delivery Method
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Choose how you want your order delivered
              </p>
              <DeliverySelector
                selected={deliveryMethod}
                onChange={setDeliveryMethod}
              />
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setStep(0)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={() => setStep(2)}>
                  Continue to Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-heading mb-1 text-xl font-semibold">
                Payment Method
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Select how you would like to pay
              </p>
              <PaymentSelector
                selected={paymentMethod}
                onChange={setPaymentMethod}
              />
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={() => setStep(3)}>
                  Review Order
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-heading mb-1 text-xl font-semibold">
                Review Your Order
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Please review your order before placing it
              </p>

              <div className="space-y-6">
                {/* Shipping review */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold">Shipping Address</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-xs"
                      onClick={() => setStep(0)}
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                    <p>
                      {shipping.firstName} {shipping.lastName}
                    </p>
                    <p>
                      {shipping.street}
                      {shipping.building ? `, ${shipping.building}` : ""}
                    </p>
                    <p>
                      {shipping.city}, {shipping.county}
                    </p>
                    <p>
                      {shipping.email} | {shipping.phone}
                    </p>
                  </div>
                </div>

                {/* Delivery review */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold">Delivery Method</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-xs"
                      onClick={() => setStep(1)}
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                    <p>
                      {deliveryMethod === "standard" && "Standard Delivery"}
                      {deliveryMethod === "express" && "Express Delivery"}
                      {deliveryMethod === "pickup" && "Store Pickup"}
                    </p>
                    <p className="font-medium text-foreground">
                      {formatPrice(deliveryPrice)}
                    </p>
                  </div>
                </div>

                {/* Payment review */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold">Payment Method</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-xs"
                      onClick={() => setStep(2)}
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                    <p>
                      {paymentMethod === "cod" && "Cash on Delivery"}
                      {paymentMethod === "mpesa" && "M-Pesa"}
                      {paymentMethod === "bank-transfer" && "Bank Transfer"}
                    </p>
                  </div>
                </div>

                {/* Items review */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Items</h3>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg bg-muted/50 p-3 text-sm"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="tabular-nums">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <form action={handleSubmit} className="mt-8 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button type="submit" disabled={pending} size="lg">
                  {pending ? (
                    "Placing Order..."
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Place Order — {formatPrice(total)}
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}
        </Card>
      </div>

      {/* Sidebar summary */}
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <OrderSummary
            items={items.map((i) => ({
              id: i.id,
              name: i.name,
              price: i.price,
              quantity: i.quantity,
            }))}
            subtotal={subtotal}
            shipping={deliveryPrice}
            total={total}
          />
        </div>
      </div>
    </div>
  )
}
