import { useState } from 'react';
import * as api from '../services/api';

/**
 * Hook to submit orders to the API
 */
export function useCreateOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOrder = async (orderData, cartItems) => {
    setLoading(true);
    setError(null);

    // Format order data for the API
    const formattedOrder = {
      customer_first_name: orderData.firstName,
      customer_last_name: orderData.lastName,
      customer_email: orderData.email,
      customer_phone: orderData.phone,
      delivery_method: orderData.deliveryMethod,
      delivery_address: orderData.address || '',
      delivery_city: orderData.city || '',
      delivery_postal_code: orderData.postalCode || '',
      pickup_date: orderData.pickupDate || null,
      pickup_time: orderData.pickupTime || '',
      notes: orderData.notes || '',
      payment_method: orderData.paymentMethod,
      items: cartItems.map(item => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: parseFloat(item.price)
      }))
    };

    try {
      const result = await api.createOrder(formattedOrder);
      setLoading(false);
      return { success: true, orderNumber: result.order_number };
    } catch (err) {
      setError(err);
      setLoading(false);
      return { success: false, error: err };
    }
  };

  return { createOrder, loading, error };
}

/**
 * Hook to track order status
 */
export function useTrackOrder() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const trackOrder = async (orderNumber) => {
    setLoading(true);
    setError(null);

    try {
      const result = await api.trackOrder(orderNumber);
      setOrder(result);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err);
      setLoading(false);
      return null;
    }
  };

  return { order, trackOrder, loading, error };
}

/**
 * Hook to submit devis (quote) requests
 */
export function useSubmitDevis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitDevis = async (devisData) => {
    setLoading(true);
    setError(null);

    // Format devis data for the API
    const formattedDevis = {
      customer_first_name: devisData.firstName,
      customer_last_name: devisData.lastName,
      customer_email: devisData.email,
      customer_phone: devisData.phone,
      event_type: devisData.eventType,
      event_date: devisData.eventDate,
      guest_count: parseInt(devisData.guestCount) || 0,
      budget_range: devisData.budget || '',
      description: devisData.description || '',
      inspiration_images: devisData.inspirationImages || ''
    };

    try {
      const result = await api.submitDevisRequest(formattedDevis);
      setLoading(false);
      return { success: true, referenceNumber: result.reference_number };
    } catch (err) {
      setError(err);
      setLoading(false);
      return { success: false, error: err };
    }
  };

  return { submitDevis, loading, error };
}
