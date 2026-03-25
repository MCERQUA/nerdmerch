import { products, getProduct } from "@/lib/products";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { ProductCard } from "@/components/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not Found" };
  return {
    title: `${product.name} — NERDMERCH`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-text-muted mb-8">
        <a href="/" className="hover:text-neon transition-colors">Home</a>
        <span>/</span>
        <a href="/shop" className="hover:text-neon transition-colors">Shop</a>
        <span>/</span>
        <a href={`/shop?cat=${product.category}`} className="hover:text-neon transition-colors capitalize">{product.category}</a>
        <span>/</span>
        <span className="text-text-secondary">{product.name}</span>
      </nav>

      <ProductDetail product={product} />

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="text-2xl font-bold tracking-tight mb-8">More from {product.category}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
