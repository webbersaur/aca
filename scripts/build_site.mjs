// Static site generator for ACA Landscaping, LLC.
// Holds shared head/header/footer + per-page content, writes all HTML files to the project root.
// Run:  node scripts/build_site.mjs
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/* ---------- business constants ---------- */
const BIZ = {
  name: 'ACA Landscaping, LLC',
  domain: 'https://acalandscapingct.com',
  phoneDisplay: '(203) 996-5956',
  phoneTel: '2039965956',
  email: 'ACALandscapingCT@gmail.com',
  emailAlt: 'vincecacace@aol.com',
  street: '11 Business Park Drive',
  city: 'Branford',
  region: 'CT',
  zip: '06405',
  hours: 'Monday – Friday, 8:00 AM – 5:00 PM',
  facebook: 'https://www.facebook.com/acalandscapingct/',
  ppUrl: 'https://pavement-protectors.com/',
};
const YEAR = 2026;

/* ---------- shared chrome ---------- */
const FONTS = `  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">`;

// nav: [label, href, isExternal]
const NAV = [
  ['Home', 'index.html'],
  ['Services', 'services.html'],
  ['Commercial', 'commercial.html'],
  ['Mulch', 'retail-mulch.html'],
  ['Photos', 'photos.html'],
  ['About', 'about.html'],
  ['Sealcoating', BIZ.ppUrl, true],
  ['Contact', 'contact.html'],
];

function head({ title, description, canonical, extraHead = '' }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${description}">
  <title>${title}</title>
${FONTS}
  <link rel="canonical" href="${canonical}">
  <link rel="icon" type="image/png" href="/favicon.png">
  <meta name="theme-color" content="#16271C">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${BIZ.domain}/images/aca-natural-stonework.jpg">
  <link rel="stylesheet" href="css/styles.css">
${extraHead}</head>
<body>`;
}

function header(active) {
  const links = NAV.map(([label, href, ext]) => {
    const cls = !ext && href === active ? ' class="active"' : '';
    const tgt = ext ? ' target="_blank" rel="noopener"' : '';
    return `        <a href="${href}"${cls}${tgt}>${label}</a>`;
  }).join('\n');
  return `  <!-- Header -->
  <header class="site-header">
    <div class="header-inner">
      <a href="index.html" class="header-logo">
        <img src="images/aca-logo.png" alt="${BIZ.name} logo" class="logo-badge">
      </a>
      <nav class="nav-links">
${links}
        <span class="nav-cta">
          <a href="tel:${BIZ.phoneTel}" class="btn btn-primary">Call Now</a>
        </span>
      </nav>
      <button class="hamburger" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div class="nav-overlay"></div>
  </header>
`;
}

function pageHeader({ crumb, h1, sub, bg }) {
  const bgHtml = bg
    ? `    <div class="page-header-bg"><img src="images/${bg}" alt="" loading="eager"></div>\n`
    : '';
  return `  <!-- Page Header -->
  <section class="page-header">
${bgHtml}    <div class="container page-header-content">
      <nav class="breadcrumb">
        <a href="index.html">Home</a>
        <span>/</span>
        <span>${crumb}</span>
      </nav>
      <h1>${h1}</h1>
      <p>${sub}</p>
    </div>
  </section>
`;
}

function ctaBanner(heading = 'Ready to Transform Your Property?', text = 'Contact us today for a free, no-obligation estimate on your landscaping project.') {
  return `  <!-- CTA Section -->
  <section class="cta-banner">
    <div class="container cta-banner-content">
      <h2>${heading}</h2>
      <p>${text}</p>
      <div class="btn-group">
        <a href="contact.html" class="btn btn-secondary">Get Your Free Quote</a>
        <a href="tel:${BIZ.phoneTel}" class="btn btn-primary">Call ${BIZ.phoneDisplay}</a>
      </div>
    </div>
  </section>
`;
}

function footer() {
  return `  <!-- Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h4 class="footer-heading">${BIZ.name}</h4>
          <p>Commercial &amp; residential landscaping, hardscaping, maintenance, and snow management across the Connecticut shoreline since 1994.</p>
          <p>${BIZ.street}<br>${BIZ.city}, ${BIZ.region} ${BIZ.zip}</p>
        </div>
        <div>
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="commercial.html">Commercial</a></li>
            <li><a href="retail-mulch.html">Retail Mulch</a></li>
            <li><a href="photos.html">Photos</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="specials.html">Specials</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-heading">Our Services</h4>
          <ul class="footer-links">
            <li><a href="construction.html">Landscape Construction</a></li>
            <li><a href="maintenance.html">Lawn &amp; Property Maintenance</a></li>
            <li><a href="planting.html">Plantings</a></li>
            <li><a href="spring-fall-cleanup.html">Spring &amp; Fall Clean Up</a></li>
            <li><a href="snow-ice-management.html">Snow &amp; Ice Management</a></li>
            <li><a href="parking-lot-maintenance.html">Parking Lot Maintenance</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-heading">Contact Us</h4>
          <ul class="footer-contact">
            <li><a href="tel:${BIZ.phoneTel}">${BIZ.phoneDisplay}</a></li>
            <li><a href="mailto:${BIZ.email}">${BIZ.email}</a></li>
            <li>${BIZ.hours.replace(' – ', '<br>')}</li>
            <li><a href="${BIZ.facebook}" target="_blank" rel="noopener">Like us on Facebook</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; ${YEAR} ${BIZ.name}. All rights reserved.
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>`;
}

// alternating image/text service blocks
function serviceBlocks(blocks) {
  return blocks.map((b, i) => {
    const reverse = i % 2 === 1 ? ' reverse' : '';
    const shade = i % 2 === 0 ? 'section-dark' : 'section-darker';
    const list = b.list
      ? `\n          <ul>\n${b.list.map((li) => `            <li>${li}</li>`).join('\n')}\n          </ul>`
      : '';
    const paras = b.paras.map((p) => `          <p>${p}</p>`).join('\n');
    const cta = b.cta === false ? '' : `\n          <a href="contact.html" class="btn btn-primary">${b.cta || 'Get a Free Quote'}</a>`;
    return `  <section${b.id ? ` id="${b.id}"` : ''} class="section ${shade}">
    <div class="container">
      <div class="service-block${reverse} reveal">
        <div class="service-block-text">
          <h2>${b.h2}</h2>
          <div class="accent-line"></div>
${paras}${list}${cta}
        </div>
        <div class="service-block-image">
          <img src="images/${b.img}" alt="${b.alt}" loading="lazy">
        </div>
      </div>
    </div>
  </section>
`;
  }).join('\n');
}

function servicePage({ file, active = 'services.html', title, description, crumb, h1, sub, bg, blocks, cta }) {
  const html = head({ title, description, canonical: `${BIZ.domain}/${file}` })
    + header(active)
    + pageHeader({ crumb, h1, sub, bg })
    + serviceBlocks(blocks)
    + (cta || ctaBanner())
    + footer();
  writeFileSync(join(ROOT, file), html);
  return file;
}

/* ====================================================================== */
/* PAGES                                                                   */
/* ====================================================================== */
const written = [];

/* ---------- HOME ---------- */
{
  const schema = `  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    "@id": "${BIZ.domain}/#business",
    "name": "${BIZ.name}",
    "description": "Commercial and residential landscaping, hardscaping, lawn maintenance, plantings, retail mulch, and snow & ice management throughout the Connecticut shoreline since 1994.",
    "url": "${BIZ.domain}/",
    "telephone": "+1-203-996-5956",
    "email": "${BIZ.email}",
    "image": "${BIZ.domain}/images/aca-natural-stonework.jpg",
    "logo": "${BIZ.domain}/images/aca-logo.png",
    "priceRange": "$$",
    "foundingDate": "1994",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "${BIZ.street}",
      "addressLocality": "${BIZ.city}",
      "addressRegion": "${BIZ.region}",
      "postalCode": "${BIZ.zip}",
      "addressCountry": "US"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 41.2966, "longitude": -72.7925 },
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }],
    "areaServed": [
      "Branford CT", "New Haven CT", "East Haven CT", "Guilford CT", "North Branford CT",
      "Madison CT", "North Haven CT", "Hamden CT", "Wallingford CT", "Connecticut Shoreline"
    ],
    "sameAs": ["${BIZ.facebook}"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Landscaping Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Landscape Construction & Hardscaping" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Retaining Walls" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brick Paver Patios & Walkways" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Lawn & Property Maintenance" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Plantings & Landscape Design" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Spring & Fall Clean Up" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Landscaping" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Snow & Ice Management" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Retail Mulch, Stone & Topsoil" } }
      ]
    }
  }
  </script>
