import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateKycDto } from './dto/create-kyc.dto';
import { Kyc } from './kyc.entity';
import { KycDto } from './dto/kyc.dto';
import { UpdateKycDto } from './dto/update-kyc.dto'; 
import { Kyc as KycEntity } from './kyc.entity';
import { PageOptionsDto } from '../shared/dto/page-option-dto';
import { PageDto, PageMetaDto } from '../shared/dto';

@Injectable()
export class KycService {
  constructor(
    @Inject('KycRepository')
    private readonly kycRepository: typeof Kyc,
  ) {}

  async findAll(): Promise<Kyc[]> {
    return await this.kycRepository.findAll();
  }

  async findOne(userId: string) {
    const kyc = await this.kycRepository.findOne<Kyc>({
      where: { userId: userId },
    });
    if (!kyc) {
      throw new HttpException('No post found', HttpStatus.NOT_FOUND);
    }
    return new KycDto(kyc);
  }

  async create(userId: string, createKycDto: CreateKycDto) {
    try {
      const user = await this.kycRepository.findOne({
        where: { userId: userId },
      });

      if (!user) {
        const kyc = new Kyc();
        kyc.userId = userId;
        Object.assign(kyc, createKycDto);
        return kyc.save();
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async getkyc(userId: string) {
    const kycData = await this.kycRepository.findOne<Kyc>({where : {userId :userId}});
    if (!kycData) {
      throw new HttpException('No kyc found', HttpStatus.NOT_FOUND);
    }
    return kycData;
  }
  
//   async update(UserId: string, updateKycDto: UpdateKycDto): Promise<KycEntity> {
//     console.log("dataaaa",updateKycDto)
//  try{
//     const update = await this.getkyc(UserId);

//     if (updateKycDto.isissued !== undefined){
//       update.isissued = updateKycDto.isissued
//     }

//     if(updateKycDto.reasonreject !== undefined){
//       update.reasonreject = updateKycDto.reasonreject
//     }
//     return update.save();

//   }catch(err){
//     throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
//   }

  
//   }

async update(UserId: string, updateKycDto: UpdateKycDto) {
try {
  const KycUpdate = await this.getkyc(UserId);
  KycUpdate.name = updateKycDto.name || KycUpdate.name;
  KycUpdate.companyName = updateKycDto.companyName || KycUpdate.companyName;
  KycUpdate.mobile = updateKycDto.mobile || KycUpdate.mobile;
  KycUpdate.email = updateKycDto.email || KycUpdate.email;
  KycUpdate.address = updateKycDto.address || KycUpdate.address;
  KycUpdate.city = updateKycDto.city || KycUpdate.city;
  KycUpdate.pinCode = updateKycDto.pinCode || KycUpdate.pinCode;
  KycUpdate.vatNumber = updateKycDto.vatNumber || KycUpdate.vatNumber;
  KycUpdate.natureOfBusiness = updateKycDto.natureOfBusiness || KycUpdate.natureOfBusiness;
  KycUpdate.isLogisticServiceRequired = updateKycDto.isLogisticServiceRequired || KycUpdate.isLogisticServiceRequired;
  KycUpdate.primaryPartnerName = updateKycDto.primaryPartnerName || KycUpdate.primaryPartnerName;
  KycUpdate.primaryPartnerMobile = updateKycDto.primaryPartnerMobile || KycUpdate.primaryPartnerMobile;
  KycUpdate.secondaryPartnerName = updateKycDto.secondaryPartnerName || KycUpdate.secondaryPartnerName;
  KycUpdate.secondaryPartnerMobile = updateKycDto.secondaryPartnerMobile || KycUpdate.secondaryPartnerMobile;
  KycUpdate.bankName = updateKycDto.bankName || KycUpdate.bankName;
  KycUpdate.accountNumber = updateKycDto.accountNumber || KycUpdate.accountNumber;
  KycUpdate.ifscCode = updateKycDto.ifscCode || KycUpdate.ifscCode;
  KycUpdate.authorisedPersonPrimary = updateKycDto.authorisedPersonPrimary || KycUpdate.authorisedPersonPrimary;
  KycUpdate.authorisedPersonSecondary = updateKycDto.authorisedPersonSecondary || KycUpdate.authorisedPersonSecondary;
  KycUpdate.authorisedPersonTertiary = updateKycDto.authorisedPersonTertiary || KycUpdate.authorisedPersonTertiary;
  KycUpdate.authorisedPersonQuaternary = updateKycDto.authorisedPersonQuaternary || KycUpdate.authorisedPersonQuaternary;
  KycUpdate.companyPan = updateKycDto.companyPan || KycUpdate.companyPan;
  KycUpdate.vatCertificate = updateKycDto.vatCertificate || KycUpdate.vatCertificate;
  KycUpdate.authorisedPersonPrimaryImage = updateKycDto.authorisedPersonPrimaryImage || KycUpdate.authorisedPersonPrimaryImage;
  KycUpdate.authorisedPersonSecondaryImage = updateKycDto.authorisedPersonSecondaryImage || KycUpdate.authorisedPersonSecondaryImage;
  KycUpdate.reasonreject = updateKycDto.reasonreject || KycUpdate.reasonreject;
  KycUpdate.isissued = updateKycDto.isissued || KycUpdate.isissued;
  return KycUpdate.save();
 
} catch (err) {
  console.log("Error to Update",err)
}
}

  async getKycUser(pageOptionsDto: PageOptionsDto) {
    try {
      const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
      
      const userKyc =await this.kycRepository.findAndCountAll<KycEntity>({
        limit: Number(pageOptionsDto.take),
        offset: skip,
        order: [['updatedAt', pageOptionsDto.order]],
      });
      const entities = userKyc.rows.map((kycuser) => new KycDto(kycuser));
  const itemCount = userKyc.count;

  const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
  return new PageDto(entities, pageMetaDto)
      
    } catch (err) {
      throw new HttpException('No user found with kyc', HttpStatus.NOT_FOUND);
    }
  }



  
  
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
