import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[640px] px-5 py-28 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="h-display mt-3 text-6xl">Page not found</h1>
      <p className="mt-4 text-muted">That page does not exist or has moved. Try the phone catalog instead.</p>
      <Link href="/phones" className="btn-brand mt-8">Browse phones</Link>
    </div>
  );
}
