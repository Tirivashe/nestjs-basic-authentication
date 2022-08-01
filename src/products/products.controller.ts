import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guards/jwt.guard";

@Controller("products")
@UseGuards(JwtGuard)
export class ProductsController {
  @Get()
  getAllProducts() {
    return "All the products are found here!";
  }
}
