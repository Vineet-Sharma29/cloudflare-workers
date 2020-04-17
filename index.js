addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function getVariants(urls) {

  let variant;
  variant = Math.random() < 0.5 ? 1 : 2;

  const page = await fetch(urls[variant - 1], { headers: { 'Content-Type': 'text/html' } })

  const response = new Response(page.body, {
    headers: { 'Content-Type': 'text/html' }
  })

  return response
}


async function handleRequest(request) {

  let url = 'https://cfw-takehome.developers.workers.dev/api/variants'
  const variants = await fetch(url, {
    headers: { 'Content-Type': 'text/json' },
  })
  const urls = await variants.json()

  return getVariants(urls.variants)
}

