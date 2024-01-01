import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
  } from "@nestjs/common";
  import { ApiTags } from "@nestjs/swagger";
  import { FileInterceptor } from "@nestjs/platform-express";
  import * as path from "path";
  import { ImguploaderService } from "./img_uploader.service";
  
  @Controller("img_compress")
  @ApiTags("img_compress")
  export class ImguploaderController {
    constructor(private readonly imgcompressService: ImguploaderService) {}
  
    private isImageFile(filename: string): boolean {
      const ext = path.extname(filename).toLowerCase();
      return ext === ".jpg" || ext === ".jpeg" || ext === ".png";
    }
  
    @Post("/compress")
    @UseInterceptors(FileInterceptor("file"))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
      if (this.isImageFile(file.originalname)) {
        return await this.imgcompressService.imgCompressAndUpload(file.buffer);
      } else {
        // return await this.imgcompressService.uploadToS3(file);
        throw new Error("Invalid image format. Please upload a valid image file.");
      }
    }
    @Post("/file")
    @UseInterceptors(FileInterceptor("file"))
    async uploadFileToS3(@UploadedFile() file: Express.Multer.File) {
      return await this.imgcompressService.uploadToS3(file);
    }
  }