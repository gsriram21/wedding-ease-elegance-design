import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Truck, Shield, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  quantity?: number;
}

interface CheckoutProps {
  products: Product[];
  onClose: () => void;
  source: 'ecommerce' | 'chat';
}

const UnifiedCheckout: React.FC<CheckoutProps> = ({ products, onClose, source }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'US'
  });
  const navigate = useNavigate();

  // Calculate total
  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const price = parseInt(product.price.replace(/[₹,]/g, ''));
      const quantity = product.quantity || 1;
      return total + (price * quantity);
    }, 0);
  };

  const total = calculateTotal();
  const shipping = total > 50000 ? 0 : 5000; // Free shipping over ₹50,000
  const tax = Math.round(total * 0.18); // 18% GST
  const finalTotal = total + shipping + tax;

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const createStripeCheckoutSession = async () => {
    setIsLoading(true);
    
    try {
      // Demo implementation - In production, this would integrate with Stripe
      console.log('Creating Stripe checkout session with:', {
        products,
        customerInfo,
        total: finalTotal,
        source
      });

      // Simulate Stripe checkout session creation
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Demo success - In production, user would be redirected to Stripe
      alert(`Demo Checkout Successful!\n\nOrder Summary:\n${products.map(p => `- ${p.name}: ${p.price}`).join('\n')}\n\nTotal: ₹${finalTotal.toLocaleString()}\n\nCustomer: ${customerInfo.firstName} ${customerInfo.lastName}\nEmail: ${customerInfo.email}\n\nIn production, this would redirect to Stripe Checkout with secure payment processing.`);
      
      onClose(); // Close the checkout modal
      
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to initiate checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      customerInfo.email &&
      customerInfo.firstName &&
      customerInfo.lastName &&
      customerInfo.address &&
      customerInfo.city &&
      customerInfo.postalCode
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-luxury-taupe/20 p-6 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="flex items-center gap-2 text-luxury-maroon hover:bg-luxury-soft-pink"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon">
              Secure Checkout
            </h2>
            <p className="text-luxury-maroon/60 font-luxury-sans text-sm">
              {source === 'chat' ? 'Chat Selected Items' : 'Your Wedding Selection'}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 p-6">
          {/* Customer Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-luxury-sans text-luxury-maroon">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email" className="font-luxury-sans text-luxury-maroon">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="font-luxury-sans text-luxury-maroon">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={customerInfo.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="font-luxury-sans text-luxury-maroon">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={customerInfo.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-luxury-serif text-luxury-maroon">
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address" className="font-luxury-sans text-luxury-maroon">
                    Street Address
                  </Label>
                  <Input
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="font-luxury-sans text-luxury-maroon">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={customerInfo.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="font-luxury-sans text-luxury-maroon">
                      Postal Code
                    </Label>
                    <Input
                      id="postalCode"
                      value={customerInfo.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-luxury-serif text-luxury-maroon">
                  Order Summary
                </CardTitle>
                <CardDescription>
                  {products.length} item{products.length > 1 ? 's' : ''} in your order
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Products List */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center gap-3 p-3 bg-luxury-soft-pink/10 rounded-lg">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-luxury-serif font-semibold text-luxury-maroon text-sm">
                          {product.name}
                        </h4>
                        <p className="text-luxury-maroon/60 text-xs font-luxury-sans">
                          {product.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-luxury-serif font-bold text-luxury-maroon">
                          {product.price}
                        </p>
                        {product.quantity && product.quantity > 1 && (
                          <p className="text-xs text-luxury-maroon/60">
                            Qty: {product.quantity}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-luxury-sans text-luxury-maroon/70">Subtotal</span>
                    <span className="font-luxury-sans text-luxury-maroon">₹{total.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="font-luxury-sans text-luxury-maroon/70">
                      Shipping {total > 50000 && '(Free)'}
                    </span>
                    <span className="font-luxury-sans text-luxury-maroon">
                      {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="font-luxury-sans text-luxury-maroon/70">GST (18%)</span>
                    <span className="font-luxury-sans text-luxury-maroon">₹{tax.toLocaleString()}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span className="font-luxury-serif text-luxury-maroon">Total</span>
                    <span className="font-luxury-serif text-luxury-maroon">₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <div className="grid grid-cols-3 gap-4 text-center text-xs">
              <div className="flex flex-col items-center gap-2">
                <Shield className="w-6 h-6 text-luxury-dusty-rose" />
                <span className="font-luxury-sans text-luxury-maroon/70">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <CreditCard className="w-6 h-6 text-luxury-dusty-rose" />
                <span className="font-luxury-sans text-luxury-maroon/70">Cards Accepted</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Truck className="w-6 h-6 text-luxury-dusty-rose" />
                <span className="font-luxury-sans text-luxury-maroon/70">Fast Delivery</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={createStripeCheckoutSession}
              disabled={!isFormValid() || isLoading}
              className="w-full bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-serif font-bold py-4 text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Payment
                </>
              )}
            </Button>

            <p className="text-xs text-luxury-maroon/60 font-luxury-sans text-center">
              Your payment information is processed securely by Stripe. We never store your card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedCheckout; 