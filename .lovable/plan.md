

## Send Quiz Data to Webhook

### What happens
When the user submits the form (Step 4), we send all collected info to the LeadConnector webhook via a `fetch` POST request before showing the success screen.

### Data sent
- `name` -- full name entered
- `phone` -- phone number entered
- `service` -- selected service name
- `price` -- sale price of the selected service

### Technical Details

**File: `src/pages/Quiz.tsx`**

Update `handleSubmit` (line 59) to fire a `fetch` POST to the webhook URL with JSON body containing name, phone, service name, and price. The request is fire-and-forget (no `await`) so it doesn't block the UI -- the success screen shows immediately regardless of webhook response.

```typescript
const handleSubmit = () => {
  if (!isFormValid) return;
  const service = SERVICES.find((s) => s.name === selectedService);

  // Send to webhook (fire-and-forget)
  fetch("https://services.leadconnectorhq.com/hooks/4cQKcpdWiqodiHPVS5wT/webhook-trigger/356f12b2-f8c0-4e49-960b-d07dfa15f4b9", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.trim(),
      phone: phoneDigits,
      service: selectedService,
      price: service?.salePrice ?? "",
    }),
  }).catch(() => {});

  // Facebook pixel
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "Lead", {
      content_name: selectedService,
      value: service ? parseFloat(service.salePrice.replace("$", "")) : 0,
      currency: "USD",
    });
  }
  setScreen("success");
};
```

One function change, no new dependencies, no structural changes.

