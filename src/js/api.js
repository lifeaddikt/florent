// Fetch Main menu's items and website generalSettings
export async function navQuery(){
  const siteNavQueryRes = await fetch(import.meta.env.WORDPRESS_API_URL, {
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

export async function PostsQuery(pageSize = 0){  
const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
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

export async function BooksQuery(pageSize = 0){
const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
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

export async function getNodeByURI(uri){
  uri === '' ? '/' : uri
  const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
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

export async function getAllUris(){
const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
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
    trimmedURI = trimmedURI.substring(0, trimmedURI.length - 1)
    trimmedURI === '' ? '/' : trimmedURI
    return {params: {
      uri: trimmedURI
    }}
  })
return uris;
}

export async function getImageById(id){
const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
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
})
const { data } = await response.json();
return data;
}




