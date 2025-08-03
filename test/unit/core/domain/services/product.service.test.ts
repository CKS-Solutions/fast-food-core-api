import { ProductCategory } from '@entities/product/product.types';
import { ProductService } from '@services/product.service';
import { ProductDto } from '@dto/product.dto';
import { Product } from '@entities/product/product';

describe('ProductService', () => {
  it('should be defined', () => {
    expect(new ProductService()).toBeDefined();
  });

  describe('when creating a product', () => {
    let productService: ProductService;

    beforeAll(() => {
      productService = new ProductService();
    });

    it('should create a product', () => {
      const product = productService.create(
        'description',
        ProductCategory.Drink,
        100,
        10,
      );
      expect(product).toBeDefined();
    });

    it('should create a product with a random id', () => {
      const product = productService.create(
        'description',
        ProductCategory.Drink,
        100,
        10,
      );
      expect(product.id).toBeDefined();
    });
  });

  describe('when mapping products', () => {
    let productService: ProductService;

    beforeAll(() => {
      productService = new ProductService();
    });

    it('should map a product to a product dto', () => {
      const product = productService.create(
        'description',
        ProductCategory.Drink,
        100,
        10,
      );
      const productDto = productService.toDto(product);
      expect(productDto).toBeDefined();
    });

    it('should map the products to product dtos', () => {
      const products = [
        productService.create('description', ProductCategory.Drink, 100, 10),
        productService.create('description', ProductCategory.Drink, 100, 10),
      ];
      const productDtos = productService.toDtoList(products);
      expect(productDtos).toBeDefined();
      expect(productDtos.length).toEqual(2);
    });
  });

  describe('when updating a product', () => {
    let databaseProduct: Product;
    let newProduct: ProductDto;
    let productService: ProductService;

    beforeAll(() => {
      productService = new ProductService();
      databaseProduct = productService.create(
        'description',
        ProductCategory.Drink,
        100,
        10,
      );
      newProduct = new ProductDto(
        ProductCategory.Drink,
        'new description',
        200,
        20,
      );
    });

    it('should keep the same id', () => {
      const updatedProduct = productService.update(databaseProduct, newProduct);
      expect(updatedProduct.id).toEqual(databaseProduct.id);
    });

    it('should keep the same category', () => {
      const updatedProduct = productService.update(databaseProduct, newProduct);
      expect(updatedProduct.category).toEqual(databaseProduct.category);
    });

    it('should update the description', () => {
      const updatedProduct = productService.update(databaseProduct, newProduct);
      expect(updatedProduct.description).toEqual(newProduct.description);
    });

    it('should update the price', () => {
      const updatedProduct = productService.update(databaseProduct, newProduct);
      expect(updatedProduct.price).toEqual(newProduct.price);
    });

    it('should update the quantity', () => {
      const updatedProduct = productService.update(databaseProduct, newProduct);
      expect(updatedProduct.quantity).toEqual(newProduct.quantity);
    });
  });
});