`;
  const html = head({
    title: 'ACA Landscaping, LLC | Landscaper Branford CT | Landscaping Company New Haven CT',
    description: 'ACA Landscaping, LLC — commercial & residential landscaping, hardscaping, lawn maintenance, plantings, mulch, and snow management in Branford & New Haven CT since 1994. Free estimates.',
    canonical: `${BIZ.domain}/`,
    extraHead: schema,
  })
  + header('index.html')
  + `  <!-- Hero -->
  <section class="hero">
    <div class="hero-slideshow">
      <div class="hero-slide active">
        <img src="images/aca-landscaping-2.jpg" alt="Colorful landscaped flower garden in Connecticut" fetchpriority="high">
      </div>
      <div class="hero-slide">
        <img src="images/aca-natural-stonework.jpg" alt="Bluestone patio and natural stonework">
      </div>
      <div class="hero-slide">
        <img src="images/aca-brick-paver-patio.jpg" alt="Brick paver retaining wall and planting bed">
      </div>
    </div>
    <div class="container hero-content">
      <span class="hero-badge">Serving the Connecticut Shoreline Since 1994</span>
      <h1>Connecticut's Trusted Landscaping Company</h1>
      <p>ACA Landscaping delivers the absolute best in commercial &amp; residential landscaping — hardscaping, maintenance, plantings, and snow management — to businesses, universities, condos, and municipalities across Connecticut.</p>
      <div class="btn-group">
        <a href="contact.html" class="btn btn-primary">Get a Free Quote</a>
        <a href="services.html" class="btn btn-secondary">Our Services</a>
      </div>
    </div>
  </section>

  <!-- Welcome -->
  <section class="section section-dark">
    <div class="container">
      <div class="section-header reveal">
        <h2>Welcome to ACA Landscaping</h2>
        <div class="accent-line"></div>
        <p>Located in Branford, ACA Landscaping delivers services to commercial businesses, universities, condos, and municipalities across Connecticut — providing the absolute best in landscaping services each and every day.</p>
      </div>
      <div class="service-grid">
        <div class="service-card reveal" data-delay="100">
          <div class="service-card-img"><img src="images/aca-brick-paver-patio.jpg" alt="Retaining wall and brick paver construction" loading="lazy"></div>
          <div class="service-card-body">
            <h3>Landscape Construction</h3>
            <p>Retaining walls, brick paver patios, walkways, natural stonework, and drainage solutions built to last for decades.</p>
            <a href="construction.html" class="service-card-link">Learn More &rarr;</a>
          </div>
        </div>
        <div class="service-card reveal" data-delay="200">
          <div class="service-card-img"><img src="images/aca-yale-sod-installation.jpg" alt="Lawn and property maintenance" loading="lazy"></div>
          <div class="service-card-body">
            <h3>Lawn &amp; Property Maintenance</h3>
            <p>Top-notch, environmentally friendly lawn care plus tree and shrub programs — backed by a satisfaction guarantee.</p>
            <a href="maintenance.html" class="service-card-link">Learn More &rarr;</a>
          </div>
        </div>
        <div class="service-card reveal" data-delay="300">
          <div class="service-card-img"><img src="images/aca-landscaping-5.jpg" alt="Plantings and landscape design" loading="lazy"></div>
          <div class="service-card-body">
            <h3>Plantings &amp; Design</h3>
            <p>High-quality, affordable plantings designed around your style — from formal beds to flowing flowers and shade trees.</p>
            <a href="planting.html" class="service-card-link">Learn More &rarr;</a>
          </div>
        </div>
        <div class="service-card reveal" data-delay="100">
          <div class="service-card-img"><img src="images/aca-commercial-parking-lot.jpg" alt="Commercial landscaping and snow management" loading="lazy"></div>
          <div class="service-card-body">
            <h3>Commercial Services</h3>
            <p>All-inclusive commercial maintenance, parking-lot care, and 24/7 snow &amp; ice management for properties of all sizes.</p>
            <a href="commercial.html" class="service-card-link">Learn More &rarr;</a>
          </div>
        </div>
        <div class="service-card reveal" data-delay="200">
          <div class="service-card-img"><img src="images/aca-landscaping-4.jpg" alt="Spring and fall clean up" loading="lazy"></div>
          <div class="service-card-body">
            <h3>Spring &amp; Fall Clean Up</h3>
            <p>Seasonal clean ups that prepare your lawn, beds, and trees for the growing season and the Connecticut winter.</p>
            <a href="spring-fall-cleanup.html" class="service-card-link">Learn More &rarr;</a>
          </div>
        </div>
        <div class="service-card reveal" data-delay="300">
          <div class="service-card-img"><img src="images/aca-mulch-varieties.jpg" alt="Retail mulch, stone and topsoil" loading="lazy"></div>
          <div class="service-card-body">
            <h3>Retail Mulch &amp; Stone</h3>
            <p>Bulk mulch, stone, and topsoil for sale — commercial &amp; residential, with delivery available throughout the area.</p>
            <a href="retail-mulch.html" class="service-card-link">Learn More &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Why Choose Us -->
  <section class="section section-darker">
    <div class="container">
      <div class="section-header reveal">
        <h2>Why Choose ACA Landscaping?</h2>
        <div class="accent-line"></div>
        <p>There are many good landscape companies around. Here's why our customers stay with us.</p>
      </div>
      <div class="pillars-grid">
        <div class="pillar-card reveal" data-delay="100">
          <div class="pillar-icon">&#128222;</div>
          <h3>We Are Available</h3>
          <p>More often than not, contractors are hard to reach. Not us — you can reach us by phone (Vince's cell) as well as email.</p>
        </div>
        <div class="pillar-card reveal" data-delay="200">
          <div class="pillar-icon">&#9989;</div>
          <h3>We Are Consistent</h3>
          <p>We do what we say we will do. Customizable maintenance programs and sophisticated scheduling software keep us organized and on time.</p>
        </div>
        <div class="pillar-card reveal" data-delay="300">
          <div class="pillar-icon">&#127942;</div>
          <h3>Trusted Since 1994</h3>
          <p>Founded by Vincent Cacace, we've earned hundreds of satisfied customers — and have cared for Yale University's landscaping for over 15 years.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Service Areas -->
  <section class="section section-dark">
    <div class="container">
      <div class="section-header reveal">
        <h2>Service Areas</h2>
        <div class="accent-line"></div>
        <p>Proudly serving commercial &amp; residential clients throughout the Connecticut shoreline</p>
      </div>
      <ul class="areas-list reveal">
        <li>Branford</li>
        <li>New Haven</li>
        <li>East Haven</li>
        <li>Guilford</li>
        <li>North Branford</li>
        <li>Madison</li>
        <li>North Haven</li>
        <li>Hamden</li>
        <li>Wallingford</li>
        <li>Throughout Connecticut</li>
      </ul>
    </div>
  </section>

`
  + ctaBanner('Ready to Get Started?', 'Take a second to learn what ACA Landscaping can do for you or your business. Call or request your free estimate today.')
  + footer();
  writeFileSync(join(ROOT, 'index.html'), html);
  written.push('index.html');
}

/* ---------- SERVICES HUB ---------- */
{
  const cards = [
    ['Landscape Construction', 'construction.html', 'aca-brick-paver-patio.jpg', 'Retaining walls, brick paver patios &amp; walkways, natural stonework, and drainage systems engineered for Connecticut sites.'],
    ['Lawn &amp; Property Maintenance', 'maintenance.html', 'aca-yale-sod-installation.jpg', 'Environmentally friendly lawn care plus tree &amp; shrub health programs — backed by a satisfaction guarantee.'],
    ['Plantings &amp; Design', 'planting.html', 'aca-landscaping-5.jpg', 'Affordable, high-quality plantings designed around your style, from formal beds to flowing flowers and shade trees.'],
    ['Spring &amp; Fall Clean Up', 'spring-fall-cleanup.html', 'aca-landscaping-4.jpg', 'Seasonal clean ups that prepare your lawn, beds, and trees for the growing season and the winter ahead.'],
    ['Snow &amp; Ice Management', 'snow-ice-management.html', 'aca-commercial-parking-lot.jpg', '24/7 supervised commercial snow plowing, shoveling, and salting with guaranteed contract pricing.'],
    ['Parking Lot Maintenance', 'parking-lot-maintenance.html', 'aca-parking-lot-maintenance.jpg', 'Litter control, sweeping, and full parking-lot maintenance to keep commercial properties looking their best.'],
    ['Commercial Landscaping', 'commercial.html', 'aca-commercial-landscape-design.jpg', 'All-inclusive commercial contracts — mowing, trimming, pruning, irrigation, hydroseeding, and bed maintenance.'],
    ['Retail Mulch, Stone &amp; Topsoil', 'retail-mulch.html', 'aca-mulch-varieties.jpg', 'Bulk mulch, stone, and topsoil for sale — commercial &amp; residential, with delivery available.'],
  ].map(([t, href, img, p], i) => `        <div class="service-card reveal" data-delay="${(i % 3 + 1) * 100}">
          <div class="service-card-img"><img src="images/${img}" alt="${t.replace(/&amp;/g, '&')}" loading="lazy"></div>
          <div class="service-card-body">
            <h3>${t}</h3>
            <p>${p}</p>
            <a href="${href}" class="service-card-link">Learn More &rarr;</a>
          </div>
        </div>`).join('\n');
  const html = head({
    title: 'Landscaping Services in Branford & New Haven CT | ACA Landscaping, LLC',
    description: 'Full-service landscaping in Connecticut: construction & hardscaping, lawn maintenance, plantings, clean ups, snow & ice management, parking-lot maintenance, and retail mulch.',
    canonical: `${BIZ.domain}/services.html`,
  })
  + header('services.html')
  + pageHeader({ crumb: 'Services', h1: 'Our Landscaping Services', sub: 'Commercial &amp; residential landscaping for properties of every size across the Connecticut shoreline.', bg: 'aca-natural-stonework.jpg' })
  + `  <section class="section section-dark">
    <div class="container">
      <div class="section-header reveal">
        <h2>What We Do</h2>
        <div class="accent-line"></div>
        <p>From the first shovel of a retaining wall to the last leaf of a fall clean up, ACA Landscaping handles it all.</p>
      </div>
      <div class="service-grid">
${cards}
      </div>
    </div>
  </section>

`
  + ctaBanner()
  + footer();
  writeFileSync(join(ROOT, 'services.html'), html);
  written.push('services.html');
}

/* ---------- CONSTRUCTION ---------- */
written.push(servicePage({
  file: 'construction.html',
  title: 'Landscape Construction & Hardscaping in CT | Retaining Walls & Pavers | ACA Landscaping',
  description: 'Retaining walls, brick paver patios & walkways, natural stonework, and drainage solutions in Connecticut. 35+ years of hardscape installation experience. Free estimates.',
  crumb: 'Construction',
  h1: 'Landscape Construction & Hardscaping',
  sub: 'Retaining walls, brick pavers, natural stone, and drainage — planned and executed to last.',
  bg: 'aca-brick-paver-patio.jpg',
  blocks: [
    {
      id: 'retaining-walls', h2: 'Retaining Walls in Connecticut', img: 'aca-brick-paver-patio.jpg', alt: 'Block retaining wall with planting bed in Connecticut',
      paras: [
        'Working with a reputable retaining wall company in Connecticut is key for ensuring the longevity of your investment. It is necessary to determine what type of product will provide proper retention for the base and the wall itself. Materials available include limestone, boulder, timber, Rosetta and Redi-Rock, Unilock and Fendt Brick products.',
        'Understanding your site geology plays an integral part in this decision — it also helps determine whether a drainage system will be required, as that can severely alter the design plan. With over 20 years of experience installing retaining walls in Connecticut, our staff will give you an estimate after evaluating your property. A wall installed without proper investigation can become very dangerous if it fails to provide proper retention.',
      ],
    },
    {
      id: 'brick-pavers', h2: 'Brick Pavers, Patios & Walkways', img: 'aca-natural-stonework.jpg', alt: 'Bluestone patio and brick paver walkway',
      paras: [
        "It's important to find an experienced brick paver with a great reputation in Connecticut. Brick pavers can create a completely new feel for your home, reinvigorating the outdoors and creating a living space you can enjoy with friends and family for years to come. A patio is an extension of your house, so careful consideration should be taken when selecting a company for your project.",
        'We have been installing brick paver and natural stone patios for over 35 years, with a proven track record for excellent designs, quality workmanship, and professionalism. We give every client the opportunity to contribute during the design process — whether you are looking for a patio, walkway, or new driveway, we develop a cost-effective plan that exceeds your expectations.',
      ],
    },
    {
      id: 'drainage', h2: 'Connecticut Drainage Solutions', img: 'aca-bluestone-sidewalk.jpg', alt: 'Bluestone sidewalk with proper grading and drainage',
      paras: [
        'At ACA Landscaping, LLC our approach is simple: water flows downhill. We create a path of least resistance to control or move water away from its undesired location. Since surface runoff is the most common drainage problem, adjusting the grade is typically the primary recommended solution.',
        'Ensuring a positive pitch away from the home is very important. To control pooling lawn areas, an efficient swale may be required to direct water off the property — preventing pooling (a breeding ground for mosquitoes) and making your yard more enjoyable. A drain tile system or catch basin (yard drain) is an excellent supplement to proper grading: a 4" perforated drain tile backfilled with limestone chips will absorb seepage under the center of a swale.',
      ],
    },
  ],
}));

/* ---------- MAINTENANCE ---------- */
written.push(servicePage({
  file: 'maintenance.html',
  title: 'Lawn Maintenance & Tree/Shrub Care in New Haven CT | ACA Landscaping, LLC',
  description: 'Top-notch, environmentally friendly lawn maintenance plus tree and shrub care programs in the New Haven CT area — backed by a satisfaction guarantee. Free lawn evaluations.',
  crumb: 'Maintenance',
  h1: 'Lawn & Property Maintenance',
  sub: 'Environmentally friendly lawn care and tree & shrub programs, backed by a satisfaction guarantee.',
  bg: 'aca-yale-sod-installation.jpg',
  blocks: [
    {
      h2: 'Lawn Maintenance in the New Haven CT Area', img: 'aca-yale-sod-installation.jpg', alt: 'Healthy maintained lawn and sod installation',
      paras: [
        "If you're looking for New Haven CT area lawn maintenance service, look no further than ACA Landscaping, LLC. We provide our clients with top-notch lawn care support, and we pride ourselves on being environmentally friendly. If you're in the New Haven CT area and ready to take charge of your yard, we'd love to work with you.",
      ],
    },
    {
      h2: 'Backed by a Satisfaction Guarantee', img: 'aca-landscaping-3.jpg', alt: 'Lush green maintained landscape',
      paras: [
        "You deserve to know that you're going to get excellent results, and we're proud to make sure that happens. We start with a completely free lawn care evaluation at your home. Once we've determined your yard's current condition, we recommend a course of action for improving its vitality and purity — and if you decide to hire us, we think you'll be amazed at the final outcome.",
      ],
    },
    {
      h2: 'Tree & Shrub Care', img: 'aca-landscape-installation.jpg', alt: 'Tree and shrub care and plantings',
      paras: [
        'ACA Landscaping has a program designed to protect trees (less than 25 feet in height) and foundation plantings around the home. From evergreens to ornamentals, fertilization helps plants — especially young plants — grow at optimum rates. Healthy trees and plants are also more naturally resistant to insects and disease, and foliage is not always a reliable sign of plant health, so continual attention matters.',
      ],
      list: [
        'Inspection &amp; general health evaluation of trees, plants and shrubs',
        'Disease treatments',
        'Foliar &amp; deep root fertilization',
        'Targeted insect control treatments',
        'Bed weed control',
        'Winter protection',
      ],
    },
  ],
}));

/* ---------- PLANTING ---------- */
written.push(servicePage({
  file: 'planting.html',
  title: 'Plantings & Landscape Design in Connecticut | ACA Landscaping, LLC',
  description: 'High-quality, affordable plantings throughout Connecticut — perennials, evergreens, shade and flowering trees, ornamental grasses, and seasonal color designed around your style.',
  crumb: 'Planting',
  h1: 'Plantings & Landscape Design',
  sub: 'Curb appeal that reflects your style — designed and installed by an experienced grower and designer.',
  bg: 'aca-landscaping-2.jpg',
  blocks: [
    {
      h2: 'Plantings', img: 'aca-landscaping-2.jpg', alt: 'Colorful planting beds and flower garden',
      paras: [
        'What do you dream of when you look at the outside of your home? Given that most people will only see your home from the outside, how you present your outdoor areas is nearly as important as what you do inside. Planting trees, shrubs, and flowers is a perfect way to enhance the "curb appeal" of your home by adding color and style.',
        'ACA Landscaping provides high-quality, affordable planting services throughout Connecticut. We work with you to create plantings that are unique and creative, and which reflect your personal tastes and wishes.',
      ],
    },
    {
      h2: 'Plantings That Fit Your Style', img: 'aca-landscaping-5.jpg', alt: 'Designed landscape plantings',
      paras: [
        'Does a formal look with sculpted plantings represent your style — or does a landscape bursting with flowers and a little country charm better represent who you are? Regardless of your vision, when you hire ACA Landscaping you work directly with the owner and his 20+ years of experience as a grower and landscape designer to create the look you have always dreamed of. Whatever you are looking for, we can plant it:',
      ],
      list: [
        'Stunning perennial flowers',
        'Exotic-looking evergreens',
        'Towering shade trees',
        'Beautiful flowering trees',
        'Flowing ornamental grasses',
        'An assortment of colorful bushes',
        'A variety of seasonal plantings',
      ],
      cta: 'Plan Your Plantings',
    },
  ],
}));

/* ---------- SPRING & FALL CLEAN UP ---------- */
written.push(servicePage({
  file: 'spring-fall-cleanup.html',
  title: 'Spring & Fall Clean Up in Greater New Haven CT | ACA Landscaping, LLC',
  description: 'Professional spring and fall clean up in the greater New Haven CT area — debris removal, bed prep, lawn repair, leaf removal, trimming, and winter preparation.',
  crumb: 'Spring & Fall Clean Up',
  h1: 'Spring & Fall Clean Up',
  sub: 'Seasonal clean ups that prepare your lawn, beds, and trees for summer fun and the winter ahead.',
  bg: 'aca-landscaping-4.jpg',
  blocks: [
    {
      h2: 'Spring Clean Up', img: 'aca-landscaping-4.jpg', alt: 'Spring clean up of lawn and beds',
      paras: [
        "Springtime in the greater New Haven area brings greatly anticipated warmer, longer days. Spring clean up isn't just for the inside of our homes — it's the perfect time to prepare your landscaping for outdoor summer fun. Our spring clean up removes the yard debris buried by winter's snow and prepares your yard for new flowers and a lawn green with grass, not weeds.",
        'You never know what you will find once the snow has melted — leaves, limbs, and lost mail are typical finds. To prepare your lawn for the growing season, these items are removed and the lawn is gently raked. Damage caused by road salt and plowing is not uncommon; we seed and prep damaged areas rather than leaving them to become a future mud puddle.',
      ],
    },
    {
      h2: 'Plant Beds & Trees', img: 'aca-bluestone-patio.jpg', alt: 'Cleaned and mulched planting beds',
      paras: [
        'Dead annuals are removed making room for new plants, and soil around the remaining plants is loosened to promote growth. Any remaining leaves and limbs are removed from the plant beds, and dead or broken limbs are removed from shrubs and trees.',
        'Spring is also the time to prepare your landscape for weed control and remove early-season weeds, trim bushes, and — depending on the time of spring — plant flowers.',
      ],
    },
    {
      h2: 'Fall Clean Up', img: 'aca-landscape-gallery-1.jpg', alt: 'Fall clean up and leaf removal',
      paras: [
        "When fall arrives in Connecticut, it's time to prepare our yards for the coming winter. Fall clean up includes removing leaves from plant beds, removing dead or fallen limbs, trimming back bushes, and preparing lawns and gardens. Lawns require the most care during fall: leaves and fallen limbs need removing, along with a final mowing cut to the appropriate length and any late-fall fertilizer applications.",
        'Last on the list are your planting beds and gardens. It is best to remove annual flowers and especially vegetable plants — tomato and potato plants left to rot can transmit fungal disease into your soil and affect next year\'s crops. Once removed, it is a good time to till and add fertilizers or organics, then top the beds off with a layer of mulch.',
      ],
      cta: 'Schedule a Clean Up',
    },
  ],
}));

/* ---------- SNOW & ICE ---------- */
written.push(servicePage({
  file: 'snow-ice-management.html',
  title: 'Commercial Snow & Ice Management in Connecticut | ACA Landscaping, LLC',
  description: '24/7 supervised commercial snow and ice management in Connecticut — plowing, shoveling, snow removal, and salting for hospitals, grocery stores, shopping centers, and health-care facilities.',
  crumb: 'Snow & Ice Management',
  h1: 'Snow & Ice Management',
  sub: 'Around-the-clock commercial snow plowing, shoveling, and salting with guaranteed contract pricing.',
  bg: 'aca-commercial-parking-lot.jpg',
  blocks: [
    {
      h2: 'Snow & Ice Management', img: 'aca-commercial-parking-lot.jpg', alt: 'Commercial parking lot serviced for snow and ice',
      paras: [
        'ACA Landscaping, LLC specializes in large commercial (high-maintenance) accounts and is staffed with around-the-clock supervisors. Many commercial accounts require extensive service seven days a week — and this is where we shine. Our supervisors are on call 24/7, which allows for quick response times.',
        'We currently service hospitals, grocery stores, shopping centers, and health-care facilities. Our staff will plow your parking lots, shovel walks, and remove snow and salt as necessary to keep you safe from slip-and-fall liability.',
      ],
      list: [
        '24/7 on-call supervision and rapid response',
        'Plowing, shoveling, snow removal &amp; salting',
        'Numerous salt storage facilities — secured supply even during salt shortages',
        'Contract prices guaranteed for one, two, or three-year terms',
        'No salt or fuel escalators',
      ],
      cta: 'Request a Snow Contract',
    },
  ],
}));

/* ---------- PARKING LOT / LITTER CONTROL ---------- */
written.push(servicePage({
  file: 'parking-lot-maintenance.html',
  title: 'Litter Control & Parking Lot Maintenance in CT | ACA Landscaping, LLC',
  description: 'Commercial parking-lot maintenance and litter control in Connecticut — sweeping, debris and trash removal, and grounds care that keep your property looking its best year-round.',
  crumb: 'Parking Lot Maintenance',
  h1: 'Litter Control & Parking Lot Maintenance',
  sub: 'Keep your commercial property clean, safe, and presentable all year long.',
  bg: 'aca-parking-lot-maintenance.jpg',
  blocks: [
    {
      h2: 'Litter Control & Parking Lot Maintenance', img: 'aca-parking-lot-maintenance.jpg', alt: 'Maintained commercial parking lot',
      paras: [
        "A clean parking lot and grounds are the first thing your customers and employees notice. ACA Landscaping provides full litter control and parking-lot maintenance for commercial properties across Connecticut — keeping your site presentable, safe, and welcoming.",
        'As part of our all-inclusive commercial contracts, our crews handle litter and debris removal, lot sweeping, and the surrounding grounds so you can hand the entire property to one experienced contractor.',
      ],
      list: [
        'Routine litter &amp; trash removal',
        'Parking-lot sweeping and debris clearing',
        'Islands, curb lines &amp; grounds maintenance',
        'Scheduled service tailored to your property',
      ],
      cta: 'Get a Maintenance Quote',
    },
    {
      h2: 'One Contractor for the Whole Property', img: 'aca-commercial-grounds.jpg', alt: 'Commercial grounds and bike rack area maintained by ACA Landscaping',
      paras: [
        'Pairing parking-lot maintenance with our commercial landscaping and snow & ice services means a single, accountable team for your entire site — summer through winter. Our all-inclusive contract takes the guesswork out of budget planning and keeps you from having to hire multiple contractors.',
      ],
    },
  ],
}));

/* ---------- COMMERCIAL ---------- */
written.push(servicePage({
  file: 'commercial.html',
  active: 'commercial.html',
  title: 'Commercial Landscaping Contractor in Connecticut | ACA Landscaping, LLC',
  description: 'Top-rated commercial landscaping contractor serving Connecticut for over 20 years — mowing, trimming, pruning, bed maintenance, hydroseeding, irrigation, and snow & ice management.',
  crumb: 'Commercial',
  h1: 'Commercial Landscaping',
  sub: 'All-inclusive commercial grounds management for properties of all sizes — landscaping, lawn, and snow.',
  bg: 'aca-commercial-landscape-design.jpg',
  blocks: [
    {
      h2: 'Top-Rated Commercial Landscaping Contractor', img: 'aca-commercial-landscape-design.jpg', alt: 'Commercial landscape design project',
      paras: [
        'Our company and crews are large enough to get your commercial landscaping project completed in a timely manner. We operate large hydroseeders that seed areas quickly and professionally, and our experienced irrigation crews keep us fully equipped to get the job done efficiently — a Connecticut landscaper for over 20 years.',
        'Maintaining commercial properties in Connecticut can be a constant battle. Let our trained staff maintain yours so it always looks its best. Our support team handles properties of all sizes, and our all-inclusive contract takes the guesswork out of budget planning — keeping you from having to hire multiple contractors. We maintain mowing, trimming, pruning, and bed maintenance as if it were our own.',
      ],
    },
    {
      h2: 'Commercial Lawn & Snow', img: 'aca-commercial-parking-lot.jpg', alt: 'Commercial parking lot and grounds',
      paras: [
        'We will work with you to customize a lawn, snow, or ice-management program that meets your needs and budget. Our large team of commercial landscaping professionals offers peace of mind knowing they are experienced in their field. During the summer the grass is freshly mowed; during the winter the lot and walkways are cleaned and treated to ensure the safety of your customers and employees.',
        'Contact us today for more information about commercial landscaping, lawn care, or ice and snow removal for your Connecticut business.',
      ],
      cta: 'Request a Commercial Quote',
    },
  ],
}));

/* ---------- RETAIL MULCH ---------- */
written.push(servicePage({
  file: 'retail-mulch.html',
  active: 'retail-mulch.html',
  title: 'Retail Mulch, Stone & Topsoil for Sale in CT | ACA Landscaping, LLC',
  description: 'Bulk mulch, stone, and topsoil for sale in Connecticut — commercial & residential. Multiple mulch varieties with delivery available. Call (203) 996-5956.',
  crumb: 'Retail Mulch',
  h1: 'Retail Mulch, Stone & Topsoil',
  sub: 'Bulk mulch, stone, and topsoil for sale — commercial & residential, with delivery available.',
  bg: 'aca-mulch-varieties.jpg',
  blocks: [
    {
      h2: 'Mulch, Stone & Topsoil for Sale', img: 'aca-mulch-varieties.jpg', alt: 'Four varieties of bulk mulch',
      paras: [
        'ACA Landscaping sells bulk mulch, stone, and topsoil for both commercial and residential customers — and delivery is available throughout the area. Choose from several mulch varieties to give your beds a fresh, finished look while protecting soil moisture and suppressing weeds.',
        'Need it delivered or installed? Our crews can drop your material where you need it or spread it as part of a clean up or planting project. Call us at ' + BIZ.phoneDisplay + ' for current pricing and availability.',
      ],
      list: [
        'Multiple mulch colors &amp; varieties',
        'Decorative and project stone',
        'Quality screened topsoil',
        'Delivery available — commercial &amp; residential',
      ],
      cta: 'Call for Pricing',
    },
    {
      h2: 'Delivery Available', img: 'aca-mulch-delivery.jpg', alt: 'Loader filling a truck with bulk mulch for delivery',
      paras: [
        'From a few yards for a weekend project to large commercial orders, we load and deliver promptly. Ask about adding installation so your mulch, stone, or topsoil arrives ready and spread.',
      ],
      cta: false,
    },
  ],
}));

/* ---------- ABOUT ---------- */
{
  const html = head({
    title: 'About ACA Landscaping, LLC | Landscaper in Branford CT Since 1994',
    description: 'ACA Landscaping, LLC was founded in 1994 by Vincent Cacace in Branford, CT. Hundreds of satisfied customers and 15+ years caring for Yale University\'s landscaping.',
    canonical: `${BIZ.domain}/about.html`,
  })
  + header('about.html')
  + pageHeader({ crumb: 'About Us', h1: 'About ACA Landscaping', sub: 'Quality service, consistency, and availability — in Connecticut since 1994.', bg: 'aca-yale-university-landscaping.jpg' })
  + `  <section class="section section-dark">
    <div class="container">
      <div class="two-col reveal">
        <div class="two-col-text">
          <h2>Our Story</h2>
          <div class="accent-line"></div>
          <p>From the beginning in 1994, president and founder Vincent Cacace of ACA Landscaping, LLC has sought to provide an extremely high quality of service to his customers. As the business has grown, each employee has been trained to uphold the same standard of quality service. This consistent dedication to hard-working principles is why we continue to bring quality to every job we do.</p>
          <p>During 1997 a new facility was secured right off Exit 56 ~ I-95. This building allows easy freeway access and is specifically designed to expedite our landscape operations — which it does very nicely. If you have not enjoyed our service yet, we hope you'll soon join the ranks of these hundreds of satisfied people.</p>
          <p><strong>We are proud to say that ACA Landscaping, LLC has been taking care of Yale University's landscaping needs for over 15 years.</strong></p>
        </div>
        <div class="two-col-image">
          <img src="images/aca-yale-university-landscaping.jpg" alt="Yale University grounds maintained by ACA Landscaping" loading="lazy">
        </div>
      </div>
    </div>
  </section>

  <section class="section section-darker">
    <div class="container">
      <div class="section-header reveal">
        <h2>Why Should You Hire Us?</h2>
        <div class="accent-line"></div>
        <p>There are many good landscape companies around. Here's what sets us apart.</p>
      </div>
      <div class="pillars-grid">
        <div class="pillar-card reveal" data-delay="100">
          <div class="pillar-icon">&#128222;</div>
          <h3>We Are Available</h3>
          <p>If you've worked with contractors much, you know they're often hard to get a hold of. Not so with us — you can reach us by phone (Vince's cell) as well as email.</p>
        </div>
        <div class="pillar-card reveal" data-delay="200">
          <div class="pillar-icon">&#9989;</div>
          <h3>We Are Consistent</h3>
          <p>We do what we say we will do. Finding people who follow through consistently isn't easy these days — but it's the standard we hold ourselves to on every job.</p>
        </div>
        <div class="pillar-card reveal" data-delay="300">
          <div class="pillar-icon">&#9881;</div>
          <h3>Programs Built Around You</h3>
          <p>Most maintenance is offered "one size fits all." We offer numerous customizable programs and use sophisticated scheduling software so we stay organized and do what we promise.</p>
        </div>
      </div>
    </div>
  </section>

`
  + ctaBanner('Join Our Satisfied Customers', 'Experience the availability and consistency that has kept ACA Landscaping growing since 1994.')
  + footer();
  writeFileSync(join(ROOT, 'about.html'), html);
  written.push('about.html');
}

/* ---------- PHOTOS ---------- */
{
  const gallery = [
    ['aca-natural-stonework', 'Natural bluestone patio and stonework', 'Hardscaping', 'hardscaping'],
    ['aca-brick-paver-patio', 'Brick paver retaining wall and planting bed', 'Hardscaping', 'hardscaping'],
    ['aca-brick-paver-walkway', 'Brick paver walkway', 'Hardscaping', 'hardscaping'],
    ['aca-brick-paver-driveway', 'Brick paver driveway', 'Hardscaping', 'hardscaping'],
    ['aca-bluestone-patio', 'Bluestone patio installation', 'Hardscaping', 'hardscaping'],
    ['aca-bluestone-sidewalk', 'Bluestone sidewalk', 'Hardscaping', 'hardscaping'],
    ['aca-bluestone-sidewalk-2', 'Bluestone sidewalk detail', 'Hardscaping', 'hardscaping'],
    ['aca-bluestone-sidewalk-3', 'Bluestone walkway', 'Hardscaping', 'hardscaping'],
    ['aca-landscaping-2', 'Colorful flower garden and plantings', 'Plantings', 'plantings'],
    ['aca-landscaping-3', 'Lush maintained landscape', 'Plantings', 'plantings'],
    ['aca-landscaping-4', 'Landscaped grounds', 'Plantings', 'plantings'],
    ['aca-landscaping-5', 'Designed landscape plantings', 'Plantings', 'plantings'],
    ['aca-landscaping-6', 'Property landscaping', 'Plantings', 'plantings'],
    ['aca-landscaping-1', 'Residential landscaping', 'Plantings', 'plantings'],
    ['aca-landscape-gallery-1', 'Landscape project', 'Plantings', 'plantings'],
    ['aca-landscape-gallery-2', 'Landscape project', 'Plantings', 'plantings'],
    ['aca-landscape-gallery-3', 'Landscape project', 'Plantings', 'plantings'],
    ['aca-yale-university-landscaping', "Yale University grounds", 'Commercial', 'commercial'],
    ['aca-yale-sod-installation', 'Yale sod installation', 'Commercial', 'commercial'],
    ['aca-landscape-installation', 'Large lawn installation', 'Commercial', 'commercial'],
    ['aca-commercial-parking-lot', 'Commercial parking lot grounds', 'Commercial', 'commercial'],
    ['aca-commercial-parking-lot-2', 'Commercial parking lot landscaping', 'Commercial', 'commercial'],
    ['aca-commercial-parking-lot-3', 'Commercial lot maintenance', 'Commercial', 'commercial'],
    ['aca-commercial-landscape-design', 'Commercial landscape design', 'Commercial', 'commercial'],
    ['aca-commercial-landscape-design-2', 'Commercial landscape installation', 'Commercial', 'commercial'],
    ['aca-branford-police-station', 'Branford Police Station grounds', 'Commercial', 'commercial'],
    ['aca-branford-town-green', 'Branford Town Green landscaping', 'Commercial', 'commercial'],
    ['aca-branford-point-landscaping', 'Branford Point landscaping', 'Commercial', 'commercial'],
    ['aca-commercial-grounds', 'Commercial grounds and bike rack area', 'Commercial', 'commercial'],
    ['aca-parking-lot-maintenance', 'Parking lot maintenance', 'Commercial', 'commercial'],
    ['aca-landscape-renovation-before', 'Landscape renovation — before', 'Plantings', 'plantings'],
    ['aca-landscape-renovation-after', 'Landscape renovation — after', 'Plantings', 'plantings'],
    ['aca-mulch-varieties', 'Four varieties of bulk mulch', 'Mulch', 'mulch'],
    ['aca-bulk-mulch', 'Bulk mulch pile', 'Mulch', 'mulch'],
    ['aca-mulch-delivery', 'Loading mulch for delivery', 'Mulch', 'mulch'],
    ['aca-mulch-delivery-2', 'Mulch delivery loading', 'Mulch', 'mulch'],
    ['aca-mulch-loading', 'Loader loading mulch', 'Mulch', 'mulch'],
  ].map(([img, alt, label, cat]) => `        <div class="gallery-item" data-category="${cat}">
          <img src="images/${img}.jpg" alt="${alt}" loading="lazy">
          <div class="gallery-item-caption">
            <h4>${label}</h4>
            <p>${alt}</p>
          </div>
        </div>`).join('\n');
  const html = head({
    title: 'Photo Gallery | ACA Landscaping, LLC — Branford & New Haven CT',
    description: 'Browse completed ACA Landscaping projects across Connecticut — hardscaping, plantings, commercial grounds, and retail mulch.',
    canonical: `${BIZ.domain}/photos.html`,
  })
  + header('photos.html')
  + pageHeader({ crumb: 'Photos', h1: 'Project Gallery', sub: 'A look at our hardscaping, plantings, commercial grounds, and mulch work across Connecticut.', bg: 'aca-brick-paver-walkway.jpg' })
  + `  <section class="section section-dark">
    <div class="container">
      <div class="gallery-filters">
        <button class="filter-btn active" data-category="all">All Projects</button>
        <button class="filter-btn" data-category="hardscaping">Hardscaping</button>
        <button class="filter-btn" data-category="plantings">Plantings</button>
        <button class="filter-btn" data-category="commercial">Commercial</button>
        <button class="filter-btn" data-category="mulch">Mulch</button>
      </div>
      <div class="gallery-grid">
${gallery}
      </div>
    </div>
  </section>

  <!-- Lightbox -->
  <div class="lightbox">
    <button class="lightbox-close">&times;</button>
    <button class="lightbox-prev">&#8249;</button>
    <button class="lightbox-next">&#8250;</button>
    <div class="lightbox-content">
      <img src="" alt="Full size image">
    </div>
    <div class="lightbox-caption"></div>
  </div>

`
  + ctaBanner('Like What You See?', 'Let ACA Landscaping bring the same quality to your property. Request a free estimate today.')
  + footer();
  writeFileSync(join(ROOT, 'photos.html'), html);
  written.push('photos.html');
}

/* ---------- SPECIALS ---------- */
{
  const html = head({
    title: 'Specials & Offers | ACA Landscaping, LLC — Branford CT',
    description: 'Current specials from ACA Landscaping — like us on Facebook for $25 off, and call about seasonal landscaping and maintenance offers in the New Haven CT area.',
    canonical: `${BIZ.domain}/specials.html`,
  })
  + header('specials.html')
  + pageHeader({ crumb: 'Specials', h1: 'Specials & Offers', sub: 'Save on your next landscaping or maintenance project.', bg: 'aca-landscaping-2.jpg' })
  + `  <section class="section section-dark">
    <div class="container">
      <div class="section-header reveal">
        <h2>Current Specials</h2>
        <div class="accent-line"></div>
        <p>Connect with us and call for the latest seasonal offers.</p>
      </div>
      <div class="service-grid">
        <div class="promo-card reveal" data-delay="100">
          <h3>$25 Off</h3>
          <p class="price">Like Us on Facebook</p>
          <p>Follow ACA Landscaping on Facebook and receive $25 off your service. A quick way to save and to keep up with our latest projects.</p>
          <a href="${BIZ.facebook}" target="_blank" rel="noopener" class="btn btn-primary">Visit Our Facebook</a>
        </div>
        <div class="promo-card reveal" data-delay="200">
          <h3>New Customer Offer</h3>
          <p class="price">Free First Cut</p>
          <p>Ask about a free first cut when you sign up as a weekly lawn-maintenance customer. Call for current details and eligibility.</p>
          <a href="tel:${BIZ.phoneTel}" class="btn btn-primary">Call ${BIZ.phoneDisplay}</a>
        </div>
        <div class="promo-card reveal" data-delay="300">
          <h3>Seasonal Specials</h3>
          <p class="price">Spring &amp; Fall</p>
          <p>From spring clean ups to fall preparation and mulch delivery, ask about seasonal pricing on the services your property needs most.</p>
          <a href="contact.html" class="btn btn-primary">Request a Quote</a>
        </div>
      </div>
    </div>
  </section>

`
  + ctaBanner()
  + footer();
  writeFileSync(join(ROOT, 'specials.html'), html);
  written.push('specials.html');
}

/* ---------- CONTACT ---------- */
{
  const html = head({
    title: 'Contact ACA Landscaping, LLC | Branford CT Landscaper | (203) 996-5956',
    description: 'Contact ACA Landscaping, LLC in Branford, CT for a free landscaping estimate. Call (203) 996-5956, email ACALandscapingCT@gmail.com, or request a quote online.',
    canonical: `${BIZ.domain}/contact.html`,
  })
  + header('contact.html')
  + pageHeader({ crumb: 'Contact', h1: 'Contact Us', sub: 'Get in touch for a free, no-obligation estimate on your landscaping project.', bg: 'aca-commercial-landscape-design.jpg' })
  + `  <section class="section section-dark">
    <div class="container">
      <div class="contact-grid">
        <div class="contact-form">
          <h2>Let's Talk About Your Project</h2>
          <p>Ready for a free, no-obligation estimate? The fastest way to reach us is by phone or email — you'll talk to a real person who can help with your landscaping, hardscaping, maintenance, or snow needs.</p>
          <div class="btn-group" style="margin:1.5rem 0;">
            <a href="tel:${BIZ.phoneTel}" class="btn btn-primary">Call ${BIZ.phoneDisplay}</a>
            <a href="mailto:${BIZ.email}" class="btn btn-secondary">Email Us</a>
          </div>
          <p>Prefer Facebook? <a href="${BIZ.facebook}" target="_blank" rel="noopener">Message us on Facebook</a> — and follow us for $25 off your service.</p>
          <p style="margin-top:1.5rem;color:var(--text-muted);">We're available by phone (Vince's cell) and email, Monday–Friday, 8:00 AM – 5:00 PM.</p>
        </div>

        <div class="contact-info">
          <h3>Get In Touch</h3>
          <div class="contact-info-item">
            <div>
              <strong>Phone</strong>
              <a href="tel:${BIZ.phoneTel}">${BIZ.phoneDisplay}</a>
            </div>
          </div>
          <div class="contact-info-item">
            <div>
              <strong>Email</strong>
              <a href="mailto:${BIZ.email}">${BIZ.email}</a>
            </div>
          </div>
          <div class="contact-info-item">
            <div>
              <strong>Address</strong>
              ${BIZ.street}<br>${BIZ.city}, ${BIZ.region} ${BIZ.zip}
            </div>
          </div>
          <div class="contact-info-item">
            <div>
              <strong>Business Hours</strong>
              ${BIZ.hours}
            </div>
          </div>
          <div class="contact-info-item">
            <div>
              <strong>Service Areas</strong>
              Branford, New Haven, East Haven, Guilford, North Branford, Madison, and surrounding Connecticut communities
            </div>
          </div>
          <div class="contact-info-extra">
            <h4>Why Contact Us?</h4>
            <ul>
              <li>Free, no-obligation estimates</li>
              <li>Available by phone and email</li>
              <li>Trusted in Connecticut since 1994</li>
              <li>Commercial &amp; residential</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Map / Location -->
  <section class="section section-darker">
    <div class="container">
      <div class="section-header reveal">
        <h2>Our Location</h2>
        <div class="accent-line"></div>
        <p>Located off Exit 56 ~ I-95 at ${BIZ.street}, ${BIZ.city}, ${BIZ.region} ${BIZ.zip}</p>
      </div>
      <div class="map-container reveal">
        <iframe
          src="https://www.google.com/maps?q=${encodeURIComponent(BIZ.street + ', ' + BIZ.city + ', ' + BIZ.region + ' ' + BIZ.zip)}&output=embed"
          width="100%"
          height="400"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="ACA Landscaping location map">
        </iframe>
      </div>
    </div>
  </section>

`
  + footer();
  writeFileSync(join(ROOT, 'contact.html'), html);
  written.push('contact.html');
}

/* ---------- 404 ---------- */
{
  const html = head({
    title: 'Page Not Found | ACA Landscaping, LLC',
    description: 'The page you were looking for could not be found.',
    canonical: `${BIZ.domain}/404.html`,
  })
  + header('')
  + `  <section class="page-header">
    <div class="container page-header-content">
      <h1>Page Not Found</h1>
      <p>Sorry, the page you were looking for doesn't exist or has moved.</p>
    </div>
  </section>
  <section class="section section-dark">
    <div class="container" style="text-align:center">
      <p>Let's get you back on track:</p>
      <div class="btn-group" style="justify-content:center">
        <a href="index.html" class="btn btn-primary">Go Home</a>
        <a href="services.html" class="btn btn-secondary">Our Services</a>
        <a href="tel:${BIZ.phoneTel}" class="btn btn-secondary">Call ${BIZ.phoneDisplay}</a>
      </div>
    </div>
  </section>
`
  + footer();
  writeFileSync(join(ROOT, '404.html'), html);
  written.push('404.html');
}

console.log('Wrote ' + written.length + ' pages:\n  ' + written.join('\n  '));
