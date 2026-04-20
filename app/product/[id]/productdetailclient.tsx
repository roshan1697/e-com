'use client';

import StarRating from '@/components/ui/starrating';
import { useCartStore } from '@/store/cartstore';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import {
    ShoppingCart, ChevronLeft, Minus, Plus, Star,
    Truck, Shield, RefreshCw, Package, Check,
} from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types';
import { products } from '@/lib/products_export';

interface Props {
    id: string;
}

const REVIEWS = [
    { name: 'Alex M.', rating: 5, date: 'March 2024', text: 'Absolutely love this product. Build quality is exceptional and it works exactly as described. Highly recommend to anyone considering it.' },
    { name: 'Sarah K.', rating: 4, date: 'February 2024', text: 'Great product overall. Exactly what I needed. Arrived quickly and well-packaged. Only minor gripe is the documentation could be clearer.' },
    { name: 'James R.', rating: 5, date: 'January 2024', text: 'Exceeded my expectations in every way. The quality is top-notch and the performance is incredible. Worth every penny.' },
];

const ProductDetailClient = ({ id }: Props) => {

    const router = useRouter()
    const [quantity, setQuantity] = useState(1)
    const [addedToCart, setAddedToCart] = useState(false)
    const [activeImageIdx, setActiveImageIdx] = useState(0)

    const addItem = useCartStore((s) => s.addItem)
    const items = useCartStore((s) => s.items)
    const cartItem = items.find((i) => i.id === id)

    const product: Product | undefined = products.find(d => d.id === id)

    const handleAddToCart = () => {
        if (!product) return;
        for (let i = 0; i < quantity; i++) {
            addItem({
                id: product.id,
                title: product.title,
                price: product.price,
                image_url: product.image_url,
                category: product.category,
                brand: product.brand,
            });
        }
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    }
    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
                <Package className="w-16 h-16 text-gray-300 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Product not found</h2>
                <p className="text-gray-500 mb-6">This product may have been removed or the link is incorrect.</p>
                <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                    Back to Shop
                </Link>
            </div>
        );
    }

    const images = [product.image_url, product.image_url, product.image_url]
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href={`/?category=${encodeURIComponent(product.category)}`} className="hover:text-blue-600 transition-colors">
                        {product.category}
                    </Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium truncate max-w-xs">{product.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden aspect-square">
                            <img
                                src={images[activeImageIdx]}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex gap-3">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImageIdx(i)}
                                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImageIdx === i ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
                                {product.category}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                {product.brand}
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                            {product.title}
                        </h1>

                        <div className="mb-5">
                            <StarRating rating={product.rating} reviewCount={product.review_count} size="md" />
                        </div>

                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-4xl font-bold text-gray-900">
                                ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </span>
                            <span className="text-lg text-gray-400 line-through">
                                ${(product.price * 1.2).toFixed(2)}
                            </span>
                            <span className="px-2 py-0.5 bg-green-50 text-green-700 text-sm font-semibold rounded-md">
                                17% OFF
                            </span>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <div className="border-t border-gray-100 pt-6 mb-6">
                            <div className="grid grid-cols-3 gap-4 text-sm">
                                {[
                                    { icon: Truck, label: 'Free Shipping', sub: 'On orders over $50' },
                                    { icon: Shield, label: '2-Year Warranty', sub: 'Full coverage' },
                                    { icon: RefreshCw, label: 'Free Returns', sub: '30-day window' },
                                ].map(({ icon: Icon, label, sub }) => (
                                    <div key={label} className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl">
                                        <Icon className="w-5 h-5 text-blue-600 mb-1.5" />
                                        <span className="font-medium text-gray-800 text-xs">{label}</span>
                                        <span className="text-gray-400 text-xs">{sub}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-sm font-medium text-gray-700">Quantity</span>
                            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    className="px-3 py-2.5 hover:bg-gray-50 transition-colors"
                                >
                                    <Minus className="w-4 h-4 text-gray-600" />
                                </button>
                                <span className="px-4 py-2.5 font-semibold text-gray-900 min-w-[3rem] text-center border-x border-gray-200">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                                    className="px-3 py-2.5 hover:bg-gray-50 transition-colors"
                                >
                                    <Plus className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                            <span className="text-xs text-gray-400">{product.stock} in stock</span>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleAddToCart}
                                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-all duration-200 ${addedToCart
                                    ? 'bg-green-600 text-white'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]'
                                    }`}
                            >
                                {addedToCart ? (
                                    <>
                                        <Check className="w-5 h-5" />
                                        Added to Cart!
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart className="w-5 h-5" />
                                        Add to Cart
                                    </>
                                )}
                            </button>
                            <Link
                                href="/cart"
                                className="px-6 py-3.5 rounded-xl font-semibold border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-all"
                            >
                                View Cart
                                {cartItem && (
                                    <span className="ml-2 w-5 h-5 bg-blue-600 text-white text-xs rounded-full inline-flex items-center justify-center">
                                        {cartItem.quantity}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center justify-center text-center">
                            <span className="text-6xl font-bold text-gray-900">{product.rating}</span>
                            <StarRating rating={product.rating} size="md" />
                            <p className="text-sm text-gray-500 mt-2">{product.review_count.toLocaleString()} reviews</p>
                        </div>
                        <div className="md:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
                            {[5, 4, 3, 2, 1].map((star) => {
                                const pct = star === 5 ? 68 : star === 4 ? 22 : star === 3 ? 7 : star === 2 ? 2 : 1;
                                return (
                                    <div key={star} className="flex items-center gap-3 text-sm">
                                        <div className="flex items-center gap-1 w-16 justify-end">
                                            <span className="text-gray-600">{star}</span>
                                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                        </div>
                                        <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                                        </div>
                                        <span className="text-gray-500 w-8">{pct}%</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {REVIEWS.map((review) => (
                            <div key={review.name} className="bg-white rounded-2xl border border-gray-200 p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-sm font-bold text-blue-700">{review.name[0]}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                                            <p className="text-xs text-gray-400">{review.date}</p>
                                        </div>
                                    </div>
                                    <StarRating rating={review.rating} />
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailClient