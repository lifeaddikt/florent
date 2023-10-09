import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, u as unescapeHTML, g as renderHead, h as renderComponent, i as renderSlot } from './astro_161e0c43.mjs';
import 'clsx';
/* empty css                             *//* empty css                             */
const $$Astro$d = createAstro();
const $$Editor = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Editor;
  const { logo, name, description, label, link } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="col-lg-12 col-xl-6 py-4"><article class="flex flex-row p-4 p-lg-5"><img${addAttribute(logo, "src")} class="editor-logo"><div class="ms-5 small"><h5>${name}</h5><p>${description}</p><p><a${addAttribute(link, "href")} class="primary-color">${label}</a></p></div></article></div>`;
}, "/Users/florentverney/Sites/ninou/front/src/components/Editor.astro", void 0);

const $$Astro$c = createAstro();
const $$PostCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$PostCard;
  const post = Astro2.props.post;
  const excerpt = post.excerpt;
  function trimExcerpt(string) {
    if (string.length > 100) {
      return string = string.substring(0, 100) + "...";
    }
  }
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(!Astro2.props.cols ? "col-xl-3 col-lg-4 col-md-6 col-sm-12 py-5" : "col-lg-4 col-md-6 col-sm-12 py-5", "class")} data-astro-cid-iyiqi2so><article data-astro-cid-iyiqi2so><a class="post-link"${addAttribute(post.uri, "href")}${addAttribute(post.title, "aria-label")} data-astro-cid-iyiqi2so><section data-astro-cid-iyiqi2so><img${addAttribute(post?.featuredImage?.node?.mediaItemUrl, "src")}${addAttribute(post?.featuredImage?.node?.altText, "alt")}${addAttribute(post?.featuredImage?.node?.srcSet, "srcset")} loading="lazy"${addAttribute(post?.featuredImage?.node?.mediaDetails?.width, "width")}${addAttribute(post?.featuredImage?.node?.mediaDetails?.height, "height")} data-astro-cid-iyiqi2so><div class="p-4" data-astro-cid-iyiqi2so><h3 data-astro-cid-iyiqi2so>${post.title}</h3><div data-astro-cid-iyiqi2so><p class="post-excerpt" data-astro-cid-iyiqi2so>${unescapeHTML(trimExcerpt(excerpt))}</p>${post.livres ? renderTemplate`<span data-astro-cid-iyiqi2so><time${addAttribute(post.livres.livreDateDeSortie, "datetime")} data-astro-cid-iyiqi2so>
Parution : ${post.livres.livreDateDeSortie}</time></span>` : renderTemplate`<span data-astro-cid-iyiqi2so><time${addAttribute(post.date, "datetime")} data-astro-cid-iyiqi2so>${new Date(post.date).toLocaleDateString()}</time></span>`}</div></div></section></a></article></div>`;
}, "/Users/florentverney/Sites/ninou/front/src/components/PostCard.astro", void 0);

// Fetch Main menu's items and website generalSettings
async function navQuery(){
  const siteNavQueryRes = await fetch("https://boring-roentgen.178-170-38-51.plesk.page/graphql", {
      method: 'post', 
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
          query: `{
            menus(where: {location: PRIMARY}) {
              nodes {
                name
                menuItems {
                    nodes {
                        uri
                        url
                        order
                        label
                    }
                }
              }
            }
            generalSettings {
              title
              url
              description
            }
          }
          `
      })
  });
  const{ data } = await siteNavQueryRes.json();
  return data;
}

async function PostsQuery(pageSize = 0){  
const response = await fetch("https://boring-roentgen.178-170-38-51.plesk.page/graphql", {
    method: 'post', 
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
        query: `{
            posts(first: ${pageSize}, where: { 
              orderby: { field: DATE, order: DESC } 
            }) {
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
              nodes {
                date
                uri
                title
                commentCount
                excerpt
                categories {
                  nodes {
                    name
                    uri
                  }
                }
                featuredImage {
                  node {
                    srcSet
                    sourceUrl
                    altText
                    mediaDetails {
                      height
                      width
                    }
                  }
                }
              }
            }
          }
        `
    })
});
const{ data } = await response.json();
return data;
}

async function BooksQuery(pageSize = 0){
const response = await fetch("https://boring-roentgen.178-170-38-51.plesk.page/graphql", {
  method: "post",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `{     
      livres(where: { 
        orderby: { field: DATE, order: DESC } 
      }) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        nodes {
          date
          uri
          title
          excerpt
          livres {
            fieldGroupName
            livreDateDeSortie
            livreEan
            livreEditeur
            livresNombreDePages
          }
          featuredImage {
            node {
              srcSet
              sourceUrl
              altText
              mediaDetails {
                height
                width
              }
            }
          }
        }
      }
    }
  `,
  }),
});
const{ data } = await response.json();
return data;
}

async function getNodeByURI(uri){
  const response = await fetch("https://boring-roentgen.178-170-38-51.plesk.page/graphql", {
      method: 'post', 
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
          query: `
          {
            nodeByUri(uri: "${uri}") {
              __typename
              isContentNode
              isTermNode
              ... on ContentType {
                label
                graphqlSingleName
                name
              }
              ... on Post {
                id
                title
                date
                uri
                isRestricted
                excerpt
                content
                featuredImage {
                  node {
                    databaseId
                  }
                }
              }
              ... on Page {
                id
                title
                uri
                isFrontPage
                isPostsPage
                isPreview
                isPrivacyPage
                isRestricted
                isRevision
                isArchive {
                  fieldGroupName
                  isarchive
                  typeOfPostType
                }
                date
                content
                excerpt
                featuredImage {
                  node {
                    databaseId
                  }
                }
              }
              ... on Livre {
                id
                title
                uri
                isRestricted
                isRevision
                date
                content
                excerpt
                livres {
                  fieldGroupName
                  livreDateDeSortie
                  livreEan
                  livreEditeur
                  livresNombreDePages
                }
                featuredImage {
                  node {
                    databaseId
                  }
                }
              }
              ... on Category {
                id
                name
                posts {
                  edges {
                    node {
                      id
                    }
                  }
                }
              }
            }
          }
          `
      })
  });
  const{ data } = await response.json();
  return data;
}

async function getAllUris(){
const response = await fetch("https://boring-roentgen.178-170-38-51.plesk.page/graphql", {
    method: 'post', 
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
        query: `query GetAllUris {
          terms {
            nodes {
              uri
            }
          }
          posts(first: 100) {
            nodes {
              uri
            }
          }
          livres(first: 100) {
            nodes {
              uri
            }
          }
          pages(first: 100) {
            nodes {
              uri
            }
          }
        }
        `
    })
});

const { data } = await response.json();

const uris = Object.values(data)
  .reduce(function(acc, currentValue){
    return acc.concat(currentValue.nodes)
  }, [])
  .filter(node => node.uri !== null)
  .map(node => {
    let trimmedURI = node.uri.substring(1);
    trimmedURI = trimmedURI.substring(0, trimmedURI.length - 1);
    return {params: {
      uri: trimmedURI
    }}
  });
return uris;
}

async function getImageById(id){
const response = await fetch("https://boring-roentgen.178-170-38-51.plesk.page/graphql", {
  method: 'post', 
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({
    query: `{
      mediaItem(id: "${id}", idType: DATABASE_ID) {
        altText
        date
        id
        guid
        slug
        sourceUrl
        uri
      }
    }`
  })
});
const { data } = await response.json();
return data;
}

const bootstrap = "/_astro/bootstrap.bundle.min.82f64f62.js";

const $$Astro$b = createAstro();
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/Users/florentverney/Sites/ninou/front/node_modules/astro/components/ViewTransitions.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$a = createAstro();
const $$MainHead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$MainHead;
  console.log(Astro2);
  return renderTemplate(_a || (_a = __template(['<head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', '><meta name="viewport" content="width=device-width"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Judson:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"><script', "><\/script><title>", " ", "</title>", "", "</head>"])), addAttribute(Astro2.generator, "content"), addAttribute(bootstrap, "src"), Astro2.url.pathname === "/" ? "Accueil" : Astro2.props.type.title || Astro2.props.type.label, "| Nicole Verney-Carron", renderComponent($$result, "ViewTransitions", $$ViewTransitions, {}), renderHead());
}, "/Users/florentverney/Sites/ninou/front/src/layouts/MainHead.astro", void 0);

