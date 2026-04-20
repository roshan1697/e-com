'use client';
import Link from "next/link"
import { ShoppingCart, Search, User, Zap, X } from 'lucide-react';
import { useSearchParams , useRouter } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "@/store/cartstore";


const Header = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");
    const totalItems = useCartStore((s)=>s.totalItems())

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (searchValue.trim()) { params.set("search", searchValue.trim()); }
        else { params.delete("search"); }
        router.push(`/?${params.toString()}`);
    }

    const handleClearSearch = () => {
        setSearchValue('');
        const params = new URLSearchParams(searchParams.toString());
        params.delete('q');
        router.push(`/?${params.toString()}`);
    }

    

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16 gap-4">
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900 hidden sm:block">
                            Ecom
                        </span>
                    </Link>

                    <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Search products, brands, categories..."
                                className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            {searchValue && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </form>

                    <div className="flex items-center gap-2 shrink-0">
                        <Link
                            href="/cart"
                            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Shopping cart"
                        >
                            <ShoppingCart className="w-5 h-5 text-gray-700" />
                            {totalItems > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {totalItems > 99 ? '99+' : totalItems}
                                </span>
                            )}
                        </Link>
                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <User className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header