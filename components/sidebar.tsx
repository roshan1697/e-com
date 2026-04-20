'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, X } from 'lucide-react'
import { CATEGORIES, PRICE_RANGES } from "@/types";

const SideBar = () => {
    const router = useRouter()
    const searchParams = useSearchParams()


    const selectedCategories = searchParams.getAll('category')
    const priceMin = searchParams.get('priceMin')
    const priceMax = searchParams.get('priceMax')


    const updateParams = (key: string, value: string, multi = false) => {
        const params = new URLSearchParams(searchParams.toString())

        if (multi) {
            const current = params.getAll(key);
            if (current.includes(value)) {
                params.delete(key)
                current.filter((v) => v !== value).forEach((v) => params.append(key, v))
            } else {
                params.append(key, value)
            }
        } else {
            params.set(key, value)
        }

        router.push(`/?${params.toString()}`)
    }

    const setPriceRange = (min: number, max: number) => {
        const params = new URLSearchParams(searchParams.toString())
        const currentMin = searchParams.get('priceMin')
        const currentMax = searchParams.get('priceMax')

        if (currentMin === String(min) && currentMax === String(max === Infinity ? '' : max)) {
            params.delete('priceMin')
            params.delete('priceMax')
        } else {
            params.set('priceMin', String(min))
            if (max !== Infinity) {
                params.set('priceMax', String(max))
            } else {
                params.delete('priceMax')
            }
        }
        router.push(`/?${params.toString()}`)
    }

    const clearAll = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('category')
        params.delete('priceMin')
        params.delete('priceMax')
        router.push(`/?${params.toString()}`)
    }

    const hasFilters = selectedCategories.length > 0 || priceMin || priceMax

    const isRangeSelected = (min: number, max: number) => {
        const currentMin = searchParams.get('priceMin')
        const currentMax = searchParams.get('priceMax')
        return currentMin === String(min) && (max === Infinity ? !currentMax : currentMax === String(max))
    }

    return (
        <aside className="w-full ">
            
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4 text-gray-600" />
                        <h2 className="font-semibold text-gray-900">Filters</h2>
                    </div>
                    {hasFilters && (
                        <button
                            onClick={clearAll}
                            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                        >
                            <X className="w-3 h-3" />
                            Clear all
                        </button>
                    )}
                </div>

                <div className="px-5 py-5 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                        Category
                    </h3>
                    <ul className="space-y-2">
                        {CATEGORIES.map((cat) => {
                            const active = selectedCategories.includes(cat);
                            return (
                                <li key={cat}>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div
                                            onClick={() => updateParams('category', cat, true)}
                                            className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${active
                                                ? 'bg-blue-600 border-blue-600'
                                                : 'border-gray-300 group-hover:border-blue-400'
                                                }`}
                                        >
                                            {active && (
                                                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                                                    <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                                </svg>
                                            )}
                                        </div>
                                        <span
                                            onClick={() => updateParams('category', cat, true)}
                                            className={`text-sm select-none transition-colors ${active ? 'text-blue-700 font-medium' : 'text-gray-600 group-hover:text-gray-900'
                                                }`}
                                        >
                                            {cat}
                                        </span>
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="px-5 py-5">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                        Price Range
                    </h3>
                    <ul className="space-y-2">
                        {PRICE_RANGES.map((range) => {
                            const active = isRangeSelected(range.min, range.max);
                            return (
                                <li key={range.label}>
                                    <button
                                        onClick={() => setPriceRange(range.min, range.max)}
                                        className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all ${active
                                            ? 'bg-blue-50 text-blue-700 font-medium border border-blue-200'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        {range.label}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>


                </div>
            </div>
        </aside>
    )
}

export default SideBar