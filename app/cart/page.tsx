'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation';

import {
    ShoppingCart, Minus, Plus, Trash2, ArrowLeft,
    ShoppingBag, Tag, Truck, CreditCard,
} from 'lucide-react';
import { useCartStore } from '@/store/cartstore';

const CartPage = () => {


    const router = useRouter();
    const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCartStore();

    const subtotal = totalPrice();
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4 py-20">
                <div className="w-24 h-24 bg-white rounded-full border border-gray-200 flex items-center justify-center mb-6 shadow-sm">
                    <ShoppingCart className="w-12 h-12 text-gray-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 max-w-sm">
                    Looks like you haven't added anything yet. Explore our catalog and find something you'll love.
                </p>
                <Link
                    href="/"
                    className="flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                    <ShoppingBag className="w-5 h-5" />
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                        <p className="text-gray-500 mt-1">{totalItems()} item{totalItems() !== 1 ? 's' : ''}</p>
                    </div>
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Continue Shopping
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex justify-end">
                            <button
                                onClick={clearCart}
                                className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors flex items-center gap-1"
                            >
                                <Trash2 className="w-4 h-4" />
                                Clear cart
                            </button>
                        </div>

                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 flex gap-4 hover:shadow-sm transition-shadow"
                            >
                                <Link href={`/product/${item.id}`} className="shrink-0">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                                        />
                                    </div>
                                </Link>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="text-xs font-medium text-gray-400 mb-0.5">{item.brand} · {item.category}</p>
                                            <Link href={`/product/${item.id}`}>
                                                <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug hover:text-blue-600 transition-colors line-clamp-2">
                                                    {item.title}
                                                </h3>
                                            </Link>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all shrink-0"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-3 py-2 hover:bg-gray-50 transition-colors"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus className="w-3.5 h-3.5 text-gray-600" />
                                            </button>
                                            <span className="px-4 py-2 font-semibold text-gray-900 min-w-[2.5rem] text-center text-sm border-x border-gray-200">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-3 py-2 hover:bg-gray-50 transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus className="w-3.5 h-3.5 text-gray-600" />
                                            </button>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-lg font-bold text-gray-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                            {item.quantity > 1 && (
                                                <p className="text-xs text-gray-400">${item.price.toFixed(2)} each</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal ({totalItems()} items)</span>
                                    <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 flex items-center gap-1.5">
                                        <Truck className="w-3.5 h-3.5" />
                                        Shipping
                                    </span>
                                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Estimated Tax</span>
                                    <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            {shipping > 0 && (
                                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                                    Add ${(50 - subtotal).toFixed(2)} more for <span className="font-semibold">free shipping!</span>
                                </div>
                            )}

                            <div className="border-t border-gray-100 pt-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Promo code"
                                            className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                                        />
                                    </div>
                                    <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            <button className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all">
                                <CreditCard className="w-5 h-5" />
                                Proceed to Checkout
                            </button>

                            <p className="text-xs text-gray-400 text-center mt-4">
                                Secure checkout — SSL encrypted
                            </p>

                            <div className="mt-4 border-t border-gray-100 pt-4">
                                <div className="flex flex-wrap justify-center gap-3">
                                    {['visa', 'mastercard', 'amex', 'paypal'].map((method) => (
                                        <div key={method} className="px-3 py-1.5 bg-gray-100 rounded text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            {method}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage