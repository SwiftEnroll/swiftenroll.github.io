---
title: "Manage payments, scholarships, and refunds"
weight: 60
type: "docs"
layout: "docs"
toc: true
aliases: ["/admin-training/payments-refunds/"]
---

## Why this matters
Accurate payment tracking, scholarship awards, and timely refunds reduce support overhead and ensure financial integrity.

## Financial aid (scholarships)
- Location: Registration → Financial aid requests
- From the list or a detail view, you can:
  - Action → Export selected financial aid (CSV)
  - Approve or Deny a request via dedicated approve/deny views
  - Record awards using the inline award formset on the aid request

## Payments
- Location: Payment → Payments
- What you’ll see: Stripe ID, Student, Amount, Refunded amount; inlines for Enrollment requests, Donations, and Refunds.
- Actions:
  - Process full refund — creates a refund for the full available amount
  - Process partial refund — selects one payment and opens a partial refund screen

## Refunds from Enrollment requests
- Location: Registration → Enrollment requests
- Actions:
  - Decline selected — marks as declined without refund
  - Decline and refund — opens a flow that totals amounts (with fees) and posts refunds

## Steps — Full refund from Payments
1. Go to Payment → Payments and filter/search by Stripe ID or student.
2. Select one or more rows.
3. Action → Process full refund → Go.
4. Watch for success or error messages at the top of the page.

## Steps — Partial refund from a Payment
1. In Payment → Payments, select exactly one payment.
2. Action → Process partial refund → Go.
3. Complete the partial refund screen and submit.

## Screenshots
{{< figure src="/images/admin/payment-list-refund-actions.png" alt="Payment list with refund actions" caption="Payment list with refund actions" >}}
{{< figure src="/images/admin/payment-detail-inlines.png" alt="Payment detail with inlines (Enrollment requests, Donations, Refunds)" caption="Payment detail with related inlines" >}}

## Tips & best practices
- Approval‑before‑payment flow: Approve first, then expect payment; refunds are for cancellations, declines after payment, or scholarships applied post‑payment.
- Scholarships: If aid is awarded after payment, issue a partial refund to reflect the discount.
- Keep notes in the Refund reason field for audit clarity.
