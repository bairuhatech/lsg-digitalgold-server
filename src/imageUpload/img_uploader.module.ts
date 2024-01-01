import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { ImguploaderController } from "./img_uploader.controller";
import { ImguploaderService } from "./img_uploader.service";
@Module({
	imports: [DatabaseModule],
	controllers: [ImguploaderController],
	providers: [ImguploaderService],
	exports: [ImguploaderService],
})
export class ImguploaderModule {}