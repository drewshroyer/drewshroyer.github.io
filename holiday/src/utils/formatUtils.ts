
import { format } from "date-fns";

/**
 * Formats cost value with currency symbol and period
 */
export const formatCost = (cost: string | null, period: string | null): string | null => {
  if (!cost) return null;
  
  let formattedCost = cost.startsWith('$') ? cost : `$${cost}`;
  
  if (period) {
    formattedCost += ` /${period}`;
  }
  
  return formattedCost;
};

/**
 * Formats date strings to a consistent format
 */
export const formatDate = (dateString: string): string => {
  return format(new Date(dateString), "MMMM d, yyyy");
};