const $$Astro$9 = createAstro();
const $$SiteNav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$SiteNav;
  const { menu, generalSettings, type } = Astro2.props;
  const pathname = new URL(Astro2.request.url).pathname;
  const section = pathname.split("/");
  const isLivre = "/" + section[1] + "/";
  let isActu;
  type.__typename === "Post" ? isActu = "/actualites/" : "";
  let isHome;
  type.__typename === "ContentType" && type.label === "Articles" ? isHome = "/" : "";
  return renderTemplate`${maybeRenderHead()}<header data-astro-cid-4lunwx2e><nav class="navbar navbar-expand-lg" data-astro-cid-4lunwx2e><div class="container" data-astro-cid-4lunwx2e><a class="navbar-brand nav-link" href="/" data-astro-cid-4lunwx2e>${generalSettings.title}</a><button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation" data-astro-cid-4lunwx2e><span class="navbar-toggler-icon" data-astro-cid-4lunwx2e></span></button><div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" data-astro-cid-4lunwx2e><div class="offcanvas-header" data-astro-cid-4lunwx2e><h5 class="offcanvas-title" id="offcanvasNavbarLabel" data-astro-cid-4lunwx2e>
MENU
</h5><button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" data-astro-cid-4lunwx2e></button></div><div class="offcanvas-body" data-astro-cid-4lunwx2e><ul class="navbar-nav justify-content-end flex-grow-1 pe-3" data-astro-cid-4lunwx2e>${menu.menuItems.nodes.map((menuItem) => {
    if (menuItem.uri === "") {
      menuItem.uri = "/";
    }
    return renderTemplate`<li data-astro-cid-4lunwx2e><a${addAttribute(
      type?.uri === menuItem.uri || type?.label === menuItem.uri || isLivre === menuItem.uri || isHome === menuItem.uri || isActu === menuItem.uri ? "active nav-link" : "nav-link",
      "class"
    )}${addAttribute(menuItem.uri || "/", "href")} data-astro-cid-4lunwx2e>${menuItem.label}</a></li>`;
  })}</ul></div></div></div></nav></header>`;
}, "/Users/florentverney/Sites/ninou/front/src/components/SiteNav.astro", void 0);

const $$Astro$8 = createAstro();
const $$SiteFooter = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$SiteFooter;
  return renderTemplate`${maybeRenderHead()}<footer class="mt-5" data-astro-cid-gcn2mc3v><div class="container" data-astro-cid-gcn2mc3v><div class="row small" data-astro-cid-gcn2mc3v><div class="col-12 col-lg-4" data-astro-cid-gcn2mc3v><a href="/mentions-legales/" data-astro-cid-gcn2mc3v>Mentions légales</a></div><div class="col-12 col-lg-4 text-center" data-astro-cid-gcn2mc3v>
contact@nicoleverneycarron.fr
</div><div class="col-12 col-lg-4" data-astro-cid-gcn2mc3v></div></div></div></footer>`;
}, "/Users/florentverney/Sites/ninou/front/src/components/SiteFooter.astro", void 0);

