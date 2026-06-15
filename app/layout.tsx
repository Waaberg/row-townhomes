import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ROW Townhomes | Luxury Rentals in Loveland, CO – Starting at $2,795',
  description:
    'ROW Townhomes offers modern luxury rental townhomes in Loveland, CO starting at $2,795/mo. 3-bedroom floor plans with private yards, 2- & 3-car garages, quartz countertops, and community amenities. Located at Exposition Drive & Thompson Parkway.',
  keywords: [
    'luxury townhomes Loveland CO',
    'townhomes for rent Loveland Colorado',
    'new construction rentals Fort Collins',
    'Windsor CO townhomes',
    '3 bedroom townhome Loveland',
    'ROW townhomes',
    'Exposition Drive Loveland rentals',
    'modern rental townhomes Northern Colorado',
  ],
  metadataBase: new URL('https://www.row2534.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ROW Townhomes | Luxury Rentals in Loveland, CO',
    description:
      'Modern 3-bedroom luxury rental townhomes starting at $2,795/mo in Loveland, CO. Private yards, oversized garages, high-end finishes.',
    url: 'https://www.row2534.com',
    siteName: 'ROW Townhomes',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROW Townhomes | Luxury Rentals in Loveland, CO',
    description:
      'Modern 3-bedroom luxury rental townhomes starting at $2,795/mo in Loveland, CO.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data - LocalBusiness + ApartmentComplex */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ApartmentComplex',
              name: 'ROW Townhomes',
              url: 'https://www.row2534.com',
              description:
                'Luxury modern rental townhomes in Loveland, Colorado. 3-bedroom floor plans with private yards, 2- and 3-car garages, and high-end finishes.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '2534 Exposition Drive',
                addressLocality: 'Loveland',
                addressRegion: 'CO',
                postalCode: '80538',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 40.3978,
                longitude: -105.0583,
              },
              telephone: '',
              email: 'hello@row2534.com',
              numberOfAccommodationUnits: 32,
              petsAllowed: true,
              amenityFeature: [
                { '@type': 'LocationFeatureSpecification', name: 'Private Fenced Yard', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Attached Garage', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Quartz Countertops', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Tankless Water Heater', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Private Balcony', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Dog Park', value: true },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
