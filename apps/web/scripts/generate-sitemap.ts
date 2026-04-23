import fs from 'fs'
import path from 'path'

const baseUrl = 'https://olovaui.olova.net'
const appDir = path.join(process.cwd(), 'src', 'app')

interface SitemapUrl {
    loc: string
    lastmod: string
    changefreq: string
    priority: string
}

function scanDirectory(dir: string, basePath: string = ''): string[] {
    const routes: string[] = []

    if (!fs.existsSync(dir)) return routes

    const items = fs.readdirSync(dir, { withFileTypes: true })

    for (const item of items) {
        // Skip special Next.js folders and files
        if (item.name.startsWith('_') || item.name.startsWith('.') ||
            item.name === 'layout.tsx' || item.name === 'layout.ts' ||
            item.name === 'loading.tsx' || item.name === 'error.tsx' ||
            item.name === 'not-found.tsx' || item.name === 'globals.css' ||
            item.name === 'robots.ts' || item.name === 'sitemap.ts') {
            continue
        }

        const fullPath = path.join(dir, item.name)
        const routePath = basePath ? `${basePath}/${item.name}` : item.name

        if (item.isDirectory()) {
            // Skip route groups (folders in parentheses)
            if (item.name.startsWith('(') && item.name.endsWith(')')) {
                // Scan inside but don't add to route
                routes.push(...scanDirectory(fullPath, basePath))
            } else if (item.name.startsWith('[') && item.name.endsWith(']')) {
                // Dynamic routes - skip for now as we need actual data
                continue
            } else {
                // Check if directory has page file
                const hasPage = fs.readdirSync(fullPath).some(file =>
                    file === 'page.tsx' || file === 'page.ts' ||
                    file === 'page.jsx' || file === 'page.js' || file === 'page.mdx'
                )

                if (hasPage) {
                    routes.push(routePath)
                }

                // Recursively scan subdirectories
                routes.push(...scanDirectory(fullPath, routePath))
            }
        }
    }

    return routes
}

function generateSitemap() {
    console.warn('🗺️  Generating sitemap...\n')

    // Scan for actual routes
    const routes = scanDirectory(appDir)
    const currentDate = new Date().toISOString()

    const urls: SitemapUrl[] = []

    // Add homepage
    urls.push({
        loc: baseUrl,
        lastmod: currentDate,
        changefreq: 'daily',
        priority: '1.0'
    })

    // Add discovered routes
    for (const route of routes) {
        let priority = '0.8'
        let changefreq = 'weekly'

        // Adjust priority based on route
        if (route === 'docs') {
            priority = '0.9'
            changefreq = 'weekly'
        } else if (route.includes('installation')) {
            priority = '0.8'
            changefreq = 'monthly'
        } else if (route.includes('sponsor')) {
            priority = '0.7'
            changefreq = 'monthly'
        } else if (route.startsWith('standalone')) {
            priority = '0.6'
            changefreq = 'monthly'
        }

        urls.push({
            loc: `${baseUrl}/${route}`,
            lastmod: currentDate,
            changefreq,
            priority
        })
    }

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    // Write to public/sitemap.xml
    const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml')
    fs.writeFileSync(outputPath, xml, 'utf-8')

    console.warn(`✅ Sitemap generated with ${urls.length} URLs`)
    console.warn(`📍 Location: public/sitemap.xml\n`)

    // List all URLs
    console.warn('URLs included:')
    urls.forEach(url => console.warn(`  - ${url.loc}`))
}

generateSitemap()