const $$Astro$7 = createAstro();
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Hero;
  const { type } = Astro2.props;
  const getPageData = await getNodeByURI(Astro2.url.pathname);
  let { title = "Default", excerpt = "Default" } = getPageData.nodeByUri;
  let featuredImageId = getPageData?.nodeByUri?.featuredImage?.node?.databaseId;
  if (!featuredImageId)
    featuredImageId = 49;
  if (getPageData.nodeByUri.__typename === "ContentType" && getPageData.nodeByUri.name === "livres") {
    featuredImageId = 79;
    title = "Livres";
    excerpt = "";
  }
  if (getPageData.nodeByUri.__typename === "ContentType" && getPageData.nodeByUri.name === "post") {
    featuredImageId = 49;
    title = "Accueil";
    excerpt = "ex Ma\xEEtre de conf\xE9rences en histoire contemporaine, Nicole Verney-Carron prolonge sa passion pour la recherche et a transmission en se consacrant \xE0 la litt\xE9rature.";
  }
  const featuredImage = await getImageById(featuredImageId);
  return renderTemplate`${maybeRenderHead()}<section data-astro-cid-bbe6dxrz><div class="container-fluid" data-astro-cid-bbe6dxrz><div class="row align-items-center" data-astro-cid-bbe6dxrz>${type.__typename === "Post" || type.__typename === "Page" && type?.isArchive?.fieldGroupName !== "isArchive" ? null : renderTemplate`<div class="col-12 col-md-6 p-0 d-flex flex-column align-self-start" data-astro-cid-bbe6dxrz><img${addAttribute(featuredImage?.mediaItem?.sourceUrl, "src")}${addAttribute(featuredImage?.mediaItem?.altText, "alt")} class="object-fit-cover img-fluid hero-img" data-astro-cid-bbe6dxrz></div>`}<div${addAttribute(type.__typename === "Post" ? "" : "col-md-6", "class")} data-astro-cid-bbe6dxrz><div class="py-5 px-4 px-lg-5" data-astro-cid-bbe6dxrz><h1 data-astro-cid-bbe6dxrz>${title}</h1>${// Page livre
  type.__typename === "ContentType" && type.names === "livres" || // Page accueil 
  type.__typename === "ContentType" && type.names === "post" || // Page d'un post ou d'une single
  type.__typename === "Post" || type.__typename === "Page" && type?.isArchive?.typeOfPostType === null ? null : renderTemplate`<div class="strong" data-astro-cid-bbe6dxrz>${unescapeHTML(excerpt)}</div>`}</div></div></div></div></section>`;
}, "/Users/florentverney/Sites/ninou/front/src/components/Hero.astro", void 0);

const $$Astro$6 = createAstro();
const $$MainLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { menus, generalSettings } = await navQuery();
  const mainNav = menus.nodes[0];
  const uri = `${Astro2.url.pathname}`;
  const data = await getNodeByURI(uri);
  console.log(data.nodeByUri);
  return renderTemplate`<html lang="en">${renderComponent($$result, "MainHead", $$MainHead, { "type": data.nodeByUri })}${maybeRenderHead()}<body><header class="mb-5">${renderComponent($$result, "SiteNav", $$SiteNav, { "menu": mainNav, "generalSettings": generalSettings, "type": data.nodeByUri })}${renderComponent($$result, "Hero", $$Hero, { "type": data.nodeByUri })}</header><div class="container">${renderSlot($$result, $$slots["default"])}</div>${renderComponent($$result, "SiteFooter", $$SiteFooter, {})}</body></html>`;
}, "/Users/florentverney/Sites/ninou/front/src/layouts/MainLayout.astro", void 0);

const $$Astro$5 = createAstro();
const prerender$1 = true;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Index;
  const dataBooks = await BooksQuery(4);
  const Books = dataBooks.livres.nodes;
  const dataPosts = await PostsQuery(4);
  const posts = dataPosts.posts.nodes;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Accueil" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="row"><h2>Livres</h2>${Books.map((post) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "post": post, "url": post.url, "cols": "3" })}`)}</div><div class="row py-5"><div class="col-12 text-center"><a href="/livres" class="btn btn-outline-primary">Livres</a></div></div><div class="row py-5"><h2>Editeurs</h2>${renderComponent($$result2, "Editor", $$Editor, { "logo": "http://www.city-editions.com/terredhistoires/img/img_terre_histoires/Bannieres/Banniere_logo.png", "name": "Terres d'histoires", "description": "Inviter au voyage, \xE0 l\u2019imaginaire et faire d\xE9couvrir de nouveaux horizons : c\u2019est l\u2019objectif de Terre d'Histoires...", "label": "Site de l'\xE9diteur", "link": "http://www.city-editions.com/terredhistoires/" })}${renderComponent($$result2, "Editor", $$Editor, { "logo": "https://presses.univ-st-etienne.fr/skins/charte-modele-de-site/resources/img/logo.png", "name": "Presses universitaires de Saint-Etienne", "description": "Le service des Presses universitaires de Saint-\xC9tienne attache une importance toute particuli\xE8re \xE0 promouvoir la recherche...", "label": "Site de l'\xE9diteur", "link": "https://presses.univ-st-etienne.fr/fr/index.html" })}</div><div class="row pt-5"><h2>Actualités</h2>${posts.map((post) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "post": post, "url": post.url })}`)}</div><div class="row py-5"><div class="col-12 text-center"><a href="/actualites" class="btn btn-outline-primary">Actualités</a></div></div>` })}`;
}, "/Users/florentverney/Sites/ninou/front/src/pages/index.astro", void 0);

