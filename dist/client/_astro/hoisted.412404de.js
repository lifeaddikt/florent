import"./hoisted.bd7fdfe4.js";async function a(o=0){const r=await fetch({}.WORDPRESS_API_URL,{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:`{
            posts(first: ${o}, where: { 
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
        `})}),{data:i}=await r.json();return i}let e=0;const t=8;let n=e+t;const c=document.querySelector("#previous"),d=document.querySelector("#next");async function s(o=0,r=t){a(o)}d.addEventListener("click",()=>{e+=t,n+=t,s(e,n)});c.addEventListener("click",()=>{e<=0||(e-=t,n-=t,s(e,n))});
