"use client";

import Link from "next/link";

interface ProductCardProps {
  _id: string;
  title: string;
  shortDescription?: string;
  price: number;
  category: string;
  tags?: string[];
  rating: number;
  vendorId?: any;
}

export default function ProductCard({
  _id,
  title,
  shortDescription,
  price,
  category,
  tags,
  rating,
}: ProductCardProps) {
  return (
    <Link
      href={`/items/${_id}`}
      className="group rounded-2xl border border-white/10 bg-dark-card/30 overflow-hidden transition-all hover:-translate-y-1 hover:border-cyber-violet/50 hover:shadow-lg hover:shadow-cyber-violet/5"
    >
      <div className="h-48 bg-gradient-to-br from-cyber-violet/10 to-electric-cyan/10 flex items-center justify-center">
        <span className="text-5xl opacity-30">◆</span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="rounded-full bg-cyber-violet/20 px-3 py-0.5 text-xs font-medium text-cyber-violet">
            {category}
          </span>
          <span className="text-yellow-500 text-sm">{'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}</span>
        </div>
        <h3 className="text-lg font-semibold text-text-crisp mb-2 group-hover:text-cyber-violet transition-colors line-clamp-1">
          {title}
        </h3>
        {shortDescription && (
          <p className="text-sm text-text-muted line-clamp-2 mb-3">{shortDescription}</p>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-text-muted">{t}</span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <span className="text-lg font-bold text-text-crisp">${price.toFixed(2)}</span>
          <span className="text-sm text-cyber-violet opacity-0 group-hover:opacity-100 transition-opacity">
            View details →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-dark-card/30 overflow-hidden animate-pulse">
      <div className="h-48 bg-white/5" />
      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <div className="h-5 w-20 rounded-full bg-white/5" />
          <div className="h-5 w-12 rounded-full bg-white/5" />
        </div>
        <div className="h-5 w-3/4 rounded bg-white/5" />
        <div className="h-4 w-full rounded bg-white/5" />
        <div className="h-4 w-2/3 rounded bg-white/5" />
        <div className="h-px w-full bg-white/5" />
        <div className="flex justify-between">
          <div className="h-6 w-16 rounded bg-white/5" />
          <div className="h-4 w-20 rounded bg-white/5" />
        </div>
      </div>
    </div>
  );
}