const $$file$3 = "/Users/florentverney/Sites/ninou/front/src/pages/index.astro";
const $$url$3 = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file$3,
    prerender: prerender$1,
    url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$4 = createAstro();
async function getStaticPaths$2({ paginate }) {
  const data = await PostsQuery(0);
  const page = await data.posts.nodes;
  return paginate(
    page,
    {
      pageSize: 8
    }
  );
}
const $$$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$$2;
  const { page } = Astro2.props;
  const { prev, next } = page.url;
  console.log(Astro2.params);
  console.log(page);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Actualit\xE9s" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="row"><!--List the array of astronaut info-->${page.data.map((post) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "post": post, "url": post.url })}`)}</div><div class="row"><div class="row"><div class="col-6 text-end">${prev && renderTemplate`<a${addAttribute(prev, "href")} class="mx-2 btn btn-outline-primary">Précédent</a>`}</div><div class="col-6 text-start">${next && renderTemplate`<a${addAttribute(next, "href")} class="mx-2 btn btn-outline-primary">Suivant</a>`}</div></div><div class="col-12 text-center pt-3 small">${page.currentPage} sur ${page.lastPage}</div></div>` })}`;
}, "/Users/florentverney/Sites/ninou/front/src/pages/actualites/[...page].astro", void 0);

const $$file$2 = "/Users/florentverney/Sites/ninou/front/src/pages/actualites/[...page].astro";
const $$url$2 = "/actualites/[...page]";

const ____page_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$$2,
    file: $$file$2,
    getStaticPaths: getStaticPaths$2,
    url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro();
async function getStaticPaths$1({ paginate }) {
  const data = await BooksQuery(0);
  const page = await data.livres.nodes;
  return paginate(
    page,
    {
      pageSize: 8
    }
  );
}
const $$$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$$1;
  const { page } = Astro2.props;
  const { prev, next } = page.url;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Livres" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="row py-5"><!--List the array of astronaut info-->${page.data.map((post) => renderTemplate`${renderComponent($$result2, "PostCard", $$PostCard, { "post": post, "url": post.url, "cols": "3" })}`)}</div><div class="row"><div class="col-12 text-center">${prev && renderTemplate`<a${addAttribute(prev, "href")} class="mx-2 btn btn-outline-primary">Précédent</a>`}${next && renderTemplate`<a${addAttribute(next, "href")} class="mx-2 btn btn-outline-primary">Suivant</a>`}<span>Page ${page.currentPage} sur ${page.lastPage}</span></div></div>` })}`;
}, "/Users/florentverney/Sites/ninou/front/src/pages/livres/[...page].astro", void 0);

const $$file$1 = "/Users/florentverney/Sites/ninou/front/src/pages/livres/[...page].astro";
const $$url$1 = "/livres/[...page]";

const ____page_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$$1,
    file: $$file$1,
    getStaticPaths: getStaticPaths$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro();
const $$Archive = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Archive;
  Astro2.props;
  const data = await PostsQuery(0);
  const posts = await data.posts.nodes;
  await getImageById(49);
  return renderTemplate`${maybeRenderHead()}<div class="container"><div class="row">${posts.map((post) => renderTemplate`${renderComponent($$result, "PostCard", $$PostCard, { "post": post, "url": post.url })}`)}</div><div class="row"><div class="col-6 text-end"><button id="previous" class="mx-2 btn btn-outline-primary">Previous</button></div><div class="col-6 text-start"><button id="next" class="mx-2 btn btn-outline-primary">Next</button></div></div></div>`;
}, "/Users/florentverney/Sites/ninou/front/src/components/templates/Archive.astro", void 0);

