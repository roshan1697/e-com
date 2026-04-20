'use client';

import { Product } from "@/types";
import Link from "next/link"
import { ShoppingCart, Check } from 'lucide-react'
import StarRating from "./ui/starrating";
import { useState } from "react";
import { useCartStore } from "@/store/cartstore";

interface ProductCardProps {
    product: Product;
}


const ProductCard = ({ product }: ProductCardProps) => {
    const [added, setAdded] = useState(false)
    const addItem = useCartStore((s) => s.addItem)
    const items = useCartStore((s) => s.items)

    const inCart = items.some((i) => i.id === product.id)

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            image_url: product.image_url,
            category: product.category,
            brand: product.brand,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
    }

    return (
        <Link href={`/product/${product.id}`} className="group block">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200">
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                        <span className="inline-block px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-600 rounded-full border border-gray-200">
                            {product.category}
                        </span>
                    </div>
                    {product.stock <= 10 && product.stock > 0 && (
                        <div className="absolute top-3 right-3">
                            <span className="inline-block px-2.5 py-1 bg-amber-50 text-xs font-medium text-amber-700 rounded-full border border-amber-200">
                                {product.stock} left
                            </span>
                        </div>
                    )}
                </div>

                <div className="p-4">
                    <p className="text-xs text-gray-400 font-medium mb-1">{product.brand}</p>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                        {product.title}
                    </h3>

                    <StarRating rating={product.rating} reviewCount={product.review_count} />

                    <div className="mt-3 flex items-center justify-between gap-2">
                        <span className="text-lg font-bold text-gray-900">
                            ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                        <button
                            onClick={handleAddToCart}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${added || inCart
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                                }`}
                        >
                            {added ? (
                                <>
                                    <Check className="w-3.5 h-3.5" />
                                    Added
                                </>
                            ) : inCart ? (
                                <>
                                    <Check className="w-3.5 h-3.5" />
                                    In Cart
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="w-3.5 h-3.5" />
                                    Add
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard