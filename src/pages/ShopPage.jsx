import { useSearchParams } from 'react-router-dom'
import { CATEGORIES } from '../data/products'
import ProductGrid from '../components/ProductGrid'

const CATEGORY_BANNERS = {
  Dress:  { img: '/images/Cut out Dress/467258552_559527776773835_6982481881163469313_n.jpg',  label: 'Dresses' },
  Jacket: { img: '/images/Gile/468941819_572800962113183_4946780446749558791_n.jpg',            label: 'Jackets' },
  Set:    { img: '/images/Office Style Black/467306706_559527650107181_1630434491942107275_n.jpg', label: 'Sets' },
  Top:    { img: '/images/Vest Style/469323379_572797222113557_680741490562790854_n.jpg',       label: 'Tops' },
}

export default function ShopPage() {
  const [searchParams] = useSearchParams()
  const cat = searchParams.get('cat')
  const banner = cat && CATEGORY_BANNERS[cat]

  return (
    <div className="pt-20">
      {/* Category hero — shown when a specific category is active */}
      {banner ? (
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img src={banner.img} alt={banner.label}
            className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-brand-black/40 flex flex-col items-center justify-center text-center">
            <p className="text-brand-white/70 text-[10px] tracking-widest2 uppercase mb-2">Collection</p>
            <h1 className="font-display text-3xl md:text-4xl text-brand-white">{banner.label}</h1>
          </div>
        </div>
      ) : (
        /* Default shop header */
        <div className="px-6 md:px-12 py-12 border-b border-gray-100 text-center">
          <p className="text-[10px] tracking-widest2 uppercase text-brand-gray mb-2">Detumima</p>
          <h1 className="font-display text-3xl md:text-4xl text-brand-black">All Collections</h1>
        </div>
      )}

      {/* Category quick-nav */}
      <div className="border-b border-gray-100 px-6 md:px-12 overflow-x-auto">
        <div className="flex gap-0 min-w-max md:min-w-0 md:justify-center">
          {['All', ...CATEGORIES.filter(c => c !== 'All')].map(c => (
            <a
              key={c}
              href={c === 'All' ? '/shop' : `/shop?cat=${c}`}
              className={`text-[10px] tracking-widest uppercase px-5 py-4 border-b-2 transition-colors whitespace-nowrap ${
                (c === 'All' && !cat) || c === cat
                  ? 'border-brand-black text-brand-black font-semibold'
                  : 'border-transparent text-brand-gray hover:text-brand-black'
              }`}
            >
              {c}
            </a>
          ))}
        </div>
      </div>

      {/* Product grid — syncUrl so filters update URL */}
      <ProductGrid syncUrl />
    </div>
  )
}
