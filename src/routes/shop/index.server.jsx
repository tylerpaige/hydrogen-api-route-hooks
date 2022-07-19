import {useProducts} from '~/hooks/useProducts';
import {Layout} from '~/components/global/layout.server';
import {ProductGrid} from '~/components/product/ProductGrid.client';

export default function ShopCategory({request}) {
  const url = new URL(request.normalizedUrl);
  const after = url.searchParams.get('after');
  const {data, meta} = useProducts({after});

  return (
    <Layout>
      <ProductGrid
        loadMoreUrl={`/shop`}
        products={data}
        cursor={meta.endCursor}
        hasNextPage={meta.hasNextPage}
      />
    </Layout>
  );
}

export async function api(request) {
  const url = new URL(request.url);
  const after = url.searchParams.after;
  return await useProducts({after});
}
