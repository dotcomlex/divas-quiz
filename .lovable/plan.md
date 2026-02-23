

## Show Percentage Instead of Dollar Amount on Savings Line

### Change

**File: `src/components/ServiceTile.tsx`**

In the non-flat pricing block, update the savings calculation to show the percentage discount instead of the dollar amount.

**Current:** `🏷️ Ahorras $18.00`
**New:** `🏷️ Ahorras 10%`

The percentage is calculated as:
```
((originalPrice - salePrice) / originalPrice * 100)
```

This will round to the nearest whole number, so all services currently at 10% off will show "Ahorras 10%".

### Technical Detail

Update the savings computation (around line 232) to calculate percentage instead of dollar difference, and update the display string from `Ahorras $${savings}` to `Ahorras ${savingsPercent}%`.

Single file change, one line of math, one line of display text.

