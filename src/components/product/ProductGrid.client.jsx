import {useState, useCallback} from 'react';

export function ProductGrid({loadMoreUrl, ...props}) {
  const [products, setProducts] = useState(props.products || []);
  const [hasNextPage, setNextPage] = useState(props.hasNextPage || false);
  const [cursor, setCursor] = useState(props.cursor || '');

  const fetchProducts = useCallback(async () => {
    const postUrl = new URL(window.location.origin + loadMoreUrl);
    postUrl.searchParams.set('after', cursor);
    const response = await fetch(postUrl, {
      method: 'POST',
    });
    const {data: newProducts = [], meta = {}} = await response.json();
    setProducts([...products, ...newProducts]);
    setNextPage(meta.hasNextPage || false);
    setCursor(meta.endCursor || '');
  }, [cursor, loadMoreUrl, products]);

  return (
    <div>
      <ul>
        {products.map((product, i) => (
          <li key={i}>{product.title}</li>
        ))}
      </ul>
      {hasNextPage && (
        <div>
          <button onClick={fetchProducts}>Load more products</button>
        </div>
      )}
    </div>
  );
}
