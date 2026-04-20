import Link from 'next/link';
import { Zap } from 'lucide-react';
import {
    SiX,
    SiInstagram,
    SiFacebook,
    SiYoutube,
    SiGithub
} from '@icons-pack/react-simple-icons'
const  Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">ShopSwift</span>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Your one-stop destination for electronics, fashion, books, and more — delivered fast.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Shop</h3>
                        <ul className="space-y-2 text-sm">
                            {['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports'].map((cat) => (
                                <li key={cat}>
                                    <Link
                                        href={`/?category=${encodeURIComponent(cat)}`}
                                        className="hover:text-white transition-colors"
                                    >
                                        {cat}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            {['About Us', 'Careers', 'Press', 'Blog', 'Affiliates'].map((item) => (
                                <li key={item}>
                                    <span className="hover:text-white transition-colors cursor-pointer">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h3>
                        <ul className="space-y-2 text-sm">
                            {['Help Center', 'Returns & Refunds', 'Order Tracking', 'Contact Us', 'Privacy Policy'].map((item) => (
                                <li key={item}>
                                    <span className="hover:text-white transition-colors cursor-pointer">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        &copy; {year} ShopSwift. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        {[
                            { icon: SiX, label: 'Twitter' },
                            { icon: SiInstagram, label: 'Instagram' },
                            { icon: SiFacebook, label: 'Facebook' },
                            { icon: SiYoutube, label: 'YouTube' },
                            { icon: SiGithub, label: 'GitHub' },
                        ].map(({ icon: Icon, label }) => (
                            <button
                                key={label}
                                aria-label={label}
                                className="text-gray-500 hover:text-white transition-colors"
                            >
                                <Icon className="w-5 h-5" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer