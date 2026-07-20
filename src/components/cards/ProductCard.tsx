"use client";

import Link from "next/link";

interface ProductCardProps {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  brand?: string;
  image_url?: string;
  rating: number;
  stock?: number;
}

export default function ProductCard({
  _id,
  name,
  description,
  price,
  category,
  brand,
  image_url,
  rating,
  stock,
}: ProductCardProps) {
  const imgSrc = image_url || null;

  return (
    <Link
      href={`/shop/${_id}`}
      className="group rounded-xl border border-border-light bg-white overflow-hidden shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-gaming-purple/30"
    >
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
        {imgSrc ? (
          <img src={imgSrc} alt={name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-5xl opacity-20">🎮</span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="rounded-full bg-gaming-purple/10 px-2.5 py-0.5 text-xs font-medium text-gaming-purple">
            {category}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-gaming-amber text-sm">{'★'.repeat(Math.round(rating))}</span>
            <span className="text-xs text-text-muted">({rating.toFixed(1)})</span>
          </div>
        </div>
        {brand && (
          <p className="text-xs text-text-muted mb-1">{brand}</p>
        )}
        <h3 className="text-base font-semibold text-text-primary mb-1.5 line-clamp-1 group-hover:text-gaming-purple transition-colors">
          {name}
        </h3>
        {description && (
          <p className="text-sm text-text-muted line-clamp-2 mb-3">{description}</p>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-border-light">
          <span className="text-lg font-bold text-text-primary">${price.toFixed(2)}</span>
          {stock !== undefined && (
            <span className={`text-xs ${stock > 0 ? 'text-gaming-emerald' : 'text-red-500'}`}>
              {stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-border-light bg-white overflow-hidden animate-pulse shadow-sm">
      <div className="h-48 bg-gray-100" />
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <div className="h-5 w-20 rounded-full bg-gray-100" />
          <div className="h-5 w-12 rounded-full bg-gray-100" />
        </div>
        <div className="h-5 w-3/4 rounded bg-gray-100" />
        <div className="h-4 w-full rounded bg-gray-100" />
        <div className="h-4 w-2/3 rounded bg-gray-100" />
        <div className="h-px w-full bg-gray-100" />
        <div className="flex justify-between">
          <div className="h-6 w-16 rounded bg-gray-100" />
          <div className="h-4 w-20 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
