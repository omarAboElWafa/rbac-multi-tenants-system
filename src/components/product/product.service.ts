import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { IProductInputDTO } from "@/contracts/product";

class ProductService {
  private productRepository: Repository<Product>;

  constructor(productRepository: Repository<Product>) {
    this.productRepository = productRepository;
  }

  async createProduct(product: IProductInputDTO): Promise<Product> {
    const newProduct = new Product();
    newProduct.name = product.name;
    newProduct.description = product.description;
    newProduct.price = product.price;
    return await this.productRepository.save(newProduct);
  }

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getProduct(id: number): Promise<Product | null> {
    return await this.productRepository.findOne({ where: { id: id } });
  }

  async updateProduct(
    id: number,
    product: IProductInputDTO,
  ): Promise<Product | null> {
    await this.productRepository.update(id, product);
    return await this.productRepository.findOne({ where: { id: id } });
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}

export default ProductService;
