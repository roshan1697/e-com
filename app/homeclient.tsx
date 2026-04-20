'use client';

import ProductCard from "@/components/productcard";
import { products } from "@/lib/products_export";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { PackageSearch, ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import SideBar from "@/components/sidebar";


const SORT_OPTIONS = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Highest Rated', value: 'rating_desc' },
    { label: 'Most Reviews', value: 'reviews_desc' },
]

const HomeClient = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    
    const [sort, setSort] = useState('featured')
    const [showMobileFilters, setShowMobileFilters] = useState(false)
    const q = searchParams.get('q') || ''
    const categories = searchParams.getAll('category')
    const priceMin = parseFloat(searchParams.get('priceMin') || '0')
    const priceMax = parseFloat(searchParams.get('priceMax') || '999999')

    const filtered = useMemo(() => {
        
        let result = [...products]

        if (q) {
            const lower = q.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(lower) ||
                    p.brand.toLowerCase().includes(lower) ||
                    p.category.toLowerCase().includes(lower) ||
                    p.description.toLowerCase().includes(lower)
            );
        }

        if (categories.length > 0) {
            result = result.filter((p) => categories.includes(p.category))
        }

        result = result.filter((p) => p.price >= priceMin && p.price <= priceMax)

        switch (sort) {
            case 'price_asc':
                result.sort((a, b) => a.price - b.price)
                break
            case 'price_desc':
                result.sort((a, b) => b.price - a.price)
                break
            case 'rating_desc':
                result.sort((a, b) => b.rating - a.rating)
                break
            case 'reviews_desc':
                result.sort((a, b) => b.review_count - a.review_count)
                break
        }

        return result
    }, [ q, categories, priceMin, priceMax, sort])

    const activeFilterCount = categories.length + (searchParams.get('priceMin') ? 1 : 0)
    return (
        <div className="min-h-screen bg-gray-50">
        
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                        {q ? `Results for "${q}"` : categories.length === 1 ? categories[0] : 'All Products'}
                    </h1>
                    <p className="text-gray-500 text-sm">
                        {`${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <div className="hidden lg:block w-64 shrink-0">
                        <div className="sticky top-24 ">
                            <SideBar />
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-6 gap-3">
                            <button
                                onClick={() => setShowMobileFilters(true)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                                {activeFilterCount > 0 && (
                                    <span className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </button>

                            <div className="flex items-center gap-2 ml-auto">
                                <span className="text-sm text-gray-500 hidden sm:block">Sort by</span>
                                <div className="relative">
                                    <select
                                        value={sort}
                                        onChange={(e) => setSort(e.target.value)}
                                        className="appearance-none pl-3 pr-9 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    >
                                        {SORT_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {(categories.length > 0 || searchParams.get('priceMin') || q) && (
                            <div className="flex flex-wrap items-center gap-2 mb-5">
                                {q && (
                                    <FilterChip
                                        label={`Search: ${q}`}
                                        onRemove={() => {
                                            const p = new URLSearchParams(searchParams.toString());
                                            p.delete('q');
                                            router.push(`/?${p.toString()}`);
                                        }}
                                    />
                                )}
                                {categories.map((cat) => (
                                    <FilterChip
                                        key={cat}
                                        label={cat}
                                        onRemove={() => {
                                            const p = new URLSearchParams(searchParams.toString());
                                            p.delete('category');
                                            categories.filter((c) => c !== cat).forEach((c) => p.append('category', c));
                                            router.push(`/?${p.toString()}`);
                                        }}
                                    />
                                ))}
                                {searchParams.get('priceMin') && (
                                    <FilterChip
                                        label={`$${searchParams.get('priceMin')} – ${searchParams.get('priceMax') || '∞'}`}
                                        onRemove={() => {
                                            const p = new URLSearchParams(searchParams.toString());
                                            p.delete('priceMin');
                                            p.delete('priceMax');
                                            router.push(`/?${p.toString()}`);
                                        }}
                                    />
                                )}
                            </div>
                        )}

                        {filtered.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-5">
                                    <PackageSearch className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                                <p className="text-gray-500 mb-6 max-w-sm">
                                    We couldn't find anything matching your filters. Try adjusting your search or clearing the filters.
                                </p>
                                <button
                                    onClick={() => router.push('/')}
                                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filtered.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showMobileFilters && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setShowMobileFilters(false)}
                    />
                    <div className="absolute inset-y-0 left-0 w-80 bg-gray-50 overflow-y-auto shadow-xl">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-white">
                            <h2 className="font-semibold text-gray-900">Filters</h2>
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="p-2 rounded-full hover:bg-gray-100"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-4">
                            <SideBar />
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default HomeClient



const  FilterChip = ({ label, onRemove }: { label: string; onRemove: () => void }) => {
    return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
            {label}
            <button onClick={onRemove} className="hover:text-blue-900 transition-colors">
                <X className="w-3 h-3" />
            </button>
        </span>
    );
}