const $$Astro$1 = createAstro();
const $$Single = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Single;
  const { node } = Astro2.props;
  const { excerpt, title, date, content } = node;
  const featuredImage = await getImageById(node?.featuredImage?.node?.databaseId);
  console.log(Astro2.params);
  return renderTemplate`${maybeRenderHead()}<div class="row py-5" data-astro-cid-6ejvupo2><div class="col-12" data-astro-cid-6ejvupo2>${node.__typename === "Post" || node.__typename === "Livre" ? renderTemplate`<a${addAttribute(node.__typename === "Post" ? "/actualites/" : "/livres/", "href")} class="btn btn-outline-primary" data-astro-cid-6ejvupo2><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1" data-astro-cid-6ejvupo2><line x1="19" y1="12" x2="5" y2="12" data-astro-cid-6ejvupo2></line><polyline points="12 19 5 12 12 5" data-astro-cid-6ejvupo2></polyline></svg> Retour ${node.__typename === "Post" ? "aux actualit\xE9s" : "aux livres"}</a>` : null}</div></div><div class="row" data-astro-cid-6ejvupo2><div class="col-lg-4" data-astro-cid-6ejvupo2><img class="featured-image sticky-top img-fluid"${addAttribute(featuredImage?.mediaItem?.guid, "src")}${addAttribute(featuredImage?.mediaItem?.altText, "alt")} loading="lazy" data-astro-cid-6ejvupo2></div><div class="col-lg-8" data-astro-cid-6ejvupo2><article class="p-5" data-astro-cid-6ejvupo2><div class="book" data-astro-cid-6ejvupo2>${node.__typename === "Post" ? renderTemplate`<p class="post-details" data-astro-cid-6ejvupo2>
Publié le
<time${addAttribute(date, "datetime")} data-astro-cid-6ejvupo2>${new Date(date).toLocaleDateString()}</time></p>` : null}${node.categories ? node.categories.nodes.map((category) => renderTemplate`<a class="term-link"${addAttribute(category.uri, "href")} data-astro-cid-6ejvupo2>${category.name}</a>`) : null}<div data-astro-cid-6ejvupo2>${unescapeHTML(content)}</div>${node.__typename === "Livre" ? renderTemplate`<div class="border-bottom" data-astro-cid-6ejvupo2></div><div class="border-bottom" data-astro-cid-6ejvupo2>
Parution : ${node.livres.livreDateDeSortie}</div><div class="border-bottom" data-astro-cid-6ejvupo2>
Editeur : ${node.livres.livreEditeur}</div><div class="border-bottom" data-astro-cid-6ejvupo2>${node.livres.livresNombreDePages}${" "}pages
</div><div class="border-bottom" data-astro-cid-6ejvupo2>
EAN : ${node.livres.livreEan}</div><div class="py-5" data-astro-cid-6ejvupo2><a target="_blank" href="https://www.babelio.com/livres/Verney-Carron-Le-reseau-Coralie/1501175#!" class="btn btn-primary" data-astro-cid-6ejvupo2>Commander</a></div>` : null}</div></article></div></div>`;
}, "/Users/florentverney/Sites/ninou/front/src/components/templates/Single.astro", void 0);

const $$Astro = createAstro();
const prerender = true;
async function getStaticPaths() {
  return await getAllUris();
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const uri = `${Astro2.params.uri}`;
  const data = await getNodeByURI(uri);
  const node = data.nodeByUri;
  function resolveContentTemplate(node2) {
    let template;
    switch (node2.__typename) {
      case "Post":
        template = $$Single;
        break;
      case "Livre":
        template = $$Single;
        break;
      case "Page":
        template = $$Single;
        if (node2.isArchive.isarchive && node2.isArchive.typeOfPostType === "post")
          template = $$$2;
        if (node2.isArchive.isarchive && node2.isArchive.typeOfPostType === "livre")
          template = $$$1;
        break;
      case "Category":
        template = $$Archive;
        break;
      case "Tag":
        template = $$Archive;
        break;
      default:
        template = $$Single;
    }
    return template;
  }
  const Template = resolveContentTemplate(node);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": node.title || node.name, "description": node.excerpt }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Template", Template, { "node": node })}` })}`;
}, "/Users/florentverney/Sites/ninou/front/src/pages/[...uri].astro", void 0);

const $$file = "/Users/florentverney/Sites/ninou/front/src/pages/[...uri].astro";
const $$url = "/[...uri]";

const ____uri_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$,
    file: $$file,
    getStaticPaths,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { ____page_$1 as _, ____page_ as a, ____uri_ as b, index as i };
