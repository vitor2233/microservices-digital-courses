import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { Product } from '../models/product';
import { ProductsService } from 'src/services/products.service';
import { CreateProductInput } from '../inputs/create-product-input';

@Resolver(() => Product)
export class ProductsResolver {
    constructor(private productsService: ProductsService) { }

    @Query(() => [Product])
    products() {
        return this.productsService.listAllProducts();
    }

    @Mutation(() => Product)
    @UseGuards(AuthorizationGuard)
    createProduct(
        @Args('data') data: CreateProductInput
    ) {
        return this.productsService.createProduct(data);
    }
}
