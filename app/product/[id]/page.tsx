import { Suspense } from 'react';
import ProductDetailClient from './productdetailclient';

interface PageProps {
    params: { id: string };
}

export default function ProductDetailPage({ params }: PageProps) {
    return (
        <Suspense fallback={<ProductDetailSkeleton />}>
            <ProductDetailClient id={params.id} />
        </Suspense>
    );
}

const ProductDetailSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-8" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="aspect-square bg-white rounded-2xl border border-gray-200 animate-pulse" />
                    <div className="space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
                        <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
                        <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
                        <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse" />
                        <div className="h-12 bg-gray-200 rounded-xl w-full animate-pulse mt-8" />
                    </div>
                </div>
            </div>
        </div>
    );
}
