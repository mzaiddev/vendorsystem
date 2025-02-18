import React, { useState } from 'react';
import { 
   CreditCard, DollarSign, 
  Trash2, Plus, Minus, CheckCircle 
} from 'lucide-react';

interface CartItem {
  id: string;
  type: 'invitation' | 'booth' | 'logistics' | 'storage';
  name: string;
  description: string;
  quantity: number;
  price: number;
  expoName?: string;
}

const ServiceCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      type: 'invitation',
      name: 'Visa Invitation Letter',
      description: 'Official invitation letter for visa application (per person)',
      quantity: 2,
      price: 150,
      expoName: 'NY International Gift Fair 2025'
    },
    {
      id: '2',
      type: 'booth',
      name: 'Premium Booth Space',
      description: 'Premium location booth (10x10)',
      quantity: 1,
      price: 2500,
      expoName: 'NY International Gift Fair 2025'
    }
  ]);

  const [step, setStep] = useState<'cart' | 'payment' | 'confirmation'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'stripe'>('card');

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateTotal() * 0.1; // 10% tax
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {['cart', 'payment', 'confirmation'].map((s, index) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === s
                    ? 'bg-blue-600 text-white'
                    : step === 'confirmation' && s !== 'confirmation'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {index + 1}
                </div>
                {index < 2 && (
                  <div className={`w-24 h-1 ${
                    step === 'confirmation' 
                      ? 'bg-green-600' 
                      : step === 'payment' && index === 0
                      ? 'bg-blue-600'
                      : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>Shopping Cart</span>
            <span>Payment Details</span>
            <span>Confirmation</span>
          </div>
        </div>

        {step === 'cart' && (
          <>
            {/* Cart Items */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
              <h2 className="text-xl font-semibold text-white mb-6">Your Cart</h2>
              
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-start justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                      {item.expoName && (
                        <p className="text-gray-400 text-sm mt-1">Expo: {item.expoName}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-gray-600 rounded"
                        >
                          <Minus className="w-4 h-4 text-gray-400" />
                        </button>
                        <span className="text-white w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-600 rounded"
                        >
                          <Plus className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      <div className="text-white">${item.price * item.quantity}</div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 hover:bg-gray-600 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="mt-6 border-t border-gray-700 pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax (10%)</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold text-lg pt-2">
                    <span>Total</span>
                    <span>${(calculateTotal() + calculateTax()).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setStep('payment')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Continue to Payment
              </button>
            </div>
          </>
        )}

        {step === 'payment' && (
          <div className="space-y-6">
            {/* Payment Methods */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-6">Payment Method</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'card', name: 'Credit Card', icon: CreditCard },
                  { id: 'bank', name: 'Bank Transfer', icon: DollarSign },
                  { id: 'stripe', name: 'Pay with Stripe', icon: CreditCard }
                ].map(method => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as 'card' | 'bank' | 'stripe')}
                      className={`p-4 rounded-lg border ${
                        paymentMethod === method.id
                          ? 'border-blue-500 bg-blue-600/20'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <Icon className="w-6 h-6 text-gray-400 mb-2" />
                      <span className="text-white">{method.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-6">Payment Details</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Card Number</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="Name on card"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">CVV</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax (10%)</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-semibold text-lg pt-2 border-t border-gray-700">
                  <span>Total</span>
                  <span>${(calculateTotal() + calculateTax()).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Controls */}
            <div className="flex justify-between">
              <button
                onClick={() => setStep('cart')}
                className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Back to Cart
              </button>
              <button
                onClick={() => setStep('confirmation')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Complete Payment
              </button>
            </div>
          </div>
        )}

        {step === 'confirmation' && (
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Payment Successful!</h2>
            <p className="text-gray-400 mb-6">Your order has been confirmed</p>
            <div className="max-w-sm mx-auto space-y-4">
              <div className="p-4 bg-gray-700 rounded-lg">
                <p className="text-gray-400">Order Number</p>
                <p className="text-white font-medium">ORD-2025-001</p>
              </div>
              <div className="p-4 bg-gray-700 rounded-lg">
                <p className="text-gray-400">Amount Paid</p>
                <p className="text-white font-medium">
                  ${(calculateTotal() + calculateTax()).toFixed(2)}
                </p>
              </div>
            </div>
            <button
              className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => window.location.href = '/dashboard'}
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCart;