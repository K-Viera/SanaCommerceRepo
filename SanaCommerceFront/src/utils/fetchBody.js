export const generateFetchBody = (endCursor) => {
    const cursorString = endCursor == null ? 'null' : `"${endCursor}"`;
    return JSON.stringify({
      query: `
            {
              products {
                description
                price
                productCode
                productId
                productName
                stock
              }
            }
          `,
    });
  };