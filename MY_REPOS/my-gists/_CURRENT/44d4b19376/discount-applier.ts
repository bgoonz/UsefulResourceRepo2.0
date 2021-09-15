getDiscountPercentageValue(products: Product[]): number {
        let discountValue = 0;

        if (products.length === 1) {
            return 0;
        }
        
        let allProductsQuantity = products.reduce((sum, product) => sum + product.quantity, 0);

        if (allProductsQuantity > 10 && allProductsQuantity <= 50) {
            discountValue += 10;
        } else if (allProductsQuantity > 50) {
            discountValue += 15;
        }

        // ......
        // The rest of business logic related to quantity/price/value of the products bought

        return discountValue;
    }