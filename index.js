addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

class handleTitle {
  element(e) {
    e.prepend("Hey There!!")
  }
}

class handleHeading {
  element(e) {
    e.prepend("This is ")
  }
}


class handleText {
  element(e) {
    e.setInnerContent("Stay Safe. Stay Home. Stay Strong. Everthing's gonna be alright !!")
  }
}

class handleURL {
  element(e) {
    e.setAttribute('href', 'https://sourcerer.io/vineet-sharma29')
    e.setInnerContent('View My Sourcerer Profile')
  }
}

const rewriter = new HTMLRewriter()
  .on('title', new handleTitle())
  .on('h1#title', new handleHeading())
  .on('p#description', new handleText())
  .on('a#url', new handleURL())


async function getVariants(urls, cookie) {

  let variant;

  variant = cookie ? cookie.includes(`variant=1`) ? 1 : 2 : Math.random() < 0.5 ? 1 : 2;

  const page = await fetch(urls[variant - 1], { headers: { 'Content-Type': 'text/html' } })

  const response = new Response(rewriter.transform(page).body, {
    headers: { 'Content-Type': 'text/html' }
  })

  response.headers.set('Set-Cookie', `variant=${variant}; Expires=Fri, 17 Jul 2020 00:00:00 GMT; Path='/';`)

  return response
}


async function handleRequest(request) {

  const cookie = request.headers.get('cookie')

  let url = 'https://cfw-takehome.developers.workers.dev/api/variants'
  const variants = await fetch(url, {
    headers: { 'Content-Type': 'text/json' },
  })
  const urls = await variants.json()

  return getVariants(urls.variants, cookie)
}

