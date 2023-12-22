import { User } from '../users/user.entity';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePostDto } from './dto/create-kyc.dto';
// import { Kyc } from './kyc.entity';
import { KycDto } from './dto/kyc.dto';
import { UpdatePostDto } from './dto/update-kyc.dto';
import { Kyc } from './kyc.entity';

@Injectable()
export class KycService {
  constructor(
    @Inject('KycRepository')
    private readonly kycRepository: typeof Kyc,
  ) {}

  // async findAll() {
  //   const posts = await this.kycRepository.findAll<Kyc>({
  //     include: [User],
  //   });
  //   return posts.map((kyc) => new KycDto(kyc));
  // }

  // async findOne(id: number) {
  //   const kyc = await this.kycRepository.findByPk<Kyc>(id, {
  //     include: [User],
  //   });
  //   if (!kyc) {
  //     throw new HttpException('No post found', HttpStatus.NOT_FOUND);
  //   }
  //   return new KycDto(kyc);
  // }

  // async create(userId: string, createPostDto: CreatePostDto) {
  //   const kyc = new Kyc();
  //   kyc.userId = userId;
  //   kyc.title = createPostDto.title;
  //   kyc.content = createPostDto.content;
  //   return kyc.save();
  // }

  // private async getUserPost(id: number, userId: string) {
  //   const post = await this.kycRepository.findByPk<Kyc>(id);
  //   if (!post) {
  //     throw new HttpException('No post found', HttpStatus.NOT_FOUND);
  //   }
  //   if (post.userId !== userId) {
  //     throw new HttpException(
  //       'You are unauthorized to manage this post',
  //       HttpStatus.UNAUTHORIZED,
  //     );
  //   }

  //   return post;
  // }

  // async update(id: number, userId: string, updatePostDto: UpdatePostDto) {
  //   const post = await this.getUserPost(id, userId);
  //   post.title = updatePostDto.title || post.title;
  //   post.content = updatePostDto.content || post.content;
  //   return post.save();
  // }

  // async delete(id: number, userId: string) {
  //   const post = await this.getUserPost(id, userId);
  //   await post.destroy();
  //   return post;
  // }
}
