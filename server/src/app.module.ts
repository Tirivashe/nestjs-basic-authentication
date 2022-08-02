import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaModule } from "./prisma/prisma.module";
import { ProductsModule } from "./products/products.module";

@Module({
  imports: [AuthModule, PrismaModule, ProductsModule],
  providers: [PrismaService]
})
export class AppModule {}
