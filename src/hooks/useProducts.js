import {useShopQuery, fetchSync, gql} from '@shopify/hydrogen';

export function useProducts({after}) {
  const shopifyResponse = useShopQuery({
    query: SHOPIFY_QUERY,
    variables: {
      after,
    },
  });
  const shopifyProducts = shopifyResponse.data.products.edges.map(edge => edge.node);
  const shopifyResponseMeta = shopifyResponse.data.products.pageInfo;
  const thirdPartyData = fetchSync('https://jsonplaceholder.typicode.com/todos').json();
  const mergedProducts = shopifyProducts.map((shopifyProduct, index) => {
    const productDataFromThirdParty = thirdPartyData[index];
    return {
      ...shopifyProduct,
      ...productDataFromThirdParty
    };
  });

  return {
    data: mergedProducts,
    meta: {
      ...shopifyResponseMeta
    }
  }
}

const SHOPIFY_QUERY = gql`
  query products($after: String) {
    products: products(first: 3, sortKey: TITLE, after: $after) {
      edges {
        node {
          title
          id
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